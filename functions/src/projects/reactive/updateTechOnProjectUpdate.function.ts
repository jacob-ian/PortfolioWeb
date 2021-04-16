import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Projects, Technologies } from '@shared/projects';

const firestore = admin.firestore();
const technologies = firestore.collection('technologies');

let projectId: string;

export const updateTechOnProjectUpdate = functions.firestore
  .document('/projects/{projectId}')
  .onUpdate((change) => {
    projectId = change.after.id;

    let before = <Projects.Document>change.before.data();
    let after = <Projects.Document>change.after.data();
    let techBefore = before.technologies;
    let techAfter = after.technologies;

    let addedTechnologies = getArrayDifference(techBefore, techAfter);
    let removedTechnologies = getArrayDifference(techAfter, techBefore);

    return updateTechnologies(addedTechnologies, removedTechnologies);
  });

function getArrayDifference(first: any[], second: any[]): string[] {
  let difference: string[] = [];
  second.forEach((item) => {
    if (!first.includes(item)) {
      difference.push(item);
    }
  });
  return difference;
}

async function updateTechnologies(
  added: string[],
  removed: string[]
): Promise<void> {
  added.forEach(async (tech) => await addProjectToTechnology(tech));
  removed.forEach(async (tech) => await removeProjectFromTechnology(tech));
}

async function addProjectToTechnology(technology: string): Promise<void> {
  try {
    let technologyId = await getTechnologyId(technology);
    return await addProjectIdToTechnology(technologyId);
  } catch (err) {
    let error = err.error;
    if (error === 'not-found') {
      return await createTechnology(technology);
    }
    console.error(error);
  }
}

async function getTechnologyId(technology: string): Promise<string> {
  let query = await getTechDocument(technology);

  if (query.empty) {
    throw {
      error: 'not-found',
      message: `Technology "${technology}" does not exist.`,
    };
  }

  if (query.size > 1) {
    throw {
      error: 'internal',
      message: `Multiple "${technology}" technology documents found.`,
    };
  }

  let technologyId = query.docs[0].id;
  return technologyId;
}

async function getTechDocument(name: string): Promise<DocumentCollection> {
  try {
    return await technologies.where('name', '==', name).get();
  } catch (error) {
    throw error;
  }
}

async function addProjectIdToTechnology(technologyId: string): Promise<void> {
  await technologies
    .doc(technologyId)
    .update({ projects: admin.firestore.FieldValue.arrayUnion(projectId) });
}

async function createTechnology(technology: string): Promise<void> {
  let doc: Technologies.Document = {
    id: technologies.doc().id,
    name: technology,
    projects: [projectId],
  };

  await technologies.doc(doc.id).set(doc);
}

async function removeProjectFromTechnology(technology: string): Promise<void> {
  try {
    let technologyId = await getTechnologyId(technology);
    return await removeProjectId(technologyId);
  } catch (err) {
    console.error(err);
  }
}

async function removeProjectId(technologyId: string): Promise<void> {
  await technologies
    .doc(technologyId)
    .update({ projects: admin.firestore.FieldValue.arrayRemove(projectId) });
}

type DocumentCollection = FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

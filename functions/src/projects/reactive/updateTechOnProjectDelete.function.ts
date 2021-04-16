import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Projects } from '@shared/projects';

const firestore = admin.firestore();
const collection = firestore.collection('technologies');

let project: Projects.Document;

export const updateTechOnProjectDelete = functions.firestore
  .document('/projects/{projectId}')
  .onDelete((snap) => {
    project = <Projects.Document>snap.data();
    return removeProjectFromTechnologies();
  });

async function removeProjectFromTechnologies(): Promise<void> {
  try {
    project.technologies.forEach(
      async (technology) => await removeProjectIdFromTechnology(technology)
    );
  } catch (error) {
    console.error(error);
  }
}

async function removeProjectIdFromTechnology(
  technology: string
): Promise<void> {
  try {
    let technologyId = await getTechnologyId(technology);
    return await updateTechDocument(technologyId);
  } catch (error) {
    let code = error.error;
    if (code === 'not-found') {
      return;
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
    return collection.where('name', '==', name).get();
  } catch (error) {
    throw error;
  }
}

async function updateTechDocument(technologyId: string): Promise<void> {
  try {
    await collection
      .doc(technologyId)
      .update({ projects: admin.firestore.FieldValue.arrayRemove(project.id) });
  } catch (error) {
    throw error;
  }
}

type DocumentCollection = FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

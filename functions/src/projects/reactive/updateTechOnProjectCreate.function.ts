import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Projects, Technologies } from '@shared/projects';

const firestore = admin.firestore();
const technologiesCollection = firestore.collection('technologies');

type DocumentCollection = FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

export const updateTechOnProjectCreate = functions.firestore
  .document('/projects/{projectId}')
  .onCreate((snap) => {
    let project = <Projects.Document>snap.data();
    let projectId = project.id;
    let technologies = project.technologies;
    return updateTechnologiesCollection(projectId, technologies);
  });

async function updateTechnologiesCollection(
  projectId: string,
  technologies: string[]
): Promise<void> {
  try {
    technologies.forEach(
      async (technology) => await upsertTechnology(technology, projectId)
    );
  } catch (error) {
    console.error(error);
  }
}

async function upsertTechnology(
  technology: string,
  projectId: string
): Promise<void> {
  try {
    return await updateTechnologyWithProjectId(technology, projectId);
  } catch (error) {
    let code = error.error;
    if (code === 'not-found') {
      return await createTechnology(technology, projectId);
    }
    throw error;
  }
}

async function updateTechnologyWithProjectId(
  technology: string,
  projectId: string
): Promise<void> {
  let query = await queryTechnologies(technology);

  if (query.empty) {
    throw {
      error: 'not-found',
      message: `Technology "${technology}" doesn't exist.`,
    };
  }

  if (query.size > 1) {
    throw {
      error: 'internal',
      message: `More than one technology "${technology}" document exists.`,
    };
  }

  let technologyId = query.docs[0].id;
  return await addProjectToTechnology(technologyId, projectId);
}

async function queryTechnologies(name: string): Promise<DocumentCollection> {
  try {
    return await technologiesCollection.where('name', '==', name).get();
  } catch (error) {
    throw error;
  }
}

async function addProjectToTechnology(
  technologyId: string,
  projectId: string
): Promise<void> {
  try {
    let document = technologiesCollection.doc(technologyId);
    await document.update({
      projects: admin.firestore.FieldValue.arrayUnion(projectId),
    });
  } catch (error) {
    throw error;
  }
}

async function createTechnology(
  technology: string,
  projectId: string
): Promise<void> {
  let id = technologiesCollection.doc().id;
  return await saveToFirestore({ id, name: technology, projects: [projectId] });
}

async function saveToFirestore(document: Technologies.Document): Promise<void> {
  return technologiesCollection
    .doc(document.id)
    .set(document)
    .then(() => {
      console.log(`Added technology: ${document.name}.`);
      return;
    })
    .catch((err) => {
      throw err;
    });
}

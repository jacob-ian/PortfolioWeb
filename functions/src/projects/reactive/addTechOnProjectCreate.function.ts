import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ProjectDocument } from '@app/services/projects/project';
import { TechnologyDocument } from '@app/services/projects/technology';

admin.initializeApp();
const firestore = admin.firestore();
const technologiesCollection = firestore.collection('technologies');

type DocumentCollection = FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

export const addTechOnProjectCreate = functions.firestore
  .document('projects/{projectId}')
  .onCreate((snap) => {
    let project = <ProjectDocument>snap.data();
    let technologies = project.technologies;
    return updateTechnologiesCollection(technologies);
  });

async function updateTechnologiesCollection(
  technologies: string[]
): Promise<void> {
  try {
    technologies.forEach(
      async (technology) => await upsertTechnology(technology)
    );
  } catch (error) {
    console.error(error);
  }
}

async function upsertTechnology(technology: string): Promise<void> {
  if (await technologyExists(technology)) {
    return;
  }
  return await addTechnology(technology);
}

async function technologyExists(technology: string): Promise<boolean> {
  let docs = await queryTechnologies(technology);
  let exists = !docs.empty;
  return exists;
}

async function queryTechnologies(
  technology: string
): Promise<DocumentCollection> {
  try {
    return await technologiesCollection.where('name', '==', technology).get();
  } catch (error) {
    throw error;
  }
}

async function addTechnology(technology: string): Promise<void> {
  let id = technologiesCollection.doc().id;
  return await saveToFirestore({ id, name: technology });
}

async function saveToFirestore(document: TechnologyDocument): Promise<void> {
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

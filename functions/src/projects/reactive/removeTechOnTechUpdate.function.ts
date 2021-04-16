import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Technologies } from '@shared/projects';

const firestore = admin.firestore();
const technologies = firestore.collection('technologies');

let technology: Technologies.Document;
let projects: string[];

export const removeTechOnTechUpdate = functions.firestore
  .document('/technologies/{technologyId}')
  .onUpdate((change) => {
    technology = <Technologies.Document>change.after.data();
    projects = technology.projects;

    if (technologyHasProjects()) {
      return null;
    }

    console.log(`Removing technology: "${technology.name}".`);
    return deleteTechnology();
  });

function technologyHasProjects(): boolean {
  return projects.length > 0;
}

async function deleteTechnology(): Promise<void> {
  try {
    return technologies
      .doc(technology.id)
      .delete()
      .then(() => {
        return;
      });
  } catch (error) {
    console.error(error);
  }
}

import { initializeApp, getApp, getApps, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceKey = process.env.SERVICE_KEY;

if (!serviceKey) {
  throw new Error(`Firebase service key is missing!`);
}

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(JSON.parse(serviceKey)),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
const adminStorage = getStorage(app);

export { app as adminApp, adminDb, adminStorage };

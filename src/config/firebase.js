import {
  initializeApp, auth as authorization, firestore, storage as firebaseStorage,
} from 'firebase/app';
import { firebaseConfig } from './key';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
import 'firebase/firebase-storage';

initializeApp(firebaseConfig);

export const auth = authorization();
export const db = firestore();
export const storage = firebaseStorage();

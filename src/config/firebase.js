import { initializeApp, auth as authorization, firestore } from 'firebase/app';
import { firebaseConfig } from './key';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';

initializeApp(firebaseConfig);

export const auth = authorization();
export const db = firestore();

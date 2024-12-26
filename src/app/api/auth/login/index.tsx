// when we are calling that function inside a server action
// or a server component it doesn't save the response on the
// local storage of the browser making the onAuthStateChanged
// malfunction as it's not getting any data from the local
// storage of the browser. So this api is not been called
// from the server

import { auth } from "@/lib/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const loginUser = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  const persistenceType = rememberMe
    ? browserLocalPersistence
    : inMemoryPersistence;

  try {
    await setPersistence(auth, persistenceType);
    await createUserWithEmailAndPassword(auth, email, password);

    return { ok: true };
  } catch (error) {
    const err = error as Error;
    if (err.message === "Firebase: Error (auth/email-already-in-use).") {
      // If user already exist, signin
      try {
        await setPersistence(auth, persistenceType);
        const res = await signInWithEmailAndPassword(auth, email, password);

        return { ok: true };
      } catch (createError) {
        const err = createError as Error;

        return { ok: false, errorMessage: err.message };
      }
    } else {
      const err = error as Error;

      return { ok: false, errorMessage: err.message };
    }
  }
};

import FirebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

// Initialize Firebase
initializeApp(FirebaseConfig);

const auth = getAuth();

// const getMoviesFromFirebase = () => {
//   return new Promise((resole, reject) => {
//     const showMovies = httpsCallable(functions, "showMovies");
//     showMovies()
//       .then((result) => {
//         const data = result.data;

//         resole(data);
//       })
//       .catch((error) => {
//         // Getting the Error details.
//         const errorStack = {
//           errorCode: error.code,
//           errorMessage: error.message,
//           details: error.details,
//         };

//         resole(errorStack);
//         // ...
//       });
//   });
// };

const defaultSignup = (email, password) => {
  return new Promise((resolve, reject) => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve(user);
        // ...
      })
      .catch((error) => {
        const errorStack = {
          errorCode: error.code,
          errorMessage: error.message,
        };
        resolve(errorStack);
        // ..
      });
  });
};

const defaultLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve(user);
        // ...
      })
      .catch((error) => {
        const errorStack = {
          errorCode: error.code,
          errorMessage: error.message,
        };
        resolve(errorStack);
      });
  });
};

export { defaultSignup, defaultLogin };

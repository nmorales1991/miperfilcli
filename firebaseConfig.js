import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCu39u0Pj5_KkAwjPEtjBnepO5iNUqPWAc",
    authDomain: "mi-perfil-cli.firebaseapp.com",
    databaseURL: "https://mi-perfil-cli.firebaseio.com",
    projectId: "mi-perfil-cli",
    storageBucket: "mi-perfil-cli.appspot.com",
    messagingSenderId: "307313823710",
    appId: "1:307313823710:web:f5918c5332b1f865f7174f",
    measurementId: "G-ZYWTLFTW8E"
});

export default app;
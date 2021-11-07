//import * as firebase from 'firebase/app';
import firebase from 'firebase/app';

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
    apiKey: "AIzaSyDXILa0utqv4Q8BoFDk0hbrORG-DzTcPmw",
    authDomain: "sparta-myhoneytip-heejoon.firebaseapp.com",
    projectId: "sparta-myhoneytip-heejoon",
    storageBucket: "sparta-myhoneytip-heejoon.appspot.com",
    messagingSenderId: "132998985237",
    appId: "1:132998985237:web:b1ee92ec91dfff90dc801c",
    measurementId: "G-CJHCF6J2FV"
};

//사용 방법입니다. 
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()
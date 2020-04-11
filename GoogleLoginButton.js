import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import * as firebase from 'firebase/app';
import app from './firebaseConfig';

const GoogleLoginButton = ({user}) => {
  
  const signIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '307313823710-feparl8hmca20a4c2s0jfur5olt7u76o.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.getTokens();

      const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      app.auth().signOut()
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      {user !== null ? (
        <Button title="Cerrar Sesión" onPress={() => signOut()} />
      ) : (
        <Button title="Inicia Sesión" onPress={() => signIn()} />
      )}
    </View>
  );
};

export default GoogleLoginButton;

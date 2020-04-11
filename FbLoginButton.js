import React , {useEffect, useState} from 'react';
import { View,Button,Text } from 'react-native';
import { AccessToken , LoginManager} from 'react-native-fbsdk';
import * as firebase from "firebase/app";
import app from "./firebaseConfig";

const FbLoginButton = ({user}) => {
  
  const loginWithFacebook = async () => {

    const result = await LoginManager.logInWithPermissions(["public_profile"]);

    AccessToken.getCurrentAccessToken().then(data => {
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          firebase.auth().signInWithCredential(credential).catch((error) => { console.log(error); });
    })

};
    return (
      <View>
        {
          user!==null?<Button title="Cerrar Sesión" onPress={() => app.auth().signOut()} />:<Button title="Inicia Sesión" onPress={()=>loginWithFacebook()} />
        }
      
      </View>
    );
  
};
export default FbLoginButton
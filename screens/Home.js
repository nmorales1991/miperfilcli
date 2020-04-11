import React, {useContext} from 'react';
import {View} from 'react-native';

import {Button, Text} from 'native-base';

import app from '../firebaseConfig';
import {Context} from '../context/Context';
import {GoogleSignin} from '@react-native-community/google-signin';

const Home = () => {
  const {provider} = useContext(Context);
  const logOut = async () => {
    try {
      if (provider === 'google.com') {
        GoogleSignin.configure({
            webClientId:
              '307313823710-feparl8hmca20a4c2s0jfur5olt7u76o.apps.googleusercontent.com',
          });
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }

      app.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Text>Home</Text>
      <Button rounded onPress={() => logOut()}>
        <Text>Cerrar Sesión</Text>
      </Button>
    </View>
  );
};

export default Home;

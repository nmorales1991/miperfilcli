import React, {useState, useEffect} from 'react';

import {View, Text, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
//imports
import Navigation from './navigation/Navigation';

import {Context} from './context/Context';

import app from './firebaseConfig';
import {StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

function App() {
  const [usuario, setusuario] = useState(null);
  const [provider, setprovider] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
    app.auth().onAuthStateChanged(function (user) {
      setusuario(user);
      if (user !== null) {
        setprovider(app.auth().currentUser.providerData[0].providerId);
      }
    });
  }, []);

  return (
    <StyleProvider style={getTheme(platform)}>
      <Context.Provider value={{usuario, provider}}>
      <StatusBar barStyle="light-content" backgroundColor='#0AC4BA' />
        <Navigation />
      </Context.Provider>
    </StyleProvider>
  );
}

export default App;

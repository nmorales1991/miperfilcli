import React,{ useState } from "react";
import { View } from "react-native";

import { Text, Form, Input, Item, Button, Label } from "native-base";

import { FacebookSocialButton, GoogleSocialButton } from "react-native-social-buttons";
import { AccessToken , LoginManager} from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';


import * as firebase from "firebase/app";

import app from "../firebaseConfig";

const LoginForm = ({setregister}) => {
    const [nombre, setnombre] = useState("");
    const [clave, setclave] = useState("");
    const [error, seterror] = useState(false);
    const [cargando, setcargando] = useState(false);

    const loginUser = async () => {
        setcargando(true);
        await app
            .auth()
            .signInWithEmailAndPassword(nombre, clave)
            .then((result) => {
                setnombre("");
                setclave("");
            })
            .catch((error) => {
                console.log(error);
                seterror(error.message);
            });
        setcargando(false);
    };

    const loginWithFacebook = async () => {

        const result = await LoginManager.logInWithPermissions(["public_profile"]);
    
        AccessToken.getCurrentAccessToken().then(data => {
              const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
              firebase.auth().signInWithCredential(credential).catch((error) => { console.log(error); });
        })
    
    };

    const loginWithGoogle = async () => {
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

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                paddingRight: 30,
                paddingLeft: 30,
            }}
        >
            <Text style={{ color: "#C5CCD6", fontSize: 18, marginBottom: 25 }}>
                Inicia sesión con tu correo
            </Text>
            <Item floatingLabel style={{ marginBottom: 10 }}>
                <Label>Correo</Label>
                <Input
                    name="nombre"
                    value={nombre}
                    onChangeText={(text) => setnombre(text)}
                />
            </Item>
            <Item floatingLabel style={{ marginBottom: 20 }}>
                <Label>Clave</Label>
                <Input
                    secureTextEntry={true}
                    name="clave"
                    value={clave}
                    onChangeText={(text) => setclave(text)}
                />
            </Item>
            <Button
                style={{ marginBottom: 20 }}
                primary
                rounded
                block
                onPress={() => loginUser()}
            >
                <Text>Inicia Sesión</Text>
            </Button>
            {error && (
                <Text style={{ color: "#cd0000d9", marginBottom: 5 }}>
                    {error}
                </Text>
            )}
            <View
                style={{
                    borderColor: "#C5CCD6",
                    width: "100%",
                    borderBottomWidth: 1,
                }}
            />
            <Text
                style={{
                    color: "#C5CCD6",
                    fontSize: 18,
                    marginBottom: 25,
                    marginTop: 20,
                }}
            >
                O con tu red social favorita
            </Text>
            <FacebookSocialButton
                onPress={() => loginWithFacebook()}
                buttonViewStyle={{ width: "100%", marginBottom: 10 }}
            />
            <GoogleSocialButton
                onPress={() => loginWithGoogle()}
                buttonViewStyle={{
                    width: "100%",
                    marginBottom: 30,
                    borderColor: "black",
                }}
            />
            <Text style={{ fontSize: 13, color: "#6d6d6d" }}>
                ¿No tienes cuenta?{" "}
                <Text
                    style={{
                        fontSize: 13,
                        color: "#2336a4b5",
                        fontWeight: "bold",
                    }}
                    onPress={()=>setregister(true)}
                >
                    Registrate acá
                </Text>
            </Text>
        </View>
    );
};

export default LoginForm;

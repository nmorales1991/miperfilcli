import React,{ useState } from "react";
import { View } from "react-native";

import { Text, Form, Input, Item, Button, Label } from "native-base";

import app from "../firebaseConfig";

const SignupForm = ({setregister}) => {
    const [nombre, setnombre] = useState("");
    const [clave, setclave] = useState("");
    const [error, seterror] = useState(false);

    const signUp = async () => {
        await app
            .auth()
            .createUserWithEmailAndPassword(nombre, clave)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                seterror(error.message);
            });
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
                Regístrate con tu correo
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
                onPress={() => signUp()}
            >
                <Text>Regístrate</Text>
            </Button>
            {error && (
                <Text style={{ color: "#cd0000d9", marginBottom: 5 }}>
                    {error}
                </Text>
            )}
            <Text style={{ fontSize: 13, color: "#6d6d6d" }}>
                ¿Ya tienes una cuenta?{" "}
                <Text
                    style={{
                        fontSize: 13,
                        color: "#2336a4b5",
                        fontWeight: "bold",
                    }}
                    onPress={()=>setregister(false)}
                >
                    Inicia sesión acá
                </Text>
            </Text>
        </View>
    );
};

export default SignupForm;

import React, { useContext } from "react";
import { Image } from "react-native";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Login from "../screens/Login";
import Home from "../screens/Home";
import Welcome from "../screens/Welcome";

import { Context } from "../context/Context";

const Stack = createStackNavigator();

const Navigation = () => {
    const { usuario } = useContext(Context);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        height: 100,
                        backgroundColor: "white",
                        borderBottomColor: "transparent",
                        elevation: 0,
                    },
                    headerBackImage: () => (
                        <Image source={require("../assets/icons/back.png")} />
                    ),
                    //headerBackTitle: null,
                    headerTitle: null,
                    headerLeftContainerStyle: {
                        alignItems: "center",
                        marginLeft: 10,
                        paddingRight: 16,
                    },
                    headerRightContainerStyle: {
                        alignItems: "center",
                        paddingRight: 16,
                    },
                    gestureDirection: "horizontal",
                }}
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                {usuario == null ? (
                    <Stack.Screen name="Login" component={Login} />
                ) : (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;

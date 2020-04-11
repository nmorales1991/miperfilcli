import React, { useState } from "react";

import { View } from "react-native";

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const Login = () => {
    const [register, setregister] = useState(false)
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {!register?<LoginForm setregister={setregister}/>:<SignupForm setregister={setregister}/>}
        </View>
    );
};

export default Login;

import React, {useContext} from "react";
import {
    View,
    FlatList,
    Image,
    Animated,
    StyleSheet,
    Dimensions,
} from "react-native";


import { Button,Text,Container } from 'native-base';
import {Context} from '../context/Context'
import app from '../firebaseConfig'

const illustrations = [
    { id: 1, source: require("../assets/images/illustration_1.png") },
    { id: 2, source: require("../assets/images/illustration_2.png") },
    { id: 3, source: require("../assets/images/illustration_3.png") }
];
const Welcome = ({ navigation }) => {
    const { width, height } = Dimensions.get("window");
    const scrollX = new Animated.Value(0);
    const {usuario,provider} = useContext(Context)
    const renderIlustraciones = () => {
        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                data={illustrations}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => (
                    <Image
                        source={item.source}
                        resizeMode="contain"
                        style={{
                            width,
                            height: height / 2,
                            overflow: "visible"
                        }}
                    />
                )}
                onScroll={Animated.event([
                    {
                        nativeEvent: { contentOffset: { x: scrollX } }
                    }
                ])}
            />
        );
    };

    const renderSteps = () => {
        const stepPosition = Animated.divide(scrollX, width);
        return (
            <View style={styles.stepsContainer}>
                {illustrations.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: "clamp"
                    });
                      return <Animated.View 
                                key={`step-${index}`} 
                                style={[styles.steps,{opacity}]} />;
                })}
            </View>
        );
    };

    return (
        <Container style={{ flex: 1 }}>
            <View style={styles.center}>
                <Text style={styles.textCenter}>
                    Bienvenido a
                    <Text style={styles.textPrimary}> KukyAPP.</Text>
                </Text>
                <Text style={styles.subTitle}>{usuario==null?'Inicia sesión para empezar':`${usuario.displayName}`}.</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                {renderIlustraciones()}
                {renderSteps()}
            </View>
            <View style={styles.viewButton}>
                {
                    usuario==null?
                    <Button rounded onPress={() => navigation.navigate('Login')}><Text>Iniciar Sesión</Text></Button>:
                    <Button rounded onPress={() => navigation.navigate('Home')}><Text>Skip</Text></Button>
                }
            </View>
        </Container>
    );
};

export default Welcome;
const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 0.4
        //marginTop: 30
    },
    textCenter: {
        fontSize: 26,
        textAlign: "center",
        fontWeight: "bold"
    },
    textPrimary: {
        fontSize: 26,
        color: "#0AC4BA"
    },
    subTitle: {
        fontSize: 18,
        color: "#C5CCD6",
        marginTop: 25 / 2
    },
    stepsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 40,
        right: 0,
        left: 0
    },
    steps: {
        flex: 0,
        backgroundColor: "#9DA3B4",
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
    },
    viewButton:{
        justifyContent: "center",
        flex:0.5,
        margin:0,
        alignItems:'center'
    }
});

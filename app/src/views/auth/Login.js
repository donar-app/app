import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { getAllDonaciones } from '../../api/publicaciones';
// import {InputLabel} from '../../components/InputLabel';
import PublicacionCompleta from '../../components/PublicacionCompleta';
const Stack = createStackNavigator();

const LoginView = (navigation, setPublicacion) => {
    return (
            <ScrollView style={ StyleSheet.container }>
                <SafeAreaView>
                       <TextInput style={styles.textInput} placeholder={'E-Mail'} autoCompleteType={'email'} autoCapitalize={'none'}/>
                       <TextInput style={styles.textInput} placeholder={'Password'} secureTextEntry={true} autoCapitalize={'none'} autoCompleteType={'password'}/>
                       <TouchableOpacity style={styles.button} >
                           <Text style={styles.textButton}>Ingresar</Text>
                       </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    textInput: {
        fontSize: 24,
        backgroundColor: 'white',
        padding: 15,
        marginTop: 25,
    },
    button: {
        margin: 20,

    },
    textButton: {
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#f1f1f1',
    }
});

const Login = ({ navigation }) => {

    return (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={() => LoginView()} />
        </Stack.Navigator>
    );
};

export default Login;
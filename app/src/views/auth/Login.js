import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { getAllDonaciones } from '../../api/publicaciones';
import { postIngreso, checkLogin } from '../../api/auth'
import PublicacionCompleta from '../../components/PublicacionCompleta';
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-community/async-storage';


const LoginView = (navigation, setPublicacion) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const [authorization, setAuthorization] = useState(null);
    useEffect(() => {
        const getData = async () => {
            const authorization = await AsyncStorage.getItem('authorization');
            setAuthorization(authorization);
            
            const verificarLogin = await checkLogin();
            
            if( verificarLogin.error ) {
                console.log({verificarLogin});
            }

            // navigate to dashboard
            alert('Está logeado');
        }
        getData();
        return () => {
            authorization
        };
    }, []);

    const handleIngresar = async () => {
        const response = await postIngreso({ email, password });

        console.log({response});
        if(response.error) {
            alert(response.mensaje);
        } else {
            alert('Ingreso Satisfactorio!');
            const { authorization } = response;

            try {
                await AsyncStorage.setItem('authorization', authorization)
            } catch (e) {
                console.error('Error al guardar authorization en el Storage')
            }
        }

    }

    return (
            <ScrollView style={ StyleSheet.container }>
                <SafeAreaView>
                       <TextInput style={styles.textInput} 
                            placeholder={'E-Mail'} 
                            autoCompleteType={'email'}
                            autoCapitalize={'none'} 
                            value={email}
                            onChange={e => setEmail( e.nativeEvent.text ) } />

                       <TextInput style={styles.textInput} 
                            placeholder={'Password'} 
                            secureTextEntry={true} 
                            autoCapitalize={'none'}
                            autoCompleteType={'password'}
                            value={password}
                            onChange={e => {setPassword( e.nativeEvent.text )} } />
                       <TouchableOpacity style={styles.button} onPress={ handleIngresar }>
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
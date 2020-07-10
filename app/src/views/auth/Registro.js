import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { getAllDonaciones } from '../../api/publicaciones';
import { postRegistro } from '../../api/auth'
import PublicacionCompleta from '../../components/PublicacionCompleta';
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-community/async-storage';


const RegistroView = (navigation, setPublicacion) => {
    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const [alias, setAlias] = useState(null);
    const [correo, setCorreo] = useState(null);
    const [clave, setClave] = useState(null);
    const [repetirClave, setRepetirClave] = useState(null);
    const [pais, setPais] = useState(null);
    const [ciudad, setCiudad] = useState(null);

    const handleRegistrarse = async () => {
        try {
            const response = await postRegistro({ 
                obj_usuario: {
                    nombre, 
                    apellido,
                    alias,
                    correo,
                    clave,
                    pais,
                    ciudad,
                }
            });
            
            if(response.error) {
                alert(response.mensaje);
            } else {
                alert('Registro Satisfactorio!');
            }
        } catch (error) {
            alert(error.mensaje);
        }


    }

    return (
            <ScrollView style={ StyleSheet.container }>
                <SafeAreaView>
                       <TextInput style={styles.textInput} 
                            placeholder={'Nombre'}
                            value={nombre}
                            minLength={3}
                            maxLength={50}
                            onChange={e => {setNombre( e.nativeEvent.text )} } />

                       <TextInput style={styles.textInput} 
                            placeholder={'Apellido'}
                            value={apellido}
                            minLength={3}
                            maxLength={50}
                            onChange={e => {setApellido( e.nativeEvent.text )} } />

                       <TextInput style={styles.textInput} 
                            placeholder={'E-Mail'} 
                            autoCompleteType={'email'}
                            autoCapitalize={'none'} 
                            value={correo}
                            minLength={3}
                            maxLength={50}
                            onChange={e => setCorreo( e.nativeEvent.text ) } />

                       <TextInput style={styles.textInput} 
                            placeholder={'Alias'} 
                            autoCapitalize={'none'}
                            value={alias}
                            minLength={3}
                            maxLength={50}
                            onChange={e => {setAlias( e.nativeEvent.text )} } />

                       <TextInput style={styles.textInput} 
                            placeholder={'Pais'} 
                            autoCapitalize={'none'}
                            value={pais}
                            minLength={1}
                            maxLength={5}
                            onChange={e => {setPais( e.nativeEvent.text )} } />

                       <TextInput style={styles.textInput} 
                            placeholder={'Ciudad'} 
                            autoCapitalize={'none'}
                            value={ciudad}
                            minLength={3}
                            maxLength={50}
                            onChange={e => {setCiudad( e.nativeEvent.text )} } />

                       <TextInput style={styles.textInput} 
                            placeholder={'Contraseña'} 
                            secureTextEntry={true} 
                            autoCapitalize={'none'}
                            autoCompleteType={'password'}
                            value={clave}
                            onChange={e => {setClave( e.nativeEvent.text )} } />

                       <TextInput style={styles.textInput} 
                            placeholder={'Repetir Contraseña'} 
                            secureTextEntry={true} 
                            autoCapitalize={'none'}
                            autoCompleteType={'password'}
                            value={repetirClave}
                            onChange={e => {setRepetirClave( e.nativeEvent.text )} } />
                       <TouchableOpacity style={styles.button} onPress={ handleRegistrarse }>
                           <Text style={styles.textButton}>Registrarse</Text>
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

const Registro = ({ navigation }) => {

    return (
        <Stack.Navigator>
          <Stack.Screen name="Registro" component={RegistroView} />
        </Stack.Navigator>
    );
};

export default Registro;
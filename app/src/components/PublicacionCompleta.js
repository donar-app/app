import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Dimensions } from "react-native";
import { APIURL } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { checkLogin } from '../api/auth'
import { postPeticiones } from '../api/peticiones'
import { postPreguntas } from '../api/preguntas'

const PublicacionCompleta =  ({ publicacion, navigation }) => {
    const handleButton = async () => {
        try {
            const verificarLogin = await checkLogin();
            
            if( verificarLogin.error ) {
                alert('Inicie sesión de para continuar');
                navigation.navigate('Login');
            }

            console.log('DEspues de verificar login');
            const peticion = await postPeticiones({publicacionId: publicacion._id});
            // console({peticion});
            
        } catch (e) {
            console.error({e});
        }
    }

    const [preguntaValue, setPregunta] = useState(null);

    const handlePreguntar = async () => {
        // Verificar pregunta
        try {
            const verificarLogin = await checkLogin();
            
            if( verificarLogin.error ) {
                alert('Inicie sesión de para continuar');
                navigation.navigate('Login');
            }
            const pregunta = await postPreguntas({publicacionId: publicacion._id, pregunta: preguntaValue});
            console.log({pregunta});
            
        } catch (e) {
            console.error({e});
        }
    }

    return (
        <ScrollView>
            <View key={`view-${ publicacion._id }`} style={ Styles.contenedor }>
                <View key={`view-${ publicacion._id }`} style={ Styles.contenedorPublicacion }>
                    <Text key={`titulo-${ publicacion._id }`} style={ Styles.titulo }>{publicacion.titulo}</Text>
                    <Image source={{uri: APIURL + 'uploads/' + publicacion.imagen }} style={ Styles.imagen }/>
                    <Text key={`descripcion-${ publicacion._id }`} style={ Styles.descripcion }>{publicacion.descripcion}</Text>
                    <View key={`iconos-${ publicacion._id }`} style={ Styles.iconos }>
                        <View key={'icono-peticiones'} style={ Styles.icono }>
                            <Text>{publicacion.peticiones.length}</Text>
                            <Ionicons name={'ios-person-add'} size={20} color={'black'} />
                        </View>
                        <View key={'icono-preguntas'} style={ Styles.icono }>
                            <Text>{publicacion.preguntas.length}</Text>
                            <Ionicons name={'ios-chatbubbles'} size={20} color={'black'} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity key={`ver-${ publicacion._id }`} style={ Styles.buttonVer } onPress={handleButton}>
                    <Text style={ Styles.textButtonVer }>{`${ publicacion.tipo === 'Donación' ? 'Solicitar' : 'Donar' }`}</Text>
                </TouchableOpacity>
            </View>
            <View style={ Styles.contenedorPreguntas }>
                <Text style={ Styles.tituloPreguntas }>Preguntas</Text>
                <View style={ Styles.contenedorPreguntar }>
                    <TextInput style={ Styles.inputPreguntar } value={preguntaValue} onChange={(e) => setPregunta(e.nativeEvent.text)} placeholder='Preguntar..' />
                    <TouchableOpacity>
                        <Text style={ Styles.buttonPreguntar } onPress={handlePreguntar}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Styles = StyleSheet.create({
    tituloPreguntas: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
    },
    contenedorPreguntas: {
        padding: 20,
    },
    inputPreguntar: {
        width: WIDTH * 0.7,
        margin: 'auto',
        borderBottomColor: '#999',
        borderBottomWidth: 1,
    },
    contenedorPreguntar: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
    },
    buttonPreguntar: {
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 0.5,
        padding: 3,
    },
    imagen: {
      padding: 24,
      borderRadius: 5,
      backgroundColor: "#eaeaea",
      width: '100%',
      height: HEIGHT * 0.4,
      marginTop: 15,
    },
    contenedorPublicacion: {
        flex: 1,
    },
    contenedor: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#f1f1f1",
        backgroundColor: "white",
        borderRadius: 5,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5,
        height: HEIGHT * 0.7,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
    },
    contenido: {
        paddingLeft: 10,
    },
    descripcion: {
        flex: 1,
        borderBottomColor: '#999999',
        borderBottomWidth: 1,
        padding: 15,
    },
    textButtonVer: {
        color: '#999',
        textAlign: 'center',
        marginBottom: 10,
    },
    iconos: {
        flex: 1,
        flexDirection: 'row',
    },
    icono: {
        marginLeft: '30%',
    }
});

export default PublicacionCompleta;
import React from "react";
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Dimensions } from "react-native";
import { APIURL } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PublicacionSlideCuadrado = ({ publicacion, handleOnPress }) => 
    <View key={`view-${ publicacion._id }`} style={ Styles.contenedor }>
        <View key={`view-${ publicacion._id }`} style={ Styles.contenedorPublicacion }>
            <Image source={{uri: APIURL + 'uploads/' + publicacion.imagen }} style={ Styles.imagen }/>
            <Text key={`titulo-${ publicacion._id }`} style={ Styles.titulo }>{publicacion.titulo}</Text>
            <View key={`iconos-${ publicacion._id }`} style={ Styles.iconos }>
                <View key={'icono-peticiones'} style={ Styles.icono }>
                    <Text>
                        <Ionicons name={'ios-person-add'} style={Styles.icon} />
                        {publicacion.peticiones.length}
                    </Text>
                </View>
                <View key={'icono-preguntas'} style={ Styles.icono }>
                    <Text>
                        <Ionicons name={'ios-chatbubbles'} style={ Styles.icon } />
                        {publicacion.preguntas.length}
                    </Text>
                </View>
            </View>
        </View>
        <TouchableOpacity key={`ver-${ publicacion._id }`} style={ Styles.buttonVer } onPress={handleOnPress}>
            <Text style={ Styles.textButtonVer }>{`Ver ${ publicacion.tipo }`}</Text>
        </TouchableOpacity>
    </View>;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Styles = StyleSheet.create({
    imagen: {
      width: WIDTH / 2,
      height: 100,
      borderRadius: 5,
      backgroundColor: "#eaeaea",
    },
    contenedorPublicacion: {
        flex: 1,
        padding: 20,
        width: "100%",
    },
    contenedor: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#f1f1f1",
        backgroundColor: "white",
        borderRadius: 5,
        margin: 10,
    },
    titulo: {
        fontSize: 18,
        flex: 1,
    },
    contenido: {
        paddingLeft: 10,
        width: "60%",
    },
    descripcion: {
        flex: 1,
        borderBottomColor: '#999999',
        borderBottomWidth: 1,
    },
    textButtonVer: {
        color: '#999',
        textAlign: 'center',
        marginBottom: 10,
    },
    iconos: {
      width: WIDTH,
      flex: 1,
      flexDirection: 'row'
    },
    icono: {
        textAlign: "center",
        width: WIDTH / 2,
    },
    icon: {
        color: 'black',
        fontSize: 20,
    }
});

export default PublicacionSlideCuadrado;
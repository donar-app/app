import React from "react";
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { APIURL } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Publicacion = ({ publicacion }) => 
    <View key={`view-${ publicacion._id }`} style={ Styles.contenedor }>
        <View key={`view-${ publicacion._id }`} style={ Styles.contenedorPublicacion }>
            <Image source={{uri: APIURL + 'uploads/' + publicacion.imagen }} style={ Styles.imagen }/>
            <View key={`contenido-${ publicacion._id }`} style={ Styles.contenido }>
                <Text key={`titulo-${ publicacion._id }`} style={ Styles.titulo }>{publicacion.titulo}</Text>
                <Text key={`descripcion-${ publicacion._id }`} style={ Styles.descripcion }>{publicacion.descripcion}</Text>
            </View>
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
        <TouchableOpacity key={`ver-${ publicacion._id }`} style={ Styles.buttonVer }>
            <Text style={ Styles.textButtonVer }>{`Ver ${ publicacion.tipo }`}</Text>
        </TouchableOpacity>
    </View>;

const Styles = StyleSheet.create({
    imagen: {
      padding: 24,
      width: 100,
      height: 100,
      borderRadius: 5,
      backgroundColor: "#eaeaea",
      width: "30%",
    },
    contenedorPublicacion: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        width: "100%",
    },
    contenedor: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#f1f1f1",
        backgroundColor: "white",
        borderRadius: 5,
        margin: 20,
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
      width: "10%",
    },
    icono: {
        textAlign: "center",
    }
});

export default Publicacion;
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Text, SafeAreaView, View, Dimensions } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { getAllDonaciones } from '../../api/publicaciones';
import PublicacionSlideCuadrado from '../../components/PublicacionSlideCuadrado';
import SliderPublicaciones from '../../components/SliderPublicaciones';
import PublicacionCompleta from '../../components/PublicacionCompleta';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import { scrollInterpolator, animatedStyles } from '../../utils/animation';


const Stack = createStackNavigator();

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollHorizontal: {
        flex: 1,
        flexDirection: 'row',
        height: '35%',
    },
    headerSlider: {
        flex: 1,
        flexDirection: 'row',
    },
    titulo: {
        width: '50%',
    },
    todasContenedor: {
        width: '50%',
    },
    todasTexto: {
        textAlign: 'right',
    },
    contenedorSlider: {
        flex: 1,
        height: '30%'
    }
});


const DonacionesView = (navigation, setPublicacion) => {
    const [publicaciones, setPublicaciones] = useState([]);
    useEffect(() => {
        async function fetchData() {
          setPublicaciones( await getAllDonaciones() );
        }
        fetchData();
      }, []);

      return (<ScrollView>
        <SliderPublicaciones publicaciones={publicaciones} titulo={'Mis Donaciones'} setPublicacion={setPublicacion} navigation={navigation}/>
        <SliderPublicaciones publicaciones={publicaciones} titulo={'Mis Peticiones de Donaciones'} setPublicacion={setPublicacion} navigation={navigation}/>
        <SliderPublicaciones publicaciones={publicaciones} titulo={'Donaciones en curso'} setPublicacion={setPublicacion} navigation={navigation}/>
      </ScrollView>);
};

const Donaciones = ({ navigation }) => {
    const [publicacion, setPublicacion] = useState({
        _id:'',
        peticiones: [],
        preguntas: []
    });

    const donacionesComponent = () => DonacionesView(navigation, setPublicacion);
    const publicacionComponent = () => PublicacionCompleta({publicacion});

    return (
        <Stack.Navigator>
          <Stack.Screen name="Donaciones" component={donacionesComponent} />
          <Stack.Screen name="Publicacion" component={publicacionComponent}/>
        </Stack.Navigator>
    );
};

export default Donaciones;
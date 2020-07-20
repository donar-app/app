
import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Dimensions } from "react-native";
import PublicacionSlideCuadrado from '../components/PublicacionSlideCuadrado';
import Carousel from 'react-native-snap-carousel';

import { scrollInterpolator, animatedStyles } from '../utils/animation';


const handleOnPress = ({publicacion, setPublicacion, navigation, navigateTo}) => {
    setPublicacion(publicacion);
    console.log({publicacion});
    navigation.navigate(navigateTo);
}


const _renderItem = ({item, index, setPublicacion, navigation, navigateTo}) => {
    return (
        <PublicacionSlideCuadrado publicacion={item} key={index} handleOnPress={() => { handleOnPress({publicacion: item, setPublicacion, navigation, navigateTo}) }} />
    );
}

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const SlideStyles = StyleSheet.create({
    texto: {
        width: SLIDER_WIDTH /2, 
        height: 25, 
    },
    titulo: {
        flex: 1, 
        flexDirection: 'row',
        padding: 10
    },
    textoBoton: {
        textAlign: 'right',
        marginRight: 20.
    },
    textoTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollView: {
        marginTop: 5,
    }
});

const SliderPublicacionesView = ({publicaciones, setPublicacion, navigation, navigateTo}) => {

    
    const [index, setIndex] = useState(0);
    return (
        <Carousel
      data={publicaciones}
      renderItem={({item, index}) => _renderItem({item, index, setPublicacion, navigation, navigateTo}) }
      sliderWidth={SLIDER_WIDTH}
      itemWidth={ITEM_WIDTH}
    //   containerCustomStyle={styles.carouselContainer}
      loop={true}
      layout={'stack'}
      layoutCardOffset={10}
      inactiveSlideShift={0}
      onSnapToItem={(index) => setIndex( index )}
      scrollInterpolator={scrollInterpolator}
      slideInterpolatedStyle={animatedStyles}
      useScrollView={true}          
    />
    )
}

const SliderPublicaciones = ({publicaciones, titulo, verTodas='Ver Todas', setPublicacion, navigation, navigateTo}) => (
    <View>
        <View style={SlideStyles.titulo}>
            <View style={SlideStyles.texto}><Text style={SlideStyles.textoTitulo}>{titulo}</Text></View>
            <View style={SlideStyles.texto}><TouchableOpacity><Text style={SlideStyles.textoBoton}>{verTodas}</Text></TouchableOpacity></View>
        </View>
        <ScrollView style={SlideStyles.scrollView}>
            <SliderPublicacionesView publicaciones={publicaciones} setPublicacion={setPublicacion} navigation={navigation} navigateTo={navigateTo} />
        </ScrollView>
    </View>
);

export default SliderPublicaciones;
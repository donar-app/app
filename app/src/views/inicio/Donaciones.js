import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text,SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { getAllDonaciones } from '../../api/publicaciones';
import Publicacion from '../../components/Publicacion';
import PublicacionCompleta from '../../components/PublicacionCompleta';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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

    const handleOnPress = (publicacion) => {
        setPublicacion(publicacion);
        console.log({publicacion});
        navigation.navigate('Publicacion');
    }

    return (
            <ScrollView style={ StyleSheet.container }>
                <SafeAreaView>
                        {
                            publicaciones && 
                            publicaciones.map( 
                                (publicacion) => {
                                    return <Publicacion publicacion={publicacion} key={publicacion._id} handleOnPress={handleOnPress}/>;
                                }
                            )
                        }
                </SafeAreaView>
            </ScrollView>
        );
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
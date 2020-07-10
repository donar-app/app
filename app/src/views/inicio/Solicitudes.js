import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text,SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { getAllSolicitudes } from '../../api/publicaciones';
import Publicacion from '../../components/Publicacion';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});


const SolicitudesView = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    useEffect(() => {
        async function fetchData() {
          // You can await here
          setPublicaciones( await getAllSolicitudes() );
        }
        fetchData();
      }, []); // Or [] if effect doesn't need props or state

    return (
            <ScrollView style={ StyleSheet.container }>
                <SafeAreaView>
                        {
                            publicaciones && 
                            publicaciones.map( 
                                (publicacion) => {
                                    // return <Text>{publicacion._id}</Text>;
                                    return <Publicacion publicacion={publicacion} key={publicacion._id}/>;
                                }
                            )
                        }
                </SafeAreaView>
            </ScrollView>
        );
};

const Solicitudes = ({ navigation }) => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Solicitudes" component={SolicitudesView} />
        </Stack.Navigator>
    );
};

export default Solicitudes;
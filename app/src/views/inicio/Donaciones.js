import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text,SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { getAllPublicaciones } from '../../api/publicaciones';
import Publicacion from '../../components/Publicacion';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});


const DonacionesView = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    useEffect(() => {
        async function fetchData() {
          // You can await here
          setPublicaciones( await getAllPublicaciones() );
        }
        fetchData();
      }, []); // Or [] if effect doesn't need props or state
      console.log(typeof publicaciones, publicaciones)
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

const Donaciones = ({ navigation }) => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Donaciones" component={DonacionesView} />
        </Stack.Navigator>
    );
};

export default Donaciones;
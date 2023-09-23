import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import Create from '../screens/Create'
import Network from '../screens/network'
import Person from '../screens/Person'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator()

    const ButtonTabs = () => {
        return <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarLabelStyle: { color: 'black' },
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Ionicons name="home" size={24} color="black" />
                        } else {
                            return <Ionicons name="home-outline" size={24} color="black" />
                        }
                    }
                }}
            />
            <Tab.Screen
                name='Create'
                component={Create}
                options={{
                    tabBarLabel: 'Create',
                    headerShown: false,
                    tabBarLabelStyle: { color: 'black' },
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Ionicons name="create" size={24} color="black" />
                        } else {
                            return <Ionicons name="create-outline" size={24} color="black" />
                        }
                    }
                }}
            />
            <Tab.Screen
                name='Network'
                component={Network}
                options={{
                    tabBarLabel: 'Network',
                    headerShown: false,
                    tabBarLabelStyle: { color: 'black' },
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <AntDesign name="heart" size={24} color="black" />
                        } else {
                            return <AntDesign name="hearto" size={24} color="black" />
                        }
                    }
                }}
            />
            <Tab.Screen
                name='Person'
                component={Person}
                options={{
                    tabBarLabel: 'Person',
                    headerShown: false,
                    tabBarLabelStyle: { color: 'black' },
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Ionicons name="person-circle" size={24} color="black" />
                        } else {
                            return <Ionicons name="person-circle-outline" size={24} color="black" />
                        }
                    }
                }}
            />
        </Tab.Navigator>
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Session" component={ButtonTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})
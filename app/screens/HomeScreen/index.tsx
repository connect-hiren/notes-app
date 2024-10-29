import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDo from './Tabs/ToDo';
import Notes from './Tabs/Notes';
import { View, Text } from 'react-native';
import { styles } from './style';

const Tab = createBottomTabNavigator();

const CustomTabBarLabel = ({ focused, title }: any) => {
    return (
        <View style={[styles.tab]}>
            <Text style={[styles.tabLabel, focused ? styles.activeTabLabel : {}]}>{title}</Text>
        </View>
    );
};

const HomeScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarLabel: ({ focused }) => (
                    <CustomTabBarLabel focused={focused} title={route.name} />
                ),
                tabBarIconStyle: { display: "none" },
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen name="ToDo" component={ToDo} />
            <Tab.Screen name="Notes" component={Notes} />
        </Tab.Navigator>
    );
};



export default HomeScreen;

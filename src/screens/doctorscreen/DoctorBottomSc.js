import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import DoctorIcon from 'react-native-vector-icons/Fontisto';
import HistoryIon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/FontAwesome';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Notification from 'react-native-vector-icons/Ionicons';
import Dashboard from './DocDashboardMain';
import {Fonts} from '../../components/style';
import PatientList from '../PatientList';
import DoctorsList from '../DoctorsList';
import DoctorProfile from '../DoctorProfile';
import History from '../DoctorHistory';
// import DoctorHistory from './DoctorHistory';
// import DoctorsList from './DoctorsList';
// import Profile from './Profile';
const Tab = createBottomTabNavigator();

function MyTabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#116754',
        tabBarInactiveTintColor: '#808080',
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: Fonts.REGULAR,
          marginTop: -5,
        },
        headerTitleStyle: {
          fontSize: 25, // Set the desired font size for the header text
          fontFamily: Fonts.BOLD,
          marginLeft: 0,
        },
        headerStyle: {
          borderBottomWidth: 0, // Remove bottom border
          elevation: 0,
          borderColor: 'white',
          backgroundColor: 'white', // Remove box shadow for Android
        },
      })}>
      <Tab.Screen
        name="DoctorDashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Entypo name="home" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Patient"
        component={PatientList}
        options={{
          headerShown: false,
          tabBarLabel: 'Patient',
          tabBarIcon: ({color}) => (
            <DoctorIcon name="person" color={color} size={27} />
          ),
        }}
      />

      <Tab.Screen
        name="DoctorHistory"
        component={History}
        options={{
          headerShown: false,
          tabBarLabel: 'History',
          tabBarIcon: ({color}) => (
            <HistoryIon name="work-history" color={color} size={27} />
          ),
        }}
      />

      <Tab.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{flexDirection: 'row', marginLeft: 13}}
              onPress={() => navigation.navigate('DoctorDashboard')}>
              <BackIcon
                name="arrowleft"
                size={23}
                color="#116754"
                style={{marginRight: 18}}
              />
              <Text style={[styles.backicontext, {marginLeft: -10}]}>
                back
              </Text>
            </TouchableOpacity>
          ),
          title: null,
          headerRight: () => (
            <View style={{flexDirection: 'row', gap: -5, marginRight: 15}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#116754',
                  padding: 10,
                  borderRadius: 50,
                }}
                onPress={() => navigation.navigate('Notification')}>
                <Notification name="notifications" size={15} color={'white'} />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Entypo name="user-circle-o" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  backicontext: {
    color: 'black',
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
  },
});
export default MyTabs;

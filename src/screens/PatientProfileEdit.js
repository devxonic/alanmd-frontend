import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../components/style';
import Input from '../components/common/Input';

const DoctorProfileEdit = ({ native }) => {
  const [counter, setCounter] = useState(3);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : prevCounter));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions(Dimensions.get('window'));
    };

    Dimensions.addEventListener('change', handleResize);
    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <Image
              source={{ uri: 'https://static.vecteezy.com/system/resources/previews/008/957/225/non_2x/female-doctor-avatar-clipart-icon-in-flat-design-vector.jpg' }}
              style={styles.profileImage}
            />
          </View>
        </View>
        <Text style={styles.PatientName}>Patient Name</Text>
        <View style={{width:"100%"}}>
          <Input
          placeholder="UserName"
          textContentType="UserName"
        />
        <Input
          placeholder="Email Address "
          textContentType="Email Address"
        />
      </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#116754' }]} accessibilityLabel="Edit Profile Button">
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#C54B4B' }]} accessibilityLabel="Logout Button" >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3eeeb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%', // Adjusted to take full width
    maxWidth: 400, // Added maxWidth to limit width on larger screens
  },

  PatientName: {
    marginTop: 10,
    fontSize: 20,
    color: '#116754',
    fontFamily: Fonts.MEDIUM,
  },
  imageContainer: {
    position: 'relative',
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: 'hidden',
  },
  imageBorder: {
    flex: 1,
    borderRadius: 90,
    borderColor: '#5B8F6B',
    borderWidth: 1.5,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: 'green',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  profileImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%', // Adjusted to take full width
    justifyContent: 'center', // Center buttons horizontally
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: Fonts.REGULAR,
    fontSize: 14,
  },
  Input:{
    width: '200%',
    height: 100,
  
  }
});

export default DoctorProfileEdit;

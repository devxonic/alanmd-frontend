import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Platform, Modal, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../components/style';
import { getPateintProfile } from '../api/patient';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';



const PatientProfilePage = ({ navigation }) => {

  const isFocused = useIsFocused()
  const [data, setData] = useState({});

  const role = useSelector((state) => state?.user?.Role)
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const handleLogout = () => {
    setTimeout(() => {
      setIsLoggingOut(false);
      navigation.navigate('onboard');
    }, 500);
    setIsLogoutModalVisible(false);
  };



  const fectPatinetProfile = async () => {
    try {
      const response = await getPateintProfile()
      console.log('Doctor Profile Response', response.data)
      setData(response.data)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    console.log('useEffect Doctor PROAWAA')
    fectPatinetProfile()
  }, [role, isFocused])

  const handleCancel = () => {
    // Close the modal
    setIsLogoutModalVisible(false);
  };

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <Image source={{ uri: data.image ?? 'https://static.vecteezy.com/system/resources/previews/008/957/225/non_2x/female-doctor-avatar-clipart-icon-in-flat-design-vector.jpg', cache: 'reload' }} style={styles.profileImage} />
          </View>
        </View>
        <Text style={styles.counterText}>{data.name || "Doctor Name"}</Text>
        <Text style={[styles.counterText, { fontFamily: Fonts.REGULAR, fontSize: 13, marginTop: 4 }]}>{"@" + data.username || "username"}</Text>
        {data.email && <Text style={[styles.counterText, { fontFamily: Fonts.REGULAR, fontSize: 13, marginTop: 4 }]}>{data.email}</Text>}
        <Text style={[styles.counterText, { fontFamily: Fonts.REGULAR, fontSize: 13, marginTop: 4 }]}>{data.location || "Living Healthy, Living Happy!"}</Text>
      </View>
      <View style={styles.counterContainer}>
        <View style={{ padding: 5 }}>
          <Text style={[styles.counterItem, { borderRightWidth: 1, borderColor: '#116754' }]}>130</Text>
          <Text style={styles.textHeadingCounter}>Appointments</Text>
        </View>
        <View style={{ padding: 5 }}>
          <Text style={[styles.counterItem, { borderRightWidth: 1, borderColor: '#116754' }]}>30</Text>
          <Text style={styles.textHeadingCounter}> Completed </Text>
        </View>
        <View style={{ padding: 5 }}>
          <Text style={styles.counterItem}>300</Text>
          <Text style={styles.textHeadingCounter}> Pending </Text>
        </View>
      </View>
      <Modal
        visible={isLogoutModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancel}
        onBackdropPress={handleCancel}
        onBackButtonPress={handleCancel}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.buttonContainer}>


              <TouchableOpacity style={[styles.ButtonTwo, { backgroundColor: '#E7F0EE' }]} onPress={handleCancel}>
                <Text style={[styles.buttonTwoText, { color: 'black' }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ButtonTwo} onPress={handleLogout}>
                <Text style={styles.buttonTwoText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Spinner
          visible={isLoggingOut}
          textContent={'Relojándose...'}
          textStyle={styles.loaderText}
          animation="fade"
          overlayColor="rgba(0, 0, 0, 0.7)"
          color="black"
        />
      </Modal>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#116754' }]} onPress={() => navigation.navigate("PatientProfileEdit", { image: data.image, name: data.name, location: data.location })}>
          <Text style={{ color: 'white', fontFamily: Fonts.REGULAR, fontSize: 14 }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#C54B4B' }]} onPress={showLogoutModal}>
          <Text style={{ color: 'white', fontFamily: Fonts.REGULAR, fontSize: 14 }}>Logout</Text>
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
    justifyContent: 'center'
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textHeadingCounter: {
    fontFamily: Fonts.REGULAR,
    color: '#116754',
    paddingHorizontal: 10
  },
  imageContainer: {
    position: 'relative',
    width: 180, // Adjust width as needed
    height: 180, // Adjust height as needed
    borderRadius: 90, // Half of width and height to make it circular
    overflow: 'hidden', // Clip content to the border
  },
  imageBorder: {
    flex: 1, // Take up all available space
    borderRadius: 90, // Half of width and height to make it circular
    borderColor: '#5B8F6B',
    borderWidth: 1.5,
    overflow: 'hidden', // Clip content to the border
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
    flex: 1, // Take up all available space
    width: undefined, // Use the image's original width
    height: undefined, // Use the image's original height
  },
  counterText: {
    marginTop: 10,
    fontSize: 20,
    color: '#116754',
    fontFamily: Fonts.MEDIUM
  },
  counterContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  counterItem: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30
  },
  button: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  loaderText:{
    color:'green'
  },
  buttonTwoText: {
    color: 'white',
    fontSize: 14,
    fontFamily:Fonts.LIGHT
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    width:'85%'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily:Fonts.MEDIUM,
    color:'black',
    fontSize:16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    gap:20
  },
  ButtonTwo:{
    backgroundColor: '#116754',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
    width:'48%',
    borderWidth:1,
  borderColor:'#116754'
  }
});

export default PatientProfilePage;

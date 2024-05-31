import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../components/style';
import Input from '../components/common/Input';
import ProfileImageUpload from '../components/common/ProfileImageUpload';
import DocumentPicker from 'react-native-document-picker';
import {BASE_URL, uploadFile} from '../api/apihandler';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useSelector} from 'react-redux';
import {updateDoctorProfile} from '../api/doctor';
import {updateNurseProfile} from '../api/nurse';

const DoctorProfileEdit = ({route, navigation}) => {
  const [formData, setFormData] = useState({name: '', image: '', location: ''});

  const role = useSelector(state => state?.user?.Role);

  console.log('FORM DATA', formData, '\n ROLE', role);

  // useEffect(()=> {
  //   const {name,image,location} = route.params
  //   setFormData({name,image,location})
  // },[route.params])

  useEffect(() => {
    setFormData({...route.params});
    console.log("Edit Profile",route.params);
    return () => {
      setFormData({});
    }
  },[]);
  const EditDoctorProfile = async () => {
    try {
      const response = await updateDoctorProfile(formData);
      console.log('RESPONSE', response);
      navigation.goBack();
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const EditNurseProfile = async () => {
    try {
      const response = await updateNurseProfile(formData);
      console.log('RESPONSE', response);
      navigation.goBack();
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const handleUpdate = async () => {
    if (role === 'doctor') {
      EditDoctorProfile();
    } else {
      EditNurseProfile();
    }
  };

  const handleDocumentPicker = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const MediaData = new FormData();
      const selectedFile = doc?.[0];
      const file = {
        // Edit Here
        uri: selectedFile.uri, // Edit Here,
        name: selectedFile.name, // Edit Here, Image Name with Extension very important
        type: selectedFile.type, // Edit Here
      };
      MediaData.append('Media', file);
      MediaData;
      const responce = await uploadFile(MediaData);
      console.log('RESPONSE', responce.data?.url);
      setFormData({...formData, image: BASE_URL + responce?.data?.url});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancel the upload', err);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {/* <View style={styles.imageBorder}>
            <Image
              source={{ uri: 'https://static.vecteezy.com/system/resources/previews/008/957/225/non_2x/female-doctor-avatar-clipart-icon-in-flat-design-vector.jpg' }}
              style={styles.profileImage}
            />
          </View> */}
        <View style={styles.imageContainer}>
          {formData.image?.length ? (
            <Image
              source={{uri: formData.image}}
              style={{width: 200, height: 200}}
            />
          ) : (
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/008/957/225/non_2x/female-doctor-avatar-clipart-icon-in-flat-design-vector.jpg',
                cache: 'reload',
              }}
              style={{width: 200, height: 200}}
            />
          )}
          <View style={styles.uploadBtnContainer}>
            <TouchableOpacity
              onPress={handleDocumentPicker}
              style={styles.uploadBtn}>
              <Icon name="camera-retro" size={25} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <ProfileImageUpload onUploadClick={handleDocumentPicker} image={formData.image}/> */}

        <View style={{width: '100%'}}>
          <Input
            placeholder="Name"
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
          />
          <Input
            placeholder="location"
            value={formData.location}
            onChangeText={text => setFormData({...formData, location: text})}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleUpdate}
          style={[styles.button, {backgroundColor: '#116754'}]}
          accessibilityLabel="Edit Profile Button">
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, {backgroundColor: '#C54B4B'}]}
          accessibilityLabel="Logout Button">
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

  doctorName: {
    marginTop: 10,
    fontSize: 20,
    color: '#116754',
    fontFamily: Fonts.MEDIUM,
  },
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
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
        shadowOffset: {width: 0, height: 4},
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
  Input: {
    width: '200%',
    height: 100,
  },
  //   imageContainer:{
  //     elevation:2,
  //     height:200,
  //     width:200,
  //     backgroundColor:'#efefef',
  //     position:'relative',
  //     borderRadius:999,
  //     overflow:'hidden',
  // },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default DoctorProfileEdit;

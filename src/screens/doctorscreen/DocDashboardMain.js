import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import CarouselDashboard from '../../components/common/CarouselDashboard';
import Header from '../../components/layout/Header';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/common/SearchBar';
import { Fonts } from '../../components/style';
import Button from '../../components/common/Button';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const navigation = useNavigation();
  let data = useSelector((state) => (state.user.Role))
  const handleDoctorCategory = () => {
    navigation.navigate('doctorscategory');
  };

  return (
    <SafeAreaView >
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View style={[styles.main, { backgroundColor: '#e3eeeb' }]}>
        <Header />
        <View style={{ paddingHorizontal: 15, backgroundColor: 'white', paddingBottom: 15 }}>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.carousel}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
              <Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 25, color: 'black' }}>Stats</Text>
              <View style={[styles.counterContainer, { backgroundColor: 'transparent', gap: 10, paddingTop: 0 }]} >
                <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#116754', borderRadius: 4 }}>
                  <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 11, color: 'white' }}>Weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  paddingHorizontal: 15, paddingVertical: 5, backgroundColor: 'transparent', borderRadius: 4, borderWidth: 0.5,
                  borderColor: '#116754',
                }}>
                  <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 11, color: 'black' }}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  paddingHorizontal: 15, paddingVertical: 5, backgroundColor: 'transparent', borderRadius: 4, borderWidth: 0.5,
                  borderColor: '#116754',
                }}>
                  <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 11, color: 'black' }}>Yearly</Text>
                </TouchableOpacity>
              </View>
            </View>


            <View style={[styles.counterContainer, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}>
              <View style={{ padding: 5, }}>
                <Text style={[styles.counterItem, { borderRightWidth: 1, borderColor: '#116754' }]}>130</Text>
                <Text style={styles.textHeadingCounter}>Appointments</Text>
              </View>
              <View style={{ padding: 5, }}>
                <Text style={[styles.counterItem, { borderRightWidth: 1, borderColor: '#116754' }]}>30</Text>
                <Text style={styles.textHeadingCounter}> Completed </Text>
              </View>
              <View style={{ padding: 5, }}>
                <Text style={styles.counterItem}>300</Text>
                <Text style={styles.textHeadingCounter}> Pending </Text>
              </View>

            </View>
            <View style={[styles.counterContainer, { borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: -2, paddingHorizontal: 20, alignItems: 'center', paddingBottom: 15 }]}>
              <View>
                <Text style={[styles.counterItem, { fontSize: 22 }]}>259,000</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Text style={[styles.textHeadingCounter, { paddingTop: 0 }]}> Income </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Image style={{ width: 15, height: 15, objectFit: 'contain' }} source={require('../../images/iconImage.png')} />
                    <Text style={{ fontFamily: Fonts.REGULAR }}> P/L</Text>
                  </View>

                </View>

              </View>
              <View>
                <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#116754', borderRadius: 4 }}>
                  <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 11, color: 'white' }}>Download Statement</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('PatientList')} >
            <View style={styles.thirdchild}>
              <View style={styles.thirdchildOne}>
                <Image style={{ width: 40, height: 40, objectFit: 'contain', marginLeft: 12 }} source={require('../../images/doctor.png')} />
                <Text style={styles.headingMian}>{data === 'nurse'? 'Assigned Appointment' :'Appointment List'}</Text>
                <Text style={styles.textPara}>
                  Lorem Ipsum Dolor Sit Amet , Lorem Ipsum Dolor Sit Amet
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Image style={{ width: '100%', objectFit: 'contain', height: 120, right: 0 }} source={require('../../images/patinet.png')} />
              </View>
            </View>
          </TouchableOpacity>



          <View style={styles.fourthChild}>

          <View style={[styles.fourthChildOne , {width :data == "nurse" ? "100%" : "47%"}]}>
              <TouchableOpacity >
                <View style={{ width: '100%' }}>
                  <Text style={styles.headingMian}>Labs</Text>
                  <Text style={styles.textPara}>
                    Lorem Ipsum Dolor Sit Amet, Lorem Ipsum Dolor Sit Amet
                  </Text>
                </View>
                <View style={styles.fourthChildOneTwo}>
                  <View style={{ width: '50%' }}>
                    <Image style={{ width: '100%', height: 50, objectFit: 'contain', left: -10 }} source={require('../../images/testube.png')} />
                  </View>
                  <View style={{ width: '50%', }}>
                    <Image style={{ width: '100%', height: 120, objectFit: 'contain', right: -10 }} source={require('../../images/hand.png')} />
                  </View>


                </View>
              </TouchableOpacity>
            </View>

           {data !== 'nurse' ? <View style={styles.fourthChildTwo}>
              <View>
                <Text style={styles.headingMian}>Nurses</Text>
                <Text style={styles.textPara}>
                  Lorem Ipsum Dolor Sit Amet, Lorem Ipsum Dolor Sit Amet
                </Text>
              </View>
              <View style={[styles.fourthChildOneTwo, { justifyContent: 'flex-end', width: '100%', marginTop: 10 }]}>
                <Image style={{ width: '100%', height: 120, objectFit: 'contain', bottom: -10, right: -10 }} source={require('../../images/doctorsTwo.png')} />
              </View>
            </View>:null}
          </View>
          {/* <View style={styles.fifthChild}>
          <View style={{width:'10%',flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image style={{width:40,height:40,objectFit:'contain'}} source={require('../../images/report.png')} />
          </View>
          <View style={{width:'60%'}}>
            <Text style={styles.headingMian}>Test Reports</Text>
            <Text style={styles.textPara}>
              Lorem Ipsum Dolor Sit Amet, Lorem Ipsum Dolor Sit Amet
            </Text>
          </View>
          <View style={{width:'30%',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Upload Report</Text>
          </TouchableOpacity>
          </View>
          
        </View> */}
        </ScrollView>
        {/* <Footer /> */}
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textHeadingCounter: {
    fontFamily: Fonts.REGULAR,
    color: '#116754',
    paddingHorizontal: 10
  },
  textPara: {
    fontFamily: Fonts.LIGHT,
    fontSize: 11,
    paddingLeft: 10,
    color: 'white'
  },
  carousel: {
    padding: 15
  },
  headingMian: {
    fontFamily: Fonts.MEDIUM,
    color: 'white',
    fontSize: 20,
    paddingLeft: 10
  },
  main: {
    backgroundColor: '#E7F0EE',
    height: '100%',
  },

  top: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    padding: 5,
  },

  topOne: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topOneOne: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  topOneOneText: {
    fontSize: 10,
    color: '#116754',
    fontWeight: '600',
    marginLeft: 4,
  },

  topOneOneHead: {
    fontSize: 8,
    color: 'black',
    marginLeft: 4,
  },

  thirdchild: {
    // margin: 10,
    padding: 4,
    marginHorizontal: 13,
    borderRadius: 5,
    backgroundColor: '#5B8F6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  thirdchildOne: {
    width: '50%',

  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#160846',
  },
  text: {
    fontSize: 7,
    color: 'white',
  },
  headingRight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#160846',
    textAlign: 'right',
  },
  textRight: {
    fontSize: 7,
    color: 'white',
    textAlign: 'right',
  },
  fourthChild: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  fourthChildOne: {
    backgroundColor: '#D06161',
    padding: 10,
    borderRadius: 5,
    width: '47%',
  },
  fourthChildOneTwo: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fourthChildTwo: {
    backgroundColor: '#69AEE0',
    padding: 10,
    borderRadius: 5,
    width: '50%',
  },
  fifthChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#8A69B5',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',

    justifyContent: 'center',
    padding: 8,
  },
  buttonText: {
    color: '#8A69B5',
    fontSize: 10,
    fontFamily: Fonts.REGULAR
  },
  counterContainer: {
    backgroundColor: 'white',
    flexDirection: 'row', justifyContent: 'space-between',
    paddingTop: 15, borderRadius: 8
  },
  counterItem: {
    marginBottom: 5,
    fontFamily: Fonts.MEDIUM,
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
});
export default Dashboard;

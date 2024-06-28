import {SafeAreaView, View} from 'react-native';
import React from 'react';
import Card from '../components/common/Card';

const DoctorsCategory = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#e3eeeb', flex: 1}}>
      <View style={{height: '100%', backgroundColor: '#e3eee'}}>
        <View
          style={{
            paddingHorizontal: 15,
            backgroundColor: 'white',
            paddingBottom: 15,
            paddingTop: 15,
          }}></View>
        <Card />
      </View>
    </SafeAreaView>
  );
};

export default DoctorsCategory;

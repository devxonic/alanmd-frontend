import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Calendar from 'react-native-vector-icons/FontAwesome5';
// import DateTimePicker from '@react-native-community/datetimepicker';
export default DatePickers = ({ setFormData, formData }) => {
  const [open, setOpen] = useState(false);
  let newDate = new Date();
  let oldDate = new Date(formData?.dateOfBirth?.length > 0 ? formData?.dateOfBirth : null);
  console.log('OLD DATE', oldDate);
  console.log('NEW DATE', newDate);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: '#E7F0EE',
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingVertical: 8,
          fontSize: 13,
          color: 'black',
          // fontFamily: Fonts.LIGHT,
          borderWidth: 0.5,
          borderColor: '#116754',
          textAlign: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => setOpen(true)}>
        <Text style={{ color: 'black' }}>
          {oldDate ? oldDate.getDate() : newDate.getDate()} - {oldDate ? oldDate.getMonth() : newDate.getMonth() + 1} - {oldDate ? oldDate.getFullYear() : newDate.getFullYear()}
        </Text>
        <Text style={{ color: 'black' }}>
          <Calendar name="calendar" size={21} color={'black'} />
        </Text>
      </TouchableOpacity>
      {/* <DateTimePicker
        value={new Date()}
        mode="date"
        // modal
      // date={FormData?.dateOfBirth ?? new Date()}
      // onConfirm={date => {
      //   setOpen(false);
      //   setFormData({ ...formData, dateOfBirth: date });
      // }}
      // onCancel={() => {
      //   setOpen(false);
      // }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingRight: 5,
  },
});
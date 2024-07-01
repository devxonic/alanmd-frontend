import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Calendar from 'react-native-vector-icons/FontAwesome5';
import RNDateTimePicker from '@react-native-community/datetimepicker';
export default DatePickers = ({setFormData, formData}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  let oldDate = new Date(
    formData?.dateOfBirth?.length > 0 ? formData?.dateOfBirth : null,
  );
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
          borderWidth: 0.5,
          borderColor: '#116754',
          textAlign: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => setOpen(true)}>
        <Text style={{color: 'black'}}>
          {date ? date.getDate() : oldDate.getDate()} /{' '}
          {date ? date.getMonth() + 1 : oldDate.getMonth() + 1} /{' '}
          {date ? date.getFullYear() : oldDate.getFullYear()}
        </Text>
        <Text style={{color: 'black'}}>
          <Calendar name="calendar" size={21} color={'black'} />
        </Text>
      </TouchableOpacity>
      {open ? (
        <RNDateTimePicker
          display="default"
          mode="date"
          minimumDate={new Date(1950, 0, 1)}
          maximumDate={new Date()}
          value={date ? date : oldDate}
          onChange={(event, selectedDate) => {
            if (event.type === 'set') {
              const currentDate = selectedDate;
              setOpen(false);
              setDate(currentDate);
              setFormData({
                ...formData,
                dateOfBirth: currentDate,
              });
            } else {
              setOpen(false);
            }
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingRight: 5,
  },
});

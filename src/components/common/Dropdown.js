import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Dropdown = ({
  data,
  formData,
  setFormData,
  width,
  prefix,
  Objkey,
  value,
}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleSelect = item => {
    setSelected(item);
    setVisible(false);
    setFormData({...formData, [`${Objkey}`]: item.value});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item.id}
      style={styles.item}
      onPress={() => handleSelect(item)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.appContainer}>
      <View style={[styles.container, {width: width || '100%'}]}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>
            {selected ? selected.name : prefix}
          </Text>
        </TouchableOpacity>
        {visible && (
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  container: {
    marginVertical: 5,
  },
  dropdown: {
    width: '100%',
    // backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#5b5b5b',
    borderWidth: 2,
    borderColor: '#116754',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#5b5b5b',
  },
  list: {
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 5,
    marginTop: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#116754',
    width: '100%',
    // maxHeight: 200, // Set a maximum height for the dropdown list
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 14,
    color: '#116754',
  },
});

export default Dropdown;

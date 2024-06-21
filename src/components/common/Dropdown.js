import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Fonts} from '../style';

const App = ({data, formData, setFormData, width,prefix}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleSelect = item => {
    setSelected(item);
    setVisible(false);
    setFormData({...formData, categoryId: item._id});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.appContainer}>
      <View style={[styles.container, {width: width}]}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text>{selected ? selected.name : prefix}</Text>
        </TouchableOpacity>
        {visible && (
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    zIndex: 5,
  },
  container: {
    marginTop: 10,
    width: Dimensions.get('window').width - 30,
    height: 420,
  },
  dropdown: {
    backgroundColor: '#e3eeeb',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 11,
    fontSize: 8,
    color: 'black',
    fontFamily: Fonts.LIGHT,
    borderWidth: 0.5,
    borderColor: '#116754',
  },
  list: {
    marginTop: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#116754',
  },
});

export default App;

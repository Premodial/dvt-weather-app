import React from 'react';
import { Modal, View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import GooglePlacesAutocompleteComponent from '../GooglePlacesAutocomplete/GooglePlacesAutocomplete';
import {colorTheme} from '../../../constants';

const SearchModal = ({ isModalVisible, toggleModalVisibility, updateLocation }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <GooglePlacesAutocompleteComponent updateLocation={updateLocation} toggleModalVisibility={toggleModalVisibility}/>
        </SafeAreaView>
        <View style={styles.cancelButtonContainer}>
          <TouchableOpacity onPress={toggleModalVisibility} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cancelButtonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 40,
    backgroundColor: colorTheme.card.background,
    borderRadius: 5,
  },
  cancelButton: {
    padding: 10,
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: colorTheme.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  container:{
    flex: 1,
    backgroundColor: '#121212',
    marginTop: 40 
  }
});

export  {SearchModal};

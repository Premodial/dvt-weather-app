import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ text }) => {
  return <Text>{text}</Text>;
};
// Custom styles incase the company has custom fonts.
const TextStyle = StyleSheet  .create({
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export {CustomText};

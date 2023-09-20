import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colorTheme } from '../../../constants';
const DegreeSymbol = () => (
  <MaterialCommunityIcons name="circle-outline"  style={styles.degreeSymbol} />
);

export { DegreeSymbol };

const styles = StyleSheet.create({
  degreeSymbol: {
    fontSize: 25,
    color: colorTheme.textPrimary,
    paddingLeft: 10,
  },
});

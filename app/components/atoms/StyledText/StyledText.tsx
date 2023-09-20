// Atoms/StyledText.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const StyledText = ({ children, style }) => <Text style={[styles.text, style]}>{children}</Text>;

StyledText.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export  {StyledText};

import React from 'react';
import { Image, StyleSheet } from 'react-native';
interface IconProps {
  path: any;
}

const Icon: React.FC<IconProps> = ({ path }) => (<Image source={path} style={styles.iconStyle} />);

const styles = StyleSheet.create({
  iconStyle: {
    width: 30,
    height: 30,
  },
});

export  {Icon};
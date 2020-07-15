import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const ProgressBar = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progressBarFill, { height: props.height }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    width: 100,
    height: height / 2.7,
    borderWidth: 5,
    borderColor: '#088ECF',
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#1A96D3',
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
});

export default ProgressBar;

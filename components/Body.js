import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const Body = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Image
          style={{
            flex: 1,
            zIndex: 100,
            // overflow: 'hidden',
            // height: '100%',
            zIndex: 100,
            height: undefined,
            width: undefined,
            resizeMode: 'contain',
            // width: 147,
          }}
          // style={styles.progressBar}
          source={require('../assets/img/BodyTransparent.png')}
        />
        <View style={[styles.progressBarFill, { height: props.height }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 297,
  },
  progressBar: {
    width: 127,
    height: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#1A96D3',
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
});

export default Body;

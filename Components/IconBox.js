import React from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';

export default function IconBox(props) {
  var icon =
    props.color == 'green'
      ? require('../assets/green-icon.png')
      : require('../assets/red-icon.png');
  return (
    <View style={styles.view}>
      <View style={styles.viewBox}>
        <Text style={styles.corrText}>
          Rätt svar är{' '}
          <Text
            style={{...styles.corrText, color: 'orange', fontWeight: 'bold'}}>
            {props.correctTag}
          </Text>
        </Text>
        {/* <Image style={styles.icon} source={icon} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 0,
    height: 0,
    elevation: 15,
    bottom: '60%',
  },
  viewBox: {
    alignSelf: 'center',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'contain',
    justifyContent: 'space-around',
  },
  icon: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  corrText: {
    fontSize: 22,
    color: 'white',
    marginRight: 15,
  },
});

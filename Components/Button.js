import React, {isFocused, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function CButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={!props.satsdelar ? styles.button : styles.inactiveButton}
        onPress={() => props.toggle(false)}>
        <Text style={styles.textStyle}>Ordklasser</Text>
      </TouchableOpacity>
      {/* <Text style={{ fontSize: 30, marginLeft: -35, marginRight: -35 }}> - </Text> */}

      <TouchableOpacity
        style={props.satsdelar ? styles.button : styles.inactiveButton}
        onPress={() => props.toggle(true)}>
        <Text style={styles.textStyle}>Satsdelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 25,
  },
  button: {
    padding: 2,
    borderBottomWidth: 3,
    //borderRadius: 7,
    borderColor: 'black',
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.8,
    textTransform: 'capitalize',
  },
  inactiveButton: {
    padding: 2,
  },
});

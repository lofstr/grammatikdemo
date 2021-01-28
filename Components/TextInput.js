import React, {isFocused, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  Platform,
} from 'react-native';

export default function CustomTextInput(props) {
  return (
    <View style={styles.parent}>
      <TextInput
        style={styles.textInput}
        clearButtonMode={'always'}
        placeholder="Skriv meningen här!"
        onChangeText={(text) => props.updateText(text)}
        defaultValue={props.text}
        maxLength={400}
        onSubmitEditing={props.fetchNewData}
        onEndEditing={props.fetchNewData}
      />
      {Platform.OS == 'android' ? (
        <TouchableOpacity
          style={styles.closeButtonParent}
          onPress={() => props.updateText('')}>
          <Image
            style={styles.closeButton}
            source={require('../assets/icon-close-512.png')}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: Platform.OS == 'android' ? '87%' : '97%',
    margin: 2,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 4,
    fontSize: 22,
    textAlignVertical: 'top',
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10, // IOS FIX ONLY?
    paddingBottom: 10, // IOS FIX ONLY?
  },
  closeButtonParent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 25,
  },
  closeButton: {
    height: 20,
    width: 20,
    tintColor: 'grey',
  },
  parent: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
  },
});

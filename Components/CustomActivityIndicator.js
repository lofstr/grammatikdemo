import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';

export default function CustomAcitivityIndicator() {
  return (
    <View style={styles.view}>
      <ActivityIndicator color="#866CCF" size="large" animating={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: '40%',
  },
});

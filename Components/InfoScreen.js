import React, {useState} from 'react';
import {Text, View, Platform, StyleSheet} from 'react-native';
import CButton from './Button';
import Header from './Header';
import InfoList from './InfoList';

export default function InfoScreen({navigation}) {
  const [satsdelar, toggleSatsdelar] = useState(false);

  function toggleSatsdelarCallback(b) {
    toggleSatsdelar(b);
  }
  return (
    <View style={styles.mainContainer}>
      <Header></Header>
      {/* <CButton toggle={toggleSatsdelarCallback} satsdelar={satsdelar}></CButton> */}
      <InfoList satsdelar={satsdelar}> </InfoList>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
});

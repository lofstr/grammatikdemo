import React, {isFocused, useState} from 'react';
import {
  StatusBar,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import InfoItem from './InfoItem';

export default function InfoList(props) {
  var index = 0;

  let data = props.satsdelar ? global.ordklasser : global.satsdelar;

  const renderItem = ({item}) => {
    if (global.ordklasser[item].name == '?') return; // Exception for made up POS-tag
    index += 1;
    return <InfoItem item={global.ordklasser[item]} index={index} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.keys(global.ordklasser)}
        renderItem={renderItem}
        keyExtractor={(item, index) => 'key' + index}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});

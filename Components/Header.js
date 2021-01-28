import React, {useEffect, useState, isFocused} from 'react';
import {Text, Platform, View, StyleSheet} from 'react-native';

export default function Header({navigation}) {
  return (
    <View style={styles.headerContainer}>
      {/* <Text style={styles.footer}>Grammatikhjälpen</Text>
      <Text style={[styles.footer, styles.poweredBy]}>Powered by{"\n"}EFSELAB</Text> */}
      <Text style={[styles.header]}>Grammatikhjälpen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : 'sans-serif',
    letterSpacing: 1.1,
    fontWeight: 'normal',
    color: '#000000',
    borderBottomWidth: 2,
    paddingBottom: 3,
    borderBottomColor: 'white',
    marginTop: Platform == 'ios' ? '4%' : '4%',
    marginBottom: '4%',
    color: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    //borderBottomWidth: 1.5,
    //borderBottomLeftRadius: 4,
    //borderBottomRightRadius: 4,
    borderBottomColor: '#68B79F',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#866CCF',
    //height: '13%',
    //ios
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    //android
    elevation: 13,
  },
  footer: {
    fontSize: 26,
    borderBottomWidth: 2,
    paddingBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : 'Roboto',
    letterSpacing: 1.2,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: '3%',
    marginBottom: '3%',
  },
  poweredBy: {
    fontSize: 18,
    borderBottomWidth: 0,
  },
});

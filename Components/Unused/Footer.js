import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';

export default function Footer() {
  return (
    <View style={styles.parentview}>
      <Text style={styles.footer}>Grammatikhjälpen</Text>

      <Text style={[styles.footer, styles.poweredBy]}>
        Powered by - {'\n'}EFSELAB{' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  parentview: {
    position: 'absolute',
    bottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#866CCF',
    //borderTopLeftRadius: 4,
    //borderTopRightRadius: 4,
  },
  footer: {
    marginBottom: '4%',
    paddingTop: '4%',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : 'Roboto',
    letterSpacing: 1,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
  },
  poweredBy: {
    borderBottomWidth: 0,
  },
});

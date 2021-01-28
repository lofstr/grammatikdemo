import React, {isFocused, useState} from 'react';
import {Animated, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default function NavBarIcon(props) {
  const iconSize = props.iconSize;
  const tabNumber = props.tab;

  return (
    <View>
      <Icon
        name={props.name}
        type={props.type}
        size={iconSize}
        color={props.activeTab == props.tab ? '#FFFFFF' : '#343434'}
        disabled={props.activeTab == props.tab ? true : false}
        onPress={() => props.callback(tabNumber)}
        disabledStyle={{backgroundColor: '#866CCF'}}>
        {' '}
      </Icon>
    </View>
  );
}

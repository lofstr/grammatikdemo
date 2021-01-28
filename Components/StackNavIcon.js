import React from 'react';
import {Icon} from 'react-native-elements';
import {View} from 'react-native';

export default function StackNavIcon(props) {
  return (
    <View>
      <Icon
        name={props.name}
        type={props.type}
        size={props.iconSize}
        color={props.focused ? '#FFFFFF' : '#343434'}
        //disabledStyle={{backgroundColor: '#866CCF'}}
      >
        {' '}
      </Icon>
    </View>
  );
}

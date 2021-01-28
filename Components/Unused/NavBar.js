import React, {isFocused, useState} from 'react';
import {Animated, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NavBarIcon from './NavBarIcon';
import {Icon} from 'react-native-elements';

export default function NavBar(props) {
  const iconSize = 50;
  const [activeTab, setActiveTab] = useState(0);

  function switchTab(tab) {
    //Callback function primarily
    setActiveTab(tab);
  }

  return (
    <View style={styles.parentview}>
      <View style={styles.iconContainer}>
        <NavBarIcon
          tab={0}
          activeTab={activeTab}
          name={'search'}
          type={'material'}
          iconSize={iconSize}
          //disabled={true}
          callback={switchTab}></NavBarIcon>
        <NavBarIcon
          tab={1}
          activeTab={activeTab}
          name={'info-outline'}
          type={'material'}
          iconSize={iconSize}
          //disabled={false}
          callback={switchTab}></NavBarIcon>
        <NavBarIcon
          tab={2}
          activeTab={activeTab}
          name={'gamepad-square-outline'}
          type={'material-community'}
          iconSize={iconSize}
          //disabled={false}
          callback={switchTab}></NavBarIcon>
      </View>
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
    backgroundColor: '#866CCF',
    //borderTopLeftRadius: 4,
    //borderTopRightRadius: 4,
  },
  iconContainer: {
    marginBottom: '2%',
    paddingTop: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navBarIcon: {},
});

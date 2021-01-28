import React, {isFocused, useState} from 'react';
import {
  StatusBar,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import StackNavIcon from './StackNavIcon';

export default function InfoItem(props) {
  const [expanded, toggleExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => toggleExpanded(!expanded)}>
        <Text style={[styles.item, styles.text]}>{props.item.name}</Text>
        <View style={[styles.item, styles.iconBox]}>
          <StackNavIcon
            name={expanded ? 'expand-less' : 'expand-more'}
            type="MaterialIcons"
            iconSize={30}
          />
        </View>
      </TouchableOpacity>
      {expanded ? (
        <View style={[styles.container, styles.descriptionBox]}>
          <Text>{props.item.desc}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    marginVertical: 15,
    marginHorizontal: '9%',
  },
  descriptionBox: {
    borderBottomWidth: 0,
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    paddingLeft: 5,
  },
});

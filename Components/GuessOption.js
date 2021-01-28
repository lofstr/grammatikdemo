import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Animated, Easing} from 'react-native';

export default function GuessOption(props) {
  let [pressed, setPressed] = useState(false);
  let [animation, setAnimation] = useState(new Animated.Value(0));

  const fadeIn = () => {
    props.onClickCallback(props.correctTag); // Start animation of background color change.

    Animated.timing(animation, {
      toValue: 5,
      duration: 2100, // Length of fade in and out of background color + little
      useNativeDriver: false,
    }).start(afterFadeIn);
  };

  const fadeOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 800, // Length of fade in and out of background color + little
      useNativeDriver: false,
    }).start(afterAnimation);
  };

  useEffect(() => {
    // When new correct tag is made, change options
    if (props.fadeOut == true && pressed == true) {
      fadeOut();
    }
  }, [props.fadeOut]);

  const colorInterpolation = animation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [
      'rgb(255,255,255)',
      'rgb(134,108,207)',
      'rgb(134,108,207)',
      'rgb(134,108,207)',
      'rgb(134,108,207)',
      'rgb(134,108,207)',
    ],
  });

  const animatedStyle = {
    backgroundColor: colorInterpolation,
  };

  const afterAnimation = () => {
    animation.setValue(0);
    setPressed(false);
    props.disablePressCallback(false);
  };

  const afterFadeIn = () => {
    animation.setValue(2);
  };

  const beenPressed = () => {
    setPressed(true);
    props.disablePressCallback(true);
  };

  return (
    <View style={{}}>
      <TouchableWithoutFeedback
        disabled={props.guessReceived}
        onPress={() => {
          beenPressed();
          fadeIn();
        }}>
        <Animated.View
          style={{
            ...styles.container,
            ...animatedStyle,
          }}>
          <Text style={[styles.textStyle, !pressed ? null : styles.pressed]}>
            {props.name}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 0,
    borderRadius: 18,
    borderColor: '#866CCF',
    borderWidth: 1.5,
    borderStyle: 'solid',
    width: 170,
    margin: 10,
    backgroundColor: 'rgba(255,255,255, 1)',
  },
  option: {},
  textStyle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.8,
    textTransform: 'capitalize',
    padding: 11,
    color: '#866CCF',
    zIndex: 100,
  },
  pressed: {
    color: 'white',
  },
  backgroundColor: {
    backgroundColor: 'blue',
  },
});

/* onPress={() => {
  setPressed(true);
  props.onClickCallback(props.correctTag);
}} */

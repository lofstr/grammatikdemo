import React, {isFocused, useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import CustomAcitivityIndicator from './CustomActivityIndicator';
import GuessOption from './GuessOption';

export default function OptionList(props) {
  const tags = ['ADV', 'SUBS', 'PREP', 'KONJ', 'ADJ', 'INTJ'];

  const tag_conv = {
    AB: 'ADV',
    DT: 'DET',
    HA: 'ADV',
    HD: 'DET',
    HP: 'PRON',
    HS: 'PRON',
    IE: 'INFM',
    IN: 'INTJ',
    JJ: 'ADJ',
    KN: 'KONJ',
    NN: 'SUBS',
    PC: 'PTCP',
    PM: 'NAMN',
    PN: 'PRON',
    PN: 'PRON',
    PP: 'PREP',
    PS: 'P-PRON',
    RG: 'NUM',
    RO: 'NUM',
    SN: 'SUBJ',
    UO: 'LÅN',
    VB: 'VERB',
    MAD: 'PUNK',
    PL: 'PART',
  };

  const [options, setOptions] = useState('yo');
  const [guessReceived, setGuessReceived] = useState(false);

  function createOptions() {
    console.log('Making options');
    let tempTags = [...tags];
    placeholderOptions = [];
    correctTagAlreadyAdded = false;

    // Goes through set of options and selects random ones to display.
    for (let index = 0; index < props.numberOfOptions; index++) {
      var ctBool = false;
      var randomNumber = Math.floor(Math.random() * tempTags.length - 1) + 1;
      if (tempTags[randomNumber] == props.correctTag) {
        ctBool = true;
        correctTagAlreadyAdded = true;
      }
      const option = {
        i: index,
        tag: tempTags.splice(randomNumber, 1),
        correctTag: ctBool,
      };
      placeholderOptions.push(option);
    }
    if (!correctTagAlreadyAdded) {
      // If the correct tag was already randomly inserted into the list of options - don't add another one.
      var corrTag = Math.floor(Math.random() * props.numberOfOptions - 1) + 1;
      placeholderOptions[corrTag] = {
        i: placeholderOptions[corrTag].i,
        tag: props.correctTag,
        correctTag: true,
      };
    }

    setOptions(placeholderOptions);
    console.log('Done with making options');
  }

  function guess(g) {
    console.log('Guess is: ', g);
    console.log('Correct tag is: ', props.correctTag);
    props.animateAnswerFeedback(g);
    if (g) {
      props.increaseScoreCallback(1);
    }
    //props.callback(); // Will generate new round, and useEffect will change options for new tag.
    //setGuessReceived(false);

    // g is a bool: true if correct guess was made.
  }

  function disablePressing(v) {
    setGuessReceived(v);
  }

  useEffect(() => {
    // Initial function call to start game!
    props.callback();
  }, []);

  useEffect(() => {
    // When new correct tag is made, change options
    createOptions();
  }, [props.correctTag]);

  return (
    <View style={styles.container}>
      {props.correctTag ? (
        options.map((option) => {
          return (
            <View>
              <GuessOption
                guessReceived={guessReceived}
                disablePressCallback={disablePressing}
                onClickCallback={guess}
                name={option.tag}
                key={option.i}
                fadeOut={props.fadeOut}
                correctTag={option.correctTag}>
                {option.tag}
              </GuessOption>
            </View>
          );
        })
      ) : (
        <CustomAcitivityIndicator></CustomAcitivityIndicator>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    //marginTop: 25,
  },
  option: {},
  textStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.8,
    textTransform: 'capitalize',
  },
});

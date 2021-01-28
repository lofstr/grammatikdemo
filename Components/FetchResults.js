import React from 'react';
import {ScrollView, View, StyleSheet, Platform} from 'react-native';
import {Tooltip, Text, Input} from 'react-native-elements';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import CustomAcitivityIndicator from './CustomActivityIndicator';

export default function FetchResults(props) {
  return (
    <View
      style={props.gameOpt ? styles.gameResultView : styles.parentResultView}>
      <ScrollView
        style={props.gameOpt ? styles.gameContainer : null}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}>
        {!props.success ? (
          <Text
            style={(styles.errorText, props.gameOpt ? styles.gameColor : null)}>
            {props.data}
          </Text>
        ) : (
          props.data.map((item) => {
            var tag = props.satsdelar ? item[9] : item[9]; // TODO: Change first 9 to 7 when DB has satsdelar as well.
            if (global.ordklasser) {
              console.log(item[1]);
              console.log('ORDKLASS', tag);
              console.log('I DATABAS', global.ordklasser[tag]);
            }
            return (
              <View key={(props.satsdelar ? 'O' : 'S') + item[0]}>
                <Text
                  style={[
                    styles.resultText,
                    styles.words,
                    props.gameOpt ? styles.gameColor : null,
                  ]}>
                  {item[1]}
                </Text>
                <Tooltip
                  containerStyle={[styles.tooltipBox]}
                  skipAndroidStatusBar={true}
                  withPointer={true}
                  backgroundColor={'#866CCF'}
                  height={140}
                  width={170}
                  popover={
                    <Text style={styles.tooltipText}>
                      {global.ordklasser
                        ? global.ordklasser[tag].desc
                        : 'Lyckas inte hämta information! Testa att göra en ny sökning :)'}
                    </Text>
                  }>
                  <Text
                    style={[
                      styles.resultText,
                      styles.tags,
                      props.gameOpt ? styles.gameTagColor : null,
                      item[9] == '?' ? styles.guessTag : null,
                    ]}>
                    {props.satsdelar ? item[7] : item[9]}
                  </Text>
                </Tooltip>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  words: {
    fontSize: 24,
    paddingBottom: 5,
  },
  tags: {
    fontSize: 12,
    fontStyle: 'italic',
    paddingBottom: 15,
  },
  errorText: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : 'Roboto',
    marginTop: 45,
    letterSpacing: 1.6,
  },
  resultText: {
    paddingRight: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : 'Roboto',
    letterSpacing: 0.8,
    color: '#282828',
  },
  parentResultView: {
    marginTop: 25,
    height: '75%', // was 300px before, changed to 75% to make responsive, unclear if works on all sizes.
    marginBottom: 25,
    paddingHorizontal: 25,
  },

  gameContainer: {
    borderRadius: 8,
    padding: 30,
    backgroundColor: '#866CCF',
    elevation: 7,
    minWidth: '100%',
  },
  gameResultView: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  tooltipText: {
    fontSize: 14,
    color: 'white',
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  tooltipBox: {},
  guessTag: {
    fontSize: 24,
    color: 'orange',
    fontWeight: '800',
  },
  gameColor: {
    color: 'white',
  },
  gameTagColor: {
    color: '#E5E5E5',
  },
});

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import {fetchData} from './helpers';
import Header from './Header';
import FetchResults from './FetchResults';
import OptionList from './OptionList';
import IconBox from './IconBox';
import firestore from '@react-native-firebase/firestore';

export default function GameScreen({navigation}) {
  const numberOfOptions = 4;
  const [success, setSuccess] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [correctTag, setCorrectTag] = useState('');
  const [score, setScore] = useState(0);
  const [color, setColor] = useState('green');
  const [showIcon, toggleShowIcon] = useState(false);
  const [toggleScreen, setToggleScreen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  let [animation, setAnimation] = useState(new Animated.Value(0));
  const testWords = [
    'Hej',
    'mannen',
    'fisk',
    'bör',
    'knappats',
    'ätas',
    'men',
    'för',
    'att',
    'jättemycket',
    'blank',
    'fort',
    'Springa',
    'Till',
    'Staden',
    'Borta',
    'Buss',
    'Bil',
    'Fin',
    'Stor',
  ];

  const [data, setData] = useState([
    ['1', 'Så', 'så', 'ADV', 'AB', '_', '3', 'AA', 'ADV', 'ADV'],
    ['2', 'här', 'här', 'ADV', 'AB', '_', '1', 'HD', '_', 'ADV'],
    ['3', 'kan', 'kunna', 'AUX', 'VB', 'PRS|AKT', '0', 'ROOT', '_', 'VERB'],
    ['4', 'det', 'det', 'PRON', 'PN', 'NEU|', '3', 'SS', '_', 'PRON'],
    ['5', 'också', 'se', 'VERB', 'VB', 'INF|AKT', '3', 'VG', '_', 'VERB'],
    ['6', 'vara', 'ut', 'ADV', 'PL', '_', '5', 'PL', '_', 'PART'],
    ['7', '#', '!', 'PUNCT', 'MAD', '_', '3', 'IU', '_', 'PUNK'],
  ]);

  const fadeInColor = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      setToggleScreen(true);
    });
  };

  const fadeOutColor = () => {
    setToggleScreen(false);

    Animated.timing(animation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start(afterAnimation);
  };

  const afterAnimation = () => {
    toggleShowIcon(false);
    setFadeOut(false);
    animation.setValue(0);
    getText();
  };

  const colorInterpolationGreen = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['rgb(255,255,255)', 'rgb(41,226,115)', 'rgb(41,226,115)'],
  });

  const colorInterpolationRed = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['rgb(255,255,255)', 'rgb(253,89,89)', 'rgb(253,89,89)'],
  });

  var animatedStyle = {
    backgroundColor:
      color == 'red' ? colorInterpolationRed : colorInterpolationGreen,
  };

  function animateAnswerFeedback(wasCorrect) {
    if (wasCorrect) {
      setColor('green');
    } else {
      setColor('red');
      toggleShowIcon(true);
    }
    fadeInColor();
  }

  function getRandomText() {
    //Callback function primarily
    setLoading(true);
    testWord = '';
    var randomLength = Math.floor(Math.random() * 15) + 1; // 15 max length
    for (let index = 0; index < randomLength; index++) {
      var randomWord = Math.floor(Math.random() * testWords.length - 1) + 1;
      testWord = testWord + testWords[randomWord] + ' ';
    }
    fetchData(testWord, handleAPIResponse);
  }

  function getText() {
    //console.log('GLOBAL ORDKLASSER: ', global.ordklasser.ADJ);
    var sentences = [];
    firestore()
      .collection('spelmeningar')
      .get()
      .then((querySnapshot) => {
        sentences = querySnapshot.docs.map((doc) => doc.data());
        console.log('Sentences', sentences);
        var randomSentence = Math.floor(Math.random() * sentences.length) - 1;
        console.log('Index for sentence chosen', randomSentence);
        if (randomSentence < 0) randomSentence = 1;
        console.log(
          'After setting to 0 if -1 - Index for sentence chosen',
          randomSentence,
        );
        fetchData(sentences[randomSentence].mening, handleAPIResponse);
      });
  }

  function handleAPIResponse(data) {
    var randomNumber = Math.floor(Math.random() * data.response.length - 1) + 1;

    if (data.response[randomNumber][9] != 'ROOT') {
      setCorrectTag(data.response[randomNumber][9]);
      data.response[randomNumber][9] = '?';
    }
    setSuccess(data.success);
    setData(data.response);
    setLoading(false);
  }

  function increaseScoreCallback(n) {
    var newScore = score + n;
    setScore(newScore);
  }

  function nextRound() {
    console.log('TOGGLE SCREEN IS', toggleScreen);
    if (toggleScreen) {
      setFadeOut(true);
      fadeOutColor();
    }
  }

  return (
    <View>
      <TouchableWithoutFeedback
        disabled={!toggleScreen}
        style={{}}
        onPress={() => {
          if (toggleScreen) {
            nextRound();
          }
        }}>
        <Animated.View style={{...styles.mainContainer, ...animatedStyle}}>
          <Header></Header>
          <View style={{alignItems: 'center', height: '100%'}}>
            <View style={{height: '100%'}}>
              <View style={styles.scorePos}>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreText}>{score}</Text>
                </View>
              </View>

              <View style={styles.gameWrapper}>
                <View style={styles.resultWrapper}>
                  <FetchResults
                    gameOpt={true} //Toggle for another style I guess
                    data={data}
                    success={success}
                    nestedScrollEnabled={true}
                    satsdelar={false}
                    isLoading={isLoading}></FetchResults>
                </View>

                <View style={{...styles.optionListContainer}}>
                  {showIcon ? (
                    <IconBox correctTag={correctTag} color={color}></IconBox>
                  ) : null}
                  <OptionList
                    increaseScoreCallback={increaseScoreCallback}
                    numberOfOptions={numberOfOptions}
                    correctTag={correctTag}
                    fadeOut={fadeOut}
                    animateAnswerFeedback={animateAnswerFeedback}
                    callback={getText}></OptionList>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  gameWrapper: {
    display: 'flex',
    height: '100%',
  },
  resultWrapper: {
    display: 'flex',
    flex: 2,
    //backgroundColor: 'blue',
  },
  optionListContainer: {
    flex: 0.5,
    //backgroundColor: 'green',
    marginBottom: 56 + 40, // offset bottom navbar (56) + additional
  },
  mainContainer: {
    height: '100%',
    backgroundColor: '#FF8080',
  },
  gameText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 2,
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    marginTop: -10,
  },
  scorePos: {
    height: 0,
    width: 0,
    left: 345,
    top: 12,
    position: 'relative',
    zIndex: 100,
    elevation: 9,
  },
  scoreBox: {
    width: 58,
    height: 27,
    borderRadius: 12,
    backgroundColor: '#FCC22D',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 0.5,
    elevation: 7,
    display: 'flex',
    justifyContent: 'center',
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

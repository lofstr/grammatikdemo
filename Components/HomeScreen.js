import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Header from './Header';
import FetchResults from './FetchResults';
import CustomTextInput from './TextInput';
import CustomAcitivityIndicator from './CustomActivityIndicator';
import CButton from './Button';
import {fetchData} from './helpers';

//import Footer from './Unused/Footer';

export default function HomeScreen({navigation}) {
  //Debug with react-native log-android for release builds?
  // Preloaded sample data
  const [data, setData] = useState([
    ['1', 'Så', 'så', 'ADV', 'AB', '_', '3', 'AA', 'ADV', 'ADV'],
    ['2', 'här', 'här', 'ADV', 'AB', '_', '1', 'HD', '_', 'ADV'],
    ['3', 'kan', 'kunna', 'AUX', 'VB', 'PRS|AKT', '0', 'ROOT', '_', 'VERB'],
    ['4', 'det', 'det', 'PRON', 'PN', 'NEU|', '3', 'SS', '_', 'PRON'],
    ['5', 'se', 'se', 'VERB', 'VB', 'INF|AKT', '3', 'VG', '_', 'VERB'],
    ['6', 'ut', 'ut', 'ADV', 'PL', '_', '5', 'PL', '_', 'PART'],
    ['7', '!', '!', 'PUNCT', 'MAD', '_', '3', 'IU', '_', 'PUNK'],
  ]);
  const [text, setText] = useState('');
  const [success, setSuccess] = useState(true);
  const [satsdelar, toggleSatsdelar] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function fetchAgain() {
    //Callback function primarily
    setLoading(true);
    fetchData(text, handleAPIResponse);
  }

  function updateTextValue(newValue) {
    setText(newValue);
  }

  function toggleSatsdelarCallback(b) {
    toggleSatsdelar(b);
  }

  function handleAPIResponse(data) {
    setData(data.response);
    setSuccess(data.success);
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.mainContainer}>
        <Header navigation={navigation}></Header>
        <View
          style={{
            marginTop: '4%',
          }}>
          <CustomTextInput
            fetchNewData={fetchAgain}
            updateText={updateTextValue}
            text={text}></CustomTextInput>
          {/*           <CButton toggle={toggleSatsdelarCallback} satsdelar={satsdelar}>
            {' '}
          </CButton> */}
          <View style={{alignItems: 'center'}}>
            {isLoading ? (
              <CustomAcitivityIndicator />
            ) : (
              <FetchResults
                data={data}
                success={success}
                nestedScrollEnabled={true}
                satsdelar={satsdelar}></FetchResults>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
});

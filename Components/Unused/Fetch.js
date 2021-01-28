import React, {useState} from 'react';
import {View} from 'react-native';
import FetchResults from '../FetchResults';
import CustomTextInput from '../TextInput';
import CustomAcitivityIndicator from '../CustomActivityIndicator';
import CButton from '../Button';

export default function Fetch() {
  //Debug with react-native log-android for release builds?
  const [isLoading, setLoading] = useState(false);
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
  const [text, setText] = useState('Så här kan det se ut!');
  const [success, setSuccess] = useState(true);
  const [satsdelar, toggleSatsdelar] = useState(false);

  // Runs search on load - Use for debugging only.
  /*
    useEffect(() => {
        fetchData(data => console.log("The data is: ", data));
    }, [this.fetch]
    )
    */

  function fetchAgain() {
    //Callback function primarily
    fetchData((data) => console.log('New data is: ', data));
  }

  function handleChange(newValue) {
    setText(newValue);
  }

  function toggleSatsdelarCallback(b) {
    toggleSatsdelar(b);
  }

  return <View></View>;
}

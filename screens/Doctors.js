import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import withHeader from '../hoc/withHeader';
import axios from '../config/axios';
import Loader from '../components/Loader';
import Input from '../components/input';
import { DOCTORS_URL } from '../config/urls';
import {transformName, debounce} from '../config/helpers';
import styles from './styles/doctorsStyles';
import DoctorDetails from './DoctorDetails';

 class Doctors extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      isLoading: false,
      doctors: [],
      selectedDoctor: null
    }
  }
  componentDidMount() {
    this._getDoctors();
}

  search =debounce (value =>
  {
    this._getDoctors(value)
  }, 1000)
  _getDoctors = async (query) =>
  {
    this.setState({isLoading: true});
    try
    {
      const token = await AsyncStorage.getItem('accessToken');
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const response = await axios.get(DOCTORS_URL,
       {
          params:{q: query ? query: ''}
        });
      this.setState({ doctors: response.data, isLoading: false });
    }
    catch (e) 
    {
      this.setState({
        alert: { messages: e.response.data.message, type: "danger" },
        isLoading: false
      });
    }

  }
  itemPressHandler = itemId =>
  {
    this.setState(prevState=>{
      return  {
        selectedDoctor: prevState.doctors.find(doctor => doctor.id === itemId)
      }
    })
  }
  _renderItem = ({item}) =>
  {
    return(
      <TouchableOpacity onPress={() => this.itemPressHandler(item.id)}>
        <View style={styles.itemContainer}>
          <View style={styles.doctorAvatar}>
            <Text style={styles.doctorAvatarText}>
              {transformName(item.name)}
            </Text>
          </View>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.doctorSpec}>{item.profile.specialization}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  _keyExtractor= item => item.id.toString()
 render()
 {
   const {doctors, selectedDoctor, isLoading}= this.state;
    return (
    <View style={styles.container}>

      <Loader title="Getting Doctors" loading={isLoading} />

      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>

          <Input inputStyles={styles.searchInput}
           placeholder="Search about Doctors"
           icon="md-search" 
           onChangeText={this.search}/>

        </View>
      </View>

      <DoctorDetails 
      selectedDoctor={selectedDoctor}
      closeModal={() => this.setState({selectedDoctor: null})} />

      <ScrollView contentContainerStyle={styles.doctorsListContainer}>
        {doctors.length !== 0  ? (
          <FlatList 
          data={doctors}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          />
        ): 
        <Text style={styles.noDoctorsText}>Not found Doctors</Text>}
      </ScrollView>
    </View>
   );
  }
}



export default withHeader(Doctors, "Doctors" );
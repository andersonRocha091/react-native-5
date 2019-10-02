import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import AccelerationItem from '../components/AccelerationItem';

// let accelerations = [{
//   "slug": "reactnative-online-1",
//   "name": "React Native",
//   "is_disabled": false,
//   "subscription_start_at": "2019-07-08T00:00:00-03:00",
//   "subscription_finish_at": "2019-07-28T23:59:59-03:00",
//   "start_at": "2019-08-17T00:00:00-03:00",
//   "finish_at": "2019-11-03T00:00:00-03:00",
//   "location": "Online",
//   "banner_url": "https://s3-us-west-1.amazonaws.com/acceleration-assets-highway/reactnative-online-1/banner.jpg",
//   "home_banner_url": "",
//   "color_scheme": "7800FF",
//   "company_count": 1
// }, {
//   "slug": "adxp-datascience-joinville-1",
//   "name": "ADxp Data Science",
//   "is_disabled": false,
//   "subscription_start_at": "2019-07-09T00:00:00-03:00",
//   "subscription_finish_at": "2019-08-19T00:00:00-03:00",
//   "start_at": "2019-08-19T00:00:00-03:00",
//   "finish_at": "2019-10-23T23:59:59-03:00",
//   "location": "DevHub Joinville, SC",
//   "banner_url": "",
//   "home_banner_url": "",
//   "color_scheme": "",
//   "company_count": 1
// }, {
//   "slug": "adxp-datascience-joinville-2",
//   "name": "ADxp Data Science",
//   "is_disabled": false,
//   "subscription_start_at": "2019-07-09T00:00:00-03:00",
//   "subscription_finish_at": "2019-08-20T00:00:00-03:00",
//   "start_at": "2019-08-20T00:00:00-03:00",
//   "finish_at": "2019-10-24T23:59:59-03:00",
//   "location": "DevHub Joinville, SC",
//   "banner_url": "",
//   "home_banner_url": "",
//   "color_scheme": "",
//   "company_count": 1
// }, {
//   "slug": "adxp-datascience-sp-1",
//   "name": "ADxp Data Science",
//   "is_disabled": false,
//   "subscription_start_at": "2019-07-09T00:00:00-03:00",
//   "subscription_finish_at": "2019-09-23T00:00:00-03:00",
//   "start_at": "2019-09-23T00:00:00-03:00",
//   "finish_at": "2019-11-27T23:59:59-03:00",
//   "location": "a confirmar",
//   "banner_url": "",
//   "home_banner_url": "",
//   "color_scheme": "",
//   "company_count": 1
// }, {
//   "slug": "adxp-datascience-sp-2",
//   "name": "ADxp Data Science",
//   "is_disabled": false,
//   "subscription_start_at": "2019-07-09T00:00:00-03:00",
//   "subscription_finish_at": "2019-09-24T00:00:00-03:00",
//   "start_at": "2019-09-24T00:00:00-03:00",
//   "finish_at": "2019-11-28T23:59:59-03:00",
//   "location": "a confirmar",
//   "banner_url": "",
//   "home_banner_url": "",
//   "color_scheme": "",
//   "company_count": 1
// }, {
//   "slug": "python-online-1",
//   "name": "Python Women",
//   "is_disabled": false,
//   "subscription_start_at": "2019-07-22T00:00:00-03:00",
//   "subscription_finish_at": "2019-08-11T23:59:59-03:00",
//   "start_at": "2019-08-24T00:00:00-03:00",
//   "finish_at": "2019-11-02T23:59:59-03:00",
//   "location": "Online",
//   "banner_url": "https://s3-us-west-1.amazonaws.com/acceleration-assets-highway/python-online-1/banner.jpg",
//   "home_banner_url": "",
//   "color_scheme": "212133",
//   "company_count": 1
// }]


export default function Acceleration({navigation}) {

  const [accelerationsLoaded, setAccelerationLoaded] = useState(false);
  const [accelerations, setAccelerations] = useState([]);
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    async function loadAceleration() {

      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          let profileObject = JSON.parse(value);
          setProfilePicture(profileObject.picture);
        }
      } catch (error) {
        // Error retrieving data
      }

      const response = await axios.get('https://api.codenation.dev/v1/acceleration');
      setAccelerations(response.data);
      setAccelerationLoaded(true)
    }

    loadAceleration();
  }, [])

  return (
    !accelerationsLoaded ?
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={{ uri: 'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png' }}
          />
        </View>
        <Text style={styles.title}>Acelerações</Text>
        <View style={[styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
      :
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={{ uri: 'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png' }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.profileImage}
              source={{ uri: profilePicture }} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Acelerações</Text>
        <FlatList
          data={accelerations}
          keyExtractor={item => item.slug}
          renderItem={({ item, index }) => <AccelerationItem item={item} />}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#7800ff',
    borderBottomWidth: 2,
    padding: 16,
    paddingTop: 55
  },
  headerImage: {
    height: 45,
    width: 250
  },
  title: {
    color: '#7800ff',
    fontSize: 30,
    padding: 16
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  profileImage: {
    borderRadius: 22,
    height: 45,
    width: 45,
    marginLeft: 50
  },
});

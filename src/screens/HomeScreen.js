import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { getItem, removeItem } from '../utils/asyncStorage';
import LottieView from 'lottie-react-native';
import { globalStyles } from '../styles/globalStyles';
import { getRandomGreeting, calculateBMI, bmiStatus } from '../utils/helpers';

export default function HomeScreen({ navigation }) {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState([
    { title: 'Breakfast', foodItems: [] },
    { title: 'Snacks', foodItems: [] },
    { title: 'Lunch', foodItems: [] },
    { title: 'Snacks', foodItems: [] },
    { title: 'Dinner', foodItems: [] }
  ]);

  const isFocused = useIsFocused();
  const fetchUserData = async () => {
    let profileData = await getItem('profileData');
    profileData = JSON.parse(profileData);
    console.log(profileData);
    setProfileData(profileData);
  };

  const resetProfile = async () => {
    Alert.alert(
      '',
      'Are you sure you want to delete this profile?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await removeItem('profileData');
            navigation.navigate('ProfileSetup');
          },
        },
        {
          text: 'No',
          style: 'cancel', 
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (isFocused)
      fetchUserData();
  }, [isFocused])

  return (
    <View className='bg-amber-50' style={{ flex: 1 }}>
      {
        isLoading ?
          <View className='flex-1 flex-col items-center'>
            <LottieView
              source={require('../assets/animations/diet.json')}
              autoPlay
              loop={isLoading ? true : false}
              style={{ height: Dimensions.get('screen').height / 1.6 }}
            />
            <Text className='text-xl text-center' style={{ ...globalStyles.circularBook }}>Creating a diet plan for you...</Text>
          </View>
          :
          profileData !== null ?
            <ScrollView className='p-3'>
              <View className='flex flex-row justify-between items-center'>
                <Text className='text-4xl text-black' style={{ ...globalStyles.circularMedium }}>{getRandomGreeting(profileData.name)}</Text>
                <TouchableOpacity onPress={() => resetProfile()}>
                  <Text style={{ ...globalStyles.circularMedium }} className='text-red-600 text-md'>Reset</Text>
                </TouchableOpacity>
                {/* <Text style className='text-base text-red-600'>Reset Profile</Text> */}
              </View>

              <Text style={{ ...globalStyles.circularBook }} className='py-2 text-medium text-xl'>Your BMI: {calculateBMI(profileData)}
                &nbsp;({bmiStatus(calculateBMI(profileData))})</Text>

              <Text style={{ ...globalStyles.circularBook }} className='pb-2 text-medium text-xl'>Based at: {profileData.location}</Text>

              {
                profileData.allergies &&
                <Text style={{ ...globalStyles.circularBook }} className='pb-2 text-medium text-xl'>Allergies: {profileData.allergies}</Text>
              }

              {
                profileData.healthConditions &&
                <Text style={{ ...globalStyles.circularBook }} className='pb-2 text-medium text-xl'>Health Conditions: {profileData.healthConditions}</Text>
              }

              {
                dietPlan.map((meal, i) => {
                  return (
                    <View key={i} className='py-4'>
                      <Text className='text-2xl text-black' style={{ ...globalStyles.circularMedium }}>
                        {meal.title}
                      </Text>

                      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        {
                          [...Array(4)].map((item, index) => {
                            return (
                              <TouchableOpacity key={index} className='flex flex-row'>
                                <View className='mt-4 bg-white rounded-tl-none rounded-tr-none rounded-b-lg flex flex-col p-3 mr-3'>
                                  {/* <Image
                                    className='w-36 h-36'
                                    source={require('../assets/images/1.png')}
                                  /> */}
                                  <Text className='text-lg text-black text-left pl-1' style={{ ...globalStyles.circularBook }}>
                                    French Toast
                                  </Text>

                                  <Text className='text-base text-gray text-left pl-1' style={{ ...globalStyles.circularBook }}>
                                    American Cuisine
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )
                          })
                        }
                      </ScrollView>
                    </View>
                  )
                })
              }
              <View className='w-screen h-6'></View>
            </ScrollView>
            :
            null
      }
    </View>
  )
}

const styles = StyleSheet.create({

});
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BackHandler, Alert, SafeAreaView, StatusBar, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import LottieView from 'lottie-react-native';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import DietPlanScreen from './screens/DietPlanScreen';
import globalStyles from './styles/globalStyles';

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  const onAnimationFinish = async () => {
    setLoading(false);
    await requestLocationPermission();
    checkLocationServices();
  };

  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        console.log('Location permission granted.');
      } else {
        console.log('Location permission denied.');
        showAlertAndCloseApp();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const checkLocationServices = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 1000,
      fastInterval: 500,
    })
      .then((data) => {
        console.log('Location is', data);
      })
      .catch((err) => {
        if (err.code == "ERR00") {
          showAlertAndCloseApp();
        }
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      });
  };

  const showAlertAndCloseApp = () => {
    Alert.alert(
      'Location Permission Required',
      'This app requires location permission to function. Please grant permission in your device settings and restart the app.',
      [
        {
          text: 'Close App',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <PaperProvider>
        <NavigationContainer>
          {loading ? (
            <LottieView
              source={require('./assets/animations/bowlOfFood.json')}
              autoPlay
              loop={false}
              onAnimationFinish={onAnimationFinish}
            />
          ) : (
            <View style={{...globalStyles.container, borderColor: 'black', borderWidth: 12}}>
            <Stack.Navigator initialRouteName="Onboarding">
              <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: '' }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Your Diet Plan App' }} />
              <Stack.Screen name="DietPlan" component={DietPlanScreen} options={{ title: 'Diet Plan' }} />
            </Stack.Navigator>
            </View>
          )}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
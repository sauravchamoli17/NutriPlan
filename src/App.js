import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import OnboardingScreen from './screens/OnboardingScreen';
import LocationScreen from './screens/LocationScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import HomeScreen from './screens/HomeScreen';
import DietPlanScreen from './screens/DietPlanScreen';
import { getItem, setItem } from './utils/asyncStorage';

const Stack = createStackNavigator();
const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [isProfileCreated, setProfileCreated] = useState(null);
  const [isLocationAvailable, setIsLocationAvailable] = useState(true);

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
        setIsLocationAvailable(false);
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
          setIsLocationAvailable(false);
        }
      });
  };

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    let profileData = await getItem('profileData');
    if (onboarded == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
    if (profileData == null) {
      setProfileCreated(false);
    } else {
      setProfileCreated(true);
    }
  }

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor='#6366f1' barStyle="light-content" />
        <NavigationContainer>
          {loading ? (
            <LottieView
              source={require('./assets/animations/bowlOfFood.json')}
              autoPlay
              loop={false}
              onAnimationFinish={onAnimationFinish}
            />
          ) : (
            <>
              <Stack.Navigator initialRouteName={showOnboarding ? 'Onboarding' : isProfileCreated ? 'Home' : 'ProfileSetup'}>
                <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: '', headerShown: false }} />
                <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
                <Stack.Screen name="DietPlan" component={DietPlanScreen} options={{ title: 'Diet Plan' }} />
              </Stack.Navigator>
            </>
          )}
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
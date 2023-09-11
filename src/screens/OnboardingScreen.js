import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {globalStyles} from '../styles/globalStyles';
import { setItem } from '../utils/asyncStorage';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const handleDone = () => {
    navigation.navigate('ProfileSetup');
    setItem('onboarded', '1');
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{ ...globalStyles.circularMedium, ...globalStyles.colorWhite }}>Done</Text>
      </TouchableOpacity>
    )
  }

  const skipButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{ ...globalStyles.circularMedium, ...globalStyles.colorWhite }}>Skip</Text>
      </TouchableOpacity>
    )
  }

  const nextButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{ ...globalStyles.circularMedium, ...globalStyles.colorWhite }}>Next</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ ...globalStyles.container }}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        SkipButtonComponent={skipButton}
        NextButtonComponent={nextButton}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        pages={[
          {
            backgroundColor: '#A52A2A',
            image: (
              <View style={{ ...styles.lottie }}>
                <LottieView
                  source={require('../assets/animations/step-1.json')}
                  autoPlay
                />
              </View>
            ),
            title: 'Welcome to NutriPlan',
            subtitle: "Let's start your journey to a healthier you. NutriPlan provides personalized diet plans and nutrition advice tailored just for you.",
          },
          {
            backgroundColor: '#006400',
            image: (
              <View style={{ ...styles.lottie }}>
                <LottieView
                  source={require('../assets/animations/step-2.json')}
                  autoPlay
                />
              </View>
            ),
            title: 'Set Your Health Goals',
            subtitle: "What's your goal? Whether it's weight loss, muscle gain, or maintaining a healthy lifestyle, NutriPlan will help you get there.",
          },
          {
            backgroundColor: '#4B0082',
            image: (
              <View style={{ ...styles.lottie }}>
                <LottieView
                  source={require('../assets/animations/step-3.json')}
                  autoPlay
                />
              </View>
            ),
            title: 'Personalized Diet Plans',
            subtitle: "NutriPlan uses advanced algorithms to create a diet plan that fits your preferences, dietary restrictions, and nutritional needs.",
          },
          {
            backgroundColor: '#333333',
            image: (
              <View style={{ ...styles.lottie }}>
                <LottieView
                  source={require('../assets/animations/step-4.json')}
                  autoPlay
                />
              </View>
            ),
            title: "Let's Get Started",
            subtitle: "Ready to take the first step toward a healthier you? Tap 'Get Started' to access your personalized diet plan.",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: width * 0.9,
    height: width
  },
  doneButton: {
    padding: 20
  },
  subtitle: {
    ...globalStyles.circularBook,
    ...globalStyles.colorWhite, 
    paddingHorizontal: 10, 
    lineHeight: width * 0.05
  },
  title:{
    ...globalStyles.circularBook, 
    ...globalStyles.colorWhite
  }
});

export default OnboardingScreen;
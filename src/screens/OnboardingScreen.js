import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import globalStyles from '../styles/globalStyles';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={{...globalStyles.container, borderColor: 'red', borderWidth: 10}}>
      <ImageBackground
        source={{ uri: 'https://res.cloudinary.com/dg6ijhjsn/image/upload/v1693654751/nutriplan-background_liui89.jpg' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to NutriPlan</Text>
          <Text style={styles.subtitle}>Embark on a Healthier Journey</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Main')}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Get Started
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1, // Fill the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%', 
  },
  title: {
    ...globalStyles.text,
    fontSize: 32,
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    ...globalStyles.text,
    fontSize: 20,
    color: 'white',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: globalStyles.primaryButton,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default OnboardingScreen;
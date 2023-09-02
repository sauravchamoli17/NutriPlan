import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DietPlanScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Diet Plan</Text>
      <Text style={styles.planText}>
        Here's your personalized diet plan based on your BMI, goals, and
        location. Make sure to follow it for the best results.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  planText: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default DietPlanScreen;
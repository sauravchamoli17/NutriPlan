import { StyleSheet } from "react-native";

const Colors = {
  primaryBackground: '#F5F5F5',
  primaryText: '#333333',
  primaryButton: '#007AFF',
  primaryAccent: '#4CAF50',
  secondaryBackground: '#FFFFFF',
  secondaryText: '#666666',
  secondaryButton: '#7FDBFF',
  secondaryAccent: '#FF4136',
  header: '#1E90FF',
  divider: '#DDDDDD',
  icon: '#1E90FF',
  link: '#007AFF',
  white: '#FFFFFF',
  black: '#000000'
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  circularBook: {
    fontFamily: 'Circular-Book'
  },
  circularBold: {
    fontFamily: 'Circular-Bold'
  },
  circularMedium: {
    fontFamily: 'Circular-Medium'
  },
  primaryButton: {
    backgroundColor: Colors.primaryBackground,
  },
  colorWhite: {
    color: Colors.white
  },
  colorBlack: {
    color: Colors.black
  }
});

export default globalStyles;

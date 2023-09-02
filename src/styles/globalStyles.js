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
};

const globalStyles = StyleSheet.create({
    container: {
      flex: 1
    },
    text: {
      fontFamily: 'Circular-Book',
      color: Colors.secondaryText,
    },
    primaryButton: {
        backgroundColor: Colors.primaryBackground,
    }
});

export default globalStyles;

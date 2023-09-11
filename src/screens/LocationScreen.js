import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, View, ActivityIndicator, FlatList } from 'react-native';
import { setItem, getItem } from '../utils/asyncStorage'
import Toast from 'react-native-toast-message';
import debounce from 'lodash/debounce';
import { globalStyles } from '../styles/globalStyles';
import { TextInput } from 'react-native-gesture-handler';

const LocationScreen = ({ navigation }) => {
    const [location, setLocation] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const [isLocationSelected, setIsLocationSelected] = useState(false);

    const debouncedLocationChange = debounce((text) => {
        fetch(`https://nominatim.openstreetmap.org/search?q=${text}&format=json&accept-language=en`)
            .then((response) => response.json())
            .then((data) => {
                const suggestions = data.map((item) => ({
                    name: item.display_name,
                    lat: item.lat,
                    lon: item.lon,
                }));
                setLocationSuggestions(suggestions);
            })
            .catch((error) => {
                console.error('Error fetching location suggestions:', error);
            });
    }, 400);

    const handleSubmit = async () => {
        if (location !== '' && isLocationSelected) {
            setIsSubmited(true);
            let profileData = await getItem('profileData');
            profileData = JSON.parse(profileData);
            profileData = { ...profileData, location };
            setItem('profileData', JSON.stringify(profileData));
            Toast.show({
                type: 'success',
                text1: 'Location Saved Successfully'
            });
            navigation.navigate('Home');
            setIsSubmited(false);
        } else {
            Toast.show({
                type: 'error',
                text1: 'Location is required!'
            });
        }
    };

    return (
        <View style={{ flexGrow: 1 }} className='bg-indigo-500 px-4'>
            <Text className='text-3xl text-white my-4 pl-2' style={{ ...globalStyles.circularBook }}>Where are you based?</Text>
            <View className='px-2 rounded-md border-2 border-white mx-1'>
                <TextInput
                    className='text-lg text-white border-none'
                    label="Name (Optional)"
                    placeholder="San Francisco, CA"
                    onChangeText={(text) => {
                        if (text == '') {
                            setLocation('');
                            debouncedLocationChange('');
                        }
                        else {
                            setLocation(text);
                            debouncedLocationChange(text);
                        }
                    }}
                    value={location}
                    containerStyle={{ ...globalStyles.inputContainer, marginBottom: 0 }}
                    labelStyle={globalStyles.label}
                    inputStyle={globalStyles.input}
                    placeholderTextColor="white"
                    selectionColor="white"
                />
            </View>

            {
                locationSuggestions && locationSuggestions.length > 0 ?
                    <FlatList
                        className='mx-1'
                        data={locationSuggestions}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                key={index.toString()}
                                className='my-2'
                                onPress={() => {
                                    setLocation(item.name);
                                    setLocationSuggestions([]);
                                    setIsLocationSelected(true);
                                }}
                            >
                                <Text style={{ ...globalStyles.circularBook }} className='text-white text-lg'>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    :
                    null
            }

            <TouchableOpacity
                className='w-5/12 mx-auto flex flex-row justify-center px-4 py-3 rounded-lg'
                style={styles.saveButton}
                onPress={handleSubmit}
                disabled={isSubmited ? true : false}
            >
                {isSubmited ? (
                    <ActivityIndicator size="small" color="blue" />
                ) : (
                    <Text style={styles.buttonText}>Save Location</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonTitle: {
        fontSize: 18,
        fontFamily: globalStyles.circularMedium,
    },
    saveButton: {
        backgroundColor: globalStyles.primaryButton,
        marginVertical: 20,
        backgroundColor: '#CCCCCC'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LocationScreen;

import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, View, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input } from '@rneui/themed';
import { Formik } from 'formik';
import { Dimensions } from "react-native";
import { setItem } from '../utils/asyncStorage'
import Toast from 'react-native-toast-message';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const ProfileSetupScreen = ({ navigation }) => {
    const handleSaveProfile = async (values) => {
        setItem('profileData', JSON.stringify(values));
        Toast.show({
            type: 'success',
            text1: 'Profile Saved Successfully',
            text2: "This data is stored in your device, we don't collect any data.",
        });
        setIsSubmited(false);
        navigation.navigate('Location');
    };

    const validateForm = (values) => {
        if (!values.age) {
            return { valid: false, msg: 'Age is required' };
        }
        if (!values.gender) {
            return { valid: false, msg: 'Gender is required' };
        }
        if (!values.measurementSystem) {
            return { valid: false, msg: 'Measurement System is required' };
        }
        if (values.measurementSystem === 'imperial') {
            if (!values.heightFeet) {
                return { valid: false, msg: 'Height (Feet) is required' };
            }
            if (!values.heightInches) {
                return { valid: false, msg: 'Height (Inches) is required' };
            }
            if (!values.weightLbs) {
                return { valid: false, msg: 'Weight (lbs) is required' };
            }
        } else if (values.measurementSystem === 'metric') {
            if (!values.heightCm) {
                return { valid: false, msg: 'Height (cm) is required' };
            }
            if (!values.weightKgs) {
                return { valid: false, msg: 'Weight (kgs) is required' };
            }
        }
        return { valid: true, msg: '' };
    };

    const [isSubmited, setIsSubmited] = useState(false);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-indigo-500 px-4'>
            <Text className='text-3xl text-white my-4 pl-2' style={{ ...globalStyles.circularBook }}>Complete Your Profile</Text>
            <Formik
                initialValues={{
                    name: '',
                    age: '',
                    gender: '',
                    measurementSystem: 'imperial',
                    heightFeet: '',
                    heightInches: '',
                    heightCm: '',
                    weightKgs: '',
                    weightLbs: '',
                    allergies: '',
                    healthConditions: '',
                }}
                onSubmit={(values) => {
                    setIsSubmited(true);
                    const { valid, msg } = validateForm(values);
                    if (valid) {
                        handleSaveProfile(values);
                    } else {
                        if (msg) {
                            Toast.show({
                                type: 'error',
                                text1: 'Validation Error',
                                text2: msg,
                            });
                            setIsSubmited(false);
                        }
                    }
                }}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    setFieldValue,
                }) => (
                    <>
                        <Input
                            label="Name (Optional)"
                            placeholder="Enter your name"
                            onChangeText={handleChange('name')}
                            value={values.name}
                            containerStyle={{ ...globalStyles.inputContainer, marginBottom: 0 }}
                            labelStyle={globalStyles.label}
                            inputStyle={globalStyles.input}
                            placeholderTextColor="white"
                            selectionColor="white"
                        />

                        <View style={{ marginBottom: width * 0.030 }}>
                            <Text className='text-base text-white pl-2' style={{ ...globalStyles.circularBook }}>Age</Text>
                            <Picker
                                selectedValue={values.age}
                                style={[styles.picker, { color: 'white' }]}
                                onValueChange={(itemValue) => setFieldValue('age', itemValue)}
                                dropdownIconColor='white'
                            >
                                <Picker.Item label="Select Age" value="" />
                                {Array.from({ length: 91 }, (_, i) => (
                                    <Picker.Item key={i + 10} label={(i + 10).toString()} value={(i + 10).toString()} />
                                ))}
                            </Picker>
                        </View>

                        <View style={{ marginTop: width * 0.030, marginBottom: width * 0.060 }}>
                            <Text className='text-base text-white pl-2' style={{ ...globalStyles.circularBook }}>Gender</Text>
                            <Picker
                                selectedValue={values.gender}
                                style={[styles.picker, { color: 'white' }]}
                                onValueChange={(itemValue) => setFieldValue('gender', itemValue)}
                                dropdownIconColor='white'
                            >
                                <Picker.Item label="Select Gender" value="" />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>

                        <View style={{ ...styles.metricButtonContainer }}>
                            <TouchableOpacity
                                style={{
                                    ...styles.metricButton,
                                    backgroundColor: values.measurementSystem === 'imperial' ? 'white' : 'transparent',
                                    justifyContent: values.measurementSystem === 'imperial' ? 'center' : 'flex-start'
                                }}
                                onPress={() => setFieldValue('measurementSystem', 'imperial')}
                            >
                                <Text className='text-base' style={{ ...styles.metricLabel, color: values.measurementSystem === 'imperial' ? 'black' : 'white' }}>Imperial</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    ...styles.metricButton,
                                    backgroundColor: values.measurementSystem === 'metric' ? 'white' : 'transparent',
                                    justifyContent: values.measurementSystem === 'metric' ? 'center' : 'flex-start'
                                }}
                                onPress={() => setFieldValue('measurementSystem', 'metric')}
                            >
                                <Text className='text-base' style={{ ...styles.metricLabel, marginLeft: 8, color: values.measurementSystem === 'metric' ? 'black' : 'white' }}>Metric</Text>
                            </TouchableOpacity>
                        </View>

                        {values.measurementSystem === 'imperial' ? (
                            <>
                                <View style={{ marginBottom: width * 0.065 }}>
                                    <Text className='text-base text-white pl-2' style={{ ...globalStyles.circularBook }}>Height (Feet)</Text>
                                    <Picker
                                        selectedValue={values.heightFeet}
                                        style={[styles.picker, { color: 'white' }]}
                                        onValueChange={(itemValue) => setFieldValue('heightFeet', itemValue)}
                                        dropdownIconColor="white"
                                    >
                                        <Picker.Item label="Select Height (Feet)" value="" />
                                        {Array.from({ length: 9 }, (_, i) => (
                                            <Picker.Item key={i + 1} label={(i + 1).toString()} value={(i + 1).toString()} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={{ marginBottom: width * 0.065 }}>
                                    <Text className='text-base text-white pl-2' style={{ ...globalStyles.circularBook }}>Height (Inches)</Text>
                                    <Picker
                                        selectedValue={values.heightInches}
                                        style={[styles.picker, { color: 'white' }]}
                                        onValueChange={(itemValue) => setFieldValue('heightInches', itemValue)}
                                        dropdownIconColor="white"
                                    >
                                        <Picker.Item label="Select Height (Inches)" value="" />
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <Picker.Item key={i} label={(i).toString()} value={(i).toString()} />
                                        ))}
                                    </Picker>
                                </View>

                            </>
                        ) : (
                            <View style={{ marginBottom: width * 0.065 }}>
                                <Text className='text-base text-white pl-2' style={{ ...globalStyles.circularBook }}>Height (cm)</Text>
                                <Picker
                                    selectedValue={values.heightCm}
                                    style={[styles.picker, { color: 'white' }]}
                                    onValueChange={(itemValue) => setFieldValue('heightCm', itemValue)}
                                    dropdownIconColor="white"
                                >
                                    <Picker.Item label="Select Height (cm)" value="" />
                                    {Array.from({ length: 201 }, (_, i) => (
                                        <Picker.Item key={i + 100} label={(i + 100).toString()} value={(i + 100).toString()} />
                                    ))}
                                </Picker>
                            </View>
                        )}

                        {values.measurementSystem === 'metric' ? (
                            <View style={{ marginBottom: width * 0.065 }}>
                                <Text className='text-base text-white pl-2' style={{ ...globalStyles.circularBook }}>Weight (kgs)</Text>
                                <Picker
                                    selectedValue={values.weightKgs}
                                    style={[styles.picker, { color: 'white' }]}
                                    onValueChange={(itemValue) => setFieldValue('weightKgs', itemValue)}
                                    dropdownIconColor="white"
                                >
                                    <Picker.Item label="Select Weight (kgs)" value="" />
                                    {Array.from({ length: 201 }, (_, i) => (
                                        <Picker.Item key={i + 30} label={(i + 30).toString()} value={(i + 30).toString()} />
                                    ))}
                                </Picker>
                            </View>

                        ) : (
                            <View style={{ marginBottom: width * 0.065 }}>
                                <Text className='text-base text-white pl-2' style={{ ...globalStyles.circularBook }}>Weight (lbs)</Text>
                                <Picker
                                    selectedValue={values.weightLbs}
                                    style={[styles.picker, { color: 'white' }]}
                                    onValueChange={(itemValue) => setFieldValue('weightLbs', itemValue)}
                                    dropdownIconColor="white"
                                >
                                    <Picker.Item label="Select Weight (lbs)" value="" />
                                    {Array.from({ length: 301 }, (_, i) => (
                                        <Picker.Item key={i + 50} label={(i + 50).toString()} value={(i + 50).toString()} />
                                    ))}
                                </Picker>
                            </View>
                        )}
                        <Input
                            label="Allergies (Optional)"
                            placeholder="(e.g., peanuts, pollen)"
                            onChangeText={handleChange('allergies')}
                            value={values.allergies}
                            containerStyle={globalStyles.inputContainer}
                            labelStyle={globalStyles.label}
                            inputStyle={globalStyles.input}
                            placeholderTextColor="white"
                            selectionColor="white"
                        />
                        <Input
                            label="Health Conditions (Optional)"
                            placeholder="(e.g., asthma, diabetes)"
                            onChangeText={handleChange('healthConditions')}
                            value={values.healthConditions}
                            containerStyle={globalStyles.inputContainer}
                            labelStyle={globalStyles.label}
                            inputStyle={globalStyles.input}
                            placeholderTextColor="white"
                            selectionColor="white"
                        />

                        <TouchableOpacity
                            className='mb-6'
                            style={styles.saveButton}
                            onPress={handleSubmit}
                            disabled={isSubmited ? true : false}
                        >
                            {isSubmited ? (
                                <ActivityIndicator size="small" color="blue" />
                            ) : (
                                <Text style={styles.buttonText}>Save Profile</Text>
                            )}
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    saveButton: {
        backgroundColor: globalStyles.primaryButton,
        width: '100%',
        marginVertical: 20,
    },
    buttonTitle: {
        fontSize: 18,
        fontFamily: globalStyles.circularMedium,
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 3,
    },
    picker: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        ...globalStyles.circularMedium,
    },
    metricButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: width * 0.030,
        marginTop: width * 0.03,
        marginVertical: width * 0.045,
    },
    metricButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: width * 0.006,
        width: width / 4,
        height: height / 20
    },
    metricLabel: {
        ...globalStyles.circularBook
    },
    saveButton: {
        backgroundColor: '#CCCCCC',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignSelf: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileSetupScreen;

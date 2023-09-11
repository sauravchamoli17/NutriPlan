const greetings = [
    "Hello",
    "Hola",
    "Namaste",
    "Bonjour",
    "Ciao",
    "Konnichiwa",
    "Salam",
    "Aloha",
    "Guten Tag",
    "Shalom",
    "Merhaba",
    "Sawubona",
    "Jambo",
    "Szia",
    "Hei",
    "Zdravo",
    "Selamat",
    "Marhaba",
    "Salut",
];

function getRandomGreeting(name) {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    if (name.length == 0)
     return greetings[randomIndex];
    else
     return `${greetings[randomIndex]}, ${name}`;
}

function calculateBMI(data) {
    const { weightKgs, weightLbs, heightCm, heightFeet, heightInches, measurementSystem } = data;
    let weight, height, bmi;

    if (measurementSystem === "metric") {
        weight = parseFloat(weightKgs);
        height = parseFloat(heightCm) / 100;
    } else if (measurementSystem === "imperial") {
        const poundsToKgs = 0.45359237;
        weight = parseFloat(weightLbs) * poundsToKgs;
        const feetToMeters = 0.3048;
        const inchesToMeters = 0.0254;
        const heightInMeters = parseFloat(heightFeet) * feetToMeters + parseFloat(heightInches) * inchesToMeters;
        height = heightInMeters;
    } else {
        throw new Error("Invalid measurement system.");
    }

    if (weight > 0 && height > 0) {
        bmi = (weight / Math.pow(height, 2)).toFixed(2);
        return bmi;
    } else {
        throw new Error("Invalid weight or height.");
    }
}

function bmiStatus(bmi) {
    let weightStatus;
    if (bmi < 18.5) {
        weightStatus = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        weightStatus = "Normal";
    } else if (bmi >= 25 && bmi < 29.9) {
        weightStatus = "Overweight";
    } else {
        weightStatus = "Obese";
    }
    return weightStatus;
}

module.exports = {
    getRandomGreeting,
    calculateBMI,
    bmiStatus
};

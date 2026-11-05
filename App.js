import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  ScrollView
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

// Custom component for each question (photo + Picker)
const QuestionBox = ({ number, imageUrl, options, selectedValue, onValueChange }) => {
  return (
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Question {number}</Text>
        <Image
            source={{ uri: imageUrl }}
            style={{ width: '100%', height: 200, backgroundColor: '#ddd' }}
        />
        //This part is asked on LESSON 06//
        <Text>What car is in this picture?</Text>
        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
        >
          <Picker.Item label="Select an answer..." value="" />
          {options.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
          ))}
        </Picker>
      </View>
  );
};

const MyApp = () => {

  const questions = [
    {
      id: 1,
      imageUrl: 'https://kureansiklopedi.com/_next/image?url=https%3A%2F%2Fcdn.t3pedia.org%2Fmedia%2Fuploads%2F2025%2F05%2F05%2FcmMNMwVWi76dCZ6xky8iLy75gaOnl67U.jpg&w=1280&q=75',
      options: ['Toyota GR Supra', 'Nissan GT-R', 'Acura NSX'],
      answer: 'Toyota GR Supra'
    },
    {
      id: 2,
      imageUrl: 'https://libertywalk.co.jp/wp-content/uploads/2022/10/LB-WORKS-NISSAN-GT-R-R35-type-2.jpg',
      options: ['Acura NSX', 'Nissan GT-R', 'Toyota GR Supra'],
      answer: 'Nissan GT-R'
    },
    {
      id: 3,
      imageUrl: 'https://assets.basta.app/accounts/005fe31d-e133-4f0b-ac58-2c2cd5f3301c/images/5c051d12-ddfe-43c6-89de-64d31ba4b36d?width=2000&quality=75&format=webp',
      options: ['Nissan GT-R', 'Toyota GR Supra', 'Acura NSX'],
      answer: 'Acura NSX'
    }
  ];

  // Declare variables
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");

  const userAnswers = [answer1, answer2, answer3];
  const setters = [setAnswer1, setAnswer2, setAnswer3];

  const submitAnswers = () => {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
        score = score + 1;
      }
    }

    let message = 'You can do better next time.';
    if (score === questions.length) {
      message = 'Well done!';
    } else if (score >= 2) {
      message = 'Good job!';
    }

    Alert.alert(
        'Quiz Results',
        'You got ' + score + ' out of ' + questions.length + ' correct.\n' + message
    );
  };

  return (
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 50 }}>

        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Car Quiz
        </Text>

        {questions.map((q, index) => (
            <QuestionBox
                key={q.id}
                number={index + 1}
                imageUrl={q.imageUrl}
                options={q.options}
                selectedValue={userAnswers[index]}
                onValueChange={(value) => setters[index](value)}
            />
        ))}

        <Button
            title="Submit Answers"
            onPress={submitAnswers}
        />

      </ScrollView>
  );
};

export default MyApp;
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

export default function Main() {
  const navigation = useNavigation();
  return (
    <>
      <Text>Test Text</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
        <Text>Go to Detail</Text>
      </TouchableOpacity>
    </>
  );
}

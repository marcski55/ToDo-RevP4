import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../screens/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  checked: boolean;
  text: string;
}

export default function ItemComponent(props: IProps) {
  const navigation = useNavigation();
  const checkbox = props.checked
    ? 'checkbox-marked-circle-outline'
    : 'checkbox-blank-circle-outline';
  return (
    <View style={styles.addnew}>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name={checkbox}
          color={styles.text.color}
          size={30}
          style={styles.addnewbutton}
        />
      </TouchableOpacity>
      <Text style={styles.card} onPress={() => navigation.navigate('Detail')}>
        {props.text}
      </Text>
    </View>
  );
}

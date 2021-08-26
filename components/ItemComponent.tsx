import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../screens/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Todo } from '../redux/types/ListActionsTypes';

interface IProps {
  item: Todo;
}

export default function ItemComponent(props: IProps) {
  const navigation = useNavigation();
  const checkbox = props.item.checked
    ? 'checkbox-marked-circle-outline'
    : 'checkbox-blank-circle-outline';
  return (
    <View style={styles.cardbox}>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name={checkbox}
          color={styles.text.color}
          size={30}
          style={styles.addnewbutton}
        />
      </TouchableOpacity>
      <Text
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { item: props.item })}
      >
        {props.item.text}
      </Text>
    </View>
  );
}

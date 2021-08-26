import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../screens/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Todo } from '../redux/types/ListActionsTypes';
import { UpdateTodo } from '../redux/actions/ListActions';

interface IProps {
  item: Todo;
}

export default function ItemComponent(props: IProps) {
  const navigation = useNavigation();
  const [checkbox, setCheckbox] = useState('');
  const dispatch = useDispatch();

  const toggleChecked = () => {
    dispatch(
      UpdateTodo({
        id: props.item.id,
        text: props.item.text,
        updatedAt: props.item.updatedAt,
        createdAt: props.item.createdAt,
        checked: !props.item.checked
      })
    );
  };

  useEffect(() =>
    setCheckbox(
      props.item.checked
        ? 'checkbox-marked-circle-outline'
        : 'checkbox-blank-circle-outline'
    )
  );

  return (
    <View style={styles.cardbox}>
      <TouchableOpacity onPress={toggleChecked}>
        <MaterialCommunityIcons
          name={checkbox}
          color={styles.text.color}
          size={30}
          style={styles.addnewbutton}
        />
      </TouchableOpacity>
      <Text
        style={[styles.card, props.item.checked ? styles.checkedtext : null]}
        onPress={() => navigation.navigate('Details', { item: props.item })}
      >
        {props.item.text}
      </Text>
    </View>
  );
}

import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Todo } from '../redux/types/ListActionsTypes';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// ignore missing types complaint from ide
import SimpleDateTime from 'react-simple-timestamp-to-date';
import { useDispatch } from 'react-redux';
import { DeleteTodo, UpdateTodo } from '../redux/actions/ListActions';
import { useNavigation } from '@react-navigation/native';

export default function Detail({ route }: any) {
  const navigation = useNavigation();
  const item = JSON.parse(JSON.stringify(route.params.item));
  const createdstamp = JSON.stringify(item.createdAt);
  let created = createdstamp.replace(/"/g, '');
  if (!created.includes('.')) {
    created = (parseInt(created) / 1000).toString();
  }

  const updatedstamp = JSON.stringify(item.updatedAt);
  let updated = updatedstamp.replace(/"/g, '');
  if (!updated.includes('.')) {
    updated = (parseInt(updated) / 1000).toString();
  }

  const [checkbox, setCheckbox] = useState('');
  const [inputState, setInputState] = React.useState(item.text);
  const dispatch = useDispatch();

  const toggleChecked = () => {
    dispatch(
      UpdateTodo({
        id: item.id,
        text: item.text,
        updatedAt: item.updatedAt,
        createdAt: item.createdAt,
        checked: !item.checked
      })
    );
    navigation.goBack();
  };
  const deleteItem = () => {
    dispatch(DeleteTodo(item.id));
    navigation.goBack();
  };
  const updateItem = () => {
    dispatch(
      UpdateTodo({
        id: item.id,
        text: inputState,
        updatedAt: item.updatedAt,
        createdAt: item.createdAt,
        checked: item.checked
      })
    );
    navigation.goBack();
  };

  useEffect(() =>
    setCheckbox(
      item.checked
        ? 'checkbox-marked-circle-outline'
        : 'checkbox-blank-circle-outline'
    )
  );

  return (
    <KeyboardAvoidingView
      style={styles.root}
      {...(Platform.OS === 'ios' && {
        behavior: 'padding'
      })}
    >
      <View style={styles.detailbtnctr}>
        <TouchableOpacity onPress={toggleChecked}>
          <MaterialCommunityIcons
            name={checkbox}
            color={styles.text.color}
            size={30}
            style={styles.addnewbutton}
          />
        </TouchableOpacity>
        {/* Dangerous deletion w/o confirmation. Fix this! */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Really Delete?', "This action can't be undone.", [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'Yes. Final Answer.',
                onPress: () => {
                  deleteItem();
                }
              }
            ]);
          }}
        >
          <MaterialCommunityIcons
            name='cancel'
            color='#B6AC61'
            size={30}
            style={styles.addnewbutton}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={updateItem}>
          <MaterialCommunityIcons
            name='arrow-up-circle-outline'
            color={styles.text.color}
            size={30}
            style={styles.addnewbutton}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.card, styles.detailtext]}
        multiline={true}
        textAlignVertical='top'
        blurOnSubmit={true}
        returnKeyType='done'
        maxLength={95000}
        onChangeText={(enteredText) => {
          setInputState(enteredText);
        }}
      >
        {item.text}
      </TextInput>
      <Text
        style={[
          styles.card,
          { flex: 0, paddingBottom: Platform.select({ ios: 45 }) }
        ]}
      >
        Created:{' '}
        <SimpleDateTime
          dateFormat='MDY'
          dateSeparator='/'
          timeSeparator=':'
          meridians='1'
        >
          {created}
        </SimpleDateTime>
        {'\n'}
        Last Updated:{' '}
        <SimpleDateTime
          dateFormat='MDY'
          dateSeparator='/'
          timeSeparator=':'
          meridians='1'
        >
          {updated}
        </SimpleDateTime>
      </Text>
    </KeyboardAvoidingView>
  );
}

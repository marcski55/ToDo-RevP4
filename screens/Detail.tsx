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
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { DeleteTodo, UpdateTodo } from '../redux/actions/ListActions';
import { useNavigation } from '@react-navigation/native';
import { formatTimestamp } from './formatTimestamp';
import { convertTextToTimestamp } from './convertTextToTimestamp';

export default function Detail({ route }: any) {
  const navigation = useNavigation();
  const item = JSON.parse(JSON.stringify(route.params.item));
  const createdDate = new Date(
    convertTextToTimestamp(JSON.stringify(item.createdAt))
  );
  const updatedDate = new Date(
    convertTextToTimestamp(JSON.stringify(item.updatedAt))
  );

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
        {'Created: ' + formatTimestamp(createdDate) + '\n'}
        {'Last Updated: ' + formatTimestamp(updatedDate)}
      </Text>
    </KeyboardAvoidingView>
  );
}

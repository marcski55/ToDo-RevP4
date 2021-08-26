import React from 'react';
import {
  Keyboard,
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

export default function Detail({ route }: any) {
  const item = JSON.parse(JSON.stringify(route.params.item));
  // const [keyboardState, setKeyboardState] = React.useState(false);
  const createdstamp = JSON.stringify(item.createdAt);
  const created = createdstamp.substring(1, createdstamp.length - 1);
  const updatedstamp = JSON.stringify(item.updatedAt);
  const updated = updatedstamp.substring(1, updatedstamp.length - 1);

  // Keyboard.addListener('keyboardWillShow', () => {
  //   setKeyboardState(true);
  // });
  // Keyboard.addListener('keyboardWillHide', () => {
  //   setKeyboardState(false);
  // });

  return (
    <KeyboardAvoidingView
      style={styles.root}
      {...(Platform.OS === 'ios' && {
        behavior: 'padding'
      })}
    >
      <View style={styles.detailbtnctr}>
        {item.checked ? (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name='checkbox-marked-circle-outline'
              color={styles.text.color}
              size={30}
              style={styles.addnewbutton}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <MaterialCommunityIcons
              name='checkbox-blank-circle-outline'
              color={styles.text.color}
              size={30}
              style={styles.addnewbutton}
            />
          </TouchableOpacity>
        )}
        {/* {Platform.OS === 'ios' && keyboardState && (
          <TouchableOpacity onPress={Keyboard.dismiss}>
            <MaterialCommunityIcons
              name='keyboard-off-outline'
              color={styles.text.color}
              size={30}
              style={styles.addnewbutton}
            />
          </TouchableOpacity>
        )} */}
        <TouchableOpacity>
          <MaterialCommunityIcons
            name='delete-circle'
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

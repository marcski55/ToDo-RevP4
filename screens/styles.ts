import { StyleSheet, Platform } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

const PALETTE = {
  primary: '#6B7B9A',
  background: '#2F3C57',
  card: '#465779',
  text: '#C6D0E5',
  notification: '#5B477C',
  border: '#7F6D9D'
};

const BASEFONTSIZE = 18;
const DEFAULTPADDING = 15;
const DEFAULTMARGIN = 15;

export const mainTheme = {
  ...DefaultTheme,
  dark: true,
  colors: PALETTE
};

const styles = StyleSheet.create({
  addnew: {
    flexDirection: 'row',
    paddingBottom: DEFAULTPADDING,
    marginBottom: Platform.select({ ios: 30 })
  },
  addnewbutton: {
    flex: 1,
    padding: DEFAULTPADDING,
    marginTop: 10
  },
  card: {
    backgroundColor: PALETTE.card,
    color: PALETTE.text,
    padding: DEFAULTPADDING,
    marginTop: DEFAULTMARGIN,
    fontSize: BASEFONTSIZE,
    flex: 1
  },
  cardbox: {
    flexDirection: 'row'
  },
  detailbtnctr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Platform.select({ ios: 65, android: 70 })
  },
  detailtext: {
    paddingTop: Platform.select({ ios: DEFAULTPADDING })
  },
  input: {
    backgroundColor: PALETTE.text,
    color: PALETTE.card,
    padding: DEFAULTPADDING,
    marginTop: DEFAULTMARGIN,
    fontSize: BASEFONTSIZE,
    flex: 1
  },
  placeholder: {
    color: PALETTE.notification
  },
  root: {
    backgroundColor: PALETTE.background,
    flex: 1
  },
  text: {
    color: PALETTE.text,
    fontSize: BASEFONTSIZE
  }
});

export default styles;

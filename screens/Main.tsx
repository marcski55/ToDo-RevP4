import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStore } from '../redux/store/store';
import styles from './styles';
import { GetAllTodos } from '../redux/actions/ListActions';
import LoadingComponent from '../components/LoadingComponent';
import ItemComponent from '../components/ItemComponent';

export default function Main() {
  const [isFetching, setIsFetching] = React.useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // get all items from db
  const fetchData = () => {
    dispatch(GetAllTodos());
    setIsFetching(false);
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  React.useEffect(() => {
    onRefresh();
  }, []);

  const todoState = useSelector((state: RootStore) => state.list);

  if (todoState.loading === true) {
    return <LoadingComponent />;
  } else {
    return (
      <KeyboardAvoidingView style={styles.root}>
        <ItemComponent checked={true} text='This is an item' />
        <View style={styles.addnew}>
          <TextInput
            placeholder='What needs doing?'
            placeholderTextColor={styles.placeholder.color}
            style={styles.input}
          />
          <TouchableOpacity>
            <MaterialCommunityIcons
              name='plus-circle'
              color={styles.text.color}
              size={30}
              style={styles.addnewbutton}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

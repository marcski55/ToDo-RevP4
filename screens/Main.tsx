import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStore } from '../redux/store/store';
import styles from './styles';
import { GetAllTodos, PostTodo } from '../redux/actions/ListActions';
import LoadingComponent from '../components/LoadingComponent';
import ItemComponent from '../components/ItemComponent';

export default function Main() {
  const [isFetching, setIsFetching] = React.useState(false);
  const [inputState, setInputState] = React.useState('');
  const dispatch = useDispatch();

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

  const addItem = () => {
    dispatch(PostTodo(inputState));
  };

  const todoState = useSelector((state: RootStore) => state.list);
  const renderItem = ({ item }: { item: any }) => <ItemComponent item={item} />;

  if (todoState.loading === true) {
    return <LoadingComponent />;
  } else {
    return (
      <>
        <SafeAreaView style={styles.root}>
          {/* <ItemComponent checked={true} text='This is an item' /> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={todoState.list?.sort((a, b) => (a.text > b.text ? 1 : -1))}
            renderItem={renderItem}
            ListEmptyComponent={null}
            onRefresh={onRefresh}
            refreshing={isFetching}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <KeyboardAvoidingView
          style={styles.addnew}
          {...(Platform.OS === 'ios' && {
            behavior: 'padding',
            keyboardVerticalOffset: 100
          })}
        >
          <TextInput
            placeholder='What needs doing?'
            placeholderTextColor={styles.placeholder.color}
            style={styles.input}
            returnKeyType='done'
            maxLength={95000}
            onChangeText={(enteredText) => {
              setInputState(enteredText);
            }}
          />
          <TouchableOpacity onPress={addItem}>
            <MaterialCommunityIcons
              name='arrow-up-circle-outline'
              color={styles.text.color}
              size={30}
              style={styles.addnewbutton}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </>
    );
  }
}

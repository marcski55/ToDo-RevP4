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
import { convertTextToTimestamp } from './convertTextToTimestamp';

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
          {/* 
            The filter, sort, and flat work together to separate the list into
            complete and incomplete, then sort each section by date. The flat
            is needed as data needs no nesting to work.
          */}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={[
              todoState.list
                ?.filter((elem) => !elem.checked)
                .sort((a, b) =>
                  convertTextToTimestamp(JSON.stringify(a.updatedAt)) >
                  convertTextToTimestamp(JSON.stringify(b.updatedAt))
                    ? 1
                    : -1
                ),
              todoState.list
                ?.filter((elem) => elem.checked)
                .sort((a, b) =>
                  convertTextToTimestamp(JSON.stringify(a.updatedAt)) >
                  convertTextToTimestamp(JSON.stringify(b.updatedAt))
                    ? 1
                    : -1
                )
            ].flat()}
            renderItem={renderItem}
            ListEmptyComponent={null}
            onRefresh={onRefresh}
            refreshing={isFetching}
            keyExtractor={(item) => item.text}
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

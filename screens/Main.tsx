import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
  SafeAreaView,
  Platform
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
            data={todoState.list?.sort((a, b) =>
              Number(a.updatedAt) < Number(b.updatedAt) ? 1 : -1
            )}
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
          />
          <TouchableOpacity>
            <MaterialCommunityIcons
              name='plus-circle'
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

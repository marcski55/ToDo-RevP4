import { mount } from 'enzyme';
import React from 'react';
import { View, Text, TextInputComponent, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemComponent from '../components/ItemComponent';
import testItem from './TestItem';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate
  })
}));

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}));

let wrapper: any;
describe('test item component', () => {
  beforeEach(() => {
    wrapper = mount(<ItemComponent item={testItem} />);
  });

  it('should be there', () => {
    expect(wrapper).not.toBe(undefined);
  });

  it('should have correct text', () => {
    expect(
      wrapper.contains(
        <View>
          <Text>{testItem.text}</Text>
        </View>
      )
    ).toBeTruthy;
  });

  it('should have chosen the correct checkbox', () => {
    const checkbox = testItem.checked
      ? 'checkbox-marked-circle-outline'
      : 'checkbox-blank-circle-outline';
    expect(wrapper.contains(<MaterialCommunityIcons name={checkbox} />))
      .toBeTruthy;
  });
});

import { mount } from 'enzyme';
import React from 'react';
import { TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Detail from '../screens/Detail';
import { testItem } from './TestItem';

const route = {
  params: {
    item: testItem
  }
};

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
    wrapper = mount(<Detail route={route} />);
  });

  it('should be there', () => {
    expect(wrapper).not.toBe(undefined);
  });

  it('should have correct text', () => {
    expect(wrapper.contains(<TextInput>{testItem.text}</TextInput>)).toBeTruthy;
  });

  it('should have chosen the correct checkbox', () => {
    const checkbox = testItem.checked
      ? 'checkbox-marked-circle-outline'
      : 'checkbox-blank-circle-outline';
    expect(wrapper.contains(<MaterialCommunityIcons name={checkbox} />))
      .toBeTruthy;
  });
});

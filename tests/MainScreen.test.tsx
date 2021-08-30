import { mount, shallow } from 'enzyme';
import React from 'react';
import { TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Main from '../screens/Main';
import { testItem } from './TestItem';

const mockSelector = jest.fn();
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector
}));

let wrapper: any;
describe('test item component', () => {
  beforeEach(() => {
    wrapper = mount(<Main />);
  });

  it('should be there', () => {
    expect(wrapper).not.toBe(undefined);
  });

  it('should have a text entry box', () => {
    expect(wrapper.contains(<TextInput></TextInput>)).toBeTruthy;
  });

  // it('should have chosen the correct checkbox', () => {
  //   const checkbox = testItem.checked
  //     ? 'checkbox-marked-circle-outline'
  //     : 'checkbox-blank-circle-outline';
  //   expect(wrapper.contains(<MaterialCommunityIcons name={checkbox} />))
  //     .toBeTruthy;
  // });
});

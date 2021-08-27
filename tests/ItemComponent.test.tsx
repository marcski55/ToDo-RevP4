import { mount } from 'enzyme';
import React from 'react';
import { View, Text, TextInputComponent, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemComponent from '../components/ItemComponent';
import { testItem, testItem2 } from './TestItem';

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
let wrapper2: any;
describe('test item component', () => {
  beforeEach(() => {
    wrapper = mount(<ItemComponent item={testItem} />);
    wrapper2 = mount(<ItemComponent item={testItem2} />);
  });

  it('should be there', () => {
    expect(wrapper).not.toBe(undefined);
    expect(wrapper2).not.toBe(undefined);
  });

  it('should have correct text', () => {
    expect(
      wrapper.contains(
        <View>
          <Text>{testItem.text}</Text>
        </View>
      )
    ).toBeTruthy;
    expect(
      wrapper2.contains(
        <View>
          <Text>{testItem2.text}</Text>
        </View>
      )
    ).toBeTruthy;
  });

  it('should have chosen the correct checkbox', () => {
    const checkbox = testItem.checked
      ? 'checkbox-marked-circle-outline'
      : 'checkbox-blank-circle-outline';
    const checkbox2 = testItem.checked
      ? 'checkbox-marked-circle-outline'
      : 'checkbox-blank-circle-outline';
    expect(wrapper.contains(<MaterialCommunityIcons name={checkbox} />))
      .toBeTruthy;
    expect(wrapper2.contains(<MaterialCommunityIcons name={checkbox2} />))
      .toBeTruthy;
  });

  it('should try to navigate to details screen', () => {
    wrapper.find('Text').at(0).simulate('click');
    expect(mockNavigate).toHaveBeenCalled;
  });

  it('should try to update checked status', () => {
    wrapper.find('View').at(0).simulate('click');
    expect(mockDispatch).toHaveBeenCalled;
  });
});

import { mount } from 'enzyme';
import { View, Image } from 'react-native';
import LoadingComponent from '../components/LoadingComponent';

let wrapper: any;
describe('test item component', () => {
  beforeEach(() => {
    wrapper = mount(<LoadingComponent />);
  });

  it('should be there', () => {
    expect(wrapper).not.toBe(undefined);
  });

  it('should have image', () => {
    expect(
      wrapper.contains(
        <View>
          <Image source={require('../assets/preloader.gif')} />
        </View>
      )
    ).toBeTruthy;
  });
});

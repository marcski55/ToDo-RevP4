import { mount } from 'enzyme';
import LoadingComponent from '../components/LoadingComponent';

let wrapper: any;
describe('test item component', () => {
  beforeEach(() => {
    wrapper = mount(<LoadingComponent />);
  });

  it('should be there', () => {
    expect(wrapper).not.toBe(undefined);
  });
});

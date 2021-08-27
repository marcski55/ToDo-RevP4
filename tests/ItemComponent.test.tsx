import { mount } from 'enzyme';
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
});

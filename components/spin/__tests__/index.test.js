import { mount } from '@vue/test-utils';
import { asyncExpect } from '@/tests/utils';
import Spin from '..';

describe('Spin', () => {
  it('should only affect the spin element when set style to a nested <Spin>xx</Spin>', () => {
    const wrapper = mount({
      render() {
        return (
          <Spin style={{ background: 'red' }}>
            <div>content</div>
          </Spin>
        );
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    // expect(wrapper.findAll('.ant-spin-nested-loading').at(0).prop('style')).toBe(null)
    // expect(wrapper.findAll('.ant-spin').at(0).prop('style').background).toBe('red')
  });

  it("should render custom indicator when it's set", () => {
    // const customIndicator = <div className='custom-indicator' />
    const wrapper = mount({
      render() {
        return (
          <Spin>
            <div slot="indicator" class="custom-indicator" />
          </Spin>
        );
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render with delay when it's mounted with spinning=true and delay", async () => {
    const props = {
      propsData: {
        delay: 500,
        spinning: true,
      },
      sync: false,
    };
    const wrapper = mount(Spin, props);
    await asyncExpect(() => {
      expect(
        wrapper
          .find('.gov-spin')
          .classes()
          .includes('gov-spin-spinning'),
      ).toEqual(false);
    });
  });

  it('should be controlled by spinning', async () => {
    const props = {
      propsData: {
        spinning: false,
      },
      sync: false,
    };
    const wrapper = mount(Spin, props);
    await asyncExpect(() => {
      expect(wrapper.vm.sSpinning).toBe(false);
      wrapper.setProps({ spinning: true });
    });
    await asyncExpect(() => {
      expect(wrapper.vm.sSpinning).toBe(true);
    });
  });
});

import { mount } from '@vue/test-utils';
import { asyncExpect } from '@/tests/utils';
import Avatar from '..';

describe('Avatar Render', () => {
  it('Render long string correctly', () => {
    const wrapper = mount(Avatar, {
      slots: {
        default: 'TestString',
      },
    });
    const children = wrapper.findAll('.gov-avatar-string');
    expect(children.length).toBe(1);
  });
  it('should render fallback string correctly', async () => {
    global.document.body.innerHTML = '';
    const wrapper = mount(Avatar, {
      slots: {
        default: 'Fallback',
      },
      propsData: {
        src: 'http://error.url',
      },
      sync: false,
      attachToDocument: true,
    });
    wrapper.vm.setScale = jest.fn(() => {
      wrapper.setData({ scale: 0.5 });
      wrapper.vm.$forceUpdate();
    });
    await asyncExpect(() => {
      wrapper.find('img').trigger('error');
    }, 0);
    await asyncExpect(() => {
      const children = wrapper.findAll('.gov-avatar-string');
      expect(children.length).toBe(1);
      expect(children.at(0).text()).toBe('Fallback');
      expect(wrapper.vm.setScale).toBeCalled();
    });
    await asyncExpect(() => {
      expect(global.document.body.querySelector('.gov-avatar-string').style.transform).toContain(
        'scale(0.5)',
      );
      global.document.body.innerHTML = '';
    }, 0);
  });
  it('should handle onError correctly', () => {
    global.document.body.innerHTML = '';
    const LOAD_FAILURE_SRC = 'http://error.url';
    const LOAD_SUCCESS_SRC = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

    const Foo = {
      data() {
        return {
          src: LOAD_FAILURE_SRC,
        };
      },
      methods: {
        handleImgError() {
          this.src = LOAD_SUCCESS_SRC;
          return false;
        },
      },

      render() {
        const { src } = this;
        return <Avatar src={src} loadError={this.handleImgError} />;
      },
    };

    const wrapper = mount(Foo, { attachToDocument: true });
    // mock img load Error, since jsdom do not load resource by default
    // https://github.com/jsdom/jsdom/issues/1816
    wrapper.find('img').trigger('error');

    expect(wrapper.find({ name: 'AAvatar' }).vm.isImgExist).toBe(true);
    expect(global.document.body.querySelector('img').getAttribute('src')).toBe(LOAD_SUCCESS_SRC);
  });
});

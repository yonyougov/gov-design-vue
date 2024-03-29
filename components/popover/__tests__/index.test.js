import { mount } from '@vue/test-utils';
import { asyncExpect } from '@/tests/utils';
import Popover from '..';

describe('Popover', () => {
  it('should show overlay when trigger is clicked', async () => {
    const popover = mount(
      {
        render() {
          return (
            <Popover
              ref="popover"
              content="console.log('hello world')"
              title="code"
              trigger="click"
            >
              <span>show me your code</span>
            </Popover>
          );
        },
      },
      { sync: false },
    );
    await asyncExpect(() => {
      expect(popover.vm.$refs.popover.getPopupDomNode()).toBe(null);

      popover.find('span').trigger('click');
    }, 0);
    let popup = null;
    await asyncExpect(() => {
      popup = popover.vm.$refs.popover.getPopupDomNode();
      expect(popup).not.toBe(null);
      expect(popup.className).toContain('gov-popover-placement-top');
    }, 1000);
    await asyncExpect(() => {
      expect(popup.innerHTML).toMatchSnapshot();
      expect(popup.innerHTML).toMatchSnapshot();
    });
    await asyncExpect(() => {});
  });
});

import { asyncExpect } from '@/tests/utils';
import notification from '..';

describe('Notification.placement', () => {
  afterEach(() => notification.destroy());

  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  function getStyle(el, prop) {
    const style = window.getComputedStyle ? window.getComputedStyle(el) : el.currentStyle;

    // If a css property's value is `auto`, it will return an empty string.
    return prop ? style[prop] : style;
  }

  function open(args) {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
      ...args,
    });
  }

  function config(args) {
    notification.config({
      ...args,
    });
    open();
  }

  it('change notification placement by `open` method', async () => {
    const defaultTop = '24px';
    const defaultBottom = '24px';
    let style;

    // topLeft
    open({
      placement: 'topLeft',
    });
    await asyncExpect(() => {
      style = getStyle($$('.gov-notification-topLeft')[0]);
      expect(style.top).toBe(defaultTop);
      expect(style.left).toBe('0px');
      expect(style.bottom).toBe('');
    });
    open({
      placement: 'topLeft',
    });
    await asyncExpect(() => {
      expect($$('.gov-notification-topLeft').length).toBe(1);
    });
    // topRight
    open({
      placement: 'topRight',
    });
    await asyncExpect(() => {
      style = getStyle($$('.gov-notification-topRight')[0]);
      expect(style.top).toBe(defaultTop);
      expect(style.right).toBe('0px');
      expect(style.bottom).toBe('');
    });
    open({
      placement: 'topRight',
    });
    await asyncExpect(() => {
      expect($$('.gov-notification-topRight').length).toBe(1);
    });
    // bottomRight
    open({
      placement: 'bottomRight',
    });
    await asyncExpect(() => {
      style = getStyle($$('.gov-notification-bottomRight')[0]);
      expect(style.top).toBe('');
      expect(style.right).toBe('0px');
      expect(style.bottom).toBe(defaultBottom);
    });
    open({
      placement: 'bottomRight',
    });
    await asyncExpect(() => {
      expect($$('.gov-notification-bottomRight').length).toBe(1);
    });
    // bottomLeft
    open({
      placement: 'bottomLeft',
    });
    await asyncExpect(() => {
      style = getStyle($$('.gov-notification-bottomLeft')[0]);
      expect(style.top).toBe('');
      expect(style.left).toBe('0px');
      expect(style.bottom).toBe(defaultBottom);
    });
    open({
      placement: 'bottomLeft',
    });
    await asyncExpect(() => {
      expect($$('.gov-notification-bottomLeft').length).toBe(1);
    });
    await asyncExpect(() => {});
    await asyncExpect(() => {});
  });

  it('change notification placement by `config` method', () => {
    let style;

    // topLeft
    config({
      placement: 'topLeft',
      top: '50px',
      bottom: '50px',
    });
    style = getStyle($$('.gov-notification-topLeft')[0]);
    expect(style.top).toBe('50px');
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe('');

    // topRight
    config({
      placement: 'topRight',
      top: '100px',
      bottom: '50px',
    });
    style = getStyle($$('.gov-notification-topRight')[0]);
    expect(style.top).toBe('100px');
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe('');

    // bottomRight
    config({
      placement: 'bottomRight',
      top: '50px',
      bottom: '100px',
    });
    style = getStyle($$('.gov-notification-bottomRight')[0]);
    expect(style.top).toBe('');
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe('100px');

    // bottomLeft
    config({
      placement: 'bottomLeft',
      top: 100,
      bottom: 50,
    });
    style = getStyle($$('.gov-notification-bottomLeft')[0]);
    expect(style.top).toBe('');
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe('50px');
  });
  it('change notification mountNode by `config` method', () => {
    const $container = document.createElement('div');
    document.body.appendChild($container);
    config({
      top: '50px',
      bottom: '100px',
      getContainer() {
        return $container;
      },
    });
    expect($container.querySelector('.gov-notification')).not.toBe(null);
    $container.remove();
  });
});

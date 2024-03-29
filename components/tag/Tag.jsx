import PropTypes from '../_util/vue-types';
import Icon from '../icon';
import getTransitionProps from '../_util/getTransitionProps';
import omit from 'omit.js';
import Wave from '../_util/wave';
import { hasProp } from '../_util/props-util';
import BaseMixin from '../_util/BaseMixin';

export default {
  name: 'ATag',
  mixins: [BaseMixin],
  model: {
    prop: 'visible',
    event: 'close.visible',
  },
  props: {
    prefixCls: PropTypes.string.def('gov-tag'),
    color: PropTypes.string,
    closable: PropTypes.bool.def(false),
    visible: PropTypes.bool,
    afterClose: PropTypes.func,
  },
  data() {
    let _visible = true;
    if (hasProp(this, 'visible')) {
      _visible = this.visible;
    }
    return {
      _visible,
    };
  },
  watch: {
    visible(val) {
      this.setState({
        _visible: val,
      });
    },
  },
  methods: {
    setVisible(visible, e) {
      this.$emit('close', e);
      this.$emit('close.visible', false);
      if (e.defaultPrevented) {
        return;
      }
      if (!hasProp(this, 'visible')) {
        this.setState({ _visible: visible });
      }
    },

    handleIconClick(e) {
      this.setVisible(false, e);
    },

    animationEnd() {
      const afterClose = this.afterClose;
      if (afterClose) {
        afterClose();
      }
    },

    isPresetColor(color) {
      if (!color) {
        return false;
      }
      return /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(
        color,
      );
    },
    getTagStyle() {
      const { color } = this.$props;
      const isPresetColor = this.isPresetColor(color);
      return {
        backgroundColor: color && !isPresetColor ? color : undefined,
      };
    },

    getTagClassName() {
      const { prefixCls, color } = this.$props;
      const isPresetColor = this.isPresetColor(color);
      return {
        [prefixCls]: true,
        [`${prefixCls}-${color}`]: isPresetColor,
        [`${prefixCls}-has-color`]: color && !isPresetColor,
      };
    },

    renderCloseIcon() {
      const { closable } = this.$props;
      return closable ? <Icon type="close" onClick={this.handleIconClick} /> : null;
    },
  },

  render() {
    const { prefixCls } = this.$props;
    const { _visible: visible } = this.$data;
    const tag = (
      <div
        v-show={visible}
        {...{ on: omit(this.$listeners, ['close']) }}
        class={this.getTagClassName()}
        style={this.getTagStyle()}
      >
        {this.$slots.default}
        {this.renderCloseIcon()}
      </div>
    );
    const transitionProps = getTransitionProps(`${prefixCls}-zoom`, {
      appear: false,
      afterLeave: this.animationEnd,
    });
    return (
      <Wave>
        <transition {...transitionProps}>{tag}</transition>
      </Wave>
    );
  },
};

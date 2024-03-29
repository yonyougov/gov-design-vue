import PropTypes from '../_util/vue-types';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import { initDefaultProps, filterEmpty, getComponentFromProp } from '../_util/props-util';
import { cloneElement } from '../_util/vnode';
import getTransitionProps from '../_util/getTransitionProps';
import isNumeric from '../_util/isNumeric';

export const BadgeProps = {
  /** Number to show in badge */
  count: PropTypes.any,
  showZero: PropTypes.bool,
  /** Max count to show */
  overflowCount: PropTypes.number,
  /** whether to show red dot without number */
  dot: PropTypes.bool,
  prefixCls: PropTypes.string,
  scrollNumberPrefixCls: PropTypes.string,
  status: PropTypes.oneOf(['success', 'processing', 'default', 'error', 'warning']),
  text: PropTypes.string,
  offset: PropTypes.array,
  numberStyle: PropTypes.object.def({}),
  title: PropTypes.string,
};

export default {
  name: 'ABadge',
  props: initDefaultProps(BadgeProps, {
    prefixCls: 'gov-badge',
    scrollNumberPrefixCls: 'gov-scroll-number',
    showZero: false,
    dot: false,
    overflowCount: 99,
  }),
  methods: {
    getBadgeClassName() {
      const { prefixCls, status } = this.$props;
      const children = filterEmpty(this.$slots.default);
      return classNames(prefixCls, {
        [`${prefixCls}-status`]: !!status,
        [`${prefixCls}-not-a-wrapper`]: !children.length,
      });
    },

    isZero() {
      const numberedDispayCount = this.getNumberedDispayCount();
      return numberedDispayCount === '0' || numberedDispayCount === 0;
    },

    isDot() {
      const { dot, status } = this.$props;
      const isZero = this.isZero();
      return (dot && !isZero) || status;
    },

    isHidden() {
      const { showZero } = this.$props;
      const displayCount = this.getDispayCount();
      const isZero = this.isZero();
      const isDot = this.isDot();
      const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
      return (isEmpty || (isZero && !showZero)) && !isDot;
    },

    getNumberedDispayCount() {
      const { overflowCount } = this.$props;
      const count = this.badgeCount;
      const displayCount = count > overflowCount ? `${overflowCount}+` : count;
      return displayCount;
    },

    getDispayCount() {
      const isDot = this.isDot();
      // dot mode don't need count
      if (isDot) {
        return '';
      }
      return this.getNumberedDispayCount();
    },

    getScollNumberTitle() {
      const { title } = this.$props;
      const count = this.badgeCount;
      if (title) {
        return title;
      }
      return typeof count === 'string' || typeof count === 'number' ? count : undefined;
    },

    getStyleWithOffset() {
      const { offset, numberStyle } = this.$props;
      return offset
        ? {
            right: `${-parseInt(offset[0], 10)}px`,
            marginTop: isNumeric(offset[1]) ? `${offset[1]}px` : offset[1],
            ...numberStyle,
          }
        : numberStyle;
    },

    renderStatusText() {
      const { prefixCls, text } = this.$props;
      const hidden = this.isHidden();
      return hidden || !text ? null : <span class={`${prefixCls}-status-text`}>{text}</span>;
    },

    renderDispayComponent() {
      const count = this.badgeCount;
      const customNode = count;
      if (!customNode || typeof customNode !== 'object') {
        return undefined;
      }
      return cloneElement(customNode, {
        style: this.getStyleWithOffset(),
      });
    },

    renderBadgeNumber() {
      const { prefixCls, scrollNumberPrefixCls, status } = this.$props;
      const count = this.badgeCount;
      const displayCount = this.getDispayCount();
      const isDot = this.isDot();
      const hidden = this.isHidden();

      const scrollNumberCls = {
        [`${prefixCls}-dot`]: isDot,
        [`${prefixCls}-count`]: !isDot,
        [`${prefixCls}-multiple-words`]:
          !isDot && count && count.toString && count.toString().length > 1,
        [`${prefixCls}-status-${status}`]: !!status,
      };

      return hidden ? null : (
        <ScrollNumber
          prefixCls={scrollNumberPrefixCls}
          data-show={!hidden}
          v-show={!hidden}
          className={scrollNumberCls}
          count={displayCount}
          displayComponent={this.renderDispayComponent()} // <Badge status="success" count={<Icon type="xxx" />}></Badge>
          title={this.getScollNumberTitle()}
          style={this.getStyleWithOffset()}
          key="scrollNumber"
        />
      );
    },
  },

  render() {
    const { prefixCls, status, text, $slots } = this;
    const children = filterEmpty($slots.default);
    let count = getComponentFromProp(this, 'count');
    if (Array.isArray(count)) {
      count = count[0];
    }
    this.badgeCount = count;
    const scrollNumber = this.renderBadgeNumber();
    const statusText = this.renderStatusText();
    const statusCls = classNames({
      [`${prefixCls}-status-dot`]: !!status,
      [`${prefixCls}-status-${status}`]: !!status,
    });

    // <Badge status="success" />
    if (!children.length && status) {
      return (
        <span
          {...{ on: this.$listeners }}
          class={this.getBadgeClassName()}
          style={this.getStyleWithOffset()}
        >
          <span class={statusCls} />
          <span class={`${prefixCls}-status-text`}>{text}</span>
        </span>
      );
    }

    const transitionProps = getTransitionProps(children.length ? `${prefixCls}-zoom` : '');

    return (
      <span {...{ on: this.$listeners }} class={this.getBadgeClassName()}>
        {children}
        <transition {...transitionProps}>{scrollNumber}</transition>
        {statusText}
      </span>
    );
  },
};

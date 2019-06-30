import PropTypes from '../_util/vue-types';

export default {
  name: 'ACardGrid',
  __GOV_CARD_GRID: true,
  props: {
    prefixCls: PropTypes.string.def('gov-card'),
  },
  render() {
    const { prefixCls = 'gov-card' } = this.$props;
    const classString = {
      [`${prefixCls}-grid`]: true,
    };
    return (
      <div {...{ on: this.$listeners }} class={classString}>
        {this.$slots.default}
      </div>
    );
  },
};

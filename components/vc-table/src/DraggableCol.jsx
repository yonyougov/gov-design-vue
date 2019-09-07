import PropTypes from '../../_util/vue-types';
import warning from '../../_util/warning';
import Vue from 'vue';

export default {
  name: 'DraggableCol',
  props: {
    dataIndex: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  },
  inject: {
    table: { default: () => ({}) },
    colWidthHash: 'colWidthHash',
  },
  created() {
    const key = this.getElementKey();
    const { resizable } = this.table;
    let width;

    if (typeof this.width === 'number') {
      width = this.width;
    } else if (typeof this.width === 'string') {
      if (this.width.includes('px')) {
        width = Number(this.width.replace('px'));
      } else if (this.width.includes('%')) {
        width = this.width;
      }
    }
    // TODO: make keys reactive earlier to reduce rerender
    Vue.set(this.colWidthHash, key, width);
  },
  methods: {
    getElementKey() {
      const { key = this.dataIndex } = this.$vnode.data || {};
      warning(key, 'DraggableCol should has a key to work properly');
      return key || this.index;
    },
  },
  render() {
    const style = {};
    const key = this.getElementKey();
    const width = this.colWidthHash[key];

    if (width) {
      if (typeof width === 'number') {
        style.width = `${width}px`;
      } else {
        style.width = width;
      }
    }
    const minWidth = this.width;
    style.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    return <col key={key} style={style} />;
  },
};

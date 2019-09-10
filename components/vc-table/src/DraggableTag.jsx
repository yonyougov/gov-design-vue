import PropTypes from '../../_util/vue-types';
import warning from '../../_util/warning';
import { colWidthHash } from './DraggableCol';

export default {
  name: 'DraggableTag',
  props: {
    hashKey: PropTypes.string.isRequired,
  },
  inject: ['colWidthHash'],
  data() {
    return {
      mouseDown: false,
      clientX: 0,
      w: this.colWidthHash[this.hashKey],
    };
  },
  mounted() {
    this.$refs.dragger.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    this.$refs.dragger.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeDestroy() {
    this.$refs.dragger.removeEventListener('mousedown', this.handleMouseDown);
    document && document.removeEventListener('mouseup', this.handleMouseUp);
    this.$refs.dragger.removeEventListener('mousemove', this.handleMouseMove);
  },
  methods: {
    handleMouseDown(e) {
      this.mouseDown = true;
      this.clientX = e.clientX;
    },
    handleMouseUp(e) {
      this.mouseDown = false;
      this.clientX = 0;
      this.w = this.colWidthHash[this.hashKey];
    },
    handleMouseMove(e) {
      if (!this.mouseDown) {
        return;
      }
      const { clientX } = e;
      const delta = clientX - this.clientX;
      this.colWidthHash[this.hashKey] = this.w + delta;
    },
  },
  render() {
    const style = {
      position: 'absolute',
      height: '100%',
      width: '16px',
      top: 0,
      right: '-8px',
      cursor: 'ew-resize',
      zIndex: '10000',
    };
    return <div style={style} ref="dragger" />;
  },
};

import PropTypes from '../../_util/vue-types';
import DraggableCol from './DraggableCol';

export default {
  name: 'ColGroup',
  props: {
    fixed: PropTypes.string,
    columns: PropTypes.array,
  },
  inject: {
    table: { default: () => ({}) },
  },
  render() {
    const { fixed, table } = this;
    const { prefixCls, expandIconAsCell, columnManager } = table;

    let cols = [];

    if (expandIconAsCell && fixed !== 'right') {
      cols.push(<col class={`${prefixCls}-expand-icon-col`} key="rc-table-expand-icon-col" />);
    }

    let leafColumns;

    if (fixed === 'left') {
      leafColumns = columnManager.leftLeafColumns();
    } else if (fixed === 'right') {
      leafColumns = columnManager.rightLeafColumns();
    } else {
      leafColumns = columnManager.leafColumns();
    }
    cols = cols.concat(
      leafColumns.map((c, i) => <DraggableCol key={c.key || c.dataIndex || i} width={c.width} />),
    );
    return <colgroup>{cols}</colgroup>;
  },
};

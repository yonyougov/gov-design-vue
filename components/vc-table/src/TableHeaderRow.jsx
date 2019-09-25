import classNames from 'classnames';
import PropTypes from '../../_util/vue-types';
import { connect } from '../../_util/store';
import { mergeProps } from '../../_util/props-util';
import DraggableTag from './DraggableTag';

const TableHeaderRow = {
  props: {
    index: PropTypes.number,
    fixed: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    row: PropTypes.array,
    components: PropTypes.object,
    height: PropTypes.any,
    customHeaderRow: PropTypes.func,
    prefixCls: PropTypes.prefixCls,
  },
  name: 'TableHeaderRow',
  inject: ['colWidthHash'],
  render(h) {
    const { row, index, height, components, customHeaderRow, prefixCls } = this;
    const HeaderRow = components.header.row;
    const HeaderCell = components.header.cell;
    const rowProps = customHeaderRow(row.map(cell => cell.column), index);
    const customStyle = rowProps ? rowProps.style : {};
    // 这里的bg-color通过style的设置，否则表头样式会有横线问题
    const style = { height, background: '#eaeaea', ...customStyle };
    if (style.height === null) {
      delete style.height;
    }
    return (
      <HeaderRow {...rowProps} style={style}>
        {row.map((cell, i) => {
          const { column, children, className, draggable, ...cellProps } = cell;
          const cls = cell.class || className;
          const customProps = column.customHeaderCell ? column.customHeaderCell(column) : {};

          const headerCellProps = mergeProps(
            {
              attrs: {
                ...cellProps,
              },
              class: cls,
              style: {},
            },
            {
              ...customProps,
              key: column.key || column.dataIndex || i,
            },
          );

          if (column.align) {
            headerCellProps.style = { ...customProps.style, textAlign: column.align };
            headerCellProps.class = classNames(customProps.cls, column.class, column.className, {
              [`${prefixCls}-align-${column.align}`]: !!column.align,
            });
          }

          let sChildren = Array.isArray(children) ? children : [children];
          let hashKey = column.key || column.dataIndex;
          if (draggable && hasWidth(this.colWidthHash, hashKey)) {
            headerCellProps.style.position = 'relative';
            sChildren = [...sChildren, <DraggableTag hashKey={hashKey} />];
          }
          sChildren = sChildren.filter(c => !!c);

          if (typeof HeaderCell === 'function') {
            return HeaderCell(h, headerCellProps, sChildren);
          }
          return <HeaderCell {...headerCellProps}>{sChildren}</HeaderCell>;
        })}
      </HeaderRow>
    );
  },
};
function hasWidth(hash, key) {
  return typeof hash[key] === 'number';
}

function getRowHeight(state, props) {
  const { fixedColumnsHeadRowsHeight } = state;
  const { columns, rows, fixed } = props;
  const headerHeight = fixedColumnsHeadRowsHeight[0];

  if (!fixed) {
    return null;
  }

  if (headerHeight && columns) {
    if (headerHeight === 'auto') {
      return 'auto';
    }
    return `${headerHeight / rows.length}px`;
  }
  return null;
}

export default connect((state, props) => {
  return {
    height: getRowHeight(state, props),
  };
})(TableHeaderRow);

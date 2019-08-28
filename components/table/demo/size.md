<cn>
#### 紧凑型
四种紧凑型的列表，小型列表只用于对话框内。
</cn>

<us>
#### size
Four compacted table size: `middle`, `small`, `xsamll`, `xxsamll`, all small sizes are used in Modal only.
</us>

```html
<template>
  <div id="components-table-demo-size">
    <h4>Middle size table</h4>
    <a-table :columns="columns" :dataSource="data" size="middle" />
    <h4>Small size table</h4>
    <a-table :columns="columns" :dataSource="data" size="small" />
    <h4>XSmall size table</h4>
    <a-table :columns="columns" :dataSource="data" size="xsmall" />
    <h4>XXSmall size table</h4>
    <a-table :columns="columns" :dataSource="data" size="xxsmall" />
  </div>
</template>
<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

export default {
  data() {
    return {
      data,
      columns,
    }
  }
}
</script>
<style>
#components-table-demo-size h4 { margin-bottom: 16px; }
</style>
```

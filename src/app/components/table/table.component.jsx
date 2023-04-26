import { Table } from 'antd';

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const Tablee = ({data,columss}) => <div className=''><Table pagination={{ pageSize: 6, }} columns={columss} dataSource={data} onChange={onChange} /></div>
export default Tablee;
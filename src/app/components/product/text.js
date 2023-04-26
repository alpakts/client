import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Get, Put } from '../../utils/axios.service';
const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const EditTable = () => {
    
  const [form] = Form.useForm();
  const getProducts=()=>{
    Get("/api/products").then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      Get("api/company").then((res)=>{
        setData(res.data)
    })
    })
  }
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
  useEffect(()=>{
    getProducts();
  },[])
  const edit = (record) => {
    form.setFieldsValue({
  
      ...record,
    });
    setEditingKey(record._id);
    
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item._id);
      console.log(row);
      if (index > -1) {
        
        Put("/api/products/"+key).then((s=>{
            getProducts()}))
        
        setEditingKey('');
      } 
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
    
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '15%',
      editable: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: '40%',
      editable: true,
    },
    {
        title: "Company",
        editable: true,
        dataIndex: "company",
        
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
        width: "40%",
      },

    {
        title: 'Amount Unit',
        dataIndex: 'amountUnit',
        width: '40%',
        editable: true,
      },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default EditTable;
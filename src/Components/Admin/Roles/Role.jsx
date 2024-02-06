import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spin, Form, Input, Space, Switch, Table, Tag, Popconfirm, message } from "antd";

export default function DisplayRole() {
    const [spinning, setSpinning] = React.useState(false);
    const [form] = Form.useForm();
    const showLoader = (Isloader) => {
        Isloader ? setSpinning(Isloader) :
            setTimeout(() => {
                setSpinning(false);
            }, 1000);
    };
    const [setArray, newarray] = useState([]);

    const fetchData = async () => {
        showLoader(true);
        try {
            const response = await axios.get('https://localhost:7255/api/Users/GetRole');
            if (response.data.success) {
                console.log("print", response.data.data);
                newarray(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            showLoader(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const CreateRole = async (payload) => {
        console.log('Received values:', payload);
        showLoader(true);
        const url = 'https://localhost:7255/api/Users/CreateRole';
        try {
            const response = await axios.post(url, payload);  
            if(response.data.success){
                message.success('Create successful');  
                form.resetFields();
                console.log('Create successfully:', response.data);
            }else{
                if(response.data.statusCode)message.error(response.data.message);  
            }
        } catch (error) {  
            message.error('Error creating role');  
            console.error('Error creating role:', error.message);
        } finally {
            fetchData();
            showLoader(false);
        }
    };
    const updateRoleAction = async (payload) => {
        showLoader(true);
        const url = 'https://localhost:7255/api/Users/RoleAction';
        payload.active ? payload.active = false : payload.active = true;
        try {
            const response = await axios.put(url, payload);
            message.success('Update successful')
            console.log('Update successful:', response.data);
        } catch (error) {
            message.error('Error updating role action');
            console.error('Error updating role action:', error.message);
        } finally {
            fetchData();
            showLoader(false);
        }
    };
    const cancel = (e) => {
        //console.log("print",e);
        // message.error('Click on No');
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Role Name',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (_, { active }) => {
                const color = active ? 'green' : 'volcano';
                return (
                    <Tag color={color}>
                        {active ? 'Yes' : 'No'}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <a>Edit {record.name}</a> */}
                    <Popconfirm
                        title={record.active ? "Deactivate the Role" : "Activate the Role"}
                        description={`Are you sure to ${record.active ? 'deactivate' : 'activate'} this Role?`}
                        onConfirm={() => updateRoleAction(record)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>{record.active ? <span danger>Is_active</span> : <span>Active</span>}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const onFinish = (values) => {
        CreateRole(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Spin spinning={spinning} fullscreen />
            <div className="container rolebox">
                <h1>Create Role</h1>
                <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label="Role Name" name="roleName" rules={[{ required: true, message: 'Please enter Role Name' }]}>
                        <Input placeholder="Enter Role Name" style={{ width: '15%' }} />
                    </Form.Item>
                    <Form.Item label="Active" name="active" valuePropName="checked" initialValue={true}>
                        <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={()=>{console.log('submit prssed!!!:(')}}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="container">
                <Table dataSource={setArray} columns={columns} />
            </div>
        </>
    );
}


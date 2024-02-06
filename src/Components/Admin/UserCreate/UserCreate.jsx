import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spin, Form, Input, Switch, Table, Tag, Popconfirm, message, Select, Space } from "antd";
const { Option } = Select;

export default function UserCreate() {
    const [spinning, setSpinning] = React.useState(false);
    const [Userlist, setuserlist] = useState([]);
    const [RoleList, SetroleList] = useState([]);
    const [form] = Form.useForm();
    const showLoader = (Isloader) => {
        Isloader ? setSpinning(Isloader) :
            setTimeout(() => {
                setSpinning(false);
            }, 1000);
    };
    const transformObject = (originalObj) => {
        return {
          id: 0,
          username: originalObj.username.trim() || 'string',
          password: originalObj.password.trim() || 'string',
          email: originalObj.user?.email.trim() || 'string',
          active: originalObj.active || false,
          roleId: originalObj.roleId || 0,
        };
      };
    const onFinish = (values) => {
        console.log('values:', values);
        CreateUser(transformObject(values));
    };
    const CreateUser = async (payload) => {
        console.log('Received values:', payload);
        showLoader(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Users/CreateUser`,payload);  
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
            fetchUserList();
            showLoader(false);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const fetchUserList = async () => {
        showLoader(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Users/GetUser`);
            if (response.data.success) {
                console.log("print", response.data.data);
                setuserlist(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            showLoader(false);
        }
    };
    const fetchRoleList = async () => {
        showLoader(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Users/GetRole`);
            if (response.data.success) {
                console.log("print", response.data.data);
                SetroleList(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            showLoader(false);
        }
    };
    const Usercolumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
            title: 'Role ID',
            dataIndex: 'roleId',
            key: 'roleId',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title={record.active ? "Deactivate the User" : "Activate the User"}
                        description={`Are you sure to ${record.active ? 'deactivate' : 'activate'} this User?`}
                        onConfirm={() => updateUserAction(record)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>{record.active ? <span danger>Deactivate</span> : <span>Activate</span>}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const cancel = (e) => {
        //console.log("print",e);
        message.error('Click on No');
    };
    const updateUserAction = async (payload) => {
        console.log(payload);
        showLoader(true);
        payload.active ? payload.active = false : payload.active = true;
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Users/CreateAction`, payload);
            message.success('Update successful')
            console.log('Update successful:', response.data);
        } catch (error) {
            message.error('Error updating role action');
            console.error('Error updating role action:', error.message);
        } finally {
            fetchUserList();
            showLoader(false);
        }
    };
    useEffect(() => {
        fetchUserList();
        fetchRoleList();
    }, []);


    return (
        <>
            <Spin spinning={spinning} fullscreen />
            <div className="container rolebox">
                <h1>Create User</h1>
                <Form className='UsercreateForm' form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input style={{ width: '15%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password style={{ width: '15%' }} />
                    </Form.Item>

                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[{ type: 'email', required: true, message: 'Please input your password!' },]}
                    >
                        <Input style={{ width: '15%' }} />
                    </Form.Item>

                    <Form.Item
                        name="roleId"
                        label="Select Role"
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        <Select placeholder="Select a role" style={{ width: '15%' }}>
                            {RoleList.map(role => (
                                <Option key={role.id} value={role.id}>
                                    {role.roleName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Active" name="active" valuePropName="checked" initialValue={true}>
                        <Switch defaultChecked />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={() => { console.log('submit prssed!!!:(') }}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="container">
                <Table dataSource={Userlist} columns={Usercolumns} />
            </div>
        </>
    );
}

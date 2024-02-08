import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spin, Form, Table, message, Select } from "antd";
import fetching from '../../../API/fetch';
import ShowLoader from '../../Others/showLoader';
const { Option } = Select;

export default function UserAssignMenu() {
    const [spinning, setSpinning] = React.useState(false);
    const [UserList, setUserList] = useState([]);
    const [MenuList, SetmenuList] = useState([]);
    const [UserAssignMenulist, SetUserAssignMenulist] = useState([]);
    const [response,Setresponse] =useState([]);
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const showLoader = (Isloader) => {
        Isloader ? setSpinning(Isloader) :
            setTimeout(() => {
                setSpinning(false);
            }, 500);
    };

    const onFinish = (values) => {
        console.log('values:', values);
        CreateUserAssignMenu(values);
    };
    const onSearch = (values) => {
        console.log('values:', values);
        fetchUserAssignMenu(values);
    };
    
    const fetchMenu = async () => {
        showLoader(true);
        try {
            const responseData = await fetching('/Users/GetMenu');
            console.log('Response:', responseData);
            SetmenuList(responseData.data);
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        } finally {
            showLoader(false);
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onSearchFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const fetchUser = async () => {
        showLoader(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Users/GetUser`);
            if (response.data.success) {
                console.log("print", response.data.data);
                setUserList(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            showLoader(false);
        }
    };
    const fetchUserAssignMenu = async (payload) => {
        console.log('Received values:', payload.User_id);
        showLoader(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Users/GetUserAssignMenu?User_id=${payload.User_id}`);
            if (response.data.success) {
                console.log("print", response.data.data);
                SetUserAssignMenulist(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            showLoader(false);
        }
    };
    const CreateUserAssignMenu = async (payload) => {
        console.log('Received values:', payload);
        showLoader(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Users/CreateUserAssignMenu`, payload);
            if (response.data.success) {
                message.success('Create successfully');
                form1.resetFields();
                console.log('Create successfully:', response.data);
            } else {
                if (response.data.statusCode) message.error(response.data.message);
            }
        } catch (error) {
            message.error('Error creating role');
            console.error('Error creating role:', error.message);
        } finally {
            showLoader(false);
        }
    };
    const columns = [
        // {
        //     title: 'User ID',
        //     dataIndex: 'userId',
        //     key: 'userId',
        // },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        // {
        //     title: 'Menu ID',
        //     dataIndex: 'menuId',
        //     key: 'menuId',
        // },
        {
            title: 'Menu Name',
            dataIndex: 'menuName',
            key: 'menuName',
        },
        {
            title: 'Menu Description',
            dataIndex: 'menuDescription',
            key: 'menuDescription',
        },
    ];
    useEffect(() => {
        fetchUser();
        fetchMenu();
    }, []);
    return (<>
        <Spin spinning={spinning} fullscreen />
        <div className="container rolebox">
            <h1>User Assign Menu</h1>
            <Form className='UserAssignMenu' form={form1} onFinish={onFinish} onFinishFailed={onSearchFailed} autoComplete="off">
                <Form.Item
                    name="UserId"
                    label="Select User"
                    rules={[{ required: true, message: 'Please select a user!' }]}
                >
                    <Select placeholder="Select a User" style={{ width: '15%' }}>
                        {UserList.map(user => (
                            <Option key={user.id} value={user.id}>
                                {user.username} ({user.roleName})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="MenuId"
                    label="Select Menu"
                    rules={[{ required: true, message: 'Please select a menu!' }]}
                >
                    <Select placeholder="Select a Menu" style={{ width: '25%' }}>
                        {MenuList.map(menu => (
                            <Option key={menu.id} value={menu.id}>
                                {menu.menuName} ({menu.menuDescription})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add</Button>
                </Form.Item>
            </Form>
        </div>
        <div className="container rolebox">
            <Form className='SearchUserAssignMenu' form={form2} onFinish={onSearch} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className='divflex'>
                    <Form.Item
                        name="User_id"
                        label="Select User"
                        rules={[{ required: true, message: 'Please select a user!' }]}
                    >
                        <Select placeholder="Select a User" >
                            {UserList.map(user => (
                                <Option key={user.id} value={user.id}>
                                    {user.username} ({user.roleName})
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">search</Button>
                    </Form.Item>
                </div>
            </Form>
            <Table dataSource={UserAssignMenulist} columns={columns} />
        </div>
    </>);
}
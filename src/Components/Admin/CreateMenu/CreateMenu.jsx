import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spin, Form, Input, Switch, Table, Tag, Popconfirm, message, Select, Space } from "antd";
const { Option } = Select;


export default function CreateMenu() {
    const [spinning, setSpinning] = React.useState(false);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('values:', values);
       // CreateUser(transformObject(values));
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return( <>
            <Spin spinning={spinning} fullscreen />
            <div className="container rolebox">
                <h1>Create menu</h1>
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
                            {/* {RoleList.map(role => (
                                <Option key={role.id} value={role.id}>
                                    {role.roleName}
                                </Option>
                            ))} */}
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
                {/* <Table dataSource={Userlist} columns={Usercolumns} /> */}
            </div>
        </>);
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spin, Form, Input, Switch, Table, Tag, Popconfirm, message, Select, Space } from "antd";
import TextArea from 'antd/es/input/TextArea';

export default function CreateMenu() {
    const [spinning, setSpinning] = React.useState(false);
    const [Menulist,setMenulist] = useState([]);
    const [form] = Form.useForm();
    const showLoader = (Isloader) => {
        Isloader ? setSpinning(Isloader) :
            setTimeout(() => {
                setSpinning(false);
            }, 1000);
    };
    
    const onFinish = (values) => {
        console.log('values:', values);
       // CreateUser(transformObject(values));
       CreateMenu(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const fetchMenu = async () => {
        showLoader(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Users/GetMenu`);  
            if (response.data.success) {
                console.log("print", response.data.data);
                setMenulist(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            showLoader(false);
        }
    };
    const CreateMenu = async (payload) => {
        console.log('Received values:', payload);
        showLoader(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT_DEV}/Users/CreateMenu`,payload);  
            if(response.data.success){
                message.success('Create successfully');  
                form.resetFields();
                console.log('Create successfully:', response.data);
            }else{
                if(response.data.statusCode)message.error(response.data.message);  
            }
        } catch (error) {  
            message.error('Error creating role');  
            console.error('Error creating role:', error.message);
        } finally {
            fetchMenu();
            showLoader(false);
        }
    };
    const Menucolumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Menu Name',
            dataIndex: 'menuName',
            key: 'menuName',
        },
        {
            title: 'Menu Description',
            dataIndex: 'menuDescription',
            key: 'menuDescription',
        }
    ];
    useEffect(() => {
        fetchMenu();
    }, []);
    return( <>
            <Spin spinning={spinning} fullscreen />
            <div className="container rolebox">
                <h1>Create menu</h1>
                <Form className='UsercreateForm' form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Form.Item
                        label="MenuName"
                        name="MenuName"
                        rules={[{ required: true, message: 'Please input your MenuName!' }]}>
                        <Input style={{ width: '15%' }} />
                    </Form.Item>
                    <Form.Item
                        label="MenuDescription"
                        name="MenuDescription"
                        rules={[{ required: true, message: 'Please input your MenuDescription!' }]}>
                       <TextArea placeholder="Menu Description" autosize={{ minRows: 1, maxRows: 1   }} style={{ width: '15%' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={() => { console.log('submit prssed!!!:(') }}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="container">
                <Table dataSource={Menulist} columns={Menucolumns} />
            </div>
        </>);
}
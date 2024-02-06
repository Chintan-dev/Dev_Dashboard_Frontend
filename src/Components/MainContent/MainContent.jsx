import { Button, Flex, QRCode, Space, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import DisplayRole from "../Admin/Roles/Role";

export default function MainContent(){
  if(!true){
    return <DisplayRole/>;
  }else{
    return <OneMenu/>;
  }
}

function OneMenu(){
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  return(
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 100,
        background: colorBgContainer,
        borderRadius: 'black',
      }}
    >
      <div>
        <MyButton name="Button" />
        <MyProfile />
      </div>
      <div>
        <Space>
          <QRCode
            value="https://github.com/Chintan-dev"
          />
        </Space>
      </div>
    </Content>
);
}
const user = {
    name: 'Dev',
    imageUrl: 'https://avatars.githubusercontent.com/u/77568409?v=4',
    imageSize: 200,
  };
function MyButton({ name }) {
    return (
      <>
        <Flex gap="small" wrap="wrap">
          <Button type="primary">Primary {name} </Button>
          <Button>Default {name}</Button>
          <Button type="dashed">Dashed {name}</Button>
          <Button type="text">Text Button</Button>
          <Button type="link">Link Button</Button>
        </Flex>
      </>
    );
  }
  
  function MyProfile() {
    return (
      <>
        <h1>{user.name}</h1>
        <img
          className="avatar"
          src={user.imageUrl}
          alt={'Photo of ' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize
          }}
        />
      </>
    );
  }
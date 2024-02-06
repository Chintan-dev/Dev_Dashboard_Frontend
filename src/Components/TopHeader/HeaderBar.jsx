import { Avatar } from "antd";

export default function HeaderBar() {
    return (
         <Avatar person={{ name: "test", url: "https://avatars.githubusercontent.com/u/77568409?v=4" }} size={30} />
    );
}
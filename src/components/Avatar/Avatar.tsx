import Img from "../../../public/avatar.png";
import { Typography } from "antd";

interface AvatarProps {
  className: string;
  collapsed: boolean;
}

const Avatar = ({ className, collapsed }: AvatarProps) => {
  return (
    <div style={{}} className={className}>
      <img
        style={{
          width: collapsed ? 40 : 70,
        }}
        src={Img}
        alt="avatar"
      />
      {!collapsed && (
        <>
          <Typography.Title level={5}>Софья Бродская</Typography.Title>
          <Typography.Text style={{ color: "#878787" }}>менеджер по продажам</Typography.Text>
        </>
      )}
    </div>
  );
};

export default Avatar;

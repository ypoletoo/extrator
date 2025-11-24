import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-20 h-full bg-gray-800 p-2 flex flex-col space-y-8 items-center">
      <div className="text-white py-4 border-b">Logo</div>

      <Button
        icon={<HomeOutlined />}
        type="text"
        className="text-white text-2xl hover:!text-white hover:underline"
        onClick={() => navigate("/")}
      />
    </header>
  );
};

export default Header;

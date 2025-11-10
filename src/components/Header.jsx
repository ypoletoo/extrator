import { Button, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <header className="w-full bg-gray-800 shadow-md py-4 px-8 flex items-center justify-end">
      <Button
        type="text"
        className="text-white font-semibold"
        onClick={handleGoHome}
      >
        Home
      </Button>
    </header>
  );
};

export default Header;

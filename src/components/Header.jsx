import { Button, Typography } from "antd";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <header className="w-full bg-gray-800 shadow-md py-4 px-8 flex items-center justify-start">
      <Button
        icon={<ArrowLeftOutlined />}
        type="text"
        className="text-white font-semibold hover:!text-white hover:underline"
        onClick={handleGoHome}
      >
        Voltar
      </Button>
    </header>
  );
};

export default Header;

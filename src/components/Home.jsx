import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Dados recebidos:", values);
    navigate("/informacoes/1");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      message.success("Dados extraídos com sucesso! (Simulação)");
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Falha ao enviar:", errorInfo);
    message.error("Por favor, preencha todos os campos.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-12">
      <Typography.Title level={2} className="text-center mb-8 text-gray-800">
        Insira os dados do repositório para começar
      </Typography.Title>

      <div className="bg-white p-8 w-[60%] rounded-2xl shadow-xl ">
        <Form
          form={form}
          name="form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            owner: "",
            repo: "",
            token: "",
          }}
        >
          <Form.Item
            label={
              <span className="font-medium text-gray-700">
                Dono do repositório
              </span>
            }
            name="owner"
            rules={[
              {
                required: true,
                message: "Por favor, insira o dono do repositório!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Ex: usuario"
              prefix={
                <GithubOutlined className="site-form-item-icon text-gray-400" />
              }
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-gray-700">Repositório</span>
            }
            name="repo"
            rules={[
              {
                required: true,
                message: "Por favor, insira o nome do repositório!",
              },
            ]}
          >
            <Input size="large" placeholder="Ex: jabRef" />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-gray-700">Token github</span>
            }
            name="token"
            rules={[
              {
                required: true,
                message: "Por favor, insira o seu token do GitHub!",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Ex: ghp_a9dasd798a7d..."
            />
          </Form.Item>

          <Form.Item className="mt-10">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold"
            >
              {loading ? "Extraindo..." : "Extrair"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Home;

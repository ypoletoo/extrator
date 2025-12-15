import { useState } from "react";
import { Card, Button, Input, Tooltip, message, App, Form } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  StopOutlined,
  DeleteOutlined,
  RedoOutlined,
  ExclamationCircleOutlined,
  PauseCircleFilled,
} from "@ant-design/icons";
import { format } from "date-fns";
import {
  createExtraction,
  deleteExtraction,
  pauseExtraction,
  startExtraction as startExtractionService,
} from "../services/extractionServices";

export default function CardHome({ projeto, onStatusChanged }) {
  const { modal } = App.useApp();

  const [activeIndex, setActiveIndex] = useState(null);
  const [form] = Form.useForm();
  const [retryLoading, setRetryLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const statusMap = {
    running: {
      label: "Extraindo",
      icon: <SyncOutlined spin className="text-blue-400" />,
      color: "text-blue-400",
    },
    pending: {
      label: "Pendente",
      icon: <ClockCircleOutlined className="text-blue-400" />,
      color: "text-blue-400",
    },
    completed: {
      label: "Concluída",
      icon: <CheckCircleOutlined className="text-green-400" />,
      color: "text-green-400",
    },
    failed: {
      label: "Falhou",
      icon: <StopOutlined className="text-red-500" />,
      color: "text-red-500",
    },
    paused: {
      label: "Pausada",
      icon: <ClockCircleOutlined className="text-orange-400" />,
      color: "text-orange-400",
    },
  };

  const status = statusMap[projeto.status] || {
    label: projeto.status,
    icon: <ClockCircleOutlined />,
    color: "text-gray-300",
  };

  const infoItems = [
    {
      label: "ID da Extração",
      value: projeto.id.slice(0, 8) + "...",
      full: projeto.id,
    },
    {
      label: "Status",
      value: status.label,
      icon: status.icon,
      color: status.color,
      full:
        status.label === "Extraindo"
          ? `Extração ${projeto.progress_percentage}% concluída`
          : "",
      extra: projeto.error_message,
    },
    {
      label: "Última Atualização",
      value: projeto.updated_at
        ? format(projeto.updated_at, "dd/MM/yyyy HH:mm:ss")
        : "N/A",
    },
  ];

  const showDelete = ["completed", "failed", "paused"].includes(projeto.status);
  const showRetry = ["failed", "paused"].includes(projeto.status);

  const handleDelete = () => {
    modal.confirm({
      title: "Excluir projeto?",
      icon: <ExclamationCircleOutlined />,
      content: "Essa ação não pode ser desfeita.",
      okText: "Excluir",
      cancelText: "Cancelar",
      okButtonProps: { danger: true },
      onOk: async () => {
        await deleteExtraction(projeto.id);
        messageApi.success("Projeto excluído");
        onStatusChanged?.();
      },
    });
  };

  const handlePause = () => {
    modal.confirm({
      title: "Pausar extração?",
      icon: <ExclamationCircleOutlined />,
      okText: "Pausar",
      cancelText: "Cancelar",
      okButtonProps: { danger: true },
      onOk: async () => {
        await pauseExtraction(projeto.id);
        messageApi.success("Projeto pausado");
        onStatusChanged?.();
      },
    });
  };

  const handleRetry = () => {
    form.resetFields();
    let modalInstance;

    modalInstance = modal.confirm({
      title: "Refazer extração?",
      icon: <RedoOutlined />,
      okText: "Enviar",
      cancelText: "Cancelar",
      okButtonProps: { disabled: true },
      content: (
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          onValuesChange={(_, values) => {
            modalInstance.update({
              okButtonProps: { disabled: !values.token },
            });
          }}
        >
          <Form.Item
            label="Token do GitHub"
            name="token"
            rules={[{ required: true, message: "O token é obrigatório" }]}
          >
            <Input.Password placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx" />
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        try {
          const { token } = await form.validateFields();

          setRetryLoading(true);
          modalInstance.update({
            okButtonProps: { loading: true, disabled: true },
          });

          localStorage.setItem("github_token", token);

          const newExtraction = await createExtraction(
            projeto.repository_owner,
            projeto.repository_name,
            token
          );

          await startExtractionService(newExtraction.id, token);

          await deleteExtraction(projeto.id);

          messageApi.success("Extração reiniciada com sucesso!");
          onStatusChanged?.();

          return true;
        } catch (err) {
          messageApi.error(
            err?.message ||
              err?.response?.data?.error ||
              "Token inválido ou erro ao iniciar extração."
          );

          modalInstance.update({
            okButtonProps: { loading: false, disabled: false },
          });

          return false;
        } finally {
          setRetryLoading(false);
        }
      },
    });
  };

  return (
    <Card className="mb-6 rounded-2xl bg-gray-800 border border-gray-700 shadow-lg">
      {contextHolder}

      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-gray-100">
          {projeto.repository_owner}/{projeto.repository_name}
        </span>

        <div className="flex gap-2">
          {projeto.status === "running" && (
            <Tooltip title="Pausar">
              <Button
                shape="circle"
                className="bg-yellow-600 border-none text-white"
                icon={<PauseCircleFilled />}
                onClick={handlePause}
              />
            </Tooltip>
          )}
          {showDelete && (
            <Tooltip title="Excluir">
              <Button
                shape="circle"
                className="bg-red-600 border-none text-white"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              />
            </Tooltip>
          )}

          {showRetry && (
            <Tooltip title="Tentar novamente">
              <Button
                shape="circle"
                className="bg-blue-600 border-none text-white"
                icon={<RedoOutlined />}
                onClick={handleRetry}
                loading={retryLoading}
              />
            </Tooltip>
          )}
        </div>
      </div>

      <div className="flex gap-4" onMouseLeave={() => setActiveIndex(null)}>
        {infoItems.map((item, index) => {
          const isActive = activeIndex === index;
          const isHidden = activeIndex !== null && !isActive;

          return (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              className={`
                transition-all duration-300 ease-out
                rounded-xl bg-gray-700 px-4 py-4
                ${isActive ? "flex-[3]" : "flex-1"}
                ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}
              `}
            >
              <p className="text-gray-400 text-sm mb-1">{item.label}</p>

              <p
                className={`text-lg font-medium flex items-center gap-2 ${
                  item.color || "text-gray-100"
                }`}
              >
                {item.icon}
                {item.value}
              </p>

              {isActive && item.full && (
                <p className="text-gray-300 text-sm mt-3 break-all">
                  {item.full}
                </p>
              )}

              {isActive && item.extra && (
                <p className="text-gray-300 text-sm mt-3">{item.extra}</p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

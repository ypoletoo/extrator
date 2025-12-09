import { useState } from "react";
import { Card, Button, Input } from "antd";
import {
  MinusOutlined,
  ArrowUpOutlined,
  OpenAIOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const getStatusDisplay = (status) => {
  switch (status) {
    case "running":
      return {
        label: "Em Execução",
        icon: <SyncOutlined spin className="text-blue-400" />,
        value: status.toUpperCase(),
        color: "blue-400",
      };
    case "completed":
      return {
        label: "Concluída",
        icon: <CheckCircleOutlined className="text-green-400" />,
        value: status.toUpperCase(),
        color: "green-400",
      };
    case "paused":
      return {
        label: "Pausada",
        icon: <StopOutlined className="text-yellow-400" />,
        value: status.toUpperCase(),
        color: "yellow-400",
      };
    case "created":
      return {
        label: "Pronta p/ Iniciar",
        icon: <ClockCircleOutlined className="text-gray-400" />,
        value: status.toUpperCase(),
        color: "gray-400",
      };
    default:
      return {
        label: "Status Desconhecido",
        icon: <ClockCircleOutlined className="text-gray-400" />,
        value: status ? status.toUpperCase() : "N/A",
        color: "gray-400",
      };
  }
};

export default function CardHome({ projeto }) {
  const [aberto, setAberto] = useState(false);
  const [texto, setTexto] = useState("");

  const statusDisplay = getStatusDisplay(projeto.status);

  const infoItems = [
    { label: "ID da Extração", value: projeto.id.slice(0, 8) + "..." },
    {
      label: "Status",
      value: statusDisplay.value,
      icon: statusDisplay.icon,
      color: statusDisplay.color,
    },
    { label: "Última Atualização", value: projeto.dataUltimaColeta || "N/A" },
  ];

  const showControls =
    projeto.status === "paused" ||
    projeto.status === "created" ||
    projeto.status === "running";

  return (
    <Card
      className="
        mb-6 shadow-lg rounded-2xl border border-gray-700 
        bg-gray-800 transition-all duration-[1200ms] ease-in-out
      "
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Button
            className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
            shape="circle"
            onClick={() => setAberto(!aberto)}
            icon={
              aberto ? (
                <MinusOutlined className="text-gray-200" />
              ) : (
                <OpenAIOutlined className="text-gray-200 h-20" />
              )
            }
          />

          <span className="text-xl font-semibold text-gray-100">
            {projeto.nomeProjeto}
          </span>
        </div>

        {showControls && (
          <div className="flex gap-2">
            <Button
              className={`
                border-none text-gray-100 font-medium
                ${
                  projeto.status === "running"
                    ? "bg-yellow-600 hover:bg-yellow-500"
                    : "bg-green-600 hover:bg-green-500"
                }
              `}
              onClick={() =>
                console.log(
                  `Ação para ${
                    projeto.status === "running" ? "Pausar" : "Iniciar"
                  } extração ${projeto.id}`
                )
              }
              icon={
                projeto.status === "running" ? (
                  <StopOutlined />
                ) : (
                  <SyncOutlined />
                )
              }
            >
              {projeto.status === "running" ? "Pausar" : "Iniciar/Retomar"}
            </Button>
          </div>
        )}
      </div>

      <div className="h-px w-full bg-gray-700 my-4" />

      {!aberto && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {infoItems.map((item, index) => (
            <InfoItem
              key={index}
              label={item.label}
              value={item.value}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>
      )}

      <div
        className={`
          overflow-hidden transition-all duration-[1200ms] ease-in-out
          ${aberto ? "max-h-[600px]" : "max-h-0"}
        `}
      >
        <div
          className={`
            transform transition-all duration-[1200ms] ease-in-out
            ${aberto ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"}
          `}
        >
          <h2 className="text-lg text-gray-200 font-bold">Pergunte algo</h2>
          <div className="mt-6 relative">
            <label className="text-gray-300 block mb-2 text-sm font-medium">
              O que você quer saber sobre esse projeto?
            </label>

            <TextArea
              rows={8}
              size="large"
              className="bg-gray-200 rounded-xl p-4 pr-14 resize-none"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />

            <Button
              shape="circle"
              icon={<ArrowUpOutlined />}
              className="
                !absolute bottom-3 right-3
                bg-gray-800 text-gray-100
                hover:bg-gray-700 border-none shadow-md
              "
              onClick={() => console.log(texto)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

function InfoItem({ label, value, icon, color }) {
  return (
    <div
      className="
        bg-gray-700 rounded-xl px-4 py-3 
        shadow-md hover:bg-gray-650 transition
      "
    >
      <p className="text-gray-400 text-sm">{label}</p>
      <p
        className={`text-gray-100 font-medium text-lg leading-tight ${
          color ? `text-${color}` : ""
        }`}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {value}
      </p>
    </div>
  );
}

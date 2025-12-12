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
import { format } from "date-fns";
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
        value: "completa".toUpperCase(),
        color: "green-400",
      };
    case "paused":
      return {
        label: "Pausada",
        icon: <StopOutlined className="text-yellow-400" />,
        value: "pausada".toUpperCase(),
        color: "yellow-400",
      };
    case "created":
      return {
        label: "Pronta p/ Iniciar",
        icon: <ClockCircleOutlined className="text-gray-400" />,
        value: status.toUpperCase(),
        color: "gray-400",
      };
    case "failed":
      return {
        label: "Falhou",
        icon: <StopOutlined className="text-red-600" />,
        value: "erro".toUpperCase(),
        color: "red-600",
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
  const [hoveredInfo, setHoveredInfo] = useState(null);

  const statusDisplay = getStatusDisplay(projeto.status);

  const infoItems = [
    { label: "ID da Extração", value: projeto.id.slice(0, 8) + "..." },
    {
      label: "Status",
      value: statusDisplay.value,
      icon: statusDisplay.icon,
      color: statusDisplay.color,
    },
    {
      label: "Última Atualização",
      value: format(projeto.updated_at, "dd/MM/yyyy HH:mm") || "N/A",
    },
  ];

  return (
    <Card
      className="
        mb-6 shadow-lg rounded-2xl border border-gray-700 
        bg-gray-800 transition-all duration-[1200ms] ease-in-out
      "
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          {projeto.status === "completed" && (
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
          )}

          <span className="text-xl font-semibold text-gray-100">
            {projeto.repository_name}/{projeto.repository_owner}
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-gray-700 my-4" />

      {!aberto && (
        <div className="relative grid grid-cols-2 md:grid-cols-3 gap-4 min-h-[100px]">
          {infoItems.map((item, index) => (
            <InfoItem
              key={index}
              index={index}
              label={item.label}
              value={item.value}
              icon={item.icon}
              color={item.color}
              hoveredInfo={hoveredInfo}
              setHoveredInfo={setHoveredInfo}
              projeto={projeto}
            />
          ))}
        </div>
      )}

      <div
        className={`
          overflow-hidden transition-all duration-[1200ms]
          ${aberto ? "max-h-[600px]" : "max-h-0"}
        `}
      >
        <div
          className={`
            transform transition-all duration-[1200ms]
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
function InfoItem({
  index,
  label,
  value,
  icon,
  color,
  hoveredInfo,
  setHoveredInfo,
  projeto,
}) {
  const isHovered = hoveredInfo === index;
  const someoneHovered = hoveredInfo !== null;
  const shouldHide = someoneHovered && !isHovered;

  return (
    <div
      onMouseEnter={() => setHoveredInfo(index)}
      onMouseLeave={() => setHoveredInfo(null)}
      className={`
        bg-gray-700 rounded-xl px-4 py-3 shadow-md cursor-pointer
        transition-all duration-500 overflow-hidden relative
        h-32
        ${isHovered ? "z-20" : "z-10"}
        ${shouldHide ? "opacity-0 scale-90 pointer-events-none absolute" : ""}
      `}
      style={{
        ...(isHovered && {
          position: "absolute",
          left: 0,
          right: 0,
          width: "100%",
        }),
      }}
    >
      <p className="text-gray-400 text-sm">{label}</p>

      <p
        className={`text-gray-100 font-medium text-lg flex items-center gap-1 ${
          color ? `text-${color}` : ""
        }`}
      >
        {icon}
        {value}
      </p>

      <div
        className={`
          transition-all duration-500 text-gray-300 text-sm mt-2
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        style={{ maxHeight: isHovered ? "60px" : "0px" }}
      >
        {label === "Status" && (
          <p>
            <b>{projeto.error_message}</b>
            {projeto.status === "running" && (
              <span>Coletando dados ({projeto.progress_percentage}%)</span>
            )}
          </p>
        )}
        {label === "ID da Extração" && (
          <p>
            ID completo: <b>{projeto.id}</b>
          </p>
        )}
        {label === "Última Atualização" && (
          <p>
            Última coleta em: <b>{projeto.updated_at || "Sem registro"}</b>
          </p>
        )}
      </div>
    </div>
  );
}

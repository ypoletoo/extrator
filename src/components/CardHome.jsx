import { useState } from "react";
import { Card, Button, Input } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  ArrowUpOutlined,
  OpenAIOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export default function CardHome({ projeto }) {
  const [aberto, setAberto] = useState(false);
  const [texto, setTexto] = useState("");

  return (
    <Card
      className="
        mb-6 shadow-lg rounded-2xl border border-gray-700 
        bg-gray-800 transition-all duration-[1200ms] ease-in-out
      "
    >
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

      <div className="h-px w-full bg-gray-700 my-4" />

      {!aberto && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <InfoItem label="Última coleta" value={projeto.dataUltimaColeta} />
          <InfoItem label="Issues" value={projeto.qtdIssues} />
          <InfoItem label="Usuários" value={projeto.qtdUsers} />
          <InfoItem label="Pull Requests" value={projeto.qtdPRs} />
          <InfoItem label="Arquivos" value={projeto.qtdArquivos} />
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

function InfoItem({ label, value }) {
  return (
    <div
      className="
        bg-gray-700 rounded-xl px-4 py-3 
        shadow-md hover:bg-gray-650 transition
      "
    >
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-gray-100 font-medium text-lg leading-tight">{value}</p>
    </div>
  );
}

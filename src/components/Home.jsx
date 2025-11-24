import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CardHome from "../components/CardHome";

const projetosMock = [
  {
    nomeProjeto: "chatgpt-analytics",
    dataUltimaColeta: "2025-01-12",
    qtdIssues: 42,
    qtdUsers: 18,
    qtdPRs: 27,
    qtdArquivos: 134,
  },
  {
    nomeProjeto: "frontend-dashboard",
    dataUltimaColeta: "2025-02-03",
    qtdIssues: 15,
    qtdUsers: 9,
    qtdPRs: 11,
    qtdArquivos: 76,
  },
  {
    nomeProjeto: "bot-automation-core",
    dataUltimaColeta: "2024-12-28",
    qtdIssues: 63,
    qtdUsers: 25,
    qtdPRs: 41,
    qtdArquivos: 212,
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-gray-100 max-h-screen overflow-auto">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Projetos GitHub
      </h2>

      <div className="w-full md:w-9/12 lg:w-3/5 mx-auto">
        {projetosMock.map((projeto, index) => (
          <CardHome key={index} projeto={projeto} />
        ))}

        <Button
          type="default"
          onClick={() => navigate("/extrator")}
          icon={<PlusOutlined />}
          className="
            w-full py-6 mt-2 text-lg font-medium
            bg-gray-200 hover:bg-gray-300 text-gray-800
            border-none rounded-xl
            transition-all duration-200
          "
        >
          Extrair novo projeto
        </Button>
      </div>
    </div>
  );
}

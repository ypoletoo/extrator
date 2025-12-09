import { Alert, Button, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CardHome from "../components/CardHome";
import { useCallback, useEffect, useState } from "react";
import { listExtractions } from "../services/extractionServices";

export default function Home() {
  const navigate = useNavigate();
  const [extractions, setExtractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExtractions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listExtractions();

      setExtractions(
        data.map((e) => ({
          nomeProjeto: `${e.owner}/${e.repoName}`,
          dataUltimaColeta: e.updatedAt
            ? new Date(e.updatedAt).toLocaleDateString()
            : "N/A",
          status: e.status,
          id: e.id,
        }))
      );
    } catch (err) {
      setError("Erro ao carregar a lista de extrações.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExtractions();
  }, [fetchExtractions]);

  return (
    <div className="p-8 text-gray-100 max-h-screen overflow-auto">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Projetos GitHub
      </h2>

      <div className="w-full md:w-9/12 lg:w-3/5 mx-auto">
        {error && (
          <Alert
            message="Erro"
            description={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        {loading && (
          <div className="text-center py-10">
            <Spin size="large" />
            <p className="mt-2 text-gray-600">Carregando extrações...</p>
          </div>
        )}

        {!loading && extractions.length === 0 && !error && (
          <Alert
            message="Nenhuma extração encontrada"
            description="Use o botão abaixo para extrair um novo projeto."
            type="info"
            showIcon
            className="mb-4"
          />
        )}

        {extractions.map((extraction) => (
          <CardHome key={extraction.id} projeto={extraction} />
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

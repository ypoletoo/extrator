import { useState } from "react";
import { Card, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  createExtraction,
  startExtraction as startExtractionService,
} from "../../services/extractionServices";

export default function Extractor() {
  const [form, setForm] = useState({
    repoName: "",
    owner: "",
    token: "",
    options: {
      issues: false,
      prs: false,
      prComments: false,
      commitFiles: false,
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartExtraction = async () => {
    const { owner, repoName, token } = form;

    if (!owner || !repoName || !token) {
      message.error("Preencha o Dono, Repositório e Token.", 3);
      return;
    }

    setLoading(true);

    try {
      localStorage.setItem("github_token", token);

      const newExtraction = await createExtraction(owner, repoName, token);
      const extractionId = newExtraction.id;

      message.info(
        `Extração registrada (ID: ${extractionId}). Iniciando no backend...`,
        3
      );

      await startExtractionService(extractionId, token);

      message.success("Extração iniciada com sucesso!", 5);

      navigate("/");
    } catch (error) {
      console.error("Erro ao iniciar extração:", error);
      const errorMessage = error.response?.data?.error || "Erro desconhecido.";
      message.error(errorMessage, 5);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-8 max-h-screen overflow-y-auto">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Extrair Projeto
      </h2>

      <div className="w-full md:w-4/5 lg:w-3/5 mx-auto">
        <Card className="shadow-lg rounded-2xl transition-all duration-300">
          <div className="mb-6">
            <label className="block mb-2 text-gray-800">
              Nome do Repositório (repoName)
            </label>
            <Input
              placeholder="ex: react"
              value={form.repoName}
              onChange={(e) => updateField("repoName", e.target.value)}
              className="placeholder-gray-400"
              size="large"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800">
              Dono do Repositório (owner)
            </label>
            <Input
              placeholder="ex: facebook"
              value={form.owner}
              onChange={(e) => updateField("owner", e.target.value)}
              className="placeholder-gray-400"
              size="large"
              disabled={loading}
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 text-gray-800">Token do GitHub</label>
            <Input.Password
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
              value={form.token}
              onChange={(e) => updateField("token", e.target.value)}
              className="placeholder-gray-400"
              size="large"
              disabled={loading}
            />
          </div>
          <Button
            type="default"
            className="
              w-full py-6 text-lg font-medium mt-2
              bg-gray-800 hover:bg-gray-600
              text-gray-200 border-none rounded-xl
              transition-all duration-200
            "
            onClick={handleStartExtraction}
            loading={loading}
            disabled={loading}
          >
            Extrair Projeto
          </Button>
        </Card>
      </div>
    </div>
  );
}

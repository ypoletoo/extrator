import { useState, useMemo } from "react";
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
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = useMemo(() => {
    return (
      form.owner.trim().length > 0 &&
      form.repoName.trim().length > 0 &&
      form.token.trim().length > 0
    );
  }, [form]);

  const handleStartExtraction = async () => {
    if (!isFormValid) {
      messageApi.warning("Preencha Dono, Repositório e Token do GitHub.", 3);
      return;
    }

    setLoading(true);

    try {
      localStorage.setItem("github_token", form.token);

      const newExtraction = await createExtraction(
        form.owner,
        form.repoName,
        form.token
      );

      messageApi.info(
        `Extração registrada (ID: ${newExtraction.id.slice(0, 8)}...).`,
        3
      );

      await startExtractionService(newExtraction.id, form.token);

      messageApi.success("Extração iniciada com sucesso!", 4);

      navigate("/");
    } catch (error) {
      console.error("Erro ao iniciar extração:", error);

      messageApi.error(
        error?.response?.data?.error ||
          "Não foi possível iniciar a extração. Verifique os dados.",
        5
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-8 max-h-screen overflow-y-auto">
      {contextHolder}
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Extrair Projeto
      </h2>

      <div className="w-full md:w-4/5 lg:w-3/5 mx-auto">
        <Card className="shadow-lg rounded-2xl transition-all duration-300">
          <div className="mb-6">
            <label className="block mb-2 text-gray-800">
              Nome do Repositório
            </label>
            <Input
              placeholder="ex: react"
              value={form.repoName}
              onChange={(e) => updateField("repoName", e.target.value)}
              size="large"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800">
              Dono do Repositório
            </label>
            <Input
              placeholder="ex: facebook"
              value={form.owner}
              onChange={(e) => updateField("owner", e.target.value)}
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
            disabled={loading || !isFormValid}
          >
            Extrair Projeto
          </Button>
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Card, Input, Checkbox, Button, Progress } from "antd";
import { useNavigate } from "react-router-dom";

export default function Extractor() {
  const [form, setForm] = useState({
    projeto: "",
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
  const [progress, setProgress] = useState(0);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateOption = (option, checked) => {
    setForm((prev) => ({
      ...prev,
      options: { ...prev.options, [option]: checked },
    }));
  };

  const startExtraction = () => {
    setLoading(true);
    setProgress(0);

    let value = 0;

    const interval = setInterval(() => {
      value += 2;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 500);
      }
    }, 100);
  };

  return (
    <>
      {loading && (
        <div
          className="
            absolute inset-0 bg-black bg-opacity-50 
            flex items-center justify-center z-50 
            backdrop-blur-sm transition-all duration-300
          "
        >
          <div className="w-2/3 max-w-md p-8 bg-white rounded-2xl shadow-xl text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Extraindo dados do projeto...
            </h3>

            <Progress
              type="circle"
              percent={progress}
              status={progress < 100 ? "active" : "success"}
              strokeWidth={10}
              strokeColor={progress < 100 ? "#1F2937" : "#52c41a"}
            />
          </div>
        </div>
      )}

      <div className="relative p-8 max-h-screen overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">
          Extrair Projeto
        </h2>

        <div className="w-full md:w-4/5 lg:w-3/5 mx-auto">
          <Card className="shadow-lg rounded-2xl transition-all duration-300">
            <div className="mb-6">
              <label className="block mb-2 text-gray-800">
                Nome do Projeto
              </label>
              <Input
                placeholder="ex: meu-projeto"
                value={form.projeto}
                onChange={(e) => updateField("projeto", e.target.value)}
                className="placeholder-gray-400"
                size="large"
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-gray-800">
                Dono do Repositório
              </label>
              <Input
                placeholder="ex: usuario"
                value={form.owner}
                onChange={(e) => updateField("owner", e.target.value)}
                className="placeholder-gray-400"
                size="large"
                disabled={loading}
              />
            </div>

            <div className="mb-8">
              <label className="block mb-2 text-gray-800">
                Token do GitHub
              </label>
              <Input.Password
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
                value={form.token}
                onChange={(e) => updateField("token", e.target.value)}
                className="placeholder-gray-400"
                size="large"
                disabled={loading}
              />
            </div>

            <div className="border rounded-xl p-5 mb-8">
              <span className="block mb-4 text-lg font-medium text-gray-800">
                Selecione o que deseja extrair
              </span>

              <div className="flex flex-col gap-3 text-gray-800">
                <Checkbox
                  checked={form.options.issues}
                  onChange={(e) => updateOption("issues", e.target.checked)}
                  disabled={loading}
                >
                  Issues
                </Checkbox>

                <Checkbox
                  checked={form.options.prs}
                  onChange={(e) => updateOption("prs", e.target.checked)}
                  disabled={loading}
                >
                  Pull Requests
                </Checkbox>

                <Checkbox
                  checked={form.options.prComments}
                  onChange={(e) => updateOption("prComments", e.target.checked)}
                  disabled={loading}
                >
                  Comentários dos PRs
                </Checkbox>

                <Checkbox
                  checked={form.options.commitFiles}
                  onChange={(e) =>
                    updateOption("commitFiles", e.target.checked)
                  }
                  disabled={loading}
                >
                  Arquivos dos commits
                </Checkbox>
              </div>
            </div>

            <Button
              type="default"
              className="
                w-full py-6 text-lg font-medium mt-2
                bg-gray-800 hover:bg-gray-600
                text-gray-200 border-none rounded-xl
                transition-all duration-200
              "
              onClick={startExtraction}
              disabled={loading}
            >
              Extrair Projeto
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}

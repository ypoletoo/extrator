import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Tabs, Table, Card } from "antd";
import HeaderNav from "../../../components/Header";

const mockRepos = [
  {
    id: 1,
    repositorio: "chatgpt-ui",
    autor: "yasminpoleto",
    dataCriacao: "2023-07-14",
    ultimaIssue: "Corrigir bug no login",
  },
  {
    id: 2,
    repositorio: "react-analyzer",
    autor: "devmateus",
    dataCriacao: "2024-01-03",
    ultimaIssue: "Atualizar dependências",
  },
  {
    id: 3,
    repositorio: "frontend-core",
    autor: "caroljs",
    dataCriacao: "2023-11-21",
    ultimaIssue: "Adicionar dark mode",
  },
];

const mockCommits = [
  {
    id: 1,
    commitHash: "a1b2c3d",
    autor: "yasminpoleto",
    mensagem: "Corrige bug no formulário de login",
    data: "2024-03-10",
  },
  {
    id: 2,
    commitHash: "d4e5f6g",
    autor: "devmateus",
    mensagem: "Adiciona testes unitários para Auth",
    data: "2024-05-02",
  },
  {
    id: 3,
    commitHash: "h7i8j9k",
    autor: "caroljs",
    mensagem: "Melhora performance da página inicial",
    data: "2024-07-15",
  },
];

const mockIssues = [
  {
    id: 1,
    titulo: "Erro ao carregar página de perfil",
    autor: "yasminpoleto",
    status: "Aberta",
    dataCriacao: "2024-08-12",
  },
  {
    id: 2,
    titulo: "Problema com autenticação via Google",
    autor: "devmateus",
    status: "Fechada",
    dataCriacao: "2024-09-05",
  },
  {
    id: 3,
    titulo: "Layout quebra no Safari",
    autor: "caroljs",
    status: "Aberta",
    dataCriacao: "2024-09-20",
  },
];

const repoColumns = [
  { title: "ID", dataIndex: "id", key: "id", width: 80 },
  { title: "Repositório", dataIndex: "repositorio", key: "repositorio" },
  { title: "Autor", dataIndex: "autor", key: "autor" },
  { title: "Data de Criação", dataIndex: "dataCriacao", key: "dataCriacao" },
  { title: "Última Issue", dataIndex: "ultimaIssue", key: "ultimaIssue" },
];

const commitColumns = [
  { title: "ID", dataIndex: "id", key: "id", width: 80 },
  { title: "Hash", dataIndex: "commitHash", key: "commitHash" },
  { title: "Autor", dataIndex: "autor", key: "autor" },
  { title: "Mensagem", dataIndex: "mensagem", key: "mensagem" },
  { title: "Data", dataIndex: "data", key: "data" },
];

const issueColumns = [
  { title: "ID", dataIndex: "id", key: "id", width: 80 },
  { title: "Título", dataIndex: "titulo", key: "titulo" },
  { title: "Autor", dataIndex: "autor", key: "autor" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Data de Criação", dataIndex: "dataCriacao", key: "dataCriacao" },
];

export const ReposTable = () => (
  <Card className="shadow-md rounded-2xl bg-white mb-6">
    <Table
      dataSource={mockRepos}
      columns={repoColumns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  </Card>
);

export const CommitsTable = () => (
  <Card className="shadow-md rounded-2xl bg-white mb-6">
    <Table
      dataSource={mockCommits}
      columns={commitColumns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  </Card>
);

export const IssuesTable = () => (
  <Card className="shadow-md rounded-2xl bg-white">
    <Table
      dataSource={mockIssues}
      columns={issueColumns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  </Card>
);

const InformacoesPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
        <Typography.Title level={3} className="text-center mb-8">
          Informações #{id}
        </Typography.Title>

        <div className="w-full max-w-5xl rounded-2xl">
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Repositorios",
                children: <ReposTable />,
              },
              {
                key: "2",
                label: "Commits",
                children: <CommitsTable />,
              },
              {
                key: "3",
                label: "Issues",
                children: <IssuesTable />,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default InformacoesPage;

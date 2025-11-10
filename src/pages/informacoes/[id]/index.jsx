import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Tabs, Table, Card } from "antd";
import HeaderNav from "../../../components/Header";

const mockData = [
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

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 80,
  },
  {
    title: "Repositório",
    dataIndex: "repositorio",
    key: "repositorio",
  },
  {
    title: "Autor",
    dataIndex: "autor",
    key: "autor",
  },
  {
    title: "Data de Criação",
    dataIndex: "dataCriacao",
    key: "dataCriacao",
  },
  {
    title: "Última Issue",
    dataIndex: "ultimaIssue",
    key: "ultimaIssue",
  },
];

const ReposTable = () => (
  <Card className="shadow-md rounded-2xl bg-white ">
    <Table
      dataSource={mockData}
      columns={columns}
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
                label: "Repositorio",
                children: <ReposTable />,
              },
              {
                key: "2",
                label: "Autor",
                children: <ReposTable />,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default InformacoesPage;

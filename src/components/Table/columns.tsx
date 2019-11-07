import React from 'react'

type valueArrayString = {
  value: string[]
}

export const columns = [
  {
    accessor: 'name',
    Header: 'Nome',
  },
  {
    accessor: 'email',
    Header: 'Email',
  },
  {
    accessor: 'address',
    Header: 'Endereço de atendimento',
  },
  {
    accessor: 'distance',
    Header: 'Distância (km)',
  },
  {
    accessor: 'disponibilidade_de_atendimentos',
    Header: 'Disponibilidade de atendimento',
  },
  {
    accessor: 'encaminhamentos',
    Header: 'Encaminhamentos realizados',
  },
  {
    accessor: 'atendimentos_em_andamento',
    Header: 'Atendimentos em andamento',
  },
  {
    accessor: 'encaminhamentos_realizados_calculado_',
    Header: 'Encaminhamentos realizados [calculado]',
  },
  {
    accessor: 'atendimentos_em_andamento_calculado_',
    Header: 'Atendimentos em andamento [calculado]',
  },
  {
    accessor: 'link_ticket',
    Header: 'Link do ticket',
    Cell: ({ value }: valueArrayString) => (value ? (
      <a href={`https://mapadoacolhimento.zendesk.com/agent/tickets/${value}`}>{value}</a>
    ) : null),
  },
  {
    accessor: 'data_de_inscricao_no_bonde',
    Header: 'Data de inscrição no BONDE',
  },
  {
    accessor: 'occupation_area',
    Header: 'Área de atuação',
  },
  {
    accessor: 'phone',
    Header: 'Telefone',
  },
  {
    accessor: 'whatsapp',
    Header: 'Whatsapp',
  },
  {
    accessor: 'registration_number',
    Header: 'Número de registro (OAB, CRM ou CRP)',
  },
]

export const addAccessorIndividual = () => [
  ...columns.slice(0, 4),
  {
    accessor: 'status_acolhimento',
    Header: 'Status Acolhimento',
    Cell: ({ value }: valueArrayString) => (value ? (
      <span>{value}</span>
    ) : null),
  }, {
    accessor: 'tipo_acolhimento',
    Header: 'Tipo de acolhimento',
    Cell: ({ value }: valueArrayString) => (value ? (
      <span>{value}</span>
    ) : null),
  },
  ...columns.slice(4),
]

export const addAccessorVolunteer = () => [
  ...columns.slice(0, 4),
  {
    accessor: 'status_inscricao',
    Header: 'Status Inscrição',
    Cell: ({ value }: valueArrayString) => (value ? (
      <span>{value}</span>
    ) : null),
  },
  ...columns.slice(4),
]

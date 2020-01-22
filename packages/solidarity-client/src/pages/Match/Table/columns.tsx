import React from 'react'
import Forward from '../../../components/BtnFoward'
import { Flexbox2 as Flexbox } from 'bonde-styleguide'

type valueArrayString = {
  value: string[]
}

type valueString = {
  value: string
}

const columns = [
  {
    accessor: 'name',
    Header: 'Nome',
    width: 200,
  },
  {
    accessor: 'email',
    Header: 'Email',
    width: 200,
  }, {
    accessor: 'distance',
    Header: 'Distância (km)',
    width: 150
  }, {
    accessor: 'address',
    Header: 'Endereço',
    width: 300,
  }, {
    accessor: 'priority',
    Header: 'Prioridade',
  }, {
    accessor: 'tipo_de_acolhimento',
    Header: 'Tipo de acolhimento',
    Cell: ({ value }: valueArrayString) => (value ? (
      <span>{value}</span>
    ) : null),
    width: 200
  }, {
    accessor: 'data_de_inscricao_no_bonde',
    Header: 'Data de inscrição no BONDE',
    Cell: ({ value }: valueString) => {
      if (!value) {
        return '-'
      }
      const data = new Date(value)
      return data.toLocaleDateString('pt-BR')
    },
  }, {
    accessor: 'ticket_id',
    Header: 'Link',
    Cell: ({ value }: valueArrayString) => (value ? (
      <a href={`https://mapadoacolhimento.zendesk.com/agent/tickets/${value}`} target="_blank" rel="noopener noreferrer">{value}</a>
    ) : null),
  }, {
    accessor: 'user_id',
    Header: 'Ação',
    width: 200,
    Cell: ({ value }: valueArrayString) => (value ? (
      <Flexbox middle><Forward id={Number(value)}/></Flexbox>
    ) : null),
  }
]

export default columns

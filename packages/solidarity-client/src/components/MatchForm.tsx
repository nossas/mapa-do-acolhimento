import React from 'react'
// import PropTypes from 'prop-types'
import {
  Button,
  Flexbox2 as Flexbox,
  FormField,
  Input,
  Text
} from 'bonde-styleguide'
import styled from 'styled-components'
import { useForm, Controller } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'

import { getUserData, emailValidation } from '../services/utils'

import Select from './Select'
import dicioAgent from '../pages/Match/Table/dicioAgent'

const FormWrapper = styled.form`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const StyledField = styled(FormField)`
  padding: 0;
  color: rgba(255, 255, 255, 1);
  position: relative;
  top: 16px;
`
const StyledFlexbox = styled(Flexbox)`
  width: unset;
`

const MatchForm = () => {
  const tableData = useStoreState(state => state.table.data)
  const setForm = useStoreActions((actions: any) => actions.match.setForm)
  
  const {
    handleSubmit,
    register,
    errors,
    setError,
    control,
  } = useForm();

  const send = (data, e) => {
    e.preventDefault()

    // buscando dados voluntaria atraves do email
    const user = getUserData({
      user: data.email,
      data: tableData,
      filterBy: "email"
    })

    if (typeof user === 'undefined') return setError("email", "notFound", "Não existe uma voluntária com esse e-mail")
    
    setForm({ volunteer: user, agent: data.agent })
  }

  return (
    <FormWrapper onSubmit={handleSubmit(send)}>
      <StyledFlexbox vertical>
        <Controller
          as={
            <StyledField
              label="E-mail da voluntária"
              placeholder="exemplo@email.com"
              type="email"
              inputComponent={Input}
            />
          }
          name="email"
          control={control}
          rules={{
            required: "Esse campo é obrigatório",
            pattern: {
              value: emailValidation(),
              message: 'Insira um endereço de e-mail válido'
            }
          }}
        />
        <Text color="#ffffff">{errors.email && errors.email['message']}</Text>
      </StyledFlexbox>
      <StyledFlexbox vertical>
        <Select
          label="Agente"
          dicio={dicioAgent}
          defaultValue="Escolha uma voluntária"
          name="agent"
          register={register({
            validate: value => value !== 'default' || 'Selecione uma agente',
          })}
        />
        <Text color="#ffffff">{errors.agent && errors.agent['message']}</Text>
      </StyledFlexbox>
      <Flexbox middle>
        <Button
          disabled={tableData.length < 1}
          minWidth="150px"
          type="submit"
        >
          Buscar
        </Button>
      </Flexbox>
    </FormWrapper>
  )
}

export default MatchForm

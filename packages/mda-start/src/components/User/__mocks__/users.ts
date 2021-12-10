import faker from "faker/locale/pt_BR";

export const geolocation = {
  latitude: Number(faker.address.latitude()).toFixed(2),
  longitude: Number(faker.address.longitude()).toFixed(2),
  address: faker.address.streetAddress(true),
  state: faker.address.state(true),
  city: faker.address.city(),
  cep: faker.address.zipCode()
};

export default {
  "17633": {
    cache: [
      {
        id: 2000373,
        fields:
          '[{"uid":"field-1533735738039-59","kind":"text","label":"NOME","placeholder":"","required":"true","value":"Joana"},{"uid":"field-1533735745400-14","kind":"text","label":"SOBRENOME","placeholder":"","required":"true","value":"Lima"},{"uid":"field-1533735752669-39","kind":"email","label":"SEU MELHOR EMAIL","placeholder":"","required":"true","value":"joana@email.com"},{"uid":"field-1533735761357-93","kind":"text","label":"OAB (Só números)","placeholder":"","required":"true","value":"21312312"},{"uid":"field-1533735803691-45","kind":"text","label":"CEP DE ATENDIMENTO (Só números)","placeholder":"","required":"true","value":"12070620"},{"uid":"field-1533735813563-2","kind":"text","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"","required":"true","value":"12988805543"},{"uid":"field-1533735832329-53","kind":"text","label":"WHATSAPP (COM DDD)","placeholder":"","required":"true","value":"12988805543"},{"uid":"field-1533735888966-20","kind":"dropdown","label":"Como voluntária do Mapa do Acolhimento, você se dispõe a atender, pelo menos, uma (1) mulher que precisa de ajuda. Caso você tenha mais tempo disponível, você pode atender mais de uma (1) mulher, de maneira concomitante. Quantas vagas você pode oferecer para atender, simultaneamente, mulheres do Mapa do Acolhimento (lembrando que isso pode incluir o acompanhamento de processos do início ao fim) ?","placeholder":"1, 2, 3, 4, 5 ou mais","required":"true","value":" 4"}]',
        cached_community_id: 40,
        widget_id: 17633,
        created_at: "2020-05-29T00:25:28.593533",
        __typename: "form_entries"
      },
      {
        id: 2000374,
        fields:
          '[{"uid":"field-1533735738039-59","kind":"text","label":"NOME","placeholder":"","required":"true","value":"Meire"},{"uid":"field-1533735745400-14","kind":"text","label":"SOBRENOME","placeholder":"","required":"true","value":"Leite"},{"uid":"field-1533735752669-39","kind":"email","label":"SEU MELHOR EMAIL","placeholder":"","required":"true","value":"meire@email.com"},{"uid":"field-1533735761357-93","kind":"text","label":"OAB (Só números)","placeholder":"","required":"true","value":"21312312"},{"uid":"field-1533735803691-45","kind":"text","label":"CEP DE ATENDIMENTO (Só números)","placeholder":"","required":"true","value":"12070650"},{"uid":"field-1533735813563-2","kind":"text","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"","required":"true","value":"12988805543"},{"uid":"field-1533735832329-53","kind":"text","label":"WHATSAPP (COM DDD)","placeholder":"","required":"true","value":"12988805543"},{"uid":"field-1533735888966-20","kind":"dropdown","label":"Como voluntária do Mapa do Acolhimento, você se dispõe a atender, pelo menos, uma (1) mulher que precisa de ajuda. Caso você tenha mais tempo disponível, você pode atender mais de uma (1) mulher, de maneira concomitante. Quantas vagas você pode oferecer para atender, simultaneamente, mulheres do Mapa do Acolhimento (lembrando que isso pode incluir o acompanhamento de processos do início ao fim) ?","placeholder":"1, 2, 3, 4, 5 ou mais","required":"true","value":" 5_ou_mais"}]',
        cached_community_id: 40,
        widget_id: 17633,
        created_at: "2020-05-29T00:27:23.780153",
        __typename: "form_entries"
      },
      {
        id: 2000375,
        fields:
          '[{"uid":"field-1533735738039-59","kind":"text","label":"NOME","placeholder":"","required":"true","value":"Maoela"},{"uid":"field-1533735745400-14","kind":"text","label":"SOBRENOME","placeholder":"","required":"true","value":"Coelho"},{"uid":"field-1533735752669-39","kind":"email","label":"SEU MELHOR EMAIL","placeholder":"","required":"true","value":"manoela@email.com"},{"uid":"field-1533735761357-93","kind":"text","label":"OAB (Só números)","placeholder":"","required":"true","value":"21312312"},{"uid":"field-1533735803691-45","kind":"text","label":"CEP DE ATENDIMENTO (Só números)","placeholder":"","required":"true","value":"12050-181"},{"uid":"field-1533735813563-2","kind":"text","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"","required":"true","value":"12988805543"},{"uid":"field-1533735832329-53","kind":"text","label":"WHATSAPP (COM DDD)","placeholder":"","required":"true","value":"12988805543"},{"uid":"field-1533735888966-20","kind":"dropdown","label":"Como voluntária do Mapa do Acolhimento, você se dispõe a atender, pelo menos, uma (1) mulher que precisa de ajuda. Caso você tenha mais tempo disponível, você pode atender mais de uma (1) mulher, de maneira concomitante. Quantas vagas você pode oferecer para atender, simultaneamente, mulheres do Mapa do Acolhimento (lembrando que isso pode incluir o acompanhamento de processos do início ao fim) ?","placeholder":"1, 2, 3, 4, 5 ou mais","required":"true","value":" 2"}]',
        cached_community_id: 40,
        widget_id: 17633,
        created_at: "2020-05-29T00:28:29.55569",
        __typename: "form_entries"
      }
    ],
    results: [
      {
        name: "Joana Lima",
        role: "end-user",
        organization_id: 360269610652,
        email: "joana@email.com",
        external_id: "2000373",
        phone: "12988805543",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: "12988805543",
          registration_number: "21312312",
          occupation_area: null,
          disponibilidade_de_atendimentos: "4",
          data_de_inscricao_no_bonde: "2020-05-29T00:25:28.593533"
        }
      },
      {
        name: "Meire Leite",
        role: "end-user",
        organization_id: 360269610652,
        email: "meire@email.com",
        external_id: "2000374",
        phone: "12988805543",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: "12988805543",
          registration_number: "21312312",
          occupation_area: null,
          disponibilidade_de_atendimentos: "5",
          data_de_inscricao_no_bonde: "2020-05-29T00:27:23.780153"
        }
      },
      {
        name: "Maoela Coelho",
        role: "end-user",
        organization_id: 360269610652,
        email: "manoela@email.com",
        external_id: "2000375",
        phone: "12988805543",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: "12988805543",
          registration_number: "21312312",
          occupation_area: null,
          disponibilidade_de_atendimentos: "2",
          data_de_inscricao_no_bonde: "2020-05-29T00:28:29.55569"
        }
      }
    ]
  },
  "17628": {
    cache: [
      {
        id: 2000367,
        fields:
          '[{"uid":"field-1533733461113-5","kind":"text","label":"NOME","placeholder":"","required":"true","value":"Carla"},{"uid":"field-1533733485653-99","kind":"text","label":"SOBRENOME","placeholder":"","required":"true","value":"Santos"},{"uid":"field-1533733493037-11","kind":"email","label":"SEU MELHOR EMAIL","placeholder":"","required":"true","value":"carla@email.com"},{"uid":"field-1533733501716-34","kind":"text","label":"CRP (Só números)","placeholder":"","required":"true","value":"123123"},{"uid":"field-1533733650118-7","kind":"text","label":"CEP DE ATENDIMENTO (Só números)","placeholder":"","required":"true","value":"12070620"},{"uid":"field-1533734419113-13","kind":"text","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"","required":"true","value":"12988801144"},{"uid":"field-1533734468460-38","kind":"text","label":"WHATSAPP (COM DDD)","placeholder":"Obrigatório para contato com a equipe","required":"true","value":"12988801144"},{"uid":"field-1533734495315-40","kind":"dropdown","label":"Como voluntária do Mapa do Acolhimento, você se dispõe a atender, pelo menos, uma (1) mulher que precisa de ajuda. Caso você tenha mais tempo disponível, você pode atender mais de uma (1) mulher, de maneira concomitante. Lembrando que os atendimentos devem ser sempre individuais. Quantas vagas você pode oferecer para atender, simultaneamente, mulheres do Mapa do Acolhimento?","placeholder":"1, 2, 3, 4, 5 ou mais","required":"true","value":"1"}]',
        cached_community_id: 40,
        widget_id: 17628,
        created_at: "2020-05-29T00:16:24.283085",
        __typename: "form_entries"
      }
    ],
    results: [
      {
        email: "carla@email.com",
        external_id: "2000367",
        name: "Carla Santos",
        organization_id: 360282119532,
        phone: "12988801144",
        role: "end-user",
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          condition: "desabilitada",
          data_de_inscricao_no_bonde: "2020-05-29T00:16:24.283085",
          disponibilidade_de_atendimentos: "1",
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          occupation_area: null,
          registration_number: "123123",
          state: geolocation.state,
          tipo_de_acolhimento: null,
          whatsapp: "12988801144"
        },
        verified: true
      }
    ]
  },
  "16850": {
    cache: [
      {
        id: 2000302,
        fields:
          '[{"uid":"field-1531256279518-15","kind":"text","label":"Primeiro nome","placeholder":"Digite apenas o seu primeiro nome, por favor","required":"true","value":"Igor"},{"uid":"field-1531256284908-34","kind":"email","label":"Email","placeholder":"Seguro e acessível, por ele que nos comunicamos!","required":"true","value":"igor@nossas.org"},{"uid":"field-1531256429599-79","kind":"dropdown","label":"Estado","placeholder":"AC, AL, AM, AP, BA, CE, DF, ES, GO, MA, MG, MT, MS, PA, PB, PE, PR, PI, RJ, RO, RN, RR, RS, SC, SP, SE, TO","required":"true","value":" MG"},{"uid":"field-1531256438968-91","kind":"text","label":"Cidade","placeholder":"","required":"true","value":"Belo Horizonte"},{"uid":"field-1531256466688-98","kind":"text","label":"Bairro","placeholder":"Digite o bairro onde gostaria de ser atendida","required":"true","value":"Gutierrez"},{"uid":"field-1531256486749-86","kind":"dropdown","label":"QUE TIPO DE ACOLHIMENTO VOCÊ DESEJA","placeholder":"Psicológico, Jurídico, Psicológico & Jurídico ","required":"true","value":"Psicológico"},{"uid":"field-1546881946816-20","kind":"dropdown","label":"O MAPA ATENDE SOMENTE MULHERES MAIORES DE 18 ANOS QUE SOFRERAM VIOLÊNCIA DE GÊNERO QUE VIVEM NO BRASIL E NÃO PODEM PAGAR POR ATENDIMENTO JURÍDICO/PSICOLÓGICO. VOCÊ SE ENCAIXA NESTE PERFIL?","placeholder":"Sim, Não","required":"true","value":"Sim"}]',
        cached_community_id: 40,
        widget_id: 16850,
        created_at: "2020-05-08T12:37:01.553574",
        __typename: "form_entries"
      },
      {
        id: 2000364,
        fields:
          '[{"uid":"field-1531256279518-15","kind":"text","label":"Primeiro nome","placeholder":"Digite apenas o seu primeiro nome, por favor","required":"true","value":"Viviane"},{"uid":"field-1531256284908-34","kind":"email","label":"Email","placeholder":"Seguro e acessível, por ele que nos comunicamos!","required":"true","value":"vivi@gmail.com"},{"uid":"field-1531256429599-79","kind":"dropdown","label":"Estado","placeholder":"AC, AL, AM, AP, BA, CE, DF, ES, GO, MA, MG, MT, MS, PA, PB, PE, PR, PI, RJ, RO, RN, RR, RS, SC, SP, SE, TO","required":"true","value":" SP"},{"uid":"field-1531256438968-91","kind":"text","label":"Cidade","placeholder":"","required":"true","value":"Taubaté"},{"uid":"field-1531256466688-98","kind":"text","label":"Bairro","placeholder":"Digite o bairro onde gostaria de ser atendida","required":"true","value":"Jd Ana Emília"},{"uid":"field-1531256486749-86","kind":"dropdown","label":"QUE TIPO DE ACOLHIMENTO VOCÊ DESEJA","placeholder":"Psicológico, Jurídico, Psicológico & Jurídico ","required":"true","value":" Psicológico & Jurídico "},{"uid":"field-1546881946816-20","kind":"dropdown","label":"O MAPA ATENDE SOMENTE MULHERES MAIORES DE 18 ANOS QUE SOFRERAM VIOLÊNCIA DE GÊNERO QUE VIVEM NO BRASIL E NÃO PODEM PAGAR POR ATENDIMENTO JURÍDICO/PSICOLÓGICO. VOCÊ SE ENCAIXA NESTE PERFIL?","placeholder":"Sim, Não","required":"true","value":"Sim"}]',
        cached_community_id: 40,
        widget_id: 16850,
        created_at: "2020-05-27T13:14:24.678628",
        __typename: "form_entries"
      },
      {
        id: 2000365,
        fields:
          '[{"uid":"field-1531256279518-15","kind":"text","label":"Primeiro nome","placeholder":"Digite apenas o seu primeiro nome, por favor","required":"true","value":"Camila"},{"uid":"field-1531256284908-34","kind":"email","label":"Email","placeholder":"Seguro e acessível, por ele que nos comunicamos!","required":"true","value":"camila@email.com"},{"uid":"field-1531256429599-79","kind":"dropdown","label":"Estado","placeholder":"AC, AL, AM, AP, BA, CE, DF, ES, GO, MA, MG, MT, MS, PA, PB, PE, PR, PI, RJ, RO, RN, RR, RS, SC, SP, SE, TO","required":"true","value":" MT"},{"uid":"field-1531256438968-91","kind":"text","label":"Cidade","placeholder":"","required":"true","value":"Cuiabá"},{"uid":"field-1531256466688-98","kind":"text","label":"Bairro","placeholder":"Digite o bairro onde gostaria de ser atendida","required":"true","value":"Centro"},{"uid":"field-1531256486749-86","kind":"dropdown","label":"QUE TIPO DE ACOLHIMENTO VOCÊ DESEJA","placeholder":"Psicológico, Jurídico, Psicológico & Jurídico ","required":"true","value":"Psicológico"},{"uid":"field-1546881946816-20","kind":"dropdown","label":"O MAPA ATENDE SOMENTE MULHERES MAIORES DE 18 ANOS QUE SOFRERAM VIOLÊNCIA DE GÊNERO QUE VIVEM NO BRASIL E NÃO PODEM PAGAR POR ATENDIMENTO JURÍDICO/PSICOLÓGICO. VOCÊ SE ENCAIXA NESTE PERFIL?","placeholder":"Sim, Não","required":"true","value":"Sim"}]',
        cached_community_id: 40,
        widget_id: 16850,
        created_at: "2020-05-27T13:15:47.93393",
        __typename: "form_entries"
      },
      {
        id: 423413,
        fields:
          '[{"uid":"field-1531256279518-15","kind":"text","label":"Nome","placeholder":"","required":"true","value":"Patricia Teste"},{"uid":"field-1531256284908-34","kind":"email","label":"Email","placeholder":"","required":"true","value":"patricia@teste.com"},{"uid":"field-1531256429599-79","kind":"text","label":"Estado","placeholder":"","required":"true","value":"SP"},{"uid":"field-1531256438968-91","kind":"text","label":"Cidade","placeholder":"","required":"true","value":"São Paulo "},{"uid":"field-1531256466688-98","kind":"text","label":"Bairro","placeholder":"","required":"true","value":"Consolação "},{"uid":"field-1531256486749-86","kind":"dropdown","label":"QUE TIPO DE ACOLHIMENTO VOCÊ DESEJA","placeholder":"Acolhimento Terapêutico, Acolhimento Jurídico, Acolhimento Terapêutico & Jurídico ","required":"true","value":"Acolhimento Terapêutico & Jurídico"}]',
        cached_community_id: 40,
        widget_id: 16850,
        created_at: "2018-07-11T17:05:15.218893",
        __typename: "form_entries"
      }
    ],
    results: [
      {
        name: "Igor",
        role: "end-user",
        organization_id: 360273031591,
        email: "igor@nossas.org",
        external_id: "2000302",
        phone: "",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: "psicológico",
          condition: "inscrita",
          whatsapp: null,
          registration_number: null,
          occupation_area: null,
          disponibilidade_de_atendimentos: null,
          data_de_inscricao_no_bonde: "2020-05-08T12:37:01.553574"
        }
      },
      {
        name: "Viviane",
        role: "end-user",
        organization_id: 360273031591,
        email: "vivi@gmail.com",
        external_id: "2000364",
        phone: "",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: "psicológico_e_jurídico",
          condition: "inscrita",
          whatsapp: null,
          registration_number: null,
          occupation_area: null,
          disponibilidade_de_atendimentos: null,
          data_de_inscricao_no_bonde: "2020-05-27T13:14:24.678628"
        }
      },
      {
        name: "Camila",
        role: "end-user",
        organization_id: 360273031591,
        email: "camila@email.com",
        external_id: "2000365",
        phone: "",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: "psicológico",
          condition: "inscrita",
          whatsapp: null,
          registration_number: null,
          occupation_area: null,
          disponibilidade_de_atendimentos: null,
          data_de_inscricao_no_bonde: "2020-05-27T13:15:47.93393"
        }
      },
      {
        name: "Patricia Teste",
        role: "end-user",
        organization_id: 360273031591,
        email: "patricia@teste.com",
        external_id: "423413",
        phone: "",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: "psicológico_e_jurídico",
          condition: "inscrita",
          whatsapp: null,
          registration_number: null,
          occupation_area: null,
          disponibilidade_de_atendimentos: null,
          data_de_inscricao_no_bonde: "2018-07-11T17:05:15.218893"
        }
      }
    ]
  },
  "2760": {
    cache: [
      {
        id: 136039,
        fields:
          '[{"uid":"field-1464961964463-91","kind":"text","label":"NOME","placeholder":"","required":"true","value":"Teste"},{"uid":"field-1464961980231-76","kind":"text","label":"SOBRENOME","placeholder":"","required":"true","value":"Tese"},{"uid":"field-1464961993261-67","kind":"text","label":"CELULAR","placeholder":"","required":"true","value":"2100000000"},{"uid":"field-1464962001235-81","kind":"dropdown","label":"CIDADE","placeholder":"Campinas,Garopaba,Recife,Rio de Janeiro,Ouro Preto,Porto Alegre,Outra","required":"true","value":"Campinas"},{"uid":"field-1464962010023-34","kind":"text","label":"BAIRRO","placeholder":"","required":"true","value":"as"},{"uid":"field-1464962030025-16","kind":"email","label":"EMAIL","placeholder":"","required":"true","value":"lol@lol.com"},{"uid":"field-1464962039059-69","kind":"text","label":"ESPECIALIZAÇÃO","placeholder":"","required":"true","value":"nao tenho"},{"uid":"field-1464962055652-41","kind":"text","label":"Número de registro CRP ou CRM","placeholder":"","required":"true","value":"tese"},{"uid":"field-1464962083833-11","kind":"text","label":" Indique duas referências que possam nos comprovar a qualidade do seu serviço.","placeholder":"","required":"true","value":"teste"},{"uid":"field-1464962127079-77","kind":"dropdown","label":"Para quantas pacientes pode oferecer seu serviço?","placeholder":"1,2,3,4,5,Mais de 5","required":"true","value":"2"}]',
        cached_community_id: 40,
        widget_id: 2760,
        created_at: "2016-06-06T22:18:29.35002",
        __typename: "form_entries"
      }
    ],
    results: [
      {
        name: "Teste Tese",
        role: "end-user",
        organization_id: 360282119532,
        email: "lol@lol.com",
        external_id: "136039",
        phone: "2100000000",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: null,
          registration_number: "tese",
          occupation_area: "nao tenho",
          disponibilidade_de_atendimentos: "2",
          data_de_inscricao_no_bonde: "2016-06-06T22:18:29.35002"
        }
      }
    ]
  },
  "3297": {
    cache: [
      {
        id: 189365,
        fields:
          '[{"uid":"field-1468596771645-85","kind":"text","label":"Nome","placeholder":"","required":"true","value":"Teste"},{"uid":"field-1468596980548-63","kind":"text","label":"Sobrenome","placeholder":"","required":"false","value":"Teste"},{"uid":"field-1468596987436-37","kind":"email","label":"Email","placeholder":"","required":"true","value":"teste@gmail.com"},{"uid":"field-1468597009217-99","kind":"dropdown","label":"Cidade","placeholder":"Blumenau,Campinas,Garopaba,Recife,Rio de Janeiro,Ouro Preto,Porto Alegre,Outra","required":"true","value":"Rio de Janeiro"},{"uid":"field-1468597036505-17","kind":"number","label":"CEP","placeholder":"","required":"true","value":"22"},{"uid":"field-1468597056552-95","kind":"dropdown","label":"Você registrou o caso?","placeholder":"Sim,Não","required":"false","value":"Não"}]',
        cached_community_id: 40,
        widget_id: 3297,
        created_at: "2016-07-28T23:24:46.472049",
        __typename: "form_entries"
      }
    ],
    results: [
      {
        name: "Teste",
        role: "end-user",
        organization_id: 360273031591,
        email: "teste@gmail.com",
        external_id: "189365",
        phone: "",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "inscrita",
          whatsapp: null,
          registration_number: null,
          occupation_area: null,
          disponibilidade_de_atendimentos: null,
          data_de_inscricao_no_bonde: "2016-07-28T23:24:46.472049"
        }
      }
    ]
  },
  "16835": {
    cache: [
      {
        id: 420092,
        fields:
          '[{"uid":"field-1530889190780-12","kind":"text","label":"Nome","placeholder":"","required":"true","value":"Paola "},{"uid":"field-1530889199847-58","kind":"text","label":"Sobrenome","placeholder":"","required":"true","value":"Teste"},{"uid":"field-1530889206194-83","kind":"email","label":"Email","placeholder":"","required":"true","value":"paola@teste.com"},{"uid":"field-1530889245511-83","kind":"text","label":"CRP OU CRM","placeholder":"","required":"true","value":"123123"},{"uid":"field-1530889263140-10","kind":"text","label":"Estado","placeholder":"","required":"true","value":"São Paulo"},{"uid":"field-1530889278542-68","kind":"text","label":"Cidade","placeholder":"","required":"true","value":"São Paulo"},{"uid":"field-1530889290557-13","kind":"text","label":"ENDEREÇO DE ATENDIMENTO","placeholder":"","required":"true","value":"Rua Catumbi"},{"uid":"field-1530889321904-94","kind":"number","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"(Esse número será divulgado para quem busca acolhimento)","required":"true","value":"11 999988999"},{"uid":"field-1530889345052-73","kind":"number","label":"WHATSAPP","placeholder":"(Esse número será divulgado apenas para a equipe)","required":"false","value":"11 999988999"},{"uid":"field-1530889372549-40","kind":"text","label":"QUANTAS MULHERES PODE ATENDER PELO MAPA DO ACOLHIMENTO","placeholder":"","required":"true","value":"5"},{"uid":"field-1530889382200-77","kind":"text","label":"ESPECIALIZAÇÃO","placeholder":"(Se tiver)","required":"false","value":"Saúde Mental"}]',
        cached_community_id: 40,
        widget_id: 16835,
        created_at: "2018-07-09T14:25:11.741693",
        __typename: "form_entries"
      },
      {
        id: 455167,
        fields:
          '[{"uid":"field-1530889190780-12","kind":"text","label":"Nome","placeholder":"","required":"true","value":"Camilla"},{"uid":"field-1530889199847-58","kind":"text","label":"Sobrenome","placeholder":"","required":"true","value":"Teste"},{"uid":"field-1530889206194-83","kind":"email","label":"Email","placeholder":"","required":"true","value":"camilla@teste.com"},{"uid":"field-1530889245511-83","kind":"text","label":"CRP OU CRM","placeholder":"","required":"true","value":"123123"},{"uid":"field-1530889263140-10","kind":"dropdown","label":"Estado","placeholder":"AC, AL, AM, AP, BA, CE, DF, ES, GO, MA, MG, MT, MS, PA, PB, PE, PI, PR, RJ, RN, RO, RR, RS, SC, SE, SP, TO","required":"true","value":"RJ"},{"uid":"field-1530889278542-68","kind":"text","label":"Cidade","placeholder":"","required":"true","value":"Petrópolis"},{"uid":"field-1530889290557-13","kind":"text","label":"ENDEREÇO DE ATENDIMENTO","placeholder":"","required":"true","value":"Centro - Petrópolis"},{"uid":"field-1530889321904-94","kind":"number","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"(Esse número será divulgado para quem busca acolhimento)","required":"true","value":"11 999988999"},{"uid":"field-1530889345052-73","kind":"number","label":"WHATSAPP","placeholder":"(Esse número será divulgado apenas para a equipe)","required":"false","value":"11 999988999"},{"uid":"field-1530889372549-40","kind":"dropdown","label":"QUANTAS MULHERES PODE ATENDER AO MESMO TEMPO","placeholder":"1, 2, 3, 4, 5 ou mais","required":"true","value":"1"},{"uid":"field-1530889382200-77","kind":"text","label":"ÁREAS DE ATUAÇÃO","placeholder":"(Se tiver)","required":"false","value":"Psicologia Clínica "}]',
        cached_community_id: 40,
        widget_id: 16835,
        created_at: "2018-08-08T12:39:01.286056",
        __typename: "form_entries"
      }
    ],
    results: [
      {
        name: "Paola  Teste",
        role: "end-user",
        organization_id: 360282119532,
        email: "paola@teste.com",
        external_id: "420092",
        phone: "11 999988999",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: "11 999988999",
          registration_number: "123123",
          occupation_area: "Saúde Mental",
          disponibilidade_de_atendimentos: "5",
          data_de_inscricao_no_bonde: "2018-07-09T14:25:11.741693"
        }
      },
      {
        name: "Camilla Teste",
        role: "end-user",
        organization_id: 360282119532,
        email: "camilla@teste.com",
        external_id: "455167",
        phone: "11 999988999",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: "11 999988999",
          registration_number: "123123",
          occupation_area: "Psicologia Clínica ",
          disponibilidade_de_atendimentos: "1",
          data_de_inscricao_no_bonde: "2018-08-08T12:39:01.286056"
        }
      }
    ]
  },
  "8190": {
    cache: [
      {
        id: 322155,
        fields:
          '[{"uid":"field-1497368661426-82","kind":"text","label":"Nome","placeholder":"","required":"true","value":"Larissa"},{"uid":"field-1497368672826-91","kind":"text","label":"Sobrenome","placeholder":"","required":"false","value":"Teste"},{"uid":"field-1497369273804-61","kind":"text","label":"Número para marcação de consulta (com ddd)","placeholder":"","required":"true","value":"42988889999"},{"uid":"field-1497368680011-82","kind":"text","label":"Email","placeholder":"","required":"true","value":"larissa@teste.com"},{"uid":"field-1497368693005-33","kind":"text","label":"Número de registro/OAB","placeholder":"","required":"true","value":"123123"},{"uid":"field-1497368810164-63","kind":"text","label":"POSSUI ESPECIALIZAÇÃO? CONTA MAIS PRA GENTE!","placeholder":"","required":"true","value":"Especialista em Direito e Processo Penal"},{"uid":"field-1497369214092-68","kind":"text","label":"CIDADE","placeholder":"","required":"true","value":"Ponta Grossa"},{"uid":"field-1497369283737-19","kind":"text","label":"Indique duas referências que possam nos comprovar a qualidade dos teus serviços","placeholder":"","required":"true","value":"Indicações"},{"uid":"field-1497369326335-47","kind":"number","label":"Para quantas mulheres podes oferecer teus serviços?","placeholder":"","required":"true","value":"2 "}]',
        cached_community_id: 40,
        widget_id: 8190,
        created_at: "2017-06-20T00:47:07.442283",
        __typename: "form_entries"
      },
      {
        id: 405430,
        fields:
          '[{"uid":"field-1497368661426-82","kind":"text","label":"Nome","placeholder":"","required":"true","value":"Heloisa "},{"uid":"field-1497368672826-91","kind":"text","label":"Sobrenome","placeholder":"","required":"false","value":"Teste"},{"uid":"field-1497369273804-61","kind":"text","label":"Número para marcação de consulta (com ddd)","placeholder":"","required":"true","value":"(021)988889999"},{"uid":"field-1497368680011-82","kind":"text","label":"Email","placeholder":"","required":"true","value":"hhmj@teste.com"},{"uid":"field-1497368693005-33","kind":"text","label":"Número de registro/OAB","placeholder":"","required":"true","value":"123123 RJ"},{"uid":"field-1497368810164-63","kind":"text","label":"POSSUI ESPECIALIZAÇÃO? CONTA MAIS PRA GENTE!","placeholder":"","required":"true","value":"não"},{"uid":"field-1497369214092-68","kind":"text","label":"CIDADE","placeholder":"","required":"true","value":"Rio de Janeiro"},{"uid":"field-1497369283737-19","kind":"text","label":"Quais tuas áreas de atuação?","placeholder":"","required":"true","value":"família, cível, inventário"},{"uid":"field-1497369326335-47","kind":"number","label":"Para quantas mulheres podes oferecer teus serviços?","placeholder":"","required":"true","value":"10"}]',
        cached_community_id: 40,
        widget_id: 8190,
        created_at: "2018-04-08T16:25:23.955426",
        __typename: "form_entries"
      }
    ],
    results: [
      {
        name: "Larissa Teste",
        role: "end-user",
        organization_id: 360269610652,
        email: "larissa@teste.com",
        external_id: "322155",
        phone: "42988889999",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: null,
          registration_number: "123123",
          occupation_area: "Indicações",
          disponibilidade_de_atendimentos: "2",
          data_de_inscricao_no_bonde: "2017-06-20T00:47:07.442283"
        }
      },
      {
        name: "Heloisa  Teste",
        role: "end-user",
        organization_id: 360269610652,
        email: "hhmj@teste.com",
        external_id: "405430",
        phone: "(021)988889999",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: null,
          registration_number: "123123 RJ",
          occupation_area: "família, cível, inventário",
          disponibilidade_de_atendimentos: "5_ou_mais",
          data_de_inscricao_no_bonde: "2018-04-08T16:25:23.955426"
        }
      }
    ]
  },
  "16838": {
    cache: [
      {
        id: 455181,
        fields:
          '[{"uid":"field-1530889762581-19","kind":"text","label":"Nome","placeholder":"","required":"true","value":"Paula"},{"uid":"field-1530889778477-47","kind":"text","label":"Sobrenome","placeholder":"","required":"true","value":"Teste"},{"uid":"field-1530889827033-18","kind":"email","label":"Email","placeholder":"","required":"true","value":"eugenio@teste.com"},{"uid":"field-1530889844695-35","kind":"text","label":"OAB","placeholder":"","required":"true","value":"158157"},{"uid":"field-1530889861614-27","kind":"dropdown","label":"ESTADO","placeholder":"AC, AL, AM, AP, BA, CE, DF, ES, GO, MA, MG, MT, MS, PA, PB, PE, PI, PR, RJ, RN, RO, RR, RS, SC, SE, SP, TO","required":"true","value":"MG"},{"uid":"field-1530889875964-17","kind":"text","label":"CIDADE","placeholder":"","required":"true","value":"Varginha"},{"uid":"field-1530889888615-19","kind":"text","label":"ENDEREÇO DE ATENDIMENTO","placeholder":"","required":"true","value":"Rua Venerável Ludovico Pavone"},{"uid":"field-1530889910384-28","kind":"number","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"(Esse número será divulgado para quem busca acolhimento)","required":"true","value":"35988889999"},{"uid":"field-1530889937136-21","kind":"number","label":"WHATSAPP","placeholder":"(Apenas para contato da equipe)","required":"false","value":"35988889999"},{"uid":"field-1530889975174-37","kind":"dropdown","label":"QUE TIPO DE SERVIÇO PODE OFERECER","placeholder":"Orientação jurídica (apenas consultoria), Assessoria jurídica (atendimento pro bono), Orientação & assessoria jurídica","required":"true","value":"Orientação & assessoria jurídica"},{"uid":"field-1530890024584-74","kind":"dropdown","label":"QUANTAS ORIENTAÇÕES JURÍDICAS PODE FAZER AO MESMO TEMPO","placeholder":"1, 2, 3, 4, 5 ou mais","required":"false","value":"3"},{"uid":"field-1530890036340-68","kind":"dropdown","label":"QUANTAS ASSESSORIAS JURÍDICAS PODE FAZER AO MESMO TEMPO","placeholder":"1, 2, 3, 4, 5 ou mais","required":"false","value":"3"},{"uid":"field-1530890050032-24","kind":"text","label":"ÁREAS DE ATUAÇÃO","placeholder":"(se tiver)","required":"false","value":"Direito de família, civil e trabalhista"}]',
        cached_community_id: 40,
        widget_id: 16838,
        created_at: "2018-08-08T13:00:16.991663",
        __typename: "form_entries"
      },
      {
        id: 420225,
        fields:
          '[{"uid":"field-1530889762581-19","kind":"text","label":"Nome","placeholder":"","required":"true","value":"Ana Carolina"},{"uid":"field-1530889778477-47","kind":"text","label":"Sobrenome","placeholder":"","required":"true","value":"Teste"},{"uid":"field-1530889827033-18","kind":"email","label":"Email","placeholder":"","required":"true","value":"anacarolina@teste.com"},{"uid":"field-1530889844695-35","kind":"text","label":"OAB","placeholder":"","required":"true","value":"123123"},{"uid":"field-1530889861614-27","kind":"text","label":"ESTADO","placeholder":"","required":"true","value":"Santa Catarina "},{"uid":"field-1530889875964-17","kind":"text","label":"CIDADE","placeholder":"","required":"true","value":"Blumenau"},{"uid":"field-1530889888615-19","kind":"text","label":"ENDEREÇO DE ATENDIMENTO","placeholder":"","required":"true","value":"Rua Iguaçu"},{"uid":"field-1530889910384-28","kind":"number","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"(Esse número será divulgado para quem busca acolhimento)","required":"true","value":"(47) 988889999"},{"uid":"field-1530889937136-21","kind":"number","label":"WHATSAPP","placeholder":"(Apenas para contato da equipe)","required":"false","value":"(47) 988889999"},{"uid":"field-1530889975174-37","kind":"dropdown","label":"QUE TIPO DE SERVIÇO PODE OFERECER","placeholder":"Orientação jurídica (apenas consultoria), Assessoria jurídica (atendimento pro bono), Orientação & assessoria jurídica","required":"true","value":"Assessoria jurídica (atendimento pro bono)"},{"uid":"field-1530890024584-74","kind":"text","label":"PARA QUANTAS PESSOAS PODE PRESTAR ORIENTAÇÃO JURÍDICA","placeholder":"","required":"false","value":"2"},{"uid":"field-1530890036340-68","kind":"text","label":"PARA QUANTAS PESSOAS PODE PRESTAR ASSESSORIA JURÍDICA","placeholder":"","required":"false","value":"1"},{"uid":"field-1530890050032-24","kind":"text","label":"ESPECIALIZAÇÃO","placeholder":"(se tiver)","required":"false","value":"Família e Consumidor"}]',
        cached_community_id: 40,
        widget_id: 16838,
        created_at: "2018-07-09T21:25:55.801691",
        __typename: "form_entries"
      }
    ],
    results: [
      {
        name: "Paula Teste",
        role: "end-user",
        organization_id: 360269610652,
        email: "eugenio@teste.com",
        external_id: "455181",
        phone: "35988889999",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: "35988889999",
          registration_number: "158157",
          occupation_area: "Direito de família, civil e trabalhista",
          disponibilidade_de_atendimentos: "3",
          data_de_inscricao_no_bonde: "2018-08-08T13:00:16.991663"
        }
      },
      {
        name: "Ana Carolina Teste",
        role: "end-user",
        organization_id: 360269610652,
        email: "anacarolina@teste.com",
        external_id: "420225",
        phone: "(47) 988889999",
        verified: true,
        user_fields: {
          cor: null,
          address: geolocation.address,
          cep: geolocation.cep,
          city: geolocation.city,
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          state: geolocation.state,
          tipo_de_acolhimento: null,
          condition: "desabilitada",
          whatsapp: "(47) 988889999",
          registration_number: "123123",
          occupation_area: "Família e Consumidor",
          disponibilidade_de_atendimentos: "1",
          data_de_inscricao_no_bonde: "2018-07-09T21:25:55.801691"
        }
      }
    ]
  }
};

describe('Submit Psicólogas Form', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  Cypress.on('uncaught:exception', () => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  Cypress._.times(19, (i) => {
    let testDescribe = 'Nenhum risco';
    it('Fill form', () => {
      //send section 1 button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar11 > .mautic-pagebreak-next')
        .should('be.visible').click();

      //send section 2
      // 1
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_nome_completo')
        .should('be.visible').type('Nome Teste');

      // 2
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_email_de_cadastro')
        .should('be.visible').type('emailteste@teste.com');

      // button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar > .mautic-pagebreak-next')
        .should('be.visible').click();

      //send section 3
      // 3
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_nome_da_acolhida')
        .should('be.visible').type('Nome Testes');

      // 4
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_data_de_nascimento')
        .should('be.visible').type('1996-11-15')

      // 5
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_como_a_acolhida_se_auto_d1')
        .should('be.visible').select('Parda')

      // 6
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_qual_a_identidade_de_gene')
        .should('be.visible').select('Prefere não responder')

      // 7
      if (i == 3) {
        testDescribe = 'Teste 3: questão 7 com risco Grave'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_tem_alguma_def')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_tem_alguma_def')
          .should('be.visible').select('Não')
      }

      // 7.1
      if (i == 3) {
        cy.get('#mauticform_checkboxgrp_checkbox_informe_aqui_qual_ou_quai_Deficienciamentalcognitiva3')
          .should('be.visible').click();
      }

      // 8
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_qual_o_estado_civil_da_ac')
        .should('be.visible').select('Solteira')

      // 9
      if (i == 4) {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_tem_filhasos')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_tem_filhasos')
          .should('be.visible').select('Não')
      }

      // 9.1
      if (i == 4) {
        cy.get('#mauticform_instrumentaldetriagem2psicologas_selecione_em_qual_faixa_e > .mauticform-label').should('be.visible')
        cy.get('#mauticform_checkboxgrp_checkbox_selecione_em_qual_faixa_e_7a11anos2').click()
      }

      // 9.2
      if (i == 4) {
        testDescribe = 'Teste 4: questão 9.2 com risco Grave'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_algum_dos_filhos_e_pessoa')
          .should('be.visible').select('Sim')
      }

      // 9.3
      if (i == 4) {
        cy.get('#mauticform_checkboxgrp_checkbox_caso_tenha_respondido_sim1_Deficienciamotora2')
          .should('be.visible').click();
      }

      // 10
      if (i == 5) {
        testDescribe = 'Teste 5: questão 10 com risco Grave'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_esta_gravida_o')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_esta_gravida_o')
          .should('be.visible').select('Não')
      }

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar1 > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 4

      // 11
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_qual_a_escolaridade_da_ac')
        .should('be.visible').select('Mestrado')

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar2 > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 5

      // 12
      if (i === 1) {
        testDescribe = 'Teste 1: questão 12 com risco Moderado'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_considera_que')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_considera_que')
          .should('be.visible').select('Não')
      }

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar3 > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 6

      // 13
      cy.get('#mauticform_instrumentaldetriagem2psicologas_quais_impactos_a_acolhida > .mauticform-label')
        .should('be.visible')
      cy.get('#mauticform_checkboxgrp_checkbox_quais_impactos_a_acolhida_Insonia0').click()

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar5 > .mautic-pagebreak-next').click()

      // Section 7

      // 14
      cy.get('#mauticform_instrumentaldetriagem2psicologas_tipos_de_violencia_que_a1 > .mauticform-label')
        .should('be.visible')
      cy.get('#mauticform_checkboxgrp_checkbox_tipos_de_violencia_que_a1_Psicologica1')
        .should('be.visible').click()

      // 15
      if (i == 6) {
        testDescribe = 'Teste 6: questão 15 com risco Grave'
        cy.get('#mauticform_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja > .mauticform-label')
          .should('be.visible')
        cy.get('#mauticform_checkboxgrp_checkbox_oa_autora_da_violencia_ja_Chute1')
          .should('be.visible').click()
      } else {
        cy.get('#mauticform_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja > .mauticform-label')
          .should('be.visible')
        cy.get('#mauticform_checkboxgrp_checkbox_oa_autora_da_violencia_ja_Nenhumaagressaofisica6')
          .should('be.visible').click()
      }

      // 16
      if (i == 14) {
        testDescribe = 'Teste 14: questão 16 com risco Extremo'
        cy.get('#mauticform_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja1 > .mauticform-label')
          .should('be.visible')
        cy.get('#mauticform_checkboxgrp_checkbox_oa_autora_da_violencia_ja1_Enforcamento1')
          .should('be.visible').click()
      } else {
        cy.get('#mauticform_checkboxgrp_checkbox_oa_autora_da_violencia_ja1_Nenhumaagressaofisica9')
          .should('be.visible').click()
      }

      // 17
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_se_sente_isola')
        .should('be.visible').select('Sim')

      // 18
      if (i == 13) {
        testDescribe = 'Teste 13: questão 18 com risco Extremo'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_te')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_te')
          .should('be.visible').select('Não')
      }

      // 19
      if (i == 15) {
        testDescribe = 'Teste 15: questão 19 com risco Extremo'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja2')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja2')
          .should('be.visible').select('Não')
      }

      // 19.1
      if (i == 15) {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_como')
          .should('be.visible').select('Utilizando faca')
      }

      // 20
      if (i == 7) {
        testDescribe = 'Teste 7: questão 20 com risco Grave'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja3')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja3')
          .should('be.visible').select('Não')
      }

      // 21
      if (i == 8) {
        testDescribe = 'Teste 8: questão 21 com risco Grave'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_caso_se_aplique_a_acolhid')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_caso_se_aplique_a_acolhid')
          .should('be.visible').select('Não')
      }

      // 22
      if (i == 16) {
        testDescribe = 'Teste 16: questão 22 com risco Extremo'
        cy.get('#mauticform_checkboxgrp_checkbox_27_oa_autora_da_violencia_Perturbouperseguiuouvigiouapessoaacolhidanoslocaisquefrequenta1')
          .should('be.visible').click()
      } else {
        cy.get('#mauticform_checkboxgrp_checkbox_27_oa_autora_da_violencia_Perturbouperseguiuouvigiouapessoaacolhidanoslocaisquefrequenta1')
      }


      // 23
      if (i == 9) {
        testDescribe = 'Teste 9: questão 23 com risco Grave'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_25_a_acolhida_necessitou')
          .should('be.visible').select('Sim, internação')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_25_a_acolhida_necessitou')
          .should('be.visible').select('Não')
      }

      // 25
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_apresenta_depe')
        .should('be.visible').select('Não')

      // 26
      if (i == 10) {
        testDescribe = 'Teste 10: questão 26 com risco Grave'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_as_agressoes_ou_ameacas_d')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_as_agressoes_ou_ameacas_d')
          .should('be.visible').select('Não')
      }

      // 27
      if (i == 17) {
        testDescribe = 'Teste 17: questão 27 com risco Extremo'
        cy.get('#mauticform_checkboxgrp_checkbox_oa_autora_da_violencia_ja4_Simamigos2')
          .should('be.visible').click()
      } else {
        cy.get('#mauticform_checkboxgrp_checkbox_oa_autora_da_violencia_ja4_Nao6')
          .should('be.visible').click()
      }


      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar6 > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 8

      // 28
      if (i === 2) {
        testDescribe = 'Teste 2: questão 28 com risco Moderado'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_te1')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_te1')
          .should('be.visible').select('Não')
      }

      // 29
      if (i == 11) {
        testDescribe = 'Teste 11: questão 29 com risco Grave'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_fa')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_fa')
          .should('be.visible').select('Não')
      }

      // 29.1
      if (i == 11) {
        cy.get('#mauticform_checkboxgrp_checkbox_caso_tenha_respondido_sim5_Cocaina2')
          .should('be.visible').click()
      }

      // 30
      if (i == 12) {
        testDescribe = 'Teste 12: questão 30 com risco Grave'
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_te2')
          .should('be.visible').select('Sim')
      } else {
        cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_te2')
          .should('be.visible').select('Não')
      }

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuarr > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 9

      // 31
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_ja_manifestou')
        .should('be.visible').select('Não')

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar4 > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 10

      // 32
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_descreva_resumidamente_a1')
        .should('be.visible').type(`${testDescribe}`)

      // 33
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_encaminhamento_do_caso')
        .should('be.visible').select('Atendimento contínuo')

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar7 > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 11
      // 36
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_data_do_inicio_do_atendim')
        .should('be.visible').type('2020-11-15')

      // 37
      cy.get('#mauticform_checkboxgrp_checkbox_mas_mais_seguras_de_acess_AudioWhatsapp3')
        .should('be.visible').click()

      // 38
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_qual_a_frequencia_do_aten')
        .should('be.visible').select('1 vez na semana')

      // 39
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_contrato_formato')
        .should('be.visible').select('Remoto')

      // 40
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_acordou_a_politica_de_fal')
        .should('be.visible').select('Sim')

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar8 > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 12

      // 41
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_esta_em_acompa')
        .should('be.visible').select('Não')

      // 42
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_existe_processo_juridico')
        .should('be.visible').select('Sim')

      // 43
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_caso_se_aplique_voce_prof')
        .should('be.visible').select('Sim')

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar9 > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 13
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_voce_se_preocupa_ou_perce')
        .should('be.visible').select('Sim (comunique imediatamente à equipe)')

      // Button
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_submit')
        .should('be.visible').click()

    })
  })
})

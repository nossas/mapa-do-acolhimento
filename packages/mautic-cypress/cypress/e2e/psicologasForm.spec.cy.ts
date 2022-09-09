describe('Submit Psicólogas Form', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
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
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_tem_alguma_def')
        .should('be.visible').select('Não')
      //TODO: select SIM

      // 8
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_qual_o_estado_civil_da_ac')
        .should('be.visible').select('Solteira')

      // 9
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_tem_filhasos')
        .should('be.visible').select('Sim')

      // 9.1
      cy.get('#mauticform_instrumentaldetriagem2psicologas_selecione_em_qual_faixa_e > .mauticform-label').should('be.visible')
      cy.get('#mauticform_checkboxgrp_checkbox_selecione_em_qual_faixa_e_7a11anos2').click()

      // 9.2
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_algum_dos_filhos_e_pessoa')
        .should('be.visible').select('Não')

      // 10
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_esta_gravida_o')
        .should('be.visible').select('Não')

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
      cy.get('#mauticform_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja > .mauticform-label')
        .should('be.visible')
      cy.get('#mauticform_checkboxgrp_checkbox_oa_autora_da_violencia_ja_Chute1')
        .should('be.visible').click()

      // 16
      cy.get('#mauticform_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja1 > .mauticform-label')
        .should('be.visible')
      cy.get('#mauticform_checkboxgrp_checkbox_oa_autora_da_violencia_ja1_Enforcamento1')
        .should('be.visible').click()

      // 17
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_se_sente_isola')
        .should('be.visible').select('Sim')

      // 18
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_te')
        .should('be.visible').select('Sim')

      // 19
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja2')
        .should('be.visible').select('Sim')

      // 20
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_ja3')
        .should('be.visible').select('Não')

      // 22
      cy.get('#mauticform_checkboxgrp_checkbox_27_oa_autora_da_violencia_Perturbouperseguiuouvigiouapessoaacolhidanoslocaisquefrequenta1')
        .should('be.visible').click()

      // 23
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_25_a_acolhida_necessitou')
        .should('be.visible').select('Não')

      // 25
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_a_acolhida_apresenta_depe')
        .should('be.visible').select('Não')

      // 26
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_as_agressoes_ou_ameacas_d')
        .should('be.visible').select('Não')

      // 27
      cy.get('#mauticform_checkboxgrp_checkbox_oa_autora_da_violencia_ja4_Simamigos2')
        .should('be.visible').click()

      // Button
      cy.get('#mauticform_instrumentaldetriagem2psicologas_continuar6 > .mautic-pagebreak-next')
        .should('be.visible').click()

      // Section 8

      // 28
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_te1')
        .should('be.visible').select('Não')

      // 29
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_fa')
        .should('be.visible').select('Não')

      // 30
      cy.get('#mauticform_input_instrumentaldetriagem2psicologas_oa_autora_da_violencia_te2')
        .should('be.visible').select('Não')

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

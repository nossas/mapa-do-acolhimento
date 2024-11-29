describe("Submit Interrupção atendimento Form", () => {
  beforeEach(() => {
    cy.visit("/interrupcao-atendimento");
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  Cypress._.times(1, i => {
    let testDescribe = "Nenhum risco";
    it("Fill form", () => {
      //send section 1 button
      cy.get('#mauticform_instrumentaldeinterrupcaodoatendimento_continuar > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      // // section 2
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_1_nome_completo')
        .should("be.visible").type("Maria Teste");
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_2_email_de_cadastro')
        .should("be.visible").type("teste@teste.com");
      cy.get('#mauticform_instrumentaldeinterrupcaodoatendimento_continuar1 > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      // //section 3
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_3_nome_da_acolhida')
        .should("be.visible").type("Roberta Teste");
      cy.get('#mauticform_instrumentaldeinterrupcaodoatendimento_continuar2 > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      //section 4
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_4_data_de_inicio_do_atend')
        .should("be.visible").type("2022-11-11");
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_5_data_de_interrupcao_do')
        .should("be.visible").type("2022-11-11");
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_6_qual_a_demanda_da_acolh')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_checkboxgrp_checkbox_7_qual_o_motivo_da_interr_Perdadevinculocomaacolhida1')
        .should("be.visible").click();
      cy.get('#mauticform_checkboxgrp_checkbox_8_caso_a_area_de_atuacao_Civel0')
        .should("be.visible").click();
      cy.get('#mauticform_checkboxgrp_checkbox_9_caso_a_acolhida_necessi_CRMCDCMCRAMCIAM3')
        .should("be.visible").click();
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_10_voce_e_a_acolhida_segu')
        .should("be.visible").select('Sim');
      cy.get('#mauticform_instrumentaldeinterrupcaodoatendimento_continuar3 > .mautic-pagebreak-next')
        .should("be.visible").click()

      //section 5
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_11_voce_continuara_dispon')
        .should("be.visible").select('Sim')
      cy.get('#mauticform_instrumentaldeinterrupcaodoatendimento_continuar4 > .mautic-pagebreak-next')
        .should("be.visible").click()

      //section 6
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_12_voce_solicitou_ajuda_d')
        .should("be.visible").select('Sim');
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_13_quais_aprendizagens_es')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_14_quais_desafios_voce_en')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_15_se_desejar_descreva_su')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_instrumentaldeinterrupcaodoatendimento_continuar5 > .mautic-pagebreak-next')
        .should("be.visible").click()

      // //section 7
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoatendimento_submit')
        .should("be.visible")
        .click()
    });
  });
});

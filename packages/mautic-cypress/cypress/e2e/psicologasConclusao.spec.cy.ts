describe("Submit Advogadas Form", () => {
  beforeEach(() => {
    cy.visit("/conclusao-psicologico");
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
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentospsicologicos_continuar > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      // section 2
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_1_nome_completo')
        .should("be.visible").type("Nome teste");
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_2_email_de_cadastro')
        .should("be.visible").type("teste@teste.br");
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentospsicologicos_continuar1 > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      //section 3
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_3_nome_da_acolhida')
        .should("be.visible").type("Nome teste");
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentospsicologicos_continuar2 > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      //section 4
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_4_data_de_encerramento_do')
        .should("be.visible").type("1111-11-11");
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_5_voce_e_a_acolhida_segui')
        .should("be.visible").select('Sim')
      cy.get('#mauticform_checkboxgrp_checkbox_5_atraves_do_atendimento_Saiudociclodaviolencia0')
        .should("be.visible").click()
      cy.get('#mauticform_checkboxgrp_checkbox_7_quais_impactos_a_acolhi_Aacolhidanaoestasofrendonenhumdosimpactoscitadosacima9')
        .should("be.visible").click()
      cy.get('#mauticform_checkboxgrp_checkbox_8_quais_impactos_a_acolhi_Aacolhidanaoestasofrendonenhumdosimpactoscitadosacima15')
        .should("be.visible").click()
      cy.get('#mauticform_checkboxgrp_checkbox_9_quais_impactos_em_decor_Disturbioalimentar4')
        .should("be.visible").click()
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_10_descreva_sucintamente')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentospsicologicos_continuar3 > .mautic-pagebreak-next')
        .should("be.visible").click()

      //section 5
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_12_quais_aprendizagens_es')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_13_e_os_desafios')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_14_voce_solicitou_ajuda_d')
        .should("be.visible").select('Sim')
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_15_voce_solicitou_ajuda_d')
        .should("be.visible").select('Sim')
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentospsicologicos_continuar4 > .mautic-pagebreak-next')
        .should("be.visible").click()

      //section 6
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_16_se_desejar_deixe_suges')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentospsicologicos_continuar5 > .mautic-pagebreak-next')
        .should("be.visible").click()

      //section 7
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentospsicologicos_submit')
        .should("be.visible")
      // .click()
    });
  });
});

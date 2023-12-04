describe("Submit Advogadas Form", () => {
  beforeEach(() => {
    cy.visit("/conclusao-juridico");
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
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentosjuridicos_continuar > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      // section 2
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_1_nome_completo')
        .should("be.visible").type("Nome teste");
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_2_email_de_cadastro')
        .should("be.visible").type("teste@teste.br");
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentosjuridicos_continuar1 > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      //section 3
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_3_nome_da_acolhida')
        .should("be.visible").type("Nome teste");
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentosjuridicos_continuar2 > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      //section 4
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_4_data_de_encerramento_do')
        .should("be.visible").type("1111-11-11");
      cy.get('#mauticform_checkboxgrp_checkbox_5_atraves_do_atendimento_Semantevenociclodaviolencia1')
        .should("be.visible").click()
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_7_caso_se_aplique_existem')
        .should("be.visible").type('Não')
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_7_descreva_sucintamente_o')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentosjuridicos_continuar3 > .mautic-pagebreak-next')
        .should("be.visible").click()

      //section 5
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_9_quais_aprendizagens_est')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_10_e_quais_os_desafios')
        .should("be.visible").type("Teste");
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_11_voce_solicitou_ajuda_d')
        .should("be.visible").select("Não");
      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_12_voce_solicitou_ajuda_d')
        .should("be.visible").select("Não");
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentosjuridicos_continuar4 > .mautic-pagebreak-next')
        .should("be.visible").click()

      //section 6
      cy.get('#mauticform_instrumentaldeconclusaodosatendimentosjuridicos_continuar5 > .mautic-pagebreak-next')
        .should("be.visible").click()

      cy.get('#mauticform_input_instrumentaldeconclusaodosatendimentosjuridicos_submit')
        .should("be.visible")
      // .click()

    });
  });
});

describe("Submit Interrupção Encaminhamento Form", () => {
  beforeEach(() => {
    cy.visit("/interrupcao-encaminhamento");
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
      cy.get('#mauticform_instrumentaldeinterrupcaodoencaminhamento_continuar > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      // section 2
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoencaminhamento_1_nome_completo')
        .should("be.visible").type("Maria Teste");
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoencaminhamento_2_email_de_cadastro')
        .should("be.visible").type("testenovo@email.com");
      cy.get('#mauticform_instrumentaldeinterrupcaodoencaminhamento_continuar1 > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      // // //section 3
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoencaminhamento_3_nome_da_acolhida')
        .should("be.visible").type("Roberta teste");
      cy.get('#mauticform_instrumentaldeinterrupcaodoencaminhamento_continuar2 > .mautic-pagebreak-next')
        .should("be.visible")
        .click();

      //section 4
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoencaminhamento_4_a_acolhida_chegou_a_est')
        .should("be.visible").select('Sim');
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoencaminhamento_5_voce_teve_conhecimento')
        .should("be.visible").select('Sim');
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoencaminhamento_6_data_da_interrupcao_do')
        .should("be.visible").type("2022-11-11");
      cy.get('#mauticform_checkboxgrp_checkbox_7_qual_o_motivo_da_interr_Aacolhidanaoseenquadranoperfildoprojeto0')
        .should("be.visible").click();
      cy.get('#mauticform_checkboxgrp_checkbox_8_caso_a_area_de_atuacao_Familia1')
        .should("be.visible").click();
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoencaminhamento_9_caso_a_acolhida_necessi')
        .should("be.visible").select('CREAS');
      cy.get('#mauticform_instrumentaldeinterrupcaodoencaminhamento_continuar3 > .mautic-pagebreak-next')
        .should("be.visible").click();

      // //section 5
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoencaminhamento_10_voce_continuara_dispon')
        .should("be.visible").select('Sim')
      cy.get('#mauticform_instrumentaldeinterrupcaodoencaminhamento_continuar4 > .mautic-pagebreak-next')
        .should("be.visible").click()


      // //section 6
      cy.get('#mauticform_input_instrumentaldeinterrupcaodoencaminhamento_submit')
        .should("be.visible")
        .click()
    });
  });
});

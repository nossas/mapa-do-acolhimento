describe("Submit Piscológas Form", () => {
  beforeEach(() => {
    cy.visit("/acompanhamento-psi-2");
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  Cypress._.times(5, i => {
    let testDescribe = "Nenhum risco";
    it("Fill form", () => {
      //section 1
      cy.get('#mauticform_instrumentaldeacompanhamento2psicologas_continuar > .mautic-pagebreak-next')
        .should("be.visible").click();

      //section 2
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_1_nome_completo')
        .should("be.visible").type("Nome teste");
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_2_email_de_cadastro')
        .should("be.visible").type("teste@teste.br");

      cy.get('#mauticform_instrumentaldeacompanhamento2psicologas_continuar1 > .mautic-pagebreak-next')
        .should("be.visible").click();

      //section 3
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_3_nome_da_acolhida')
        .should("be.visible").type("Nome teste");

      cy.get('#mauticform_instrumentaldeacompanhamento2psicologas_continuar2 > .mautic-pagebreak-next')
        .should("be.visible").click();

      //section 4
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_4_a_acolhida_segue_em_ate')
        .should("be.visible").select("Sim")
      //5
      if (i === 1) {
        cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_5_a_acolhida_tem_sido_ass')
          .should("be.visible").select("Não  (Caso responda não, por favor, entre em contato imediatamente com a equipe)")
        testDescribe = "questão 5 Risco moderado";
      } else {
        cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_5_a_acolhida_tem_sido_ass')
          .should("be.visible").select("Sim")
      }

      //7
      if (i === 2) {
        cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_6_a_acolhida_respeita_os')
          .should("be.visible").select("Não  (Caso responda não, por favor, entre em contato imediatamente com a equipe)")
        testDescribe = "questão 5 Risco Moderado";
      } else {
        cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_6_a_acolhida_respeita_os')
          .should("be.visible").select("Sim")
      }

      cy.get('#mauticform_instrumentaldeacompanhamento2psicologas_continuar3 > .mautic-pagebreak-next')
        .should("be.visible").click();

      //section 5
      //9
      if (i === 3) {
        cy.get('#mauticform_checkboxgrp_checkbox_7_a_acolhida_foi_submetid_Psicologica1')
          .should("be.visible").click();
        testDescribe = "questão 9 Risco Extremo";
      }

      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_8_caso_queira_comentar_so')
        .should("be.visible").type("Texto Teste");
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_9_aspectos_psicologicos_t')
        .should("be.visible").type("Texto Teste");
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_10_durante_o_atendimento')
        .should("be.visible").select("Não")
      //15
      if (i === 4) {
        cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_11_voce_se_preocupa_ou_pe')
          .should("be.visible").select("Sim (comunique imediatamente à equipe)")
        testDescribe = "questão 15 Risco Extremo";
      } else {
        cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_11_voce_se_preocupa_ou_pe')
          .should("be.visible").select("Não")
      }

      cy.get('#mauticform_instrumentaldeacompanhamento2psicologas_continuar4 > .mautic-pagebreak-next')
        .should("be.visible").click();

      //section 6
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_12_a_acolhida_ainda_apres')
        .should("be.visible").select("Sim")

      cy.get('#mauticform_instrumentaldeacompanhamento2psicologas_continuar5 > .mautic-pagebreak-next')
        .should("be.visible").click();

      //section 7
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_13_caso_a_acolhida_esteja')
        .should("be.visible").select("Sim")
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_14_voce_solicitou_ajuda_d')
        .should("be.visible").select("Sim")
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_15_se_sentiu_acolhida_pel')
        .should("be.visible").select("Sim")
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_16_voce_participa_dos_enc')
        .should("be.visible").select("Sim")
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_17_voce_participa_do_grup')
        .should("be.visible").select("Sim")
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_18_se_desejar_relate_como')
        .should("be.visible").type(testDescribe);

      cy.get('#mauticform_instrumentaldeacompanhamento2psicologas_continuar6 > .mautic-pagebreak-next')
        .should("be.visible").click();

      // send form button
      cy.get('#mauticform_input_instrumentaldeacompanhamento2psicologas_submit')
        .should("be.visible").click();
    });
  });
});

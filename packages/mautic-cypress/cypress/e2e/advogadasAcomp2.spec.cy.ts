describe("Submit Advogadas Form", () => {
  beforeEach(() => {
    cy.visit("/acompanhamento-jur-2");
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  Cypress._.times(1, i => {
    const testDescribe = "Nenhum risco";
    it("Fill form", () => {
      //send section 1 button
      cy.get(
        "#mauticform_instrumentaldeacompanhamento2advogadas_continuar > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      // section 2
      // 1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_1_nome_completo"
      )
        .should("be.visible")
        .type("Nome teste");

      //2
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_2_email_de_cadastro1"
      )
        .should("be.visible")
        .type("teste@teste.br");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento2advogadas_continuar3 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 3
      //3
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_3_nome_da_acolhida"
      )
        .should("be.visible")
        .type("Acolhida Teste");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento2advogadas_continuar1 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 4

      //4
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_4_a_acolhida_segue_em_ate"
      )
        .should("be.visible")
        .select("Sim");

      //5
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_5_a_acolhida_respeita_o_c"
      )
        .should("be.visible")
        .select("Sim");

      //6
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_6_quantas_horas_de_atendi"
      )
        .should("be.visible")
        .select("Mais de 5h");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento2advogadas_continuar2 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 5

      //7
      cy.get(
        "#mauticform_checkboxgrp_checkbox_7_a_acolhida_foi_submetid_Psicologica1"
      )
        .should("be.visible")
        .click();

      //7.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_71_caso_queira_comentar_s"
      )
        .should("be.visible")
        .type("Questão 7.1");

      //civel
      cy.get("#mauticform_checkboxgrp_checkbox_civel_PeticaoInicial1")
        .should("be.visible")
        .click();

      //penal
      cy.get(
        "#mauticform_checkboxgrp_checkbox_penal_Pedidodemedidaprotetivadeurgencia0"
      )
        .should("be.visible")
        .click();

      //9
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_9_por_favor_relate_de_man"
      )
        .should("be.visible")
        .type("questão 9");

      //10
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_10_durante_o_atendimento"
      )
        .should("be.visible")
        .select("Sim");

      //10.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_101_por_que"
      )
        .should("be.visible")
        .type("questão 10");

      //10.2
      cy.get("#mauticform_checkboxgrp_checkbox_102_para_qualis_instituic_UBS2")
        .should("be.visible")
        .click();

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento2advogadas_continuar4 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 6

      //11
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_12_a_acolhida_ainda_apres"
      )
        .should("be.visible")
        .select("Não");

      //11.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_121__informe_aqui_os_moti"
      )
        .should("be.visible")
        .type("questão 11");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento2advogadas_continuar5 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 7

      //12
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_13_caso_a_acolhida_esteja1"
      )
        .should("be.visible")
        .select("Sim");

      //13
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_14_voce_solicitou_ajuda_d"
      )
        .should("be.visible")
        .select("Sim");
      //13.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_141_sentiuse_orientada"
      )
        .should("be.visible")
        .select("Sim");
      //13.2
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_142_se_sentiu_acolhida_pe"
      )
        .should("be.visible")
        .select("Sim");
      //14
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_15_voce_participa_dos_enc"
      )
        .should("be.visible")
        .select("Sim");
      //15
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_16_voce_participa_do_grup"
      )
        .should("be.visible")
        .select("Sim");
      //16
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento2advogadas_17_se_desejar_relate_como"
      )
        .should("be.visible")
        .type("questão 16");

      //send
      cy.get("#mauticform_input_instrumentaldeacompanhamento2advogadas_submit")
        .should("be.visible")
        .click();
      //
      //
    });
  });
});

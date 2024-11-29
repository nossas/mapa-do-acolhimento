describe("Submit Psicologas Form", () => {
  beforeEach(() => {
    cy.visit("//acompanhamento-psi-1");
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  Cypress._.times(15, i => {
    it("Fill Form", () => {
      let testDescribe = "Nenhum risco";

      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 2
      //1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_1_nome_completo"
      )
        .should("be.visible")
        .type("Psicologa Teste");

      //2
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_email_de_cadastro"
      )
        .should("be.visible")
        .type("teste@teste.br");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar1 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 3
      //3
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_3_nome_da_acolhida"
      )
        .should("be.visible")
        .type("Acolhida Teste");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar2 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 4
      //4
      if (i === 1) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_a_acolhida_tem_sido_assid"
        )
          .should("be.visible")
          .select(
            "Não (Caso responda não, por favor, entre em contato imediatamente com a equipe)"
          );

        //4.1
        cy.get(
          "#mauticform_checkboxgrp_checkbox_selecione_os_motivos_abai_Faltasemavisar0"
        )
          .should("be.visible")
          .click();
        testDescribe = "Questão 4 Risco moderado";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_a_acolhida_tem_sido_assid"
        )
          .should("be.visible")
          .select("Sim");
      }

      //5
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_a_acolhida_respeita_os_co"
      )
        .should("be.visible")
        .select("Não");

      //5.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_se_nao_com_qual_frequenci"
      )
        .should("be.visible")
        .select("Duas vezes na semana");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar4 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 5
      //6
      if (i === 13) {
        cy.get(
          "#mauticform_checkboxgrp_checkbox_6_a_acolhida_foi_submetid_Moral2"
        )
          .should("be.visible")
          .click();
        testDescribe = "Questão 6 risco extremo";

        //7
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_7_caso_queira_comentar_so"
        )
          .should("be.visible")
          .type("Questão 7");
      }

      //8
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_8_aspectos_psicologicos_t"
      )
        .should("be.visible")
        .type("Questão 8");

      if (i === 2) {
        //9
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_9_durante_o_atendimento_v"
        )
          .should("be.visible")
          .select("Sim");

        //9.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_91_por_que1"
        )
          .should("be.visible")
          .type("Questão 9.1");

        //9.2
        cy.get(
          "#mauticform_checkboxgrp_checkbox_92_para_qualis_instituica_CAPS10"
        )
          .should("be.visible")
          .click();
        testDescribe = "Questão 9 risco Moderado";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_9_durante_o_atendimento_v"
        )
          .should("be.visible")
          .select("Não");
      }

      if (i === 14) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_10_voce_se_preocupa_ou_pe"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "questão 10 risco extremo";
      } else {
        //10
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_10_voce_se_preocupa_ou_pe"
        )
          .should("be.visible")
          .select("Não");
      }
      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar3 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 6
      //11
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_a_acolhida_ainda_apresent"
      )
        .should("be.visible")
        .select("Não (acione a equipe imediatamente)");

      //11.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_111_informe_aqui_os_motiv1"
      )
        .should("be.visible")
        .type("Questão 11.1");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar6 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 7
      //12
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_12_a_acolhida_participa_e"
      )
        .should("be.visible")
        .select("Não");

      if (i === 7) {
        //13
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_13_a_acolhida_tem_apoio_d"
        )
          .should("be.visible")
          .select("Não");
        testDescribe = "Questão 13 Risco Grave";
      } else {
        //13
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_13_a_acolhida_tem_apoio_d"
        )
          .should("be.visible")
          .select("Sim");
      }
      if (i === 3) {
        //14
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_14_como_e_a_relacao_da_ac"
        )
          .should("be.visible")
          .select(
            "Média (nem sempre pode contar com os familiares, caso precise de apoio)"
          );
        testDescribe = "Questão 14 risco Moderado";
      } else {
        //14
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_14_como_e_a_relacao_da_ac"
        )
          .should("be.visible")
          .select(
            "Boa (sempre pode contar com os familiares, caso precise de apoio)"
          );
      }
      //15
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_15_como_e_a_relacao_da_ac"
      )
        .should("be.visible")
        .select(
          "Média (nem sempre pode contar com os familiares do(a) autor(a), caso precise de apoio)"
        );

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar11 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 8

      if (i === 8) {
        //16
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_a_acolhida_tem_algum_diag"
        )
          .should("be.visible")
          .select("Sim");

        //16.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_161_qualis"
        )
          .should("be.visible")
          .type("Questão 16.1");

        //16.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_162_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 6 meses e 1 ano");
        testDescribe = "Questão 16 risco grave";
        //17
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_163_se_sim_a_acolhida_faz"
        )
          .should("be.visible")
          .select("Sim");

        //17.1
        cy.get(
          "#mauticform_checkboxgrp_checkbox_171_onde_UnidadeBasicadeSaudeUBS0"
        )
          .should("be.visible")
          .click();

        //17.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 6 meses e 1 ano");

        //18
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_166_se_sim_a_acolhida_faz"
        )
          .should("be.visible")
          .select("Sim");

        //18.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_182_qualis"
        )
          .should("be.visible")
          .type("Questão 18.1");

        //18.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_182_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 6 meses e 1 ano");
      } else {
        //16
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_a_acolhida_tem_algum_diag"
        )
          .should("be.visible")
          .select("Não");
      }

      if (i === 4) {
        //19
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_17_caso_seja_pessoa_com_d"
        )
          .should("be.visible")
          .select("Não");
        testDescribe = "Questão 19 risco moderado";
      }
      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar5 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 9

      if (i === 9) {
        //20
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_18_a_acolhida_tem_algum_d"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Questão 20 risco grave";
        //20.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_201_quais"
        )
          .should("be.visible")
          .type("Questão 20.1");

        //20.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_202_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 6 meses e 1 ano");

        //21
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_21_se_sim_a_acolhida_faz"
        )
          .should("be.visible")
          .select("Sim");

        //21.1
        cy.get(
          "#mauticform_checkboxgrp_checkbox_211_onde_CentrodeConvivenciaeCultura3"
        )
          .should("be.visible")
          .click();

        //21.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_212_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 6 meses e 1 ano");

        //22
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_22_se_sim_a_acolhida_faz"
        )
          .should("be.visible")
          .select("Sim");

        //22.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_221_qualis"
        )
          .should("be.visible")
          .type("Questão 22.1");

        //22.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_222_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 6 meses e 1 ano");
      } else {
        //20
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_18_a_acolhida_tem_algum_d"
        )
          .should("be.visible")
          .select("Não");
      }

      if (i === 10) {
        //21
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_21_se_sim_a_acolhida_faz"
        )
          .should("be.visible")
          .select("Não");
        testDescribe = "Questão 21 Risco grave";
      }

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar7 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 10

      if (i === 11) {
        //23
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_19_a_acolhida_faz_uso_de"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Questão 23 risco grave";
        //23.1
        cy.get("#mauticform_checkboxgrp_checkbox_231_qualis1_Alcool0")
          .should("be.visible")
          .click();

        //23.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_232_ha_quanto_tempo1"
        )
          .should("be.visible")
          .select("Entre 6 meses e 1 ano");

        //24
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_193_se_sim_a_acolhida_e_a"
        )
          .should("be.visible")
          .select("Sim");

        //24.1
        cy.get("#mauticform_checkboxgrp_checkbox_241_onde_Hospitalgeral5")
          .should("be.visible")
          .click();

        //24.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_242_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 6 meses e 1 ano");
      } else {
        //23
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_19_a_acolhida_faz_uso_de"
        )
          .should("be.visible")
          .select("Não");
      }

      if (i === 5) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1psicologas_193_se_sim_a_acolhida_e_a"
        )
          .should("be.visible")
          .select("Não");
        testDescribe = "Questão 24 risco Moderado";
      }
      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar10 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 11

      if (i === 6) {
        //25
        cy.get(
          "#mauticform_checkboxgrp_checkbox_20_quais_impactos_a_acolh_Insonia0"
        )
          .should("be.visible")
          .click();
        testDescribe = "Questão 25 risco Moderado";
      } else {
        cy.get(
          "#mauticform_checkboxgrp_checkbox_20_quais_impactos_a_acolh_Aacolhidanaoestasofrendonenhumdosimpactoscitadosacima9"
        )
          .should("be.visible")
          .click();
      }

      if (i === 12) {
        //26
        cy.get(
          "#mauticform_checkboxgrp_checkbox_21_quais_impactos_a_acolh_Desmaios2"
        )
          .should("be.visible")
          .click();
        testDescribe = "Questão 26 risco Grave";
      } else {
        cy.get(
          "#mauticform_checkboxgrp_checkbox_21_quais_impactos_a_acolh_Aacolhidanaoestasofrendonenhumdosimpactoscitadosacima15"
        )

          .should("be.visible")
          .click();
      }

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1psicologas_continuar8 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 12
      //27
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_22_caso_a_acolhida_esteja"
      )
        .should("be.visible")
        .select("Sim");

      //28
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_23_voce_solicitou_ajuda_d"
      )
        .should("be.visible")
        .select("Sim");

      //28.2
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_231_sentiuse_orientada"
      )
        .should("be.visible")
        .select("Sim");

      //28.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_232_sentiuse_acolhida_pel"
      )
        .should("be.visible")
        .select("Sim");

      //29
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_24_voce_participa_dos_enc"
      )
        .should("be.visible")
        .select("Não");

      //30
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_25_voce_participa_do_grup"
      )
        .should("be.visible")
        .select("Sim");

      //31
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1psicologas_26_se_desejar_relate_como"
      )
        .should("be.visible")
        .type(testDescribe);

      //send
      cy.get("#mauticform_input_instrumentaldeacompanhamento1psicologas_submit")
        .should("be.visible")
        .click();
    });
  });
});

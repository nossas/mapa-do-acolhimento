import { should } from "chai";

describe("Submit Advogadas Form", () => {
  beforeEach(() => {
    cy.visit("//acompanhamento-jur-1");
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  //12
  Cypress._.times(13, i => {
    let testDescribe = "Nenhum risco";
    it("Fill form", () => {
      //send section 1 button
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 2
      //1 - Nome voluntaria
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_1_nome_completo"
      )
        .should("be.visible")
        .type("Nome Teste");

      //2 - email vountaria
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_2_email_de_cadastro1"
      )
        .should("be.visible")
        .type("teste@teste.com");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar1 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 3
      //3 nome acolhida
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_3_nome_da_acolhida"
      )
        .should("be.visible")
        .type("Acolhida teste");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar2 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 4
      //4
      if (i === 1) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_4_a_acolhida_respeita_o_c"
        )
          .should("be.visible")
          .select(
            "Não (Caso responda não, por favor, entre em contato imediatamente com a equipe)"
          );

        //4.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_41_com_qual_frequencia_te"
        )
          .should("be.visible")
          .select("Uma vez na semana");
        testDescribe = "Questão 4 risco Moderado";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_4_a_acolhida_respeita_o_c"
        )
          .should("be.visible")
          .select("Sim");
      }

      //5
      if (i === 2) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_5_quantas_horas_de_atendi"
        )
          .should("be.visible")
          .select("Mais de 5h");
        testDescribe = "Questão 5 risco Moderado";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_5_quantas_horas_de_atendi"
        )
          .should("be.visible")
          .select("1h");
      }
      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar3 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //section 5

      //6
      if (i === 12) {
        cy.get(
          "#mauticform_checkboxgrp_checkbox_6_a_acolhida_foi_submetid_Fisica0"
        )
          .should("be.visible")
          .click();
        testDescribe = "Questão 6 risco extremo";
        //7
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_7_caso_queira_comentar_so"
        )
          .should("be.visible")
          .type("Questão 7");
      }

      //8
      cy.get(
        "#mauticform_checkboxgrp_checkbox_8_qual_esta_sendo_o_tipo_Acompanhamentodepedidodemedidaprotetiva1"
      )
        .should("be.visible")
        .click();

      //9
      cy.get("#mauticform_checkboxgrp_checkbox_9__caso_esteja_em_acompan_10")
        .should("be.visible")
        .click();

      //10
      //Civel/familia
      cy.get("#mauticform_checkboxgrp_checkbox_civelfamilia_Pensao2")
        .should("be.visible")
        .click();

      //criminal
      cy.get(
        "#mauticform_checkboxgrp_checkbox_criminal_MedidaProtetivaUrgencia0"
      )
        .should("be.visible")
        .click();

      //trabalhista
      cy.get("#mauticform_checkboxgrp_checkbox_trabalhista_Outros2")
        .should("be.visible")
        .click();

      //digital
      cy.get("#mauticform_checkboxgrp_checkbox_digital_Stalking2")
        .should("be.visible")
        .click();

      //11
      //civel/familia
      cy.get("#mauticform_checkboxgrp_checkbox_civelfamilia1_Contestacao2")
        .should("be.visible")
        .click();

      //penal
      cy.get("#mauticform_checkboxgrp_checkbox_penal_Denuncia4")
        .should("be.visible")
        .click();

      //12
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_12_caso_a_acolhida_ja_ten"
      )
        .should("be.visible")
        .select("Não");

      //13
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_houve_fixacao_de_guarda_p"
      )
        .should("be.visible")
        .select("Sim");

      //13.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_142_se_sim_para_quem_a_gu"
      )
        .should("be.visible")
        .type("Questão 13.1");

      //13.2
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_143_em_qual_regime"
      )
        .should("be.visible")
        .select("Compartilhada");

      //14
      cy.get(
        "#mauticform_checkboxgrp_checkbox_14_caso_a_sentenca_profer_Melhorescondicoesfinanceirasporpartedogenitor2"
      )
        .should("be.visible")
        .click();

      //15
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_15_alguma_das_partes_reco"
      )
        .should("be.visible")
        .select("Sim");

      //16
      if (i === 3) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_16_durante_o_atendimento"
        )
          .should("be.visible")
          .select("Sim");

        //16.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_161_por_que"
        )
          .should("be.visible")
          .type("Questão 16.1");
        testDescribe = "Questão 16 risco Moderado";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_16_durante_o_atendimento"
        )
          .should("be.visible")
          .select("Não");
      }

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar4 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 5

      //17
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_17_a_acolhida_ainda_apres"
      )
        .should("be.visible")
        .select("Sim");

      //17.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_171_caso_tenha_respondido"
      )
        .should("be.visible")
        .type("Questão 17.1");

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar5 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 7

      //18
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_18_a_acolhida_participa_e1"
      )
        .should("be.visible")
        .select("Não");

      //19
      if (i === 7) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_19_a_acolhida_tem_apoio_d"
        )
          .should("be.visible")
          .select("Não");
        testDescribe = "Questão 19 risco grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_19_a_acolhida_tem_apoio_d"
        )
          .should("be.visible")
          .select("Sim");
      }

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar8 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //20
      if (i === 4) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_20_como_e_a_relacao_da_ac"
        )
          .should("be.visible")
          .select("Ruim (não tem relação com os familiares)");
        testDescribe = "Questão 20 risco Moderado";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_20_como_e_a_relacao_da_ac"
        )
          .should("be.visible")
          .select(
            "Boa (sempre pode contar com os familiares, caso precise de apoio)"
          );
      }
      //21
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_21_como_e_a_relacao_da_ac"
      )
        .should("be.visible")
        .select(
          "Boa (sempre pode contar com os familiares do(a) autor(a), caso precise de apoio)"
        );

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar6 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 8
      if (i === 8) {
        //22
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_22_a_acolhida_tem_algum_d"
        )
          .should("be.visible")
          .select("Sim");

        testDescribe = "Questão 22 risco grave";
        //22.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_221_qualis"
        )
          .should("be.visible")
          .type("Questão 22.1");

        //22.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_222_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Mais de 10 anos");

        //23
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_23_se_sim_a_acolhida_faz"
        )
          .should("be.visible")
          .select("Sim");

        //23.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_231_onde"
        )
          .should("be.visible")
          .select("Unidade Básica de Saúde (UBS)");

        //23.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_232_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 1 e 2 anos");

        //24
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_24__se_sim_a_acolhida_faz1"
        )
          .should("be.visible")
          .select("Sim");

        //24.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_242_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 1 e 2 anos");

        //24.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_241_qualis"
        )
          .should("be.visible")
          .type("Questão 24.2");
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_22_a_acolhida_tem_algum_d"
        )
          .should("be.visible")
          .select("Não");
      }
      //25
      if (i === 5) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_23_caso_seja_pessoa_com_d"
        )
          .should("be.visible")
          .select("Não");
        testDescribe = "Questão 25 risco moderado";
      }

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar7 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 9
      if (i === 9) {
        //26
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_24_a_acolhida_tem_algum_d"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Questão 26 risco Grave";
        //26.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_261_quais"
        )
          .should("be.visible")
          .type("Questão 26.1");

        //26.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_262_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 1 e 2 anos");

        //27
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_27__se_sim_a_acolhida_faz"
        )
          .should("be.visible")
          .select("Sim");

        //27.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_271_onde"
        )
          .should("be.visible")
          .select("Centro de Atenção Psicossocial (CAPS)");

        //27.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_272_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 1 e 2 anos");

        //28
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_28_se_sim_a_acolhida_faz"
        )
          .should("be.visible")
          .select("Sim");

        //28.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_281_quais1"
        )
          .should("be.visible")
          .type("Questão 28.1");

        //28.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_282_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 1 e 2 anos");
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_24_a_acolhida_tem_algum_d"
        )
          .should("be.visible")
          .select("Não");
      }
      //27
      if (i === 10) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_27__se_sim_a_acolhida_faz"
        )
          .should("be.visible")
          .select("Não");
        testDescribe = "Questão 27 risco grave";
      }
      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar9 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 10

      //29
      if (i === 11) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_25__a_acolhida_faz_uso_de"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Questão 29 risco Grave";
        //29.1
        cy.get("#mauticform_checkboxgrp_checkbox_291_quais1_Alcool0")
          .should("be.visible")
          .click();

        //29.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_292_ha_quanto_tempo1"
        )
          .should("be.visible")
          .select("Entre 1 e 2 anos");

        //30
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_30_se_sim_a_acolhida_e_as"
        )
          .should("be.visible")
          .select("Sim");

        //30.1
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_301_onde"
        )
          .should("be.visible")
          .select("Centro de Atenção Psicossocial (CAPS)");

        //30.2
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_302_ha_quanto_tempo"
        )
          .should("be.visible")
          .select("Entre 3 e 6 meses");
      } else {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_25__a_acolhida_faz_uso_de"
        )
          .should("be.visible")
          .select("Não");
      }

      //30
      if (i === 6) {
        cy.get(
          "#mauticform_input_instrumentaldeacompanhamento1advogadas_30_se_sim_a_acolhida_e_as"
        )
          .should("be.visible")
          .select("Não");
        testDescribe = "Questão 30 risco Moderado";
      }

      //continue
      cy.get(
        "#mauticform_instrumentaldeacompanhamento1advogadas_continuar10 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //Section 11

      //31
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_26_caso_a_acolhida_esteja"
      )
        .should("be.visible")
        .select("Sim");

      //32
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_27_voce_solicitou_ajuda_d"
      )
        .should("be.visible")
        .select("Sim");

      //32.1
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_271_sentiuse_orientada"
      )
        .should("be.visible")
        .select("Sim");

      //32.2
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_272_sentiuse_acolhida_pel"
      )
        .should("be.visible")
        .select("Sim");

      //33
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_28__voce_participa_dos_en"
      )
        .should("be.visible")
        .select("Sim");

      //34
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_29_voce_participa_do_grup"
      )
        .should("be.visible")
        .select("Sim");

      //35
      cy.get(
        "#mauticform_input_instrumentaldeacompanhamento1advogadas_35_se_desejar_relate_como"
      )
        .should("be.visible")
        .type(testDescribe);

      //Send
      cy.get("#mauticform_input_instrumentaldeacompanhamento1advogadas_submit")
        .should("be.visible")
        .click();
    });
  });
});

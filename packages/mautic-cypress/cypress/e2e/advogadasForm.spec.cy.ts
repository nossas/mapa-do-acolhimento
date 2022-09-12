describe("Submit Advogadas Form", () => {
  beforeEach(() => {
    cy.visit("https://mautic-nossas.staging.bonde.org/triagem-juridico-2");
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  Cypress._.times(17, i => {
    let testDescribe = "Nenhum risco";
    it("Fill form", () => {
      //send section 1 button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //send section 2
      // 1
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_1_nome_completo"
      )
        .should("be.visible")
        .type("Nome Teste");

      // 2
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_2_email_de_cadastro1"
      )
        .should("be.visible")
        .type("teste@teste.com");

      // button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar1 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      //send section 3
      // 3
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_3_nome_da_acolhida"
      )
        .should("be.visible")
        .type("Nome Testes");

      // 4
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_4_data_nascimento"
      )
        .should("be.visible")
        .type("1996-11-15");

      // 5
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_5_como_a_acolhida_se_auto"
      )
        .should("be.visible")
        .select("Parda");

      // 6
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_6_qual_a_identidade_de_ge"
      )
        .should("be.visible")
        .select("Prefere não responder");

      // 7
      if (i === 3) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_7_a_acolhida_tem_alguma_d1"
        )
          .should("be.visible")
          .select("Sim");
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_informe_aqui_qual_ou_quai > .mauticform-label"
        ).should("be.visible");
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_informe_aqui_qual_ou_quai > .mauticform-label"
        )
          .should("be.visible")
          .click();
        testDescribe = "Teste 3: questão 7 risco Grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_7_a_acolhida_tem_alguma_d1"
        )
          .should("be.visible")
          .select("Não");
      }

      // 8
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_8_qual_o_estado_civil_da"
      )
        .should("be.visible")
        .select("Solteira");

      // 9
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_9_a_acolhida_tem_filhasos1"
      )
        .should("be.visible")
        .select("Sim");

      // 9.1
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_91_selecione_em_qual_faix1 > .mauticform-label"
      ).should("be.visible");

      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_91_selecione_em_qual_faix1 > :nth-child(4)"
      ).click();

      // 9.2
      if (i === 4) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_92_algum_dos_filhos_e_pes"
        )
          .should("be.visible")
          .select("Sim");

        //9.3
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_92_algum_dos_filhos_e_pes"
        ).should("be.visible");
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_93_caso_tenha_respondido > :nth-child(6)"
        ).click();
        testDescribe = "Teste 4: questão 9.2 risco grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_92_algum_dos_filhos_e_pes"
        )
          .should("be.visible")
          .select("Não");
      }

      // 10
      if (i === 5) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_10_a_acolhida_esta_gravid"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Teste 5: questão 10 risco Grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_10_a_acolhida_esta_gravid"
        )
          .should("be.visible")
          .select("Não");
      }

      // Button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar10 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      // Section 4

      // 11
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_11_qual_a_escolaridade_da"
      )
        .should("be.visible")
        .select("Mestrado");

      // Button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar2 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      // Section 5

      // 12
      if (i === 1) {
        testDescribe = "Teste 1: questão 12 com risco Moderado";
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_12_a_acolhida_considera_q1"
        )
          .should("be.visible")
          .select("Sim");
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_12_a_acolhida_considera_q1"
        )
          .should("be.visible")
          .select("Não");
      }

      // Button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar9 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      // Section 6

      // 13
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_13_tipos_de_violencia_que > .mauticform-label"
      ).should("be.visible");

      cy.get(
        "#mauticform_checkboxgrp_label_13_tipos_de_violencia_que_Racismo8"
      ).click();

      // 14
      if (i === 6) {
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_15_oa_autora_da_violencia > .mauticform-label"
        ).should("be.visible");
        cy.get("#mauticform_checkboxgrp_label_15_oa_autora_da_violencia_Soco0")
          .should("be.visible")
          .click();
        testDescribe = "Teste 6: questão 14 risco Grave";
      } else {
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_15_oa_autora_da_violencia > .mauticform-label"
        ).should("be.visible");
        cy.get(
          "#mauticform_checkboxgrp_label_15_oa_autora_da_violencia_Nenhumaagressaofisica6"
        )
          .should("be.visible")
          .click();
      }
      // 15
      if (i === 13) {
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_16_oa_autora_da_violencia > .mauticform-label"
        ).should("be.visible");
        cy.get(
          "#mauticform_checkboxgrp_label_16_oa_autora_da_violencia_Queimadura0"
        )
          .should("be.visible")
          .click();
        testDescribe = "Teste 13: questão 15 risco Extremo";
      } else {
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_16_oa_autora_da_violencia > .mauticform-label"
        ).should("be.visible");
        cy.get(
          "#mauticform_checkboxgrp_label_16_oa_autora_da_violencia_Nenhumaagressaofisica9"
        )
          .should("be.visible")
          .click();
      }
      // 16
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_17_a_acolhida_se_sente_is"
      )
        .should("be.visible")
        .select("Sim");

      // 17
      if (i === 14) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_18_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Teste 14: questão 17 risco Extremo";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_18_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Não");
      }

      // 18
      if (i === 15) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_oa_autora_da_violencia_ja"
        )
          .should("be.visible")
          .select("Sim");

        //18.1
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_191_como1 > .mauticform-label"
        ).should("be.visible");
        cy.get("#mauticform_checkboxgrp_label_191_como1_Outros2")
          .should("be.visible")
          .click();
        testDescribe = "Teste 15: questão 18 risco Extremo";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_oa_autora_da_violencia_ja"
        )
          .should("be.visible")
          .select("Não");
      }

      // 19
      if (i === 7) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_20_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Teste 7: questão 19 risco Grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_20_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Não");
      }

      // 20
      if (i === 8) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_21_caso_se_aplique_a_acol1"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Teste 8: questão 20 risco Grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_21_caso_se_aplique_a_acol1"
        )
          .should("be.visible")
          .select("Não");
      }

      // 21
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_22_oa_autora_da_violencia > .mauticform-label"
      ).should("be.visible");
      if (i === 16) {
        cy.get(
          "#mauticform_checkboxgrp_label_22_oa_autora_da_violencia_Ameacouapessoaacolhida8"
        )
          .should("be.visible")
          .click();
        testDescribe = "Teste 16: questão 21 risco Extremo";
      }

      // 22
      if (i === 9) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_23_a_acolhida_necessitou1"
        ).select("Sim, atendimento médico");
        testDescribe = "Teste 9: questão 22 risco Grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_23_a_acolhida_necessitou1"
        ).select("Não");
      }

      // 23
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_24_caso_se_aplique_a_acol1"
      )
        .should("be.visible")
        .select("Não");

      // 24
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_25_a_acolhida_apresenta_d1"
      )
        .should("be.visible")
        .select("Não");

      // 25
      if (i === 10) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_as_agressoes_ou_ameacas_d"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Teste 10: questão 25 risco Grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_as_agressoes_ou_ameacas_d"
        )
          .should("be.visible")
          .select("Não");
      }

      //26
      if (i === 17) {
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_27oa_autora_da_violencia > .mauticform-label"
        ).should("be.visible");
        cy.get(
          "#mauticform_checkboxgrp_label_27oa_autora_da_violencia_Simfilhos0"
        )
          .should("be.visible")
          .click();
        testDescribe = "Teste 17: questão 26 risco Extremo";
      } else {
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_27oa_autora_da_violencia > .mauticform-label"
        ).should("be.visible");
        cy.get("#mauticform_checkboxgrp_label_27oa_autora_da_violencia_Nao6")
          .should("be.visible")
          .click();
      }

      // Button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar3 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      // Section 7

      // 27
      if (i === 2) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_28_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Sim");
        cy.get(
          "#mauticform_checkboxgrp_label_281_selecione_as_opcaooes1_Financeiro0"
        )
          .should("be.visible")
          .click();
        testDescribe = "Teste 2: questão 27 com risco Moderado";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_28_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Não");
      }

      // 28
      if (i === 11) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_29_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Sim");
        cy.get(
          "#mauticform_checkboxgrp_label_291_informe_aqui_qual_ou1_Cocaina2"
        )
          .should("be.visible")
          .click();
        testDescribe = "Teste 11: questão 28 com risco Grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_29_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Não");
      }

      // 29
      if (i === 12) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_30_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Sim");
        testDescribe = "Teste 12: questão 29 com risco Grave";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_30_oa_autora_da_violencia1"
        )
          .should("be.visible")
          .select("Não");
      }

      // Button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar4 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      // Section 8

      // 30
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_31_a_acolhida_ja_manifest"
      )
        .should("be.visible")
        .select("Sim");
      cy.get(
        "#mauticform_checkboxgrp_label_sobre_quais_servicos_a_pe_DelegaciaespecializadadaMulher4"
      )
        .should("be.visible")
        .click();

      // Button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar5 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      // Section 9

      // 31
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_32_qual_o_objeto_das_dema > .mauticform-label"
      ).should("be.visible");

      cy.get(
        "#mauticform_checkboxgrp_label_32_qual_o_objeto_das_dema_Divorciodissolucaodeuniaoestavel1"
      )
        .should("be.visible")
        .click();

      //32
      if (i === 0) {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_33_a_demanda_da_acolhida1"
        )
          .should("be.visible")
          .select("Não");

        //33.1 não
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_331_entao_em_qualis_outra"
        )
          .should("be.visible")
          .type("Alugma lei aqui");
        testDescribe = "Teste 0: nenhum risco e não se enquadra na Lei Maria da Penha";
      } else {
        cy.get(
          "#mauticform_input_instrumentaldetriagem2advogadas_33_a_demanda_da_acolhida1"
        )
          .should("be.visible")
          .select("Sim");

        //32.1 sim
        cy.get(
          "#mauticform_instrumentaldetriagem2advogadas_continuar6 > .mautic-pagebreak-next"
        ).should("be.visible");

        cy.get(
          "#mauticform_checkboxgrp_label_331_em_qual_forma_de_viol1_ViolenciaPatrimonial0"
        )
          .should("be.visible")
          .click();
      }

      //33
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_34_descreva_resumidamente"
      )
        .should("be.visible")
        .type(`${testDescribe}`);

      //34
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_35_encaminhamento_do_caso > .mauticform-label"
      ).should("be.visible");

      cy.get(
        "#mauticform_checkboxgrp_label_35_encaminhamento_do_caso_Atendimentocontinuo0"
      )
        .should("be.visible")
        .click();

      // Button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar6 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      // Section 10
      // 35
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_36_data_do_inicio_do_aten"
      )
        .should("be.visible")
        .type("2021-11-15");

      // 36
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_37_voce_estabeleceu_um_co1"
      )
        .should("be.visible")
        .select("Não");

      // 37
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_38_quantas_horas_de_atend1"
      )
        .should("be.visible")
        .select("1h");

      // 38
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_39_voce_e_a_acolhida_esta1"
      )
        .should("be.visible")
        .select("Sim, pelo WhatsApp");

      //38.1
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_391_voces_acordaram_uma_f1"
      )
        .should("be.visible")
        .select("Não");

      // 39
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_40_formas_mais_seguras_de > .mauticform-label"
      ).should("be.visible");
      cy.get(
        "#mauticform_checkboxgrp_label_40_formas_mais_seguras_de_Ligacaotelefonica0"
      )
        .should("be.visible")
        .click();

      // Button
      cy.get(
        "#mauticform_instrumentaldetriagem2advogadas_continuar7 > .mautic-pagebreak-next"
      )
        .should("be.visible")
        .click();

      // Section 11

      // 40
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_41_a_acolhida_esta_em_aco1"
      )
        .should("be.visible")
        .select("Sim");

      //40.1
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_411_esse_acompanhamento_e1"
      )
        .should("be.visible")
        .select("Sim");

      // 40.2
      cy.get(
        "#mauticform_input_instrumentaldetriagem2advogadas_412_voce_profissional_adv1"
      )
        .should("be.visible")
        .select("Sim");

      // Button
      cy.get("#mauticform_input_instrumentaldetriagem2advogadas_submit")
        .should("be.visible")
        .click();
    });
  });
});


describe("Validation of Mautic Form", () => {
    let read_mautic_request;
    let spyApm;
    let spyLog;

    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules(); // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy    
        process.env.ELASTIC_APM_SECRET_TOKEN = "teste";
        process.env.ELASTIC_APM_SERVER_URL = "https://localhost";
        process.env.ELASTIC_APM_SERVICE_NAME = "teste";

        read_mautic_request = require("../filterService").default;
        spyLog = jest.spyOn(require("../dbg").default, "error");
        spyApm = jest.spyOn(require("../dbg").apmAgent,"captureError");
    
    });
    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });   

    it("Correct mautic form", async done => {
        const mockRequest: any = {
        body:{
            "mautic.form_on_submit": [
            {"timestamp": "2021-06-01T08:47:35-03:00", 
            "submission": 
            {"id": 5494,
             "form":
              {
                  "id": 10,
                  "name": "00. Cadastro: Advogadas", 
                  "alias": "cadastro_a", 
                  "category": null}, 
                  "lead": {
                      "id": 5054, 
                      "color": null, 
                      "fields": {
                          "core": {
                              "cor": {
                                  "id": "59", 
                                  "type": "select", 
                                  "alias": "cor", 
                                  "group": "core", 
                                  "label": "Cor", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "city": {
                                  "id": "13", 
                                  "type": "text", 
                                  "alias": "city", 
                                  "group": "core", 
                                  "label": "City", 
                                  "value": "Cidade", 
                                  "object": "lead", "is_fixed": "1"
                              }, 
                              "email": {
                                  "id": "6", 
                                  "type": "email", 
                                  "alias": "email", 
                                  "group": "core", 
                                  "label": "Email", 
                                  "value": "email@email.com.br", 
                                  "object": "lead", 
                                  "is_fixed": "1"
                              }, 
                              "phone": {
                                  "id": "8", 
                                  "type": "tel", 
                                  "alias": "phone", 
                                  "group": "core", 
                                  "label": "Phone", 
                                  "value": "16999999999", 
                                  "object": "lead", 
                                  "is_fixed": "1"
                              }, 
                              "state1": {
                                  "id": "58", 
                                  "type": "select", 
                                  "alias": "state1", 
                                  "group": "core", 
                                  "label": "Estado", 
                                  "value": "sp", "object": 
                                  "lead", "is_fixed": "0"
                              }, 
                              "address": {
                                  "id": "57", 
                                  "type": "text", 
                                  "alias": "address", 
                                  "group": "core", 
                                  "label": "Endereço", 
                                  "value": "Rua, Bairro - SP, 0000-000, Brazil", 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "country": {
                                  "id": "16", 
                                  "type": "country", 
                                  "alias": "country", 
                                  "group": "core", 
                                  "label": "Country", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "1"
                              }, 
                              "user_id": {
                                  "id": "55", 
                                  "type": "text", 
                                  "alias": "user_id", 
                                  "group": "core", 
                                  "label": "Zendesk User ID", 
                                  "value": "000000000000", 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "website": {
                                  "id": "22", 
                                  "type": "url", 
                                  "alias": "website", 
                                  "group": "core", 
                                  "label": "Website", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "lastname": {
                                  "id": "3", 
                                  "type": "text", 
                                  "alias": "lastname", 
                                  "group": "core", 
                                  "label": "Sobrenome", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "1"
                              }, 
                              "whatsapp": {
                                  "id": "49", 
                                  "type": "text", 
                                  "alias": "whatsapp", 
                                  "group": "core", 
                                  "label": "Whatsapp", 
                                  "value": "16999999999", 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "firstname": {
                                  "id": "2", 
                                  "type": "text", 
                                  "alias": "firstname", 
                                  "group": "core", 
                                  "label": "First Name", 
                                  "value": "Nome", 
                                  "object": "lead", 
                                  "is_fixed": "1"
                              }, 
                              "f_condition": {
                                  "id": "48", 
                                  "type": "select", 
                                  "alias": "f_condition", 
                                  "group": "core", 
                                  "label": "Status da Mulher", 
                                  "value": "desabilitada", 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "last_active": {
                                  "id": "19", 
                                  "type": "datetime", 
                                  "alias": "last_active", 
                                  "group": "core", 
                                  "label": "Date Last Active", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "1"
                              }, 
                              "organization_id": {
                                  "id": "61", 
                                  "type": "text", 
                                  "alias": "organization_id", 
                                  "group": "core", 
                                  "label": "Zendesk Organization ID", 
                                  "value": "360269610652", 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "tipo_de_acolhimento": {
                                  "id": "50", 
                                  "type": "text", 
                                  "alias": "tipo_de_acolhimento", 
                                  "group": "core", 
                                  "label": "Tipo de Acolhimento", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "data_de_inscricao_no_bond1": {
                                  "id": "60", 
                                  "type": "date", 
                                  "alias": "data_de_inscricao_no_bond1", 
                                  "group": "core", 
                                  "label": "Data de Inscrição no BONDE", 
                                  "value": "2021-06-01", 
                                  "object": "lead", "is_fixed": "0"
                              }
                          }, 
                          "social": {
                              "skype": {
                                  "id": "28", 
                                  "type": "text", 
                                  "alias": "skype", 
                                  "group": "social", 
                                  "label": "Skype", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "twitter": {
                                  "id": "29", 
                                  "type": "text", 
                                  "alias": "twitter", 
                                  "group": "social", 
                                  "label": "Twitter", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "facebook": {
                                  "id": "23", 
                                  "type": "text", 
                                  "alias": "facebook", 
                                  "group": "social", 
                                  "label": "Facebook", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "linkedin": {
                                  "id": "27", 
                                  "type": "text", 
                                  "alias": "linkedin", 
                                  "group": "social", 
                                  "label": "LinkedIn", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "instagram": {
                                  "id": "26", 
                                  "type": "text", 
                                  "alias": "instagram", 
                                  "group": "social", 
                                  "label": "Instagram", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, 
                              "foursquare": {
                                  "id": "24", 
                                  "type": "text", 
                                  "alias": "foursquare", 
                                  "group": "social", 
                                  "label": "Foursquare", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }, "googleplus": {
                                  "id": "25", 
                                  "type": "text", 
                                  "alias": "googleplus", 
                                  "group": "social", 
                                  "label": "Google+", 
                                  "value": null, 
                                  "object": "lead", 
                                  "is_fixed": "0"
                              }
                          }, 
                          "personal": [], 
                          "professional": []
                      }, 
                      "points": 0
                  }, 
                  "page": null, 
                  "referer": "https://mautic.nossas.org/cadastro-advogadas", 
                  "results": {
                      "cor": "branca", 
                      "email": "iara.baggio@baggiononato.com.br", 
                      "durante_os_encontros_ana": "A", 
                      "para_que_as_mulheres_que": "sim", 
                      "qual_sua_area_de_atuacao": "violencia-de-genero, familia, civel", 
                      "as_voluntarias_do_mapa_do": "compreendo", 
                      "durante_os_atendimentos_a": "A", 
                      "no_seu_primeiro_atendimen": "A", 
                      "o_comprometimento_a_dedic": "sim", 
                      "o_mapa_do_acolhimento_ent": "sim", 
                      "para_voce_o_que_e_mais_im": "A", 
                      "todos_os_atendimentos_rea": "aceito"
                  }, 
                  "ipAddress": {
                      "id": 35581, 
                      "ip": "192.168.14.5", 
                      "ipDetails": {
                          "isp": "", 
                          "city": "", 
                          "extra": "", 
                          "region": "", 
                          "country": "", 
                          "zipcode": "", 
                          "latitude": "", 
                          "timezone": "", 
                          "longitude": "", 
                          "organization": ""
                      }
                  }, 
                  "trackingId": "xxxxxxxxxxxzxxxxxxxxxxx", 
                  "dateSubmitted": "2021-06-01T08:47:34-03:00"
              }
          }
            ]}
        };

        await expect(read_mautic_request(mockRequest)).resolves.toEqual(mockRequest.body)
        return done();  
    })

    it("Capture error validation schema",async done => {
        const mockRequest: any = {
        body: undefined
        };

        await expect(read_mautic_request(mockRequest)).rejects.toThrow("Mautic payload invalid!");
        expect(spyApm).toBeCalledTimes(1); 
        expect(spyLog).toBeCalledTimes(1);
        return done();
    })

})
# Webhooks Mautic Zendesk

This service syncs the info provided by the volunteer in the Mautic form, right after she fills the initial BONDE form at (https://queroacolher.mapadoacolhimento.org). It updates the user and creates a subscription ticket for her in Zendesk.

There are some questions in the Mautic form that provide us further information about how the Volunteer works, how they qualify. This service rates them between these categories:
  - reprovada_registro_inválido
  - reprovada_diretrizes_do_mapa
  - reprovada_estudo_de_caso
  - aprovada

The webhook is setup in Hasura - the webhook calls the label `http://mautic-zendesk` every time the table `webhooks_registry` is filled. 

_Obs: This name "mautic-zendesk" is related with the name of the service in the Cluster, so watch out when changing the service name, make sure it's also changed in Hasura._

As seguintes variáveis de ambiente devem ser configuradas:

- ZENDESK_API_URL - url da api do zendesk
- ZENDESK_API_TOKEN - token de autenticação do zendesk
- ZENDESK_API_USER - email do usuário do zendesk pelo qual será feita a autenticação, concatenado com '/token' no fim. EX: email@example.com/token
- PORT - 
- ZENDESK_ORGANIZATIONS - objeto JSON, mapeando as organizações `ADVOGADA`, `MSR` e `PSICOLOGA` com os seus respectivos ids, seguindo o seguinte formato:
```json
{"ADVOGADA":"","MSR":"","PSICOLOGA":""}
```
- GOOGLE_MAPS_API_KEY - token de autenticação do GOOGLE API para realização de chamadas à api do google maps
- WIDGET_IDS - objecti JSON, mapeando o id dos form_entries da comunidade do mapa do acolhimento do bonde, para que seja possível filtrar os form_entries na hora de buscar a data original de inscrição do bonde, seguindo o seguinte formato:
```json
{"ADVOGADA": "", "PSICÓLOGA": ""}
```
- HASURA_API_URL - endpoint da api do HASURA, onde serão salvos os tickets
- X_HASURA_ADMIN_SECRET - chave de segurança de administrador do hasura para autenticação

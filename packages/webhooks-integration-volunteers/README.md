
Integração da voluntárias: 

-Quando uma voluntária se inscreve as informações tem entrada na tabela form_entries e são sincronizadas na tabela solidarity_users e criação da usuaria no zendesk.

-Após a inscrição a voluntária preenche informações via mautic e os dados preenchidos lá são salvos na tabela webhook_registry 

- Quando há uma nova entrada na webhook_registry é gerada ou atualizada uma nova voluntária no Zendesk e a partir das informações das novas informações é realizada a triagem para definir o status da voluntária e enviar os tickets de acordo. 

------------------------------------------------------------------------------------

PLANEJAMENTO: 

Criar novo packge unificando o mautic- registry e o mautic-zendesk:

a) levantar e entender a multiplicidade de entrada de dados das voluntárias de acordo com as regras de negócio com cada parte do processo de criação, 
integração, triagem e etc

b)Simplificar o levantamento de dados das voluntarias:  

Atualmente temos módulos de criação de tickets, c usuárias e atualização de usuárias diferentes para advogadas e psicólogas  para o novo package unificar 
para os modulos únicos diferenciando pelo campo de identificação:

volunteerCreateTicket: 

volunteerCreateUser:

volunteerUpdateTicket:

Identificar o tipo de voluntária via atributo organization e primeiramente manter a OO e adaptar os demias módulos de acordo. 

b) avaliar o paradigma usado atualmente nos packages 
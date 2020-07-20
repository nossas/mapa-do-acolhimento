import { getVolunteerType } from "../../utils";
import { Volunteer } from "../../types";

type Props = {
  volunteer: Volunteer;
  assignee_name: string;
  individual_name: string;
};

export default ({ volunteer, assignee_name, individual_name }: Props) => {
  const {
    registration_number,
    organization_id,
    name,
    whatsapp,
    phone
  } = volunteer;
  const { type, registry_type } = getVolunteerType(organization_id);

  return `Olá, ${individual_name}!

Boa notícia!

Conseguimos localizar uma ${type.toLowerCase()} disponível próxima a você. Estamos te enviando os dados abaixo para que entre em contato em até 30 dias. É muito importante atentar-se a esse prazo pois, após esse período, a sua vaga pode expirar. Não se preocupe, caso você não consiga, poderá retornar à fila de atendimento se cadastrando novamente pelo site.

${type}: ${name.split(" ")[0]}

Telefone: ${phone || whatsapp}

${registry_type}: ${registration_number}

Diante do contexto da pandemia do covid-19, sabemos que podem surgir algumas dificuldades para que receba o acolhimento necessário, especialmente à distância, que é a recomendação neste momento. Por isso, caso haja algum obstáculo que impossibilite que o seu atendimento aconteça de forma segura, por favor nos escreva e para te oferecermos mais informações sobre como buscar ajuda na rede pública de atendimento. Não se preocupe, você também poderá iniciar os atendimentos de modo presencial quando esse período tão difícil passar.

Todos os atendimentos do Mapa devem ser gratuitos pelo tempo que durarem. Caso você seja cobrada, comunique imediatamente a nossa equipe. No momento de contato com a voluntária, por favor, identifique que você buscou ajuda via Mapa do Acolhimento.

Agradecemos pela coragem, pela confiança e esperamos que seja bem acolhida! Pedimos que entre em contato para compartilhar a sua experiência de atendimento.

Um abraço,

${assignee_name} do Mapa do Acolhimento`;
};

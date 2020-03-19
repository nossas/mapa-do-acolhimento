const volunteerComment = ({
  volunteer_name,
  assignee_name,
  individual_name
}) => {
  return `Olá, ${volunteer_name}!\n\nBoa notícia!\nViemos te contar que o seu número de atendimento acaba de ser enviado para a ${individual_name}, pois você é a voluntária disponível mais próxima.\n\n**Para o nosso registro, é muito importante que nos avise sempre que iniciar os atendimentos. Lembre-se de que eles devem ser integralmente gratuitos e que o seu comprometimento em acolhê-la e acompanhá-la neste momento é fundamental.**\n\nEm anexo, estamos te enviando dois documentos muito importantes: **as diretrizes de atendimento do Mapa do Acolhimento, com todas as nossas regras e valores, e a Guia do Acolhimento,** uma cartilha para te ajudar a conduzir os atendimentos da melhor forma possível.\n\nQualquer dúvida ou dificuldade, por favor nos comunique.\nÉ muito bom saber que podemos contar com você! \nUm abraço,\n\n${assignee_name} do Mapa do Acolhimento`;
};

export default volunteerComment;

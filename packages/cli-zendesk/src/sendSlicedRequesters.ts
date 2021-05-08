import updateRequesterFields from "./zendesk/updateRequesterFields";
import { Requester } from "./interfaces/Requester";
import dbg from "./dbg";

const log = dbg.child({ labels: { process: "sendSlicedRequesters" } });

const sendSlicedRequesters = async (
  slicedRequesters: Requester[],
  tries: number,
  counter: number
): Promise<boolean> => {
  if (counter >= tries) {
    log.warn("Tentou mais de três vezes", slicedRequesters);
    return false;
  }
  const response = await updateRequesterFields(slicedRequesters);

  await new Promise(r => setTimeout(r, 1000));

  if (!response) {
    log.warn("Resposta indefinida!");
    return sendSlicedRequesters(slicedRequesters, tries, counter + 1);
  }

  if ((response as { status: number }).status !== 200) {
    log.warn("Resposta diferente de 200 para o usuário", slicedRequesters);
    return sendSlicedRequesters(slicedRequesters, tries, counter + 1);
  }

  return true;
};

export default sendSlicedRequesters;

import { Requester } from "./interfaces/Requester";
import dbg from "./dbg";
import sendSlicedRequesters from "./sendSlicedRequesters";

const log = dbg.child({ labels: { process: "sendRequesters" } });

const sendRequesters = async (requesters: Requester[]) => {
  const limit = 100;
  let offset = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const slicedRequesters = requesters.slice(offset, offset + limit);
    // eslint-disable-next-line no-await-in-loop
    const responseOk = await sendSlicedRequesters(slicedRequesters, 3, 0);
    log.info(
      `[${
        offset + limit < requesters.length ? offset + limit : requesters.length
      }/${requesters.length}]`
    );

    if (responseOk) {
      if (offset + limit > requesters.length) {
        break;
      }
      offset += limit;
    } else {
      log.error("Falha na integração!");
      break;
    }
  }
};

export default sendRequesters;

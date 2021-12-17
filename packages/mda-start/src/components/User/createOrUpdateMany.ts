import { User, ZendeskUserCreationResponse } from "../../types";
import fetch from "cross-fetch";
import jobStatuses from "./jobStatuses";
import logger from "../../logger";

const log = logger.child({ labels: { process: "createOrUpdateMany" } });

const parameters = {
  username: process.env.ZENDESK_API_USER || "",
  token: process.env.ZENDESK_API_TOKEN || "",
  remoteUri: process.env.ZENDESK_API_URL || ""
}

const getAuth = () => ({          
  headers: {
    Authorization: 'Basic ' + Buffer.from(parameters.username + "/token:" + parameters.token).toString('base64'),
    'content-type': 'application/json'
  }                     
})

const createOrUpdateMany = (users: User[]): Promise <ZendeskUserCreationResponse> => {
  
  return fetch(`${parameters.remoteUri}users/create_or_update_many.json`, {
    method: 'POST',
    body: JSON.stringify({ users }),
    ...getAuth()
  })
  .then((response) => { 
    if(response.status === 200){
      return response.json()
    }
    throw new Error(response.statusText);
  })
  .then((result) => {
    const jobID = result["job_status"].id;
   
    return jobStatuses(jobID, 5000).then((data: any) => {
       
      return data["job_status"]["results"] as ZendeskUserCreationResponse}); 
  })
  .catch((err)=>{
    log.error(err);
    return err;
  })
}

export default createOrUpdateMany;
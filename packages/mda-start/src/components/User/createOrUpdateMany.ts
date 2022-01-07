import { User, ZendeskUserCreationResponse } from "../../types";
import jobStatuses from "./jobStatuses";
import logger from "../../logger";
import zendeskRequest from "../zendeskRequest";

const log = logger.child({ labels: { process: "createOrUpdateMany" } });


const createOrUpdateMany = (users: User[]): Promise <ZendeskUserCreationResponse[]> => {
  
  return zendeskRequest(`users/create_or_update_many.json`, 'POST',JSON.stringify({ users }))
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
import logger from "../../logger";
import zendeskRequest from "../zendeskRequest";

const log = logger.child({ labels: { process: "jobStatuses" } });

const jobStatuses = (job_status_id: string, interval?: number) => new Promise((resolve, reject)=>{
  const nIntervId = setInterval(function getJobStatusUntilComplete() { getJobStatus(); },(interval || 5000)); 
  
  //controla ciclo de atualização do status
  const getJobStatus = () => {
    zendeskRequest(`job_statuses/${job_status_id}.json`,'POST')
    .then((result)=> {
      if(result["job_status"].status === "completed" ||
      result["job_status"].status === "failed" || 
      result["job_status"].status === "killed") {
        
        //resultado com sucesso para a thread
        clearInterval(nIntervId);
        log.info('Job '+job_status_id+' completed!');
        return resolve(result)
      } else {
        log.info('Job prgress: ' + result["job_status"].progress + ' out of ' + result["job_status"].total);
      }
    })
    .catch((err)=> {
      log.error(err);
      
      //resultado com erro para thread
      clearInterval(nIntervId);
      return reject(err);
    });
    
  }
});

export default jobStatuses;
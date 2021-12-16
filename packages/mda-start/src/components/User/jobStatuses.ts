import fetch from "cross-fetch";

const parameters = {
    username: process.env.ZENDESK_API_USER || "",
    token: process.env.ZENDESK_API_TOKEN || "",
    remoteUri: process.env.ZENDESK_API_URL || ""
}
console.log(parameters);
const getAuth = () => ({          
    headers: {
        Authorization: 'Basic ' + Buffer.from(parameters.username + ":" + parameters.token).toString('base64')
    }                     
})

const jobStatuses = (job_status_id: string, interval?: number) => new Promise((resolve, reject)=>{
    const nIntervId = setInterval(function getJobStatusUntilComplete() { getJobStatus(); },(interval || 5000)); 
    
    //controla ciclo de atualização do status
    const getJobStatus = () => {
        fetch(`${parameters.remoteUri}job_statuses/${job_status_id}.json`, getAuth())
            .then((response) => { 
                if(response.status === 200){
                    return response.json()
                }
                throw new Error(response.statusText);
            })
            .then((result)=> {
                if(result["job_status"].status === "completed" ||
                    result["job_status"].status === "failed" || 
                    result["job_status"].status === "killed") {
                    
                    //resultado com sucesso para a thread
                    clearInterval(nIntervId);
                    console.log('Job '+job_status_id+' completed!');
                    return resolve(result)
                } else {
                    console.log('Job prgress: ' + result["job_status"].progress + ' out of ' + result["job_status"].total);
                }
            })
            .catch((err)=> {
                console.log(err);

                //resultado com erro para thread
                clearInterval(nIntervId);
                return reject(err);
            });
        
    }
});

export default jobStatuses;
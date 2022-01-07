import fetch from "cross-fetch";

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
});

const zendeskRequest = (
  input: string, 
  method: string,
  body?: any,
  status: number = 200 as number) => {
  
  return fetch(`${parameters.remoteUri}${input}`, {
    method: method,
    body: body,
    ...getAuth()
  })
  .then((response) => { 
    if(response.status === status){
      return response.json()
    }
    throw new Error(response.statusText);
  })
}  

export default zendeskRequest;
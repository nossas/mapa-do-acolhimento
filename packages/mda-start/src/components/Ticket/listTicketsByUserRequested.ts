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

const listTicketsByUserRequested = (requester_id: any) => {
  
  return fetch(`${parameters.remoteUri}users/${requester_id}/tickets/requested`, {
    ...getAuth()
  })
  .then((response) => { 
    if(response.status === 200){
      return response.json()
    }
    throw new Error(response.statusText);
  })
}  

export default listTicketsByUserRequested;
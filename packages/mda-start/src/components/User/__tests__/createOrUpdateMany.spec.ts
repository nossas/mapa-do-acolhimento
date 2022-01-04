//1. POST to /api/v2/users/create_or_update_many
//https://developer.zendesk.com/api-reference/ticketing/users/users/#create-or-update-many-users

//2. Com resultado da requisição acima verificar o status GET /api/v2/job_statuses/{job_status_id}
//https://developer.zendesk.com/api-reference/ticketing/ticket-management/job_statuses/#show-job-status

//3. Resolve requisição quando o status é igual a 'completed'

import crossFetch from "cross-fetch";
import createOrUpdateMany from '../createOrUpdateMany';

jest.mock("cross-fetch", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("Create or Update Many Users", () => {

  jest.setTimeout(5001);
  
  const role = "end-user"; 
  const condition:"desabilitada" = 'desabilitada';
  const users = [{
    name: "Teste",
    role: role as "end-user",
    organization_id: 360269610652,
    email: "teste@email.com",
    external_id: "00001",
    phone: "99999999999",
    verified: false,
    user_fields: {
      cor: null,
      address: "",
      cep: '',
      city: '',
      latitude: '',
      longitude: '',
      state: '',
      tipo_de_acolhimento: null,
      condition: condition,
      whatsapp: "",
      registration_number: "21312312",
      occupation_area: null,
      disponibilidade_de_atendimentos: "1",
      data_de_inscricao_no_bonde: "2020-05-29T00:28:29.55569"
     }
  }]
  
  const jobStatus = {
    "job_status": {
      "id": "d01228d9f081c4dd37fb64871e0f6eac", 
      "message": "Completed at 2021-12-17 18:28:10 +0000", 
      "progress": 1, 
      "results": [{
        "email": "teste@email.com", 
        "external_id": "00001", 
        "id": 389327067551, "status": "Updated"
      }],
      "status": "completed", 
      "total": 1, 
      "url": "https://teste.zendesk.com/api/v2/job_statuses/d01228d9f081c4dd37fb64871e0f6eac.json"
    }
  }

  it("Create a User", async () => {
    (crossFetch  as any).mockResolvedValueOnce({json: () => jobStatus, status: 200 });
    (crossFetch  as any).mockResolvedValueOnce({json: () => jobStatus, status: 200 });
   
    const data = await createOrUpdateMany(users);
    expect(data).toStrictEqual(jobStatus.job_status.results);
    
  });
  
});


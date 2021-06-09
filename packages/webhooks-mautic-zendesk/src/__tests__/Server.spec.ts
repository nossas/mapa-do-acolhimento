import request from "supertest";
import AdvogadaCreateUser from "../integrations/AdvogadaCreateUser";
import Server from "../Server";
process.env.PORT = ""
process.env.ZENDESK_ORGANIZATIONS = `{"ADVOGADA":"","MSR":"","PSICOLOGA":""}`
process.env.ZENDESK_API_URL = ""

describe("Test the Express server", () => {
  let app: Server;
  app = new Server();

  test("createTicket", async () => {
   
    const res: any = undefined
    const user = new AdvogadaCreateUser(res)
    const info = {
      id: 0,
      organization_id:2,  
      name:'nome',
      phone: '9999999',
      user_fields: { registration_number: null, condition: null, state:"", city: ""}
    }
    app.createTicket( user,info,'',res)
    const response = await request(app.createTicket).post("/");
    expect(response).toBe(undefined)
    ;
  });
});
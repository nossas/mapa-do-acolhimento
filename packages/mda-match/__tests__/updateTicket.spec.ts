//PUT /api/v2/tickets/{ticket_id}
//https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#update-ticket

import crossFetch from "cross-fetch";
import updateTicket from "../src/components/Zendesk/updateTicket"
import { UpdateTicket } from "../src/types";

jest.mock("cross-fetch", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("Create one Ticket", () => {

  const ticket: UpdateTicket =  {
    comment: {
      body: "TESTE Importado pelo BONDE.",
      author_id: 377510044432,
      public: false
    },
    assignee_id: 377510044432,
    status: '-',
    custom_fields: [
        { id: 360014379412, value: "solicitação_recebida" },
        { id: 360016631632, value: 'https://teste.zendesk.com/' },
        { id: 360016631592, value: 'Teste Voluntaria'}
    ]
      
  }

  const response = {
    ticket: {
      url: 'https://teste.zendesk.com/api/v2/tickets/12121.json',
      id: 12121,
      external_id: null,
      via: { channel: 'api', source: [Object] },
      created_at: '2022-01-05T13:08:39Z',
      updated_at: '2022-01-05T14:14:53Z',
      type: null,
      subject: 'TESTE',
      raw_subject: 'TESTE',
      description: 'TESTE NOVO Importado pelo BONDE.',
      priority: null,
      status: 'new',
      recipient: null,
      requester_id: 389327067551,
      submitter_id: 389327067551,
      assignee_id:  377510044432,
      organization_id: 360269610652,
      group_id: null,
      collaborator_ids: [],
      follower_ids: [],
      email_cc_ids: [],
      forum_topic_id: null,
      problem_id: null,
      has_incidents: false,
      is_public: false,
      due_at: null,
      tags: [ '1', 'desabilitada' ],
      custom_fields: [],
      satisfaction_rating: null,
      sharing_agreement_ids: [],
      fields: [],
      followup_ids: [],
      brand_id: 360001789192,
      allow_channelback: false,
      allow_attachments: true
    },
    audit: {
      id: 67676767676,
      ticket_id: 12121,
      created_at: '2022-01-05T14:14:53Z',
      author_id: 56565656,
      metadata: { system:{}, custom: {} },
      events: [ ],
      via: { channel: 'api', source: {} }
    }
  }
    
  it("Create a Ticket", async () => {
    (crossFetch  as any).mockResolvedValueOnce({json: () => response, status: 200 });
    
    const data = await updateTicket(12121,ticket);
    expect(data).toStrictEqual(response);
    
  });
  
});


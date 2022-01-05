//1. POST to  /api/v2/tickets
//https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#create-ticket

import crossFetch from "cross-fetch";
import createOneTicket from '../createOneTicket';

jest.mock("cross-fetch", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("Create one Ticket", () => {
  const ticket =  {
    comment: {
      body: "TESTE Importado pelo BONDE.",
      public: false
    },
    requester_id: 389327067551,
    subject: "TESTE UM",
    custom_fields: [
        { id: 360014379412, value: "solicitação_recebida" },
        { id: 360016681971, value: 'Teste' }
    ]
      
  }

  const response = {
    ticket: {
      url: 'https://teste.zendesk.com/api/v2/tickets/12121.json',
      id: 12121,
      external_id: null,
      via: { channel: 'api', source: [Object] },
      created_at: '2022-01-05T13:08:39Z',
      updated_at: '2022-01-05T13:08:39Z',
      type: null,
      subject: 'TESTE UM',
      raw_subject: 'TESTE UM',
      description: 'TESTE NOVO Importado pelo BONDE.',
      priority: null,
      status: 'new',
      recipient: null,
      requester_id: 343434343434,
      submitter_id: 343434343434,
      assignee_id: null,
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
      custom_fields: [
        { id: 360014379412, value: "solicitação_recebida" },
        { id: 360016681971, value: 'Teste' }
      ],
      satisfaction_rating: null,
      sharing_agreement_ids: [],
      fields: [],
      followup_ids: [],
      brand_id: 1234,
      allow_channelback: false,
      allow_attachments: true
    },
    audit: {
      id: 121212121212,
      ticket_id: 1212,
      created_at: '2022-01-05T13:08:39Z',
      author_id: 12345,
      metadata: { system: {}, custom: {} },
      events: [],
      via: { channel: 'api', source: {} }
    }
  }
  
  it("Create a Ticket", async () => {
    (crossFetch  as any).mockResolvedValueOnce({json: () => response, status: 201 });
  
    const data = await createOneTicket(ticket);
    expect(data).toStrictEqual(response);
    
  });
  
});


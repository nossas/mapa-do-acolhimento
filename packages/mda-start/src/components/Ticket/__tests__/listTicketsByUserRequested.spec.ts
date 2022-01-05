//1. GET to /api/v2/users/{user_id}/tickets/requested
//https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets

import crossFetch from "cross-fetch";
import listTicketsByUserRequested from "../listTicketsByUserRequested";

jest.mock("cross-fetch", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("List Tickets By User", () => {
  const requester_id = 123123123123;
  const response = {
  tickets: [
    {
      url: 'https://teste.zendesk.com/api/v2/tickets/11111.json',
      id: 11111,
      external_id: null,
      via: {},
      created_at: '2019-11-19T19:17:13Z',
      updated_at: '2022-01-04T15:28:15Z',
      type: null,
      subject: '[Advogada] TESTE UM',
      raw_subject: '[Advogada] TESTE UM',
      description: '-',
      priority: null,
      status: 'pending',
      recipient: null,
      requester_id: 123123123123,
      submitter_id: 123123123123,
      assignee_id: null,
      organization_id: 360269610652,
      group_id: null,
      collaborator_ids: [],
      follower_ids: [],
      email_cc_ids: [],
      forum_topic_id: null,
      problem_id: null,
      has_incidents: false,
      is_public: true,
      due_at: null,
      tags: [],
      custom_fields: [],
      satisfaction_rating: null,
      sharing_agreement_ids: [],
      fields: [],
      followup_ids: [],
      brand_id: 360001789192,
      allow_channelback: false,
      allow_attachments: true
    },
    {
      url: 'https://teste.zendesk.com/api/v2/tickets/22222.json',
      id: 22222,
      external_id: null,
      via: {},
      created_at: '2022-01-05T13:01:26Z',
      updated_at: '2022-01-05T13:01:26Z',
      type: null,
      subject: '[Advogada] TESTE DOIS',
      raw_subject: '[Advogada] TESTE DOIS',
      description: 'TESTE Importado pelo BONDE.',
      priority: null,
      status: 'new',
      recipient: null,
      requester_id: 123123123123,
      submitter_id: 123123123123,
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
      tags: [],
      custom_fields: [],
      satisfaction_rating: null,
      sharing_agreement_ids: [],
      fields: [],
      followup_ids: [],
      brand_id: 360001789192,
      allow_channelback: false,
      allow_attachments: true
    },
    {
      url: 'https://teste.zendesk.com/api/v2/tickets/33333.json',
      id: 33333,
      external_id: null,
      via: {},
      created_at: '2022-01-05T13:08:39Z',
      updated_at: '2022-01-05T13:08:39Z',
      type: null,
      subject: '[Advogada] TESTE TRÊS',
      raw_subject: '[Advogada] TESTE TRÊS',
      description: 'TESTE NOVO Importado pelo BONDE.',
      priority: null,
      status: 'new',
      recipient: null,
      requester_id: 123123123123,
      submitter_id: 123123123123,
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
      tags: [],
      custom_fields: [],
      satisfaction_rating: null,
      sharing_agreement_ids: [],
      fields: [],
      followup_ids: [],
      brand_id: 360001789192,
      allow_channelback: false,
      allow_attachments: true
    }
  ],
  next_page: null,
  previous_page: null,
  count: 3
}
  
  it("List Tickets", async () => {
    (crossFetch  as any).mockResolvedValueOnce({json: () => response, status: 200 });
  
    const data = await listTicketsByUserRequested(requester_id);
    expect(data).toStrictEqual(response);
    
  });
  
});


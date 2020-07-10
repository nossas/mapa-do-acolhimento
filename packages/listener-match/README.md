# Listener Match

This service listens to new entries in the `solidarity_tickets` using GraphQL subscriptions with a few conditions:

- match_syncronized is false
- it's a MSR ticket that wasn't attended to yet (see conditions in fetchSolidarityTickets)

## What does it do?

Match MSR with closest available Volunteer or forward to Public Service

### How it's done?

The script searchs for the closest volunteer according to the MSR's requested type of service.

It'll create a new ticket for the volunteer and update the MSR ticket with the volunteer data.

Then save this connection in the table `solidarity_matches` to record the match.

If it doesn't find any volunteer, it'll update the MSR ticket `status_acolhimento` to forwarded to Public Service.

## CI/CD

In Cluster the service is under "listeners" and has the name "match"

## Commands

### Install deps

`pnpm i`

### Run

`pnpm --filter listener-match run dev`

### Improvements

- Implementing a queue would probably be a more sofisticated way to handle the refresh rate and the need for the match to be synchronous
  - A queue was implemented, but I'd like to use an [Immutable Data Structure to structure the queue](https://xiaoyunyang.github.io/post/when-to-use-immutable-data-structures/)

### Reasons Why

- We need to cache the tickets that arrive
  - This is done because [Hasura refreshes the query every 1s](https://hasura.io/docs/1.0/graphql/manual/subscriptions/index.html#execution)
- We also dont await for update / insert Hasura tickets response because of time
  - If the script takes too long to run, the subscription will refetch and a volunteer could have two tickets created for the same MSR

### Get it running

- The `.env` variables are described in the `.env.example` file
  - `ZENDESK_ORGANIZATIONS` are the organization_id's from the types of Zendesk users
  - `COMMUNITY_ID` is the community id from Mapa do Acolhimento in BONDE
- When running the `dev` script, the service will start listening to the subscription detailed in the file `fetchSolidarityTickets`. If any tickets that fits through those filters arrives at the database, Hasura will send them to us. 


### Tips for testing locally

Testing locally is a bit tricky considering that the Zendesk enviroment is always a production enviroment, thus difficulting the testing proccess. You'll always need to pay close attention to how the tickets created or updated here, are in Zendesk.
Zendesk also has triggers that are enabled when some actions accur.
Triggers that can be called when this listener runs:
  - Email to therapists or lawyers when they recieve a match
  - Email to MSR if we don't find a volunteer close to her and send her public services info
  - Email to MSR if she already has a match but asked for a new one
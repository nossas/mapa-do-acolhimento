# Listener Match

This service listens to new entries in the `solidarity_tickets` using GraphQL subscriptions with a few conditions:

- match_syncronized is false
- it's a MSR ticket that wasn't attended to yet (see conditions in fetchSolidarityTickets)

## What does it do?

Match MSR with closest available Volunteer or forward to Public Service

### How it does it?

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

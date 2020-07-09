# LISTENER SOLIDARITY

This listener listen's to some specific widget_id's from the form_entries table. And it's called if the column `rede_syncronized` is `false`.

These are the widgets separared by user types:

- Therapists

  - 2760
  - 16835
  - 17628

- Lawyers

  - 8190
  - 16838
  - 17633

- MSR
  - 3297
  - 16850
  - 62625

## User

When it's called, the integration starts by creating or updating the user at Zendesk, then saving it in Hasura.

If the user already existed in Zendesk - this is determined by their e-mail and external_id (form entry id) - the user will be updated in Zendesk and the same `user_id` will be returned, thus Hasura will also update this in the database, because one of the unique keys from the `solidarity_users` table is the column `user_id`.

If all of these processes are correct, the form entry row from `form_entries` table will also be updated at the `rede_syncronized` column, now indicating that it's true.

## Ticket

If the user was successfully created in Zendesk then their tickets will also be created. **Only MSR tickets are created in this integration**, volunteer tickets are created in another service (webhooks-mautic-zendesk).

If a user asks for two types of volunteers, then two tickets will be created, if it only asks for one, then only one will be created according to what she filled in the form.

A new ticket will always be created, but there is a check to see if a similar ticket to the new one created already exists.
This is important because depending on those old tickets, the content of the new ticket changes. The criteria for this is:

- The older ticket has the same type of request ("psicológico" or "jurídico")
- The older tickets can't have the status "solved" or "closed"
- If the user still has tickets that pass through those filters, we check to see if she has current match tickets
  - We determine whether the user has these tickets by filtering those with "status acolhimento" equal to: "atendimento iniciado" or "encaminhamento aguardando confirmação" or "encaminhamento confirmou disponibilidade" or "encaminhamento realizado".
- If she has any ticket that meets the above criteria, **we'll create a new ticket for her with "status do acolhimento" equal to "solicitação repetida"**
- If she doesn't, we'll check if her oldest ticket has "status do acolhimento" equal to "solicitação recebida"
  - Meeting this condition, **we'll create a new ticket with "status acolhimento" equal to "solicitação repetida" and fill the field "atrelado ao ticket" with the ID of that oldest ticket**.
- If she does have old tickets with "status do acolhimento" equal to: "atendimento concluído" or "encaminhamento negado" or "atendimento interrompido" or "encaminhamento realizado para serviço público" **we'll just create a new regular ticket for her**.

## Tracking new form entries

To make the script track new widgets here's the steps you need to follow:

- Update LAWYER_WIDGET_IDS and THERAPIST_WIDGET_IDS envs in Cluster
- Add new form mapping to /form_entries_mapping file

## Improvements
  - Add yup validation when creating ticket in Zendesk
  - Add yup validation when creating user in Zendesk

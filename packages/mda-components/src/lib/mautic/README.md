# Mautic Integration

## Saving Contacts

Currently this component connects any service that has a MAUTIC_USERNAME, MAUTIC_PASSWORD and MAUTIC_URL env to Mautic, and saves the user being passed as a new contact.

This was done so we would have live segments in Mautic, and there would be no need to always update the segments when creating a new campaign.

This module is currently being used in:

- listener-solidarity
- webhooks-mautic-zendesk
- webhooks-solidarity-count
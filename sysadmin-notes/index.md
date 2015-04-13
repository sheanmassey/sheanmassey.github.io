---
layout: post
---

# Random notes from a developer pretending to be a Windows Sysadmin

Over the past year I've been responsible for all the IT tasks in a classic Microsoft environment for a small company (<40 users).
Upon my arrival I was introduced for the first time to MS Exchange Server and MS Active Directory. As a Linux and FOSS
fanatic I'll have a very hard time expressing my disgust of either let alone both through writing. They make me want to quit
computing altogther, move to some remote location, and become a farmer..

I'd like to use this page to collect some of the most common tasks, work arounds, or what not as a form of personal documentation. 
Thankfully I don't need to touch MS servers daily but unfortunately that also means that I frequently forget how I did X or Y, *that
one time*.

### Creating an OOO message for a user

We all forget from time to time, and especially when you have holidays comming up, you've got nicer things to think
about that setting your OOO message before packing up and running off to the beach for that well deserved pina colada.

If you have the users credentials setting the OOO message is easy. If you don't you may either change the users password
(via your AD server) and then login to OWA with the new credentials, or better:

- Open EMC with an Exchange Server Administrator account
- Find the users mailbox (Recipient Configuration -> Mailbox)
- Right click on the mailbox and select "Manage Full Access permissions"
- Grant yourself Full Access permissions
- Log into your account via OWA, click on your username (top right) and from the dropdown select "Open another mailbox"
- Once you've openned the users mailbox you can set the OOO messages
- Finally, don't forget to revoke your user from the Full Access permission lists


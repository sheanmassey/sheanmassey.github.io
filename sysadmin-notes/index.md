---
layout: post
---


# Random notes from a developer pretending to be a Windows Sysadmin

Over the past year I've been responsible for all the IT tasks in a classic Microsoft environment for a small company (<40 users).
Upon my arrival I was introduced for the first time to MS Exchange Server and MS Active Directory. As a Linux and FOSS
fanatic I'll have a very hard time expressing my disgust of either let alone both through writing. They make me want to quit
computing altogther, move to some remote location, and start a farm.

I'd like to use this page to collect some of the most common tasks, work arounds, or what not as a form of personal documentation. 
Thankfully I don't need to touch MS servers daily but unfortunately that also means that I frequently forget how I did X or Y, *that
one time*.

### Shortcut limitations (at least Windows 7):

Your shortcuts can be deleted for no good reason other than they were temporarily unavailable...

https://support.microsoft.com/en-us/kb/978980

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

### Shared Mailboxes

Exchange 2010: there is no option in the Exchange Server GUI to create shared mailboxes, they must be created in the Shell:

    New-Mailbox -Name "Display Name" -Alias "display.name" -OrganizationalUnit "<OU>" -Database "<Database>" -UserPrincipalName "display.name@email.com" -Shared

To list the current Mailbox Databases:

    Get-MailboxDatabase -Status | Format-Table Name

After the shared mailbox is created it becomes visible in the GUI. Adding Send-As and Full-Access permissions is possible via the GUI, or it can be scripted with:

    Add-MailboxPermission <Mailbox Name> -User "<domain\username>" -AccessRights FullAccess
    Add-ADPermission <Mailbox Name> -User "<domain\username>" -ExtendedRights Send-As

Finally, the shared mailbox will only show up the next day unless you explicitly import the mailbox in outlook:

    # For Outlook 2013
    File -> Account Settings -> Account Settings... -> E-mail -> Change... -> More Settings... -> Advanced -> Add...
    # Lookup the new mailbox by name and "Apply".

### GPO for permission management

...

### Using a `Public Folders` contacts list in Outlook 2013 (+2007)

Documentation will always point you to click `Address Book` -> `Tools` -> `Options` ... as seend here: http://www.msoutlook.info/question/262 ..this doesn't work. Instead, do it backwards, start from the shared contacts list.
Find the Public Folder Contacts List, right click -> Properties -> Address Book -> Check the `Show in address book`.

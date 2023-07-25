## Routeing EndPoint

- /api/v1/auth/local/signup => POST
- /api/v1/auth/local/signin => POST
- /api/v1/auth/signout => GET

- /api/v1/email/sent -> POST -> Email Send to another user(Done)
- /api/v1/email/sent?skip=0&take=20 -> GET -> Done -> Getting Sending Emails with Pagination (Done)
- /api/v1/email/draft => POST -> Creating Draft Email (Done)
- /api/v1/email/draft?skip=0&take=20 => GET -> Getting Draft Emails with Pagination (Done)

- /api/v1/email/inbox?skip=0&take=20 => GET -> Getting Inbox Emails with Pagination (Done)

- /api/v1/email/:emailId => GET by ID => Getting Single Emails Details with Pagination (Done)

- /api/v1/email/read/:emailId => PATCH => Update email read/unread (Done)
- /api/v1/email/unread?skip=0&take=20 => Getting Unread Emails with Pagination (Pending) =>Error

- /api/v1/email/important => PATCH => Update email importance (pending)
- /api/v1/email/important?skip=0&take=20 => Getting Importance Emails with Pagination (Pending)

- /api/v1/email/spam => PATCH
- /api/v1/email/spam => GET

- /api/v1/email-trash/:emailId => DELETE
- /api/v1/email-trash?skip=0&take=20 => Get

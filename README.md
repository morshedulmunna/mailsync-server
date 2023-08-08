# MailSyncs Api Documentation.
Server Link: https://mailsyncs-server.onrender.com/api/v1
## Introduction

This reference is your key to a comprehensive understanding of the mailsyncs API.

## Installation

```bash
$ yarn install
```

Or

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ yarn run start:prod
```

</aside>

### **Conventions**

The base URL to send all API requests is `https://api.notion.com`. HTTPS is required for all API requests.

The Mailsync API follows RESTful conventions as much as possible, with most operations performed via `GET`, `POST`, `PATCH`, and `DELETE` requests on page and database resources. Request and response bodies are encoded as JSON.

### **Pagination**

Endpoints that return lists of objects support cursor-based pagination requests. By default, Notion returns ten items per API call. If the number of items in a response from a support endpoint exceeds the default, then an integration can use pagination to request a specific set of the results and/or to limit the number of returned items.\*\*\*\*

#### SUPPORTED ENDPOINTS

| HTTP method | Endpoint                                             | Actions                                   |
| ----------- | ---------------------------------------------------- | ----------------------------------------- |
| POST        | yourdomain.com/api/v1/auth/local/signup              | Usre Registration                         |
| POST        | yourdomain.com/api/v1/auth/local/signin              | User Sign in                              |
| GET         | yourdomain.com/api/v1/auth/signout                   | User Sign Out                             |
| POST        | yourdomain.com/api/v1/email/sent                     | Send a Email                              |
| GET         | yourdomain.com/api/v1/email/sent?skip=0&take=20      | Getting Sending Emails with Pagination    |
| POST        | yourdomain.com/api/v1/email/draft                    | Creating Draft Email                      |
| GET         | yourdomain.com/api/v1/email/draft?skip=0&take=20     | Getting Draft Emails with Pagination      |
| GET         | yourdomain.com/api/v1/email/inbox?skip=0&take=20     | Getting Inbox Emails with Pagination      |
| GET         | yourdomain.com/api/v1/email/details/:emailId         | Getting Single Emails Details             |
| PATCH       | yourdomain.com/api/v1/email/read/:emailId            | Update email unread to read               |
| GET         | yourdomain.com/api/v1/email/unread?skip=0&take=20    | Getting Unread Emails with Pagination     |
| PATCH       | yourdomain.com/api/v1/email/important                | Update email Normal to importance         |
| GET         | yourdomain.com/api/v1/email/important?skip=0&take=20 | Getting Importance Emails with Pagination |
| PATCH       | yourdomain.com/api/v1/email/spam                     | Update Email Normal to Spam               |
| GET         | yourdomain.com/api/v1/email/spam?skip=0&take=20      | Getting Spam Emails with Pagination       |
| DELETE      | yourdomain.com/api/v1/email/delete/:emailId          | DELETE email by Id                        |
|             |                                                      |

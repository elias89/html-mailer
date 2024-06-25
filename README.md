> **Note**
> Alpha version | This is in very early stages, I'm still adding features.
# HTML mailer

![image](https://github.com/elias89/html-mailer/assets/7673130/478c2f35-ef5f-4f99-bc54-d1d040d86e72)



This is an HTML email editor and mailer. You can **edit, preview, and send emails quickly**.

It was built using [Electron](https://electronjs.org/), [Nodemailer](https://nodemailer.com/), [Monaco editor](https://microsoft.github.io/monaco-editor/) and [Handlebars](https://handlebarsjs.com/).

This is a personal project I started in order to quickly edit and test emails. Usually, you would be working on a project where you need to edit the mail in your code editor, create a PR, merge, deploy your environment and then make the app send some emails. That whole process just to see if the alignment of an element looks good on some email client. That's the reason I created this.

## How it works

It's pretty simple, you edit the HTML email and also the handlebars context in the code editor, then handlebars takes both parts, processes them, and saves it into a final HTML file. Nodemailer takes that file and uses it as HTML part to send it.

The preview also uses that same file to render it inside the container.

Handlebars context is of course optional but it could be really useful when your emails are pre-processed by a service. E.g. AWS uses handlebars as well for your email template variable interpolation.

## Usage

Create a `config.json` file in the root of the repository (git will ignore it and won't track it) adding the following configuration for email sender service:

```
{
  "emailFrom" : "<SENDER EMAIL ACCOUNT>",
  "password" : "<SENDER PASSWORD>",
  "subject" : "<SUBJECT>"
}
```

This is temporary just for the current Alpha state, will add a secure way to handle email and password.

> npm i

> npm run initialize //Only for the first time

> npm run start

# Dazzle AI Presets

Dazzle AI Presets allows the user to save a predefined AI prompt as a shortcut on their desktop/homescreen. This is accomplished by making the site a PWA which allows the user to download the website. On phones, the shortcut appears just like any other app.

**Screens:**

home.js

app-runner.js

On the home screen, the user enters their app details: name, prompt, icon (url to the icon).
Then their custom app can be run by passing those app details in the querystring to the app-runner page
as follows.

/{appname}/app-runner?context={prompt}&iconpath={iconpath}

Note the app name is in the route. The PWA is scoped at this level. By default, PWAs are scoped
to the domain, but this only allows the website to be downloaded once at the domain level. By scoping the PWA at the first part of the path, this allows the user to save multiple PWA apps off of this one site.

## Setup
The Gemini API key should be set up as an environment variable with name

API_KEY

Cloudinary is SaaS service to host image files.
It is used here to allow the user to upload their own icon images.
The following values can be pulled from Cloudinary's interface and should be set up as environment variables.

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

NEXT_PUBLIC_CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET


## Running locally

```bash
npm install
npm run dev
```

Install Node.js and Yarn on your machine. Download the recommended LTS version for Node.js and the latest version for Yarn.

https://nodejs.org/en

https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable

After that, Clone this repository and run the following command in the terminal while in the root directory of the project:

```
yarn install
```

This will install all the necessary dependencies for both the SaaS admin and Root admin.

To make the API calls work, either run make-urls.sh by passing the full API URL as an argument.

```
./make-urls.sh <CONTROLLER_API_URL>
```

Alternatively, rename .env.example to .env.local in both saas.drio and root.drio directories and add the following environment variables to each .env.local files:

```
API_URL=<CONTROLLER_API_URL>
```

After that, run the following command to start the development server for both the SaaS admin and Root admin:

```
yarn dev
```

This will start the development server for both the SaaS admin and Root admin on the following ports:

- SaaS admin: http://localhost:3000
- Root admin: http://localhost:3001

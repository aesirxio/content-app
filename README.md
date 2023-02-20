# AesirX Content

## About

AesirX Content is our Open Source Headless CMS as a service solution

Find out more in [https://content.aesirx.io](https://content.aesirx.io)

### Configure

1. Get your `REACT_APP_CLIENT_SECRET` key from https://content.aesirx.io by creating an account.
1. Rename the `.env.dist` file to `.env`.
2. Replace license keys in the `.env` file with the one provided in your profile account.
   1. `REACT_APP_CLIENT_SECRET` replace this with the provided `REACT_APP_CLIENT_SECRET` from https://content.aesirx.io/
   2. `REACT_APP_LICENSE` replace this with the provided `REACT_APP_LICENSE` from https://content.aesirx.io/
   3. `REACT_APP_SSO_CLIENT_ID` replace this with the provided `REACT_APP_SSO_CLIENT_ID` from https://content.aesirx.io/
   4. `REACT_APP_SSO_CLIENT_SECRET` replace this with the provided `REACT_APP_SSO_CLIENT_SECRET` from https://content.aesirx.io/
   5. `REACT_APP_DAM_LICENSE` replace this with the provided `REACT_APP_DAM_LICENSE` from https://dam.aesirx.io/
3. Update `Domain` & `Test domain` for licenses. See the install guide for more information https://content.aesirx.io/install-guide

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Get a full build and install it in your favorite web server.

## Dockerize

#### Production
`docker compose -f "docker-compose.yml" up -d --build`
# Web

Main public website, used for customer make order

## Stack

Nextjs with material design

[NextJs](https://nextjs.org/)
[Material Design](https://material.io/components/app-bars-top)

## Install

`yarn install` | `npm install`

`npm install:clean`

## Run dev

`yarn dev`

## Check eslint

`yarn lint:check`

## Build

`yarn build`

## Start production

`yarn start`

## Pages

- / --> ./src/index
- /about --> ./src/about.html

---

### Implement new simple page

```
import Layout from 'component/Layout';
    <Layout>
    ...
    </Layout>
```

### implement Mock API

```
./pages/api/mock/....
```

[Document router API](https://nextjs.org/docs/api-routes/introduction)

#### How to use mock API:

- create new API in folder ./src/api/mock/getuser.js
- call to url : /api/mock/getuser

# BuyMed Web Application

Main public website, used for customer make order.

## Stack

- Nextjs with material design

- [NextJs](https://nextjs.org/)
- [Material Design](https://material.io/components/app-bars-top)
- [Material Icon](https://material.io/resources/icons/?style=baseline)

## Install

- `yarn install` | `npm install`

- `npm install:clean`

## Run dev

- `yarn dev`

## Check eslint

- `yarn lint:check`

## Build

- `yarn build`

## Start production

- `yarn start`

## Project Structure

- `/assets` - Image, fonts, raw file ...
- `/config` - Contains config file
- `/public` - File Static Image , css ....
- `/src` - Contains pages , clients , components , constants , styles , utils ...
  - `/pages` - index , landing page
  - `/components` - Component
  - `/client` - Client request to server
  - `/styles` - File css can import
  - `/constants` - Data constants
- `/test` - Contains test file

## Architecture

- Clients --> FE (NextJS - Pages ) --> /api (FE Nextjs) ---(proxy)--> BE ( Golang/ API Gateway )

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

### Implement Mock API

```
 ./pages/api/mock/....
```

- [Document router API](https://nextjs.org/docs/api-routes/introduction)

#### How to use mock API:

- create new API in folder ./src/api/mock/getuser.js
- call to url : /api/mock/getuser

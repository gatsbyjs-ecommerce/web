# GatsbyJs e-commerce site

A static E-commerce site built using GatsbyJs.

Admin panel can be found in [Admin repository](https://github.com/gatsbyjs-ecommerce/admin)

Required API for mutations can be found in [API repository](https://github.com/gatsbyjs-ecommerce/api)

## Stack

- [GatsbyJs](https://www.gatsbyjs.org/)
- [React.js](https://reactjs.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Sanity](https://www.sanity.io/)

## To use

- Fork or download this repository
- Ready!

To change site config `./src/utils/config.js`

also add `.env` file in the root, with content for example:

```
SANITY_TOKEN=YOUR_KEY_HERE
```

## Setup

Run:

```
yarn install
```

## Development

To start the development server

```
yarn start
```

## Deployment

```
yarn run build
yarn serve
```

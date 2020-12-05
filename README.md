# jankal.dev website

This repo hosts the source code for my personal website located at https://jankal.dev  
This project uses <a href="https://nuxtjs.org">Nuxt.js</a> with the <a href="https://content.nuxtjs.org/">@nuxt/content</a> module.

## Build setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn run start

# generate static project
$ yarn run generate
```

## Deployment

To deploy this website, execute the corresponding GitHub Action manually.  
At the moment there are two deployment targets available:
- https://jankal.dev (deploy-live)
- https://test.jankal.dev (deploy-test)

# codevember.xyz

> Website of Codevember

This is a vue.js based project, if you want to know more about codevember and his concept, visit [codevember website](http://codevember.xyz/)

You can also checkout codevember sketches on [codepen](https://codepen.io)


## Build Setup

> you can use also npm, but we prefer yarn

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Config Setup

In order to connect your app to firebase, you must create a `config/database.js` file.
You can find an exemple of configuration at `config/exemple.config.js` file, just ran :

```bash
#move config exemple file to database working file
mv config/exemple.config.js config/database.js
```

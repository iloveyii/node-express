Node Expresss
======
This is a node and express application using Typescript. It is dockerized and can be easily used for any
microservice.


## Installation
   * Using without docker
     `npm install`
     `npm start`
   * Using docker
     `docker-compose up`




## Test
   * Run test
     `npm run test`

## Tips
   * To add a git repo
     `npm install --save iloveyii/ts-sequelize#node-express`
   * To add a directory alias in package.json, add a root key
```js
"_moduleAliases": {
    "@sequelize": "sequelize/src"
  }
```



## Problems and solutions
   * bcrypt_lib.node: undefined symbol: napi_add_finalizer
     * Use bcrypt 3.0.0
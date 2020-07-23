Node Express
============
This is a node and express application using Typescript. It is dockerized and can be easily used for any
microservice.

## Capabilities
   * Controllers
   * Models
   * Routes
   * Middle wares
   * Sequelize
   * Mongo DB
   * Validation
   * Typescript Classes
   * JWT Authentication
   * Simplest MVC
   * TS Lint


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
   * Create model
   `npm run migrate:create-model --name=Post --attributes=title:string,body:string`
   
   * Create migration
    `npm run migrate:create-migration --name=create-posts-table`
   
   * Add command line completion to npm scripts
   `npm completion >> ~/.bashrc`
   `source ~/.bashrc`
   
   * Run all migrations
   `npm run migrate`


## Problems and solutions
   * bcrypt_lib.node: undefined symbol: napi_add_finalizer
     * Use bcrypt 3.0.0
     
   * TypeError: _gracefulFs(...).realpathSync.native is not a function
     * Use node 10
     
     
## Aggregation
db.Quiz.aggregate([

    // Join with user table
    {
        $lookup:{
            from: "User",       // other table name
            localField: "user_id",   // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "User"         // alias for userinfo table
        }
    },
    {   $unwind:"$User" },     // $unwind used for getting data in object or for one record only

    // Join with question table
    {
        $lookup:{
            from: "Question", 
            localField: "question_id", 
            foreignField: "_id",
            as: "Question"
        }
    },
    {   $unwind:"$Question" }, // removes array brackets in projection

    // define some conditions here 
    // {
       // $match:{
         //   $and:[{"userName" : "admin"}]
        //}
    //},

    // define which fields are you want to fetch
    {   
      $project:{
           _id : 1,
           response : 1,
           user_id: "$User._id",
           //User : {
             //  email: 1
           //},
           // Question: "$Question"
           q_text: "$Question.text"
        } 
    }
]);

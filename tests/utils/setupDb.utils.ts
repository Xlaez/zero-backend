// import { mongoose } from "@dolphjs/core"
// import {configs} from "../../src/config"
// import { beforeEach } from "node:test";

// const setUpTestDbs = () => {
//     beforeAll(async()=>{
//         await mongoose.connect(`${configs.mongoose.url}-test`, configs.mongoose.options)
//     });

//     beforeEach(async()=>{
//         await Promise.all(Object.values(mongoose.connection.collections).map(async(collection: mongoose.Collection<mongoose.Document>)=>collection.deleteMany()));
//     })

//     afterAll(async()=>{
//         await mongo
//     })
// }

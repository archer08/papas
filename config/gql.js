const { GraphQLServer } = require("graphql-yoga");
const UserModel = require("../models/usrSchema");
const WorkerSchema = require("../models/WorkerSchema");

const typeDefs = `
 type Query {
   user:Usr
   users:[Usr]!
   worker:Worker
   workers:[Worker]


}
type Worker{
  owner:Usr!
  number:String!
}
type Ptpm{
  ConnectionHost:Usr!
  workerUsed:Worker!
  ConnectionReciever:Usr!
  connectionTime:String
  messages:[Message]!
  
}
type Message{
  name:String
  time:String
  message:String
  reciever:String
  status:String

}
type Usr{
  phoneNumber:String!
  name:String!
  number:String!
  firstname:String!
  lastname:String!
  age:Int
  workers:[Worker]!
  role:String!
  workerlimit:Int 

}

  
`;

const resolvers = {
  Query: {
    user: async (args) => {
      const user = await UserModel.find({
        name: args.name,
        number: args.phoneNumber,
      });
      user.workers = WorkerSchema.find({ ownerId: user.id });
      return user;
    },
    users: async (args) => {
      const user = await UserModel.find();
      user.forEach((val, index, arr) => {
        val.workers = WorkerSchema.find({ ownerId: val.id });
      });
      return user;
    },
    worker: async (args) => {
      const worker = await WorkerSchema.find({
        ownerId: args.Id,
        status: args.status ? args.status : "active",
      });
      return worker;
    },
    workers: async (args) => {
      const worker = await WorkerSchema.find();
      return worker;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
module.exports = () => server.start({ port: process.env.GRAPQLPORT }, () => {});

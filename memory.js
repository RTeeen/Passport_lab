const { MemoryStore } = require("express-session");
 let sessions = new MemoryStore;
module.exports={
sessions
};
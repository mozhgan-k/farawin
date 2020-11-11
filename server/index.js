"use strict";
const app = require("express")();
app.use(require("body-parser").json());
app.use(require("cookie-parser")());
app.use(require("./route"));
app.listen(8090);
console.log("app listen on 8090");
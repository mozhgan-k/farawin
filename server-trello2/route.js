const router = require("express").Router();
const user = require("./handler/user");
const board = require("./handler/board");
const list = require("./handler/list");
const task = require("./handler/task")

const { isAuth } = require("./authMiddleware");
//user
router.post("/login", user.login);
router.post("/register", user.register);
router.post("/refresh-token", user.refreshToken);
router.get("/user", user.users);
router.put("/user", user.edit);
router.delete("/user", user.hazf);

//board
router.post("/board", board.create);
router.put("/board", board.update);
router.get("/board",isAuth, board.boardList);
router.delete("/board", board.remove);

//list
router.post("/list", list.create);
router.put("/list", list.update);
router.get("/list/:id", list.listslist);
router.delete("/list", list.remove);

//task
router.post("/task", task.create);
router.put("/task", task.update);
router.get("/task/:id", task.taskslist);
router.delete("/task", task.remove);
router.get("/tasks/:user", task.TasksUser);

module.exports = router;

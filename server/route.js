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
router.get("/user", isAuth, user.users);
router.get("/person", isAuth, user.getPerson)
router.put("/user", isAuth, user.edit);
router.delete("/user", isAuth, user.hazf);

//board
router.post("/board", isAuth, board.create);
router.put("/board", isAuth, board.update);
router.get("/board",isAuth, board.boardList);
router.delete("/board", isAuth, board.remove);

//list
router.post("/list", isAuth, list.create);
router.put("/list", isAuth, list.update);
router.get("/list/:id", isAuth, list.listslist);
router.delete("/list", isAuth, list.remove);

//task
router.post("/task", isAuth, task.create);
router.put("/task", isAuth, task.update);
router.get("/task/:id", isAuth, task.taskslist);
router.delete("/task", isAuth, task.remove);
router.get("/tasks/:user", isAuth, task.TasksUser);

module.exports = router;

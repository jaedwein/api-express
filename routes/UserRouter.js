const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/test", (req, res) => {
	res.status(200);
	res.json({ name: "Javier", surname: "Weinmeister", age: 44 });
});

router.post("/user", (req, res) => UserController.addUser(req, res));

router.get("/user", isAdmin, (req, res) => UserController.getUsers(req, res));

router.get("/user/:id", (req, res) => UserController.getUserById(req, res));

router.patch("/user/", (req, res) => UserController.updateUser(req, res));

const data = { username: "jaedwein", password: "jaed123" };

function isAdmin(req, res, next) {
	const dataArr = Buffer.from(req.headers.authorization.split(" ")[1], "base64").toString().split(":");
	if (dataArr[0] === data.username && dataArr[1] === data.password) {
		console.log("autenticado");
		next();
	} else {
		return res.sendStatus(401);
	}
}

module.exports = router;

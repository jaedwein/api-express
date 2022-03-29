const users = [];
let contador = 1;

const addUser = (req, res) => {
	const { body } = req;
	if (body && body.hasOwnProperty("name")) {
		body.id = contador;
		users.push(body);
		contador++;
		return res.sendStatus(201);
	} else {
		return res.sendStatus(400);
	}
};

const updateUser = (req, res) => {
	const { body } = req;
	let found = false;
	if (body && body.hasOwnProperty("name")) {
		users.map((user, index) => {
			if (user.id == body.id) {
				users[index] = body;
				found = true;
			}
		});
		if (found) {
			return res.sendStatus(201);
		} else {
			return res.sendStatus(404);
		}
	} else {
		return res.sendStatus(400);
	}
};

const getUsers = (req, res) => {
	const { query } = req;
	res.status(200);
	return res.json(users);
};

const getUserById = (req, res) => {
	const { params } = req;
	const user = users.find((user) => {
		return user.id == params.id;
	});
	if (user) {
		res.status(200);
		return res.json(user);
	}
	return res.sendStatus(404);
};

module.exports = {
	addUser,
	getUserById,
	getUsers,
	updateUser,
};

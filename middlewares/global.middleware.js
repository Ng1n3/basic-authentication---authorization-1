const DB = require("../db/users.json");

const basicAuth = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(401).json({ message: "You are not authenticated!" });
	}

	const base64 = new Buffer.from(authHeader.split(" ")[1], "base64");
	const base64ToString = base64.toString();
	const usernameAndPassword = base64ToString.split(":");
	const auth = usernameAndPassword;

	// console.log({
	//     base64,
	//     base64ToString,
	//     usernameAndPassword,
	// })

	const username = auth[0];
	const password = parseInt(auth[1]);

	// console.log({
	// 	username,
	// 	password,
	// });

	const existingUser = DB.users.find(
		(user) => user.username === username && user.password === password
	);
	console.log(existingUser);
	if (existingUser) {
		req.users = existingUser;
		next();
	} else {
		res.status(401).json({ message: "You are not authenticated!" });
	}
};

const apiKeyAuth = (req, res, next) => {
	const authHeader = req.headers;

	if (!authHeader.api_key) {
		res.status(401).send({ message: "You are not authenticated 1" });
	}

	const existingUser = DB.users.find(
		(user) => user.api_key === authHeader.api_key
	);
	if (existingUser) {
		req.user = existingUser;
		next();
	} else {
		res.status(401).send({ message: "You are not authenticated 2" });
	}
};

const checkAdmin = (req, res, next) => {
	if (req.user.user_type !== "admin") {
		res.status(403).send({ message: "you are not authorized" });
	}

	next();
};

module.exports = {
	apiKeyAuth,
	checkAdmin,
	basicAuth,
};

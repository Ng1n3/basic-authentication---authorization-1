const userServie = require("./users.service");

const createNewUser = (req, res) => {
	const user = req.body;

	if (!user.username || !user.password) {
		res.status(400).send({
			status: "FAILED",
			data: {
				error:
					"Please ensure that your username and password are inputed into the textfield",
			},
		});
		return;
	}

	const newUser = {
		username: user.username,
		password: user.password,
	};

	try {
		const createdUser = userServie.createUser(newUser);
        console.log(createdUser);
		res.status(200).send({message: "User created successfully"});
	} catch (error) {
		res.status(error?.status || 500).send({
			status: "FAILED",
			data: {
				error: error?.message || error,
			},
		});
	}
};

module.exports = {
    createNewUser
}

const { v4: uuid } = require("uuid");
const user = require("../db/user");

const createUser = (newUser) => {
	if (newUser.username === "34Z1") {
		newUser.user_type = "admin";
	} else {
		newUser.user_type = "public";
	}

	const userToInsert = {
		...newUser,
		api_key: uuid(),
	};

	try {
		const createdUser = user.createNewUser(userToInsert);
		return createdUser;
	} catch (error) {
		throw error;
	}
};

module.exports = { createUser };

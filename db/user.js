const DB = require("./users.json");
const { saveUserToDB } = require("./utils");

const createNewUser = (newUser) => {
	const isAlreadyAdded =
		DB.users.findIndex((user) => user.username === newUser.username) > -1;
	if (isAlreadyAdded) {
		throw {
			status: 400,
			message: `User with the username '${newUser.username}' already exists`,
		};
	}
    
	try {
		DB.users.push(newUser);
		saveUserToDB(DB);
	} catch (error) {
		throw { status: 500, message: error?.message || error };
	}
};

module.exports = { createNewUser };

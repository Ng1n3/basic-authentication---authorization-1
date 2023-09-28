const fs = require("fs");
const saveUserToDB = (DB) => {
	fs.writeFileSync("./db/users.json", JSON.stringify(DB, null, 2), {
		encoding: "utf-8",
	});
};

module.exports = { saveUserToDB };

const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logPath = path.join(__dirname, "logs");
const logEvents = async (message) => {
	//initialize  dateFormat
	const dateFormat = `${format(new Date(), "yyyymmdd\thh:mm:ss")}`;
	const logItem = `${dateFormat}\t${uuid()}\t${message}\n`;
	console.log(logItem);
	//check if log folder exists
	try {
		if (!fs.existsSync(logPath)) {
			await fsPromise.mkdir(logPath);
		}
		await fsPromise.appendFile(
			path.join(__dirname, "logs", "logFile.txt"),
			logItem
		);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { logEvents };

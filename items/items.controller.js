const path = require("path");
const fs = require("fs");
const itemDBPath = path.join(__dirname, "..", "db", "items.json");
const itemDB = JSON.parse(fs.readFileSync(itemDBPath, "utf8"));
const { logEvents } = require("./items.middleware");

const GetItems = (req, res) => {
	let { search, limit } = req.query;
	let sortedDB = [...itemDB];
	limit = parseInt(limit);

	if (search && !limit) {
		sortedDB = sortedDB.filter(
			(item) => item.size.includes(search) || item.name.includes(search)
			// item.price.startsWith(search)
		);
		res.status(200).send(sortedDB);
	} else if (!isNaN(limit) && !search) {
		sortedDB = sortedDB.splice(0, limit);
		res.status(200).send(sortedDB);
	} else if (search && !isNaN(limit)) {
		sortedDB = sortedDB.filter(
			(item) => item.size.includes(search) || item.name.includes(search)
		);
		let newSortedDB = [];
		newSortedDB = sortedDB.splice(0, limit);
		res.status(200).send(newSortedDB);
	} else {
		res.status(200).send(sortedDB);
	}

};

const UpdateItem = (req, res) => {
	const { id } = req.params;
	const update = req.body;
	const idIndex = itemDB.findIndex((index) => index.id === Number(id));
	if (idIndex === -1)
		res.status(404).end(`cannot update as id:${id} is not in database yet.`);
	itemDB[idIndex] = { ...itemDB[idIndex], ...update };
	fs.writeFile(itemDBPath, JSON.stringify(itemDB), (err) => {
		if (err) {
			conosle.log(err);
			res.status(500).send(
				JSON.stringify({
					message:
						"internal server error, Could not update item to the database",
				})
			);
		}
		res.status(200).send(itemDB[idIndex]);
	});
};

const GetOneItem = (req, res) => {
	const { id } = req.params;
	const singleItem = itemDB.find((itm) => itm.id === Number(id));
	if (!singleItem) {
		logEvents(req.method + "\t Unsuccessful");
		res.status(404).end("Item with id not found");
		return;
	}
	logEvents(req.method + "\t successful");
	res.status(200).send(singleItem);
};

const DeleteItem = (req, res) => {
	const { id } = req.params;
	const itemToDelete = itemDB.findIndex((itm) => itm.id === Number(id));
	if (itemToDelete === -1)
		res.status(404).send(`Item with id:${id}, not found`);
	itemDB.splice(itemToDelete, 1);
	fs.writeFile(itemDBPath, JSON.stringify(itemDB), (err) => {
		if (err) {
			console.log(err);
			logEvents(req.method + "\t Unsuccessful");
			res.status(500).end(
				JSON.stringify({
					message: "Internal server error, could not save item to the database",
				})
			);
		}
		logEvents(req.method + "\t successful");
		res.status(200).end("Deletion successful");
	});
};

const CreateItem = (req, res) => {
	const newItem = req.body;
	const lastItem = itemDB[itemDB.length - 1];
	const lastItemId = lastItem.id;
	newItem.id = lastItemId + 1;

	fs.readFile(itemDBPath, "utf8", (err, data) => {
		if (err) {
			console.log(err);
			logEvents(req.method + "\t Unsuccessful");
			res.status(404).end("Cannot read from database");
		}

		const olditems = JSON.parse(data);
		const allitems = [...olditems, newItem];

		fs.writeFile(itemDBPath, JSON.stringify(allitems), (err) => {
			if (err) {
				console.log(err);
				logEvents(req.method + "\t Unsuccessful");
				res.status(500).send({
					message:
						"Internal server Error, unable to write new item to database",
				});
			}
			logEvents(req.method + "\t successful");
			res.status(201).json({ message: "new item created", item: newItem });
		});
	});
};

module.exports = { GetItems, GetOneItem, DeleteItem, UpdateItem, CreateItem };

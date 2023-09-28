const express = require("express");
const itemsrouter = require("./items/items.router");
const userRouter = require("./users/users.route");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/v1/items", itemsrouter);

app.use("/api/v1/users", userRouter);

app.get("*", (req, res) => {
	res.status(404).json({
		data: null,
		error: "Route not found",
	});
});

app.listen(PORT, () => console.log(`Server is listening on localhost:${PORT}`));

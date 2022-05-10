// Import all the node packages we need
const express = require("express");
const Mailgun = require("mailgun.js");
const formData = require("form-data");
const cors = require("cors");

// Import our mailgun credentials
const { domain, key } = require("./creds");

// Define a port
const PORT = process.env.PORT || 8000;

// Create an express instance
const app = express();

// Create and configure mailgun instance
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: "api", key });

// Add middlewares
app.use(express.json());
app.use(cors());

// Add a GET endpoint (for testing purposes, can be removed later)
app.get("/", (req, res) => {
	res.status(200).send("<h1>Welcome to the API server!</h1>");
});

// Add a POST request to handle the request data from the form and send
// an email
app.post("/", (req, res) => {
	const { name, email, subject, message } = req.body;

	const messageData = {
		to: "travis.briscoe@gmail.com",
		from: `${name} <${email}>`,
		"h:Reply-To": email,
		subject: "New email from mywebsite.com",
		html: `Name: <strong>${name}</strong><br />Email: <strong>${email}</strong><br /><br />Subject: <strong>${subject}</strong><br />Message:<br />${message}`,
	};

	mg.messages
		.create(domain, messageData)
		.then((response) => {
			const { status, message } = response;
			res.status(status).send({ status, message });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(err.status)
				.send({ status: err.status, message: err.message, details: err.details });
		});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

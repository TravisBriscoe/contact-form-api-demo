// declare variables for the form and inputs
const contactForm = document.querySelector("#contact-form");
const contactName = document.querySelector("#contact-name");
const contactEmail = document.querySelector("#contact-email");
const contactSubject = document.querySelector("#contact-subject");
const contactMessage = document.querySelector("#contact-message");

// declare the message logs
const messageLogs = document.querySelector("#message-logs");

// Define an event handler for the submit event on the form
contactForm.addEventListener("submit", (event) => {
	event.preventDefault();

	// Clears any errors before sending
	messageLogs.innerHTML = `<br />`;

	// Object containing all data inputed into the inputs
	const data = {
		name: contactName.value,
		email: contactEmail.value,
		subject: contactSubject.value,
		message: contactMessage.value,
	};

	// Fetch to the api with a post method sending the input values
	fetch("http://127.0.0.1:8000", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then(() => {
			// Clears the inputs after a successful send
			contactName.value = contactEmail.value = contactSubject.value = contactMessage.value = "";

			// Displays a success message
			messageLogs.innerHTML = `<p class="success">Message sent successfully!</p>`;

			// Clears the success message after some time
			setTimeout(() => {
				messageLogs.innerHTML = `<br />`;
			}, 2500);
		})
		.catch((err) => {
			// Displays an error message
			messageLogs.innerHTML = `<p class="failure">Something went wrong. Try again.</p>`;
		});
});

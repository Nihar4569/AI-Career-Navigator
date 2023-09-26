const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");

// Render the registration form
Router.get("/", (req, res) => {
	res.render("register", { title: "Fill Form", password: "", email: "" });
});

// Handle user registration
Router.post("/register", async (req, res) => {
	try {
		const { name, number, email, password, cpassword } = req.body;

		if (password === cpassword) {
			const userData = new homeSchema({
				name,
				number,
				email,
				password,
			});

			userData.save((err) => {
				if (err) {
					console.log("err");
				} else {
					res.render("register", { title: "Done", password: "", email: "" });
				}
			});

			const useremail = await homeSchema.findOne({ email: email });
			if (email === useremail.email) {
				res.render("register", {
					title: "",
					password: "",
					email: "Email is Already there plz chose different one",
				});
			} else {
				console.log("err");
			}
		} else {
			res.render("register", {
				title: "",
				password: "Password not Matching",
				email: "",
			});
		}
	} catch (error) {
		res.render("register", { title: "Error in Code", password: "", email: "" });
	}
});

// Handle user login
Router.post("/login", (req, res) => {
	const { email, password } = req.body;

	homeSchema.findOne({ email: email }, (err, result) => {
		if (result && email === result.email && password === result.password) {
			// Store the user in the session
			req.session.user = result;
			res.render("dashboard", { name: result.name });
		} else {
			console.log(err);
		}
	});
});

// Logout and destroy the session
Router.get("/logout", (req, res) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
});

// Render the iq.ejs page
// Render the iq.ejs page
Router.get("/iq", (req, res) => {
	res.render("iq"); // Renders 'views/iq.ejs'
});

module.exports = Router;

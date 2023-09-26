// Key = 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
const API_KEY = "Enter_Your_OpenAI_API_Key";
const submitButton = document.getElementById("submit");
const outputEl = document.getElementById("output");
const inputEl = document.querySelector("input");
const historyEl = document.querySelector(".history");
const buttonEl = document.querySelector("button");

async function getMessage() {
	console.log("clicked");
	const options = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: inputEl.value + " With in 30-70 words",
				},
			],
		}),
	};

	try {
		const response = await fetch(
			"https://api.openai.com/v1/chat/completions",
			options
		);
		const data = await response.json();
		console.log(data);
		outputEl.textContent = data.choices[0].message.content;

		console.log(data.choices[0].message.content);
		if (data.choices[0].message.content && inputEl.value) {
			const pEl = document.createElement("p");
			pEl.textContent = inputEl.value;
			historyEl.appendChild(pEl);
			inputEl.value = "";
		}
	} catch (e) {
		console.log(e);
	}
}
function clearInput() {
	outputEl.textContent = "";
	inputEl.value = "";
}
submitButton.addEventListener("click", getMessage);
buttonEl.addEventListener("click", clearInput);

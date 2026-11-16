// Based on the W3Schools JavaScript Cookies example
// https://www.w3schools.com/js/js_cookies.asp

function setCookie(name, value, days) {
	const d = new Date();
	d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + encodeURIComponent(value) +
		";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
}

function getCookie(name) {
	const prefix = name + "=";
	const parts = document.cookie.split(";");
	for (let part of parts) {
		part = part.trim();
		if (part.indexOf(prefix) === 0) {
			return decodeURIComponent(part.substring(prefix.length));
		}
	}
	return "";
}

function deleteCookie(name) {
	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

function checkCookie() {
	const message = document.getElementById("message");
	const details = document.getElementById("details");
	let username = getCookie("username");

	if (username !== "") {
		// cookie exists: display it without asking again
		message.textContent = "Welcome again, " + username + "!";
		details.textContent = "The cookie value is: username=" + username;
	} else {
		// no cookie yet: ask for a value in a pop-up box and save it
		username = prompt("Please enter your name:", "");
		if (username !== null && username.trim() !== "") {
			setCookie("username", username.trim(), 30);
			message.textContent = "Thanks, " + username.trim() + "! Your cookie was saved.";
			details.textContent = "Reload this page to see your cookie value displayed.";
		} else {
			message.textContent = "No cookie was saved.";
			details.textContent = "Reload this page and enter a name to create one.";
		}
	}
}

document.getElementById("clear").addEventListener("click", function () {
	deleteCookie("username");
	location.reload();
});

checkCookie();

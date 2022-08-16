const html = {
	textArea: {
		left: document.querySelector(".box-one textarea"),
		right: document.querySelector(".box-two textarea")
	},
	languageIndicator: {
		left: document.querySelector(".box-one_language-name"),
		right: document.querySelector(".box-two_language-name")
	},
	swapButton: document.querySelector(".swap"),
	toolIcon: {
		left: document.querySelector(".tool-left"),
		right: document.querySelector(".tool-right")
	},
	counter: document.querySelector(".counter")
};

let translateFrom = html.languageIndicator.left.dataset.language;
let translateTo = html.languageIndicator.right.dataset.language;

html.textArea.left.addEventListener("change", translate);
html.textArea.left.addEventListener("input", counter);

html.swapButton.addEventListener("click", swap);
html.swapButton.addEventListener("contextmenu", e => e.preventDefault());

html.toolIcon.left.addEventListener("click", pasteOrRemove);
html.toolIcon.right.addEventListener("click", copy);

function translate() {
	let textToTranslate = html.textArea.left.value;

	let apiUrl = `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=${translateFrom}|${translateTo}`;

	fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
			if (html.textArea.left.value == "") {
				html.textArea.right.value = "";
			} else {
				html.textArea.right.value = data.responseData.translatedText;
			};
		})
		.catch(err => {
			html.textArea.right.value = "Connection error / Failed to fetch";
	});
};

// More Functions.

let swapped = false;

function swap() {
	let leftValue = html.textArea.left.value;
	let rightValue = html.textArea.right.value;

	if (swapped === false) {
		if (html.textArea.right.value == "") {

		} else {
			html.textArea.left.value = rightValue;
			html.textArea.right.value = leftValue;
		};

		swapped = true;
		translateFrom = html.languageIndicator.left.dataset.language = "id";
		translateTo = html.languageIndicator.right.dataset.language = "en";

		html.languageIndicator.left.innerText = "Indonesia";
		html.languageIndicator.right.innerText = "English";
	} else {
		if (html.textArea.right.value == "") {

		} else {
			html.textArea.left.value = rightValue;
			html.textArea.right.value = leftValue;
		};

		swapped = false;
		translateFrom = html.languageIndicator.left.dataset.language = "en";
		translateTo = html.languageIndicator.right.dataset.language = "id";

		html.languageIndicator.left.innerText = "English";
		html.languageIndicator.right.innerText = "Indonesia";
	};

	translate();
	counter();
};

function pasteOrRemove() {
	if (html.toolIcon.left.attributes[1].value == "assets/Images/clipboard.svg") {
		// Paste.
		navigator.clipboard.readText()
			.then(clipText => html.textArea.left.value = clipText)
			.then(translate)
			.then(counter);
	} else {
		// Remove.
		html.textArea.left.value = "";
		translate();
		counter()
	};
};

function copy() {
	html.textArea.right.select();
  	html.textArea.right.setSelectionRange(0, 99999);

 	navigator.clipboard.writeText(html.textArea.right.value);
};

function counter() {
	const target = html.textArea.left;

    const maxLength = target.getAttribute("maxlength");
    const currentLength = target.value.length;

    html.counter.innerText = `${currentLength} / ${maxLength}`;

    if (currentLength > 480) {
    	html.counter.style.color = "rgb(210, 66, 66";
    } else {
    	html.counter.style.color = "rgba(0, 0, 0, 0.85)";
    };

    // Change Tool Icon.
	if (html.textArea.left.value.length > 0) {
		html.toolIcon.left.src = "assets/Images/x.svg";
		html.toolIcon.left.title = "Delete All"
	} else {
		html.toolIcon.left.src = "assets/Images/clipboard.svg";
		html.toolIcon.left.title = "Paste"
	};
};
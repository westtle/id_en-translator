// HTML.
const textAreaLeft = document.querySelector("._left textarea");
const textAreaRight = document.querySelector("._right textarea");

const languageTitle = document.querySelectorAll(".language_");

const actionButton = document.querySelectorAll(".action-button__ div");
const swapButton = document.querySelector("._swap div");

const lengthCounter = document.querySelector(".length-counter_");

let swapped = false;
let translateFrom = languageTitle[0].dataset.language;
let translateTo = languageTitle[1].dataset.language;

function translate() {
	const textToTranslate = textAreaLeft.value;

	if (textAreaLeft.value == "") {
		textAreaRight.value = "";
		return;
	};

	const url = `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=${translateFrom}|${translateTo}`;

	fetch(url)
		.then(res => res.json())
		.then(data => {
			textAreaRight.value = data.responseData.translatedText;
		})
		.catch(err => textAreaRight.value = err);
};

function swap() {

	// Reference.
	let leftValue = textAreaLeft.value;
	let rightValue = textAreaRight.value;

	// Swap Stuff.
	if (!swapped) {
		textAreaLeft.value = rightValue;

		translateFrom = languageTitle[0].dataset.language = "id";
		translateTo = languageTitle[1].dataset.language = "en";

		languageTitle[0].innerText = "Indonesian";
		languageTitle[1].innerText = "English";

		swapped = true;
	} else {
		textAreaLeft.value = rightValue;

		translateFrom = languageTitle[0].dataset.language = "en";
		translateTo = languageTitle[1].dataset.language = "id";

		languageTitle[0].innerText = "English";
		languageTitle[1].innerText = "Indonesian";

		swapped = false;
	};

	translate();
	counter();
};

function changeIcon() {
	if (textAreaLeft.value.length > 0) {
		actionButton[0].querySelector("img").src = "assets/Images/x.svg";

		// Show Translate Button.
		actionButton[1].style.display = "block";
	} else {
		actionButton[0].querySelector("img").src = "assets/Images/clipboard.svg"

		// Hide Translate Button.
		actionButton[1].style.display = "none";
	};

	counter();
};

function pasteDelete() {
	let currentIcon = actionButton[0].querySelector("img").attributes.src.value;

	if (currentIcon == "assets/Images/clipboard.svg") {

		// Paste.
		navigator.clipboard.readText()
			.then(clipText => textAreaLeft.value = clipText)
			.then(changeIcon)
			.then(translate)
	} else {
		
		// Delete All.
		textAreaLeft.value = "";
		changeIcon();
		translate();
	};

	counter();
};

function copy() {
	textAreaRight.select();
    textAreaRight.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textAreaRight.value);
};

function counter() {
	lengthCounter.innerText = `${textAreaLeft.value.length} / ${textAreaLeft.getAttribute("maxlength")}`;

	// Change Color Based on Length.
	if (textAreaLeft.value.length > 480) {
		lengthCounter.style.color = "#FD5E5E";
	} else {
		lengthCounter.style.color = "var(--color-main)";
	};
};

textAreaLeft.addEventListener("input", changeIcon);
actionButton[1].addEventListener("click", translate);
actionButton[0].addEventListener("click", pasteDelete);
actionButton[2].addEventListener("click", copy);
swapButton.addEventListener("click", swap);
function loadData() {
	document.getElementById("questions").value = JSON.parse(localStorage.getItem("question"));
	$("#questions").selectmenu("refresh");
	document.getElementById("noteBox").value = JSON.parse(localStorage.getItem("notes"));
	document.getElementById("mainTextArea").value = JSON.parse(localStorage.getItem("essayText"));
}

function updateInfo() {
	var charCount = document.getElementById("mainTextArea").value.length;
	
	var spaceMatches = document.getElementById("mainTextArea").value.match(/\s+[^\s]+/g);
	var wordCount;
	if (spaceMatches) {
		wordCount = spaceMatches.length + 1;
	}
	else {
		wordCount = (charCount > 0) ? 1 : 0;
	}
	document.getElementById("infoBox").innerText = "Word Count: " + wordCount + " | Character Count: " + charCount;
}

function saveData() {
	//Also update info here -- Probably should separate, but here it works.
	updateInfo();
	
	localStorage.setItem("question", JSON.stringify(document.getElementById("questions").value));
	localStorage.setItem("notes", JSON.stringify(document.getElementById("noteBox").value));
	localStorage.setItem("essayText", JSON.stringify(document.getElementById("mainTextArea").value));
	
	document.getElementById("essayButton").value = "NEW";
}

$(document).ready(function() {
	$("#questions").selectmenu({width: "95vw"});
	
	loadData();
	updateInfo();
	
	$("#questions").on("selectmenuchange", saveData);
	document.getElementById("noteBox").addEventListener("keyup", saveData);
	document.getElementById("mainTextArea").addEventListener("keyup", saveData);
});

$(document).delegate("#mainTextArea", "keydown", function(e) {
	var keyCode = e.keyCode || e.which;
	
	if (keyCode == 9) { //TAB key
		e.preventDefault();
		var currentPos = this.selectionStart;
		this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
		this.selectionStart = this.selectionEnd = currentPos + 1;
	}
});

function newEssay() {
	if (document.getElementById("essayButton").value == "D:") {
		loadData();
		updateInfo();
		document.getElementById("essayButton").value = "NEW";
		return;
	}
	if (window.confirm("Are you sure you want to delete this essay and start another one?")) {
		document.getElementById("questions").selectedIndex = Math.floor(Math.random() * document.getElementById("questions").length);
		$("#questions").selectmenu("refresh");
		document.getElementById("noteBox").value = "";
		document.getElementById("mainTextArea").value = "";
		document.getElementById("essayButton").value = "D:";
		updateInfo();
	}
}
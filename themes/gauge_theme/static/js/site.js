"use strict";
document.addEventListener("DOMContentLoaded", function() {
	setGithubStar();
	copyCode(document.querySelectorAll(".highlight .go"));

	// mobile nav button

	document.querySelector(".navbtn").addEventListener("click", function() {
		document.querySelector(".bar").classList.toggle("animate");
		document
			.querySelector(".left-sidebar-container nav")
			.classList.toggle("open");
	});

	//sticky header
	window.scroll(function(event) {
		if (event.target.scrollTop() > 20) {
			document.querySelector(".top").classList.add("sticky");
		} else {
			document.querySelector(".top").classList.remove("sticky");
		}
	});

	// Github star count
	function gitHubStars() {
		fetch("https://api.github.com/repos/getgauge/gauge")
			.then(res => res.json())
			.then(data => {
				if (data["stargazers_count"] != undefined) {
					window.localStorage.setItem("star", data["stargazers_count"]);
				}
			});
	}

	function setGithubStar() {
		gitHubStars();
		const star = window.localStorage.getItem("star");
		document.querySelector(".github_star").innerText = star;
	}

	const leftSidebar = document.querySelector("#left-sidebar");
	const leftSideBarOffsetTop = +window
		.getComputedStyle(leftSidebar)
		.top.replace("px", "");

	window.addEventListener("scroll", function() {
		const leftSideBarHeight = window.innerHeight + 100;
		const footerOffsetTop = document.querySelector("footer").offsetTop;

		let isFooterTouchingSidebar =
			leftSideBarHeight >= footerOffsetTop - window.scrollY;

		const leftSideBar = document.querySelector(
				"#left-sidebar"
			);

		const rightSidebar = document.querySelector(
				"#right-sidebar"
			);

		if (window.scrollY && isFooterTouchingSidebar) {
			let sidebarOffsetTop =
				leftSideBarOffsetTop -
				(leftSideBarHeight - (footerOffsetTop - window.scrollY));
			leftSideBar.style.top = `${sidebarOffsetTop}px`;
			rightSidebar && (rightSidebar.style.top = `${sidebarOffsetTop}px`);
		} else {
			leftSideBar.style.top = `${leftSideBarOffsetTop}px`;
			rightSidebar && (rightSidebar.style.top = `${leftSideBarOffsetTop}px`);
		}
	});
});

function copyCode(elements) {
	elements.forEach(function(element) {
		element.innerHTML += "<button class='copyBtn'>Copy</button>";
		element.innerHTML += "<input class='codeBox' value='none'> </input>";
		element.innerHTML += '<span class="copied-text">copied</span>';
	});

	document.querySelectorAll(".copyBtn").forEach(btn =>
		btn.addEventListener("click", function() {
			const value = this.parentElement.innerText.split("Copy")[0].trim();
			const copied_text = this.nextElementSibling.nextElementSibling;
			const codeBox = this.nextElementSibling;
			codeBox.value = value;
			codeBox.select();
			document.execCommand("copy");
			copied_text.classList.remove("fadeOut");
			copied_text.classList.add("fadeIn");
			setTimeout(function() {
				copied_text.classList.remove("fadeIn");
				copied_text.classList.add("fadeOut");
			}, 3000);
		})
	);
}
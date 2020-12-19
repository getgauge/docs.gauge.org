"use strict";
document.addEventListener("DOMContentLoaded", function() {
	setGithubStar();

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

document.addEventListener("DOMContentLoaded", () => {
	var host = window.location.hostname;
	var tag = host == "docs.gauge.org" ? "prod" : "preview";
	// wire up algolia search
	docsearch({
		apiKey: "5008b0d9ea4d9e639a17a123bea077fe",
		indexName: "gauge",
		inputSelector: "#search",
		algoliaOptions: { facetFilters: ["tags:" + tag] },
		debug: false // Set debug to true if you want to inspect the dropdown
	});

	document
		.querySelectorAll(".localtoc-container ul ul ul ul")
		.forEach(elem => elem.parentNode.removeChild(elem));
	document
		.querySelectorAll(".localtoc-container ul .heading")
		.forEach(elem => elem.parentNode.remove());

	// remove nested container classes, prevent overlap with sidebar
	document
		.querySelectorAll(".container .container")
		.forEach(elem => elem.classList.remove("container"));

	const returnToTopBtn = document.querySelector("#return-to-top");
	// ===== Scroll to Top ====
	window.addEventListener("scroll", function() {
		if (returnToTopBtn) {
			if (window.pageYOffset >= 50) {
				// If page is scrolled more than 50px
				returnToTopBtn.classList.remove("fadeOut"); // Fade in the arrow
				returnToTopBtn.classList.add("fadeIn"); // Fade in the arrow
			} else {
				returnToTopBtn.classList.remove("fadeIn"); // Else fade out the arrow
				returnToTopBtn.classList.add("fadeOut"); // Else fade out the arrow
			}
		}
	});
	returnToTopBtn &&
		returnToTopBtn.addEventListener("click", function() {
			// When arrow is clicked
			document.querySelector("body,html").scrollTop = 0; // Scroll to top of body
		});

	expandAlternateMethods();

	document.querySelectorAll(".headerlink").forEach(elem =>
		elem.addEventListener("click", function() {
			var sectionId = this.getAttribute("href");
			const header = document.querySelector(sectionId);
			const top = header.offsetTop;

			if (window.getComputedStyle(header).display == "none") {
				header.style.display = "inline-block";
			}
			document.querySelector("body,html").scrollTop = top;
		})
	);

	document.querySelectorAll(".docs-toc li.doc-toc-group").forEach(elem =>
		elem.addEventListener("click", function(event, selector) {
			if (!event.currentTarget.className.match("active-toc")) {
				event.currentTarget.classList.add("active-toc");
			}
			event.stopPropagation();
		})
	);

	document
		.querySelectorAll(".docs-toc > ul > li, ul.sub-toc > li")
		.forEach(toc => {
			let elemSelector = toc;
			let tocLink = toc.children[0];
			let location = window.location.pathname;
			if (location == "/") location = "/index.html";
			if (tocLink && tocLink.pathname.match(location)) {
				elemSelector.classList.add("active-toc");
			}
		});
});

function expandAlternateMethods() {
	var sectionId = window.location.hash;
	if (sectionId) {
		const header = document.querySelector(sectionId);
		const top = header.offsetTop;

		if (header.classList.contains("collapsible")) {
			document
				.querySelectorAll(".collapsible")
				.forEach(elem => elem.classList.add("inline-display"));
		}
		document.querySelector("body,html").scrollTop = top;
	}
}

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
		.forEach(elem => elem.parentNode.removeChild(elem));

	// remove nested container classes, prevent overlap with sidebar
	document
		.querySelectorAll(".container .container")
		.forEach(elem => elem.classList.remove("container"));

	// ===== Scroll to Top ====
	window.addEventListener("scroll", function() {
		if (window.pageYOffset >= 50) {
			// If page is scrolled more than 50px
			document.querySelector("#return-to-top").classList.remove("fadeOut"); // Fade in the arrow
			document.querySelector("#return-to-top").classList.add("fadeIn"); // Fade in the arrow
		} else {
			document.querySelector("#return-to-top").classList.remove("fadeIn"); // Else fade out the arrow
			document.querySelector("#return-to-top").classList.add("fadeOut"); // Else fade out the arrow
		}
	});

	document
		.querySelector("#return-to-top")
		.addEventListener("click", function() {
			// When arrow is clicked
			document.querySelector("body,html").scrollTop = 0; // Scroll to top of body
		});

	document.querySelectorAll(".headerlink").forEach(elem =>
		elem.addEventListener("click", function() {
			var sectionId = this.getAttribute("href");
			const top = document.querySelector(sectionId).offset().top;
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

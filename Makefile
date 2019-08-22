BUILDDIR = _build/html
LATESTVERSION = $(shell git for-each-ref --sort='-*authordate' --format='%(refname:strip=3)' refs/remotes/ | grep -E "(^[0-9]+\.[0-9]+\.[0-9]+)" | head -n1)


preview-build:
	rm -rf $(BUILDDIR)
	GAUGE_LATEST_VERSION=$(LATESTVERSION) \
	sphinx-build -b html . $(BUILDDIR)
	# copy preview-robots.txt
	cp preview-robots.txt $(BUILDDIR)/robots.txt
	# copy verification file
	cp googlefaad68ffc626de37.html $(BUILDDIR)

prod-build:
	rm -rf $(BUILDDIR)
	GAUGE_LATEST_VERSION=$(LATESTVERSION) \
	sphinx-build -b html . $(BUILDDIR) -D site_url=https://docs.gauge.org/
	# copy robots.txt
	cp robots.txt $(BUILDDIR)/robots.txt
	# copy verification file
	cp googlefaad68ffc626de37.html $(BUILDDIR)

serve: preview-build
	(cd $(BUILDDIR) && python3 -m http.server)

auto-build:
	GAUGE_LATEST_VERSION=$(LATESTVERSION) \
	sphinx-autobuild . $(BUILDDIR)

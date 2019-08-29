BUILDDIR = _build
LATESTVERSION = $(shell cat data/gauge_version.txt)


preview-build:
	rm -rf $(BUILDDIR)
	GAUGE_LATEST_VERSION=$(LATESTVERSION) \
	sphinx-build -b html . $(BUILDDIR)
	# copy preview-robots.txt
	cp preview-robots.txt $(BUILDDIR)/robots.txt
	# copy verification file
	cp googlefaad68ffc626de37.html $(BUILDDIR)
	# minify and concat css and js
	for i in $(BUILDDIR)/_static/css/*.css; do python3 -m csscompressor $$i >> $(BUILDDIR)/_static/css/app.min.css; done;
	for i in $(BUILDDIR)/_static/js/*.js; do python3 -m jsmin $$i >> $(BUILDDIR)/_static/js/app.min.js; done;
	find $(BUILDDIR)/_static/css -type f ! -name '*.min.css' | xargs rm
	find $(BUILDDIR)/_static/js -type f ! -name '*.min.js' | xargs rm

prod-build:
	rm -rf $(BUILDDIR)
	GAUGE_LATEST_VERSION=$(LATESTVERSION) \
	sphinx-build -b html . $(BUILDDIR) -D site_url=https://docs.gauge.org/
	# copy robots.txt
	cp robots.txt $(BUILDDIR)/robots.txt
	# copy verification file
	cp googlefaad68ffc626de37.html $(BUILDDIR)
	# minify and concat css and js
	for i in $(BUILDDIR)/_static/css/*.css; do python3 -m csscompressor $$i >> $(BUILDDIR)/_static/css/app.min.css; done;
	for i in $(BUILDDIR)/_static/js/*.js; do python3 -m jsmin $$i >> $(BUILDDIR)/_static/js/app.min.js; done;
	find $(BUILDDIR)/_static/css -type f ! -name '*.min.css' | xargs rm
	find $(BUILDDIR)/_static/js -type f ! -name '*.min.js' | xargs rm

serve: preview-build
	(cd $(BUILDDIR) && python3 -m http.server)

auto-build:
	GAUGE_LATEST_VERSION=$(LATESTVERSION) \
	sphinx-autobuild . $(BUILDDIR)

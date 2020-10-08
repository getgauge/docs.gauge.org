BUILDDIR = _build
CSS_FILES = $(BUILDDIR)/_static/pygments.css $(BUILDDIR)/_static/css/change_filter.css $(BUILDDIR)/_static/css/examples.css $(BUILDDIR)/_static/css/font.css $(BUILDDIR)/_static/css/getting_started.css $(BUILDDIR)/_static/css/overview.css $(BUILDDIR)/_static/css/theme.css $(BUILDDIR)/_static/css/writing_specifications.css
JS_FILES = $(BUILDDIR)/_static/js/filter.js $(BUILDDIR)/_static/js/installation.js $(BUILDDIR)/_static/js/site.js $(BUILDDIR)/_static/js/theme.js

local-build:
	rm -rf $(BUILDDIR)
	GAUGE_LATEST_VERSION=v0.0.0 \
	sphinx-build -b html . $(BUILDDIR) -D site_url=file://$(shell pwd)/$(BUILDDIR)/
	# copy preview-robots.txt
	cp preview-robots.txt $(BUILDDIR)/robots.txt
	# copy verification file
	cp googlefaad68ffc626de37.html $(BUILDDIR)
	# minify and concat css and js
	for i in $(CSS_FILES); do python3 -m csscompressor $$i >> $(BUILDDIR)/_static/css/app.min.css; done;
	for i in $(JS_FILES); do python3 -m jsmin $$i >> $(BUILDDIR)/_static/js/app.min.js; done;
	find $(BUILDDIR)/_static/ -type f ! -name '*.min.css' -name '*.css' | xargs rm
	find $(BUILDDIR)/_static/ -type f ! -name '*.min.js' -name '*.js' | xargs rm


prod-build:
	rm -rf $(BUILDDIR)
	GAUGE_LATEST_VERSION=$(shell ./data/gauge_version.py) \
	sphinx-build -b html . $(BUILDDIR) -D site_url=https://docs.gauge.org/
	# copy robots.txt
	cp robots.txt $(BUILDDIR)/robots.txt
	# copy verification file
	cp googlefaad68ffc626de37.html $(BUILDDIR)
	cp _headers $(BUILDDIR)
	# minify and concat css and js
	for i in $(CSS_FILES); do python3 -m csscompressor $$i >> $(BUILDDIR)/_static/css/app.min.css; done;
	for i in $(JS_FILES); do python3 -m jsmin $$i >> $(BUILDDIR)/_static/js/app.min.js; done;
	find $(BUILDDIR)/_static/ -type f ! -name '*.min.css' -name '*.css' | xargs rm
	find $(BUILDDIR)/_static/ -type f ! -name '*.min.js' -name '*.js' | xargs rm

serve: local-build
	(cd $(BUILDDIR) && python3 -m http.server)

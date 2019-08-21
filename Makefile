BUILDDIR = _build/html

preview-build:
	rm -rf $(BUILDDIR)
	sphinx-build -b html . $(BUILDDIR)
	# copy preview-robots.txt
	cp preview-robots.txt $(BUILDDIR)/robots.txt
	# copy verification file
	cp googlefaad68ffc626de37.html $(BUILDDIR)

prod-build:
	rm -rf $(BUILDDIR)
	sphinx-build -b html . $(BUILDDIR) -D site_url=https://docs.gauge.org/
	# copy robots.txt
	cp robots.txt $(BUILDDIR)/robots.txt
	# copy verification file
	cp googlefaad68ffc626de37.html $(BUILDDIR)

serve: preview-build
	(cd $(BUILDDIR) && python3 -m http.server)

auto-build:
	sphinx-autobuild . $(BUILDDIR)

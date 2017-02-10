# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SPHINXPROJ    = Gauge
SOURCEDIR     = .
BUILDDIR      = _build

EXCLUDES      = _images _static .doctrees

versions:
	sphinx-versioning build . _build/html
	sphinx-versioning build . _build/singlehtml -- -b singlehtml -A SINGLEHTML=true

zip:
	$(foreach folder,$(filter-out $(EXCLUDES), $(notdir $(shell find _build/singlehtml -maxdepth 1 -mindepth 1 -type d))), \
		echo "Using $(folder) "; \
		mkdir -p "_build/html/$(folder)/downloads"; \
		(cd "_build/singlehtml/$(folder)" && zip -r -D "../../../_build/html/$(folder)/downloads/gauge-v-$(folder).zip" *) ; \
	)

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

# You can set these variables from the command line.
SPHINXOPTS    	=
SPHINXBUILD   	= sphinx-build
SOURCEDIR     	= .
BUILDDIR      	= _build
EXCLUDES      	= _images _static .doctrees
LOCALBRANCHES 	= $(shell git for-each-ref --format='%(refname:strip=2)' refs/heads/)
LATESTBRANCH 	= $(shell git for-each-ref --sort='-*authordate' --format='%(refname:strip=3)' refs/remotes/ | grep -E "(^[0-9]+\.[0-9]+\.[0-9]+)" | head -n1)
WORKDIR 		= $(BUILDDIR)/src
MASTERSHA 		= $(shell git rev-parse --short HEAD)

versions: prune
	# copy master
	mkdir -p $(WORKDIR); \
	cp -r `ls | grep -v '$(BUILDDIR)'` $(WORKDIR);

	# for master branch, generate html, singlehtml
	(cd $(WORKDIR);\
	GAUGE_LATEST_VERSION=$(LATESTBRANCH) $(SPHINXBUILD) $(SPHINXOPTS) -b html . ../html \
		-A commit=$(MASTERSHA) -A github_version=master;\
	GAUGE_LATEST_VERSION=$(LATESTBRANCH) $(SPHINXBUILD) $(SPHINXOPTS) -b singlehtml . ../singlehtml -A SINGLEHTML=true;);\

	rm -rf $(WORKDIR); \
	git checkout master

	# copy robots.txt
	cp robots.txt $(BUILDDIR)/html

	# copy verification file
	cp googlefaad68ffc626de37.html $(BUILDDIR)/html

prune: clean
	git checkout master;\
	git worktree prune;\
	$(foreach branch, $(filter-out master, $(LOCALBRANCHES)),\
		git branch -D $(branch); \
	)

zip: versions
	$(foreach folder,$(filter-out $(EXCLUDES), $(notdir $(shell find $(BUILDDIR)/singlehtml -maxdepth 1 -mindepth 1 -type d))), \
		echo "Using $(folder) "; \
		mkdir -p $(BUILDDIR)/html/$(folder)/downloads; \
		(cd "$(BUILDDIR)/singlehtml/$(folder)" && zip -r -D \
		  ../../../$(BUILDDIR)/html/$(folder)/downloads/gauge-v-$(folder:latest=$(LATESTBRANCH)).zip *) ; \
	)

serve: zip
	(cd $(BUILDDIR)/html/ && python3 -m http.server)

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

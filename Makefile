# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SPHINXPROJ    = Gauge
SOURCEDIR     = .
BUILDDIR      = _build

EXCLUDES      = _images _static .doctrees

REMOTEBRANCHES = $(shell git for-each-ref --format='%(refname:strip=3)' refs/remotes/) 
LOCALBRANCHES = $(shell git for-each-ref --format='%(refname:strip=2)' refs/heads/)
LATESTBRANCH = $(shell git for-each-ref --sort='-*authordate' --format='%(refname:strip=3)' --count=3 refs/remotes/ | grep -v "master\|HEAD")
WORKDIR = $(BUILDDIR)/src
MASTERSHA = $(shell git rev-parse --short HEAD)
LATESTSHA = $(shell git rev-parse --short origin/$(LATESTBRANCH))

versions: prune
	# copy master
	mkdir -p $(WORKDIR)/master; \
	cp -r `ls | grep -v '$(BUILDDIR)'` $(WORKDIR)/master/;
	
	echo "Fetching $(LATESTBRANCH) from remote"; \
	mkdir -p $(WORKDIR)/$(LATESTBRANCH); \
	git worktree add -b $(LATESTBRANCH) $(WORKDIR)/$(LATESTBRANCH) origin/$(LATESTBRANCH); \
	
	# for each branches, generate html, singlehtml
	(cd $(WORKDIR)/master;\
	$(SPHINXBUILD) $(SPHINXOPTS) -b html . ../../html/master -D html_theme_options.docs_version=master \
	    -D version=$(LATESTBRANCH) -D release=$(LATESTBRANCH) \
		-A current_version=master -A latest_version=$(LATESTBRANCH) -A versions="master latest"\
		-A commit=$(MASTERSHA) -A github_version=master;\
	$(SPHINXBUILD) $(SPHINXOPTS) -b singlehtml . ../../singlehtml/master -A SINGLEHTML=true;);\

	(cd $(WORKDIR)/$(LATESTBRANCH);\
	$(SPHINXBUILD) $(SPHINXOPTS) -b html . ../../html/latest \
	    -D version=$(LATESTBRANCH) -D release=$(LATESTBRANCH) \
		-A current_version=latest -A latest_version=$(LATESTBRANCH) -A versions="master latest"\
		-A commit=$(LATESTSHA) -A github_version=$(LATESTBRANCH);\
	$(SPHINXBUILD) $(SPHINXOPTS) -b singlehtml . ../../singlehtml/latest -A SINGLEHTML=true;); \

	rm -rf $(WORKDIR); \
	git checkout master

	# copy robots.txt
	cp robots.txt $(BUILDDIR)/html

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

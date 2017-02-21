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
VERSIONS = $(filter-out $(LATESTBRANCH) HEAD, $(REMOTEBRANCHES))
WORKDIR = $(BUILDDIR)/src

versions: prune
	# copy master
	mkdir -p $(WORKDIR)/master; \
	cp -r `ls | grep -v '$(BUILDDIR)'` $(WORKDIR)/master/;
	
	# sync local with remote
	$(foreach version, $(filter-out $(LOCALBRANCHES) HEAD, $(REMOTEBRANCHES)),\
		echo "Fetching $(version) from remote"; \
		mkdir -p $(WORKDIR)/$(version); \
		git worktree add -b $(version) $(WORKDIR)/$(version) origin/$(version); \
	)
	
	# for each branches, generate html, singlehtml
	$(foreach version, $(VERSIONS), \
		(cd $(WORKDIR)/$(version);\
		$(SPHINXBUILD) $(SPHINXOPTS) -b html . ../../$(version) -A current_version=$(version) \
		   -A latest_version=$(LATESTBRANCH) -A versions="$(VERSIONS) latest"\
		   -A commit=$(shell git rev-parse --short HEAD);\
		$(SPHINXBUILD) $(SPHINXOPTS) -b singlehtml . ../../$(version) -A SINGLEHTML=true;)\
	)
	(cd $(WORKDIR)/$(LATESTBRANCH);\
	$(SPHINXBUILD) $(SPHINXOPTS) -b html . ../../ -A current_version=latest \
		-A latest_version=$(LATESTBRANCH) -A versions="$(VERSIONS) latest"\
		-A commit=$(shell git rev-parse --short HEAD);\
	$(SPHINXBUILD) $(SPHINXOPTS) -b singlehtml . ../../latest -A SINGLEHTML=true;); \
	git checkout master

prune: clean
	git checkout master;\
	git worktree prune;\
	$(foreach branch, $(filter-out master, $(LOCALBRANCHES)),\
		git branch -D $(branch); \
	)

zip: versions
	$(foreach folder,$(filter-out $(EXCLUDES), $(notdir $(shell find $(BUILDDIR)/singlehtml -maxdepth 1 -mindepth 1 -type d))), \
		echo "Using $(folder) "; \
		mkdir -p $(BUILDDIR)/html$(if $(folder:latest=),/$(folder)/,/)downloads; \
		(cd "$(BUILDDIR)/singlehtml/$(folder)" && zip -r -D \
		  ../../../$(BUILDDIR)/html$(if $(folder:latest=),/$(folder)/,/)downloads/gauge-v-$(folder:latest=$(LATESTBRANCH)).zip *) ; \
	)

serve: zip
	(cd $(BUILDDIR)/html/ && python -m http.server)

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

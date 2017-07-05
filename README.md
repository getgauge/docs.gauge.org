# User Documentation for [Gauge](http://getgauge.io)

This is the repository for [Gauge documentation](https://docs.getgauge.io).

The documents are written in RST and are built using [Sphinx](http://www.sphinx-doc.org/), a theme based on [readthedocs](https://github.com/snide/sphinx_rtd_theme/).

## Conventions

- Every released version is maintained in a separate branch.
- Every build will generate docs for all versions maintained.
- The root documentation points to the latest released verion. Navigate to `master` version for the development version of this documentation.

## Building the documentation

There are two formats of documentation built for every version.

- `make zip` will build `html` and zipped `singlehtml` documentation. The output is available in `_build/html` directory.

- `make serve` will invoke zip and bring a local http server. `http://localhost:8000` will serve this documentation.

> **IMPORTANT**: The build using `make` will not work on a dirty index. If you are developing, make sure that you have committed your local changes (you an always amend the commit or discard it). 


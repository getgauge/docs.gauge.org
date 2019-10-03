# User Documentation for [Gauge](https://gauge.org)

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

This is the repository for [Gauge documentation](https://docs.gauge.org).

The documents are written in RST and are built using [Sphinx](http://www.sphinx-doc.org/), a theme based on [readthedocs](https://github.com/snide/sphinx_rtd_theme/).

## Conventions

- Every released version is maintained in a separate branch.
- Every build will generate docs for all versions maintained.
- The root documentation points to the latest released verion. Navigate to `master` version for the development version of this documentation.


## Building the documentation

There are two formats of documentation built for every version.

- `make zip` will build `html` and zipped `singlehtml` documentation. The output is available in `_build/html` directory.

- `make serve` will invoke zip and bring a local http server. `http://localhost:8000` will serve this documentation.

## Running accessibility test

The accessibility test are writen using `jest`, `taiko` and `taiko-accessibility` plugin.

#### Requirements to run testa

* Python
* Nodejs
* NPM

Run the following command to run the tests:

```
make test
```



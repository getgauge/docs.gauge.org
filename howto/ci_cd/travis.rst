.. role:: heading

.. cssclass:: topic

:heading:`Tutorial: Integrating Gauge with Travis CI`
=====================================================


`Travis CI <https://travis-ci.org/>`__ is a hosted, distributed
continuous integration service used to build and test software projects
hosted at GitHub.

Setup
-----

-  Login to Travis CI and goto :highlighted-syntax:`accounts` menu.
-  Choose your project repository to be built and flick that switch on.
    .. figure:: images/travis_account.png

Creating tasks
--------------

-  Create a :highlighted-syntax:`.travis.yml` file in your project root.
-  Add these lines in :highlighted-syntax:`.travis.yml` according to the platform on which
   you want to build.

.. cssclass:: example

OS X

.. code-block:: yaml

    language:
        -  language_name

    os:
        - osx

    install:
        - brew install gauge
        - gauge install html-report

    script: 'gauge run specs'

    sudo: false

.. cssclass:: example

Linux

.. code-block:: yaml

    language:
        - language_name
    os:
        - linux
    addons:
       apt:
          update: true
          sources:
             - sourceline: "deb https://dl.bintray.com/gauge/gauge-deb stable main"
               key_url: "http://ha.pool.sks-keyservers.net/pks/lookup?search=0x023EDB0B&op=get&options=mr"
          packages:
             - gauge

    script: 'gauge run specs'

    sudo: true

-  If you want to run only a subset of specs, you can use :ref:`tagged_execution`.
    Eg. :highlighted-syntax:`gauge run --tags tag1 & tag2 specs`
-  Adding a flag :highlighted-syntax:`-p` runs them using :ref:`parallel_execution`.
-  Run against specific :ref:`environments` using the :highlighted-syntax:`--env` flag
-  See the `Manpage <https://manpage.gauge.org>`__ for list of all the flags that can be used.


Reports
-------

-  Goto your project on travis and see the console output.

   .. figure:: images/travis_console.png
      :alt: console output

-  Gauge generates **html-report** after execution whose location can be
   set by environment variable :highlighted-syntax:`gauge_reports_dir`. This defaults to
   :highlighted-syntax:`reports` directory in the Gauge project.

-  You can upload Gauge execution reports to your choice of hosted web
   server. Read `more <https://docs.travis-ci.com/user/uploading-artifacts/>`__ for
   uploading artifacts.

:page_header: Tutorial: Integrating Gauge with Travis CI

`Travis CI <https://travis-ci.org/>`__ is a hosted, distributed
continuous integration service used to build and test software projects
hosted at GitHub.

-  Login to Travis CI and goto ``accounts`` menu.
-  Choose your project repository to be built and flick that switch on.
    .. figure:: images/travis_account.png

Creating tasks
--------------

-  Create a ``.travis.yml`` file in your project root.
-  Add these lines in ``.travis.yml`` according to the platform on which
   you want to build.

.. code-block:: yaml
  :caption: OS X

    language:
        -  language_name

    os:
        - osx

    install:
        - brew install gauge
        - gauge install html-report

    script: 'gauge run specs'

    sudo: false

.. code-block:: yaml
  :caption: Linux

    language:
        - language_name
    os:
        - linux
    install:
        - sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B
        - echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee -a /etc/apt/sources.list
        - sudo apt-get update
        - sudo apt-get install gauge
        - gauge install html-report

    script: 'gauge run specs'

    sudo: true

* If you want to run only a subset of specs, you can use :ref:`tagged_execution`.
  Example: add ``script: gauge run --tags "tag1 & tag2" specs`` in your ``.travis.yml``.

* Adding a flag ``-p`` runs them using :ref:`parallel_execution`.
  Example: ``script: gauge run -p specs`` in your ``.travis.yml``.

* Run against specific :ref:`environments` using the ``--env`` flag.

* See the `Manpage <https://manpage.gauge.org>` __ for list of all the flags that can be used.


Reports
-------

-  Goto your project on travis and see the console output.

   .. figure:: images/travis_console.png
      :alt: console output

-  Gauge generates ``html-report`` after execution whose location can be
   set by environment variable ``gauge_reports_dir``. This defaults to
   ``reports`` directory in the Gauge project.

-  You can upload Gauge execution reports to your choice of hosted web
   server. Read
   `more <https://docs.travis-ci.com/user/uploading-artifacts/>`__ for
   uploading artifacts.

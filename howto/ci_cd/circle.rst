Tutorial: Integrating Gauge with CircleCI
=========================================

`CircleCI <https://circleci.com/>`__ is a cloud hosted, continuous integration and delivery
platform.

Configure gauge as a dependency in :highlighted-syntax:`circle.yml` and add :ref:`xml report <xml-report>`
plugin to your gauge project.

.. cssclass:: example

Linux

.. code-block:: yaml

  dependencies:
  pre:
    - sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net
    --recv-keys 023EDB0B
    - echo deb https://dl.bintray.com/gauge/gauge-deb stable main |
    sudo tee -a /etc/apt/sources.list
    - sudo apt-get update
    - sudo apt-get install gauge

    
Running tests and publishing reports
------------------------------------

Configure ``circle.yml`` to run tests in the ``specs`` folder and publish junit results.

.. code-block:: yaml

  test:
    post:
      - gauge install
      - gauge run specs
      - mkdir -p $CIRCLE_TEST_REPORTS/junit/
      - cp ./reports/xml-report/result.xml $CIRCLE_TEST_REPORTS/junit/
      
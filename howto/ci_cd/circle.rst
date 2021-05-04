.. meta::
    :description: A tutorial on how to integrate Gauge with CircleCI
    :keywords: testing gauge circleci automation

.. role:: heading

.. cssclass:: topic

:heading:`Tutorial: Integrating Gauge with CircleCI`
====================================================

`CircleCI <https://circleci.com/>`__ is a cloud hosted, continuous integration and delivery
platform.

Configure gauge as a dependency in :highlighted-syntax:`circle.yml` and add :ref:`xml report <xml-report>`
plugin to your gauge project.

.. cssclass:: example

Linux

.. code-block:: yaml

  dependencies:
  pre:
    - curl -SsL https://downloads.gauge.org/stable | sh

    
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

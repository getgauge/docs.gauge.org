:page_header: Reports

.. _gauge_reports:

Reports
=======

The test results report should be easy to comprehend and should be
useful for all the stakeholders.

HTML Reports
------------

HTML Report plugin creates comprehensive test results report in html format.
When the specs are executed, the html report is generated in ``reports`` directory in the project by default.

By default html-report is added to the project.

Find more information about this plugin `on Github <https://github.com/getgauge/html-report#html-report>`__.

XML Report
----------

XML Report plugin creates JUnit XML test result document that can be
read by tools such as Go, Jenkins. When the specs are executed, the xml
report is generated in ``reports`` directory in the project. The format of
XML report is based on `JUnit XML Schema <https://windyroad.com.au/dl/Open%20Source/JUnit.xsd>`__.

Find more information about this plugin `here <https://github.com/getgauge/xml-report#xml-report>`__.

Spectacle
---------

Spectacle pugin generates static HTML from
Specification/Markdown files. Ability to filter specifications and
scenarios are available.

Find more information about this plugin `on Github <https://github.com/getgauge/spectacle#spectacle>`__.

Flash
-----

Real-time execution reporting plugin! Watch test runs go green or red.
Install it in your CI/CD setup and connect to Flash using your browser to see what your test suites are doing.

Find more information about this plugin `on Github <https://github.com/getgauge/flash#flash>`__.


JSON Report
-----------

JSON Report plugin creates the test result in JSON format. When the specs are executed, the JSON
report is generated in ``reports`` directory in the project. The format of
JSON report is based on this `JSON Schema <https://apoorvam.github.io/json-report>`__.

Find more information about this plugin `on Github <https://github.com/apoorvam/json-report#json-report>`__.

.. note::

    This plugin is a community contributed plugin. For any query/feature raise an issue `on Github <https://github.com/apoorvam/json-report/issues>`__.

Integrating Gauge with CI/CD tools
==================================

Gauge can be easily integrated with any `Continuous Integration <https://martinfowler.com/articles/continuousIntegration.html>`__ environment.

Since Gauge supports first class command line, invoking it from any CI/CD tool is very straightforward.

Steps to Integrate Gauge with CI tool:

-  Install the Gauge and language plugin on CI machine
-  Add gauge commands as tasks in CI to run tests.

For example, to run the specs use ``gauge specs``
-  If you want to run specific instance of gauge on CI, set ``GAUGE_ROOT`` as environment variable to the path of specific instance.
-  Gauge returns html-reports, console output as result of execution which can be configured to view on CI.

.. toctree::
    :caption: Examples
    :titlesonly:

    Go.cd<gocd>
    Snap-CI<snap>
    TeamCity<teamcity>
    Travis-CI<travis>
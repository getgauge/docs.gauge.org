======================
Examples And Tutorials
======================


========
Examples
========

Java
++++

* `Java + Maven + Selenium <https://github.com/getgauge-examples/java-maven-selenium>`__
* `Gradle + Selenium <https://github.com/getgauge-examples/java-gradle-selenium>`__
* `Sahi <https://github.com/getgauge-examples/gauge-example-sahi>`__
* `Selendroid <https://github.com/getgauge-examples/gauge_selendroid>`__
* `Guice <https://github.com/getgauge-examples/gauge-guice>`__
* `Spring <https://github.com/getgauge-examples/ioc-spring>`__
* `Perfecto <https://github.com/AmirAtPerfecto/Gauge-Perfecto-Sample>`__

Ruby
++++

* `Selenium <https://github.com/getgauge-examples/ruby-selenium>`__
* `Selenium + Capybara <https://github.com/getgauge-examples/gauge-example-ruby>`__

C#
+++

* `Selenium <https://github.com/getgauge-examples/csharp-selenium>`__
* `Selenium With Page Objects <https://github.com/getgauge-examples/gauge-example-csharp>`__

Javascript
++++++++++

* `Selenium Webdriver <https://github.com/renjithgr/gauge-js-selenium-webdriver>`__
* `Taiko <https://github.com/getgauge-examples/js-taiko>`__

Python
++++++

* `Selenium <https://github.com/getgauge-examples/python-selenium>`__
* `Selenium With Page Objects <https://github.com/kashishm/gauge-example-python>`__


=========
Tutorials
=========

Integration with CI/CD
++++++++++++++++++++++

Gauge can be easily integrated with any `Continuous Integration <https://martinfowler.com/articles/continuousIntegration.html>`__ environment.

Since Gauge supports first class command line, invoking it from any CI/CD tool is very straightforward.

Steps to Integrate Gauge with CI tool:

-  Install the Gauge and language plugin on CI machine
-  Add gauge commands as tasks in CI to run tests.

For example, to run the specs use ``gauge run specs``

-  If you want to run specific instance of gauge on CI, add it in ``PATH`` env or use absolute path of specific instance.
-  Gauge returns html-reports, console output as result of execution which can be configured to view on CI.


.. toctree::
    :caption: Examples demonstrating specific use cases using/setting up Gauge.
    :titlesonly:

    howto/ci_cd/index

Running Gauge in docker
+++++++++++++++++++++++

Gauge can be easily installed on `Docker <https://www.docker.com/what-docker>`__ container.

.. toctree::
    :titlesonly:

    howto/docker

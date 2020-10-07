.. meta::
    :description: Example Gauge projects for different languages and frameworks.
    :keywords: language testing project vscode automation mac windows linux java javascript ruby python c#

.. cssclass:: topic

.. role:: heading
.. role:: maven_logo
.. role:: gradle_logo
.. role:: selenium_logo
.. role:: sahi_logo
.. role:: selendroid_logo
.. role:: guice_logo
.. role:: spring_logo
.. role:: perfecto_logo
.. role:: taiko_logo

.. role:: gocd_logo
.. role:: teamcity_logo
.. role:: travis_logo
.. role:: circleci_logo
.. role:: jenkins_logo
.. role:: azure_logo
.. role:: docker_logo


:heading:`Examples`
===================

.. include:: ./partials/change_filter.rst

.. cssclass:: dynamic-content csharp examples-table

Listed below are examples for using Gauge to set up test projects for C# language along with different frameworks.

.. cssclass:: dynamic-content csharp examples-table
.. list-table::
   :header-rows: 1

   * - Framework
     - Description
     - Link

   * - :selenium_logo:`Selenium`
     - This is an example project for doing web automation testing with Gauge and Selenium.
     - `Read more <https://github.com/getgauge-examples/csharp-selenium>`__

   * - :selenium_logo:`Selenium With Page Objects`
     - This is an example project for doing web automation testing with Gauge and Selenium using Page Object pattern.
     - `Read more <https://github.com/getgauge-examples/gauge-example-csharp>`__

.. cssclass:: dynamic-content java examples-table

Listed below are examples for using Gauge to set up test projects for Java language along with different frameworks.

.. cssclass:: dynamic-content java examples-table
.. list-table::
   :header-rows: 1

   * - Framework
     - Description
     - Link

   * - :maven_logo:`Maven` + :selenium_logo:`Selenium`
     - This is an example project for doing web automation testing with Gauge and Selenium. It uses Maven as build tool
     - `Read more <https://github.com/getgauge-examples/java-maven-selenium>`__

   * - :gradle_logo:`Gradle` + :selenium_logo:`Selenium`
     - This is an example project for doing web automation testing with Gauge and Selenium. It uses Gradle as build tool
     - `Read more <https://github.com/getgauge-examples/java-gradle-selenium>`__

   * - :sahi_logo:`Sahi`
     - This is an example project for doing web automation testing with Gauge and Sahi.
     - `Read more <https://github.com/getgauge-examples/gauge-example-sahi>`__

   * - :selendroid_logo:`Selendroid`
     - This is an example project for doing mobile app automation testing with Gauge and Selendroid.
     - `Read more <https://github.com/getgauge-examples/gauge_selendroid>`__

   * - :guice_logo:`Guice`
     - This is an example project for doing web automation testing with Gauge and Guice.
     - `Read more <https://github.com/getgauge-examples/gauge-guice>`__

   * - :spring_logo:`Spring`
     - This is an example project for doing web automation testing with Gauge and Spring.
     - `Read more <https://github.com/getgauge-examples/ioc-spring#gauge-with-spring>`__

.. cssclass:: dynamic-content javascript examples-table

Listed below are examples for using Gauge to set up test projects for JavaScript language along with different frameworks.

.. cssclass:: dynamic-content javascript examples-table
.. list-table::
   :header-rows: 1

   * - Framework
     - Description
     - Link

   * - :taiko_logo:`Taiko`
     - This is an example project for doing web automation testing with Gauge and Taiko.
     - `Read more <https://github.com/getgauge-examples/js-taiko>`__

.. cssclass:: dynamic-content python examples-table

Listed below are examples for using Gauge to set up test projects for Python language along with different frameworks.

.. cssclass:: dynamic-content python examples-table
.. list-table::
   :header-rows: 1

   * - Framework
     - Description
     - Link

   * - :selenium_logo:`Selenium`
     - This is an example project for doing web automation testing with Gauge and Selenium.
     - `Read more <https://github.com/getgauge-examples/python-selenium>`__

.. cssclass:: dynamic-content ruby examples-table

Listed below are examples for using Gauge to set up test projects for Ruby language along with different frameworks.

.. cssclass:: dynamic-content ruby examples-table
.. list-table::
   :header-rows: 1

   * - Framework
     - Description
     - Link

   * - :selenium_logo:`Selenium`
     - This is an example project for doing web automation testing with Gauge and Selenium.
     - `Read more <https://github.com/getgauge-examples/ruby-selenium>`__

   * - :selenium_logo:`Selenium with Capybara`
     - - This is an example project for doing web automation testing with Gauge and Capybara.
     - `Read more <https://github.com/getgauge-examples/gauge-example-ruby>`__


Integration with CI/CD
----------------------

Gauge can be easily integrated with any `Continuous Integration <https://martinfowler.com/articles/continuousIntegration.html>`__ environment.

Since Gauge supports first class command line, invoking it from any CI/CD tool is very straightforward.

Steps to Integrate Gauge with CI tool:

-  Install the Gauge and language plugin on CI machine
-  Add gauge commands as tasks in CI to run tests.

For example, to run the specs use ``gauge run specs``

-  If you want to run specific instance of gauge on CI, add it in ``PATH`` env or use absolute path of specific instance.
-  Gauge returns html-reports, console output as result of execution which can be configured to view on CI.

See below some examples demonstrating specific use cases using Gauge and integrating it with your favourite CI/CD tool.

.. cssclass:: dynamic-content cicd-table
.. list-table::

   * - :gocd_logo:`GoCD`
     - This tutorials explains how to integrate Gauge with GoCD.
     - `Read more </howto/ci_cd/gocd.html>`__

   * - :teamcity_logo:`TeamCity`
     - This tutorials explains how to integrate Gauge with TeamCity.
     - `Read more </howto/ci_cd/teamcity.html>`__

   * - :travis_logo:`Travis-Ci`
     - This tutorials explains how to integrate Gauge with Travis CI.
     - `Read more </howto/ci_cd/travis.html>`__

   * - :circleci_logo:`CircleCI`
     - This tutorials explains how to integrate Gauge with Circle CI.
     - `Read more </howto/ci_cd/circle.html>`__

   * - :jenkins_logo:`Jenkins`
     - This tutorials explains how to integrate Gauge with Jenkins.
     - `Read more </howto/ci_cd/jenkins.html>`__

   * - :azure_logo:`Azure`
     - This tutorials explains how to integrate Gauge with Azure Pipelines.
     - `Read more </howto/ci_cd/azure.html>`__

   * - :docker_logo:`Docker`
     - This tutorials explains how to run Gauge in Docker containers.
     - `Read more </howto/ci_cd/docker.html>`__


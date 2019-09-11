.. meta::
    :description: A tutorial on how to integrate Gauge with TeamCity
    :keywords: testing gauge teamcity automation

Tutorial: Integrating Gauge with TeamCity
=========================================
.. role:: heading

.. cssclass:: topic

:heading:`Tutorial: Integrating Gauge with TeamCity`
====================================================

Setup
-----

-  :ref:`Download and Install Gauge <installation-instructions>` on the agents.
-  Install the required gauge :ref:`language plugin <install_plugins>` on the agents.

Tips on Installation
--------------------

-  Gauge is installed system wide by default and not user wide. However,
   plugins are installed per user. So plugins should be installed via
   user account with which the TeamCity executes. Refer :ref:`default install
   location of Gauge and its plugins <installation-faq>`.

-  Alternately, you can set :ref:`custom location for plugins <custom-plugin-installation>`
   so that its accessible to TeamCity agent running as a different user.


Create execution task
---------------------

-  Create a new project in TeamCity pointing to Gauge project repository
   URL.
-  Add a build step which will run :highlighted-syntax:`gauge run specs`.

    .. image:: images/TeamCity_buildStep.png

-  If you want to run only a subset of specs, you can use :ref:`tagged_execution`. 
    Eg. :highlighted-syntax:`gauge run --tags tag1 & tag2 specs`
-  Adding a flag :highlighted-syntax:`-p` runs them using :ref:`parallel_execution`.
-  Run against specific :ref:`environments` using the :highlighted-syntax:`--env` flag
-  See the `Manpage <https://manpage.gauge.org>`__ for list of all the flags that can be used.


Reports
-------

-  Gauge generates **html-reports** after execution which can be
   configured in TeamCity by adding a new artifact in Artifacts tab.
   These artifacts can be viewed/downloaded from the artifacts tab.

   .. figure:: images/TeamCity_Artifact.png
      :alt: artifact

      artifact

-  You can also add a `custom
   tab <https://confluence.jetbrains.com/display/TCD9/Including+Third-Party+Reports+in+the+Build+Results>`__
   to view your html reports generated.

   To add custom tab, go to :highlighted-syntax:`Project Settings -> Report tabs -> Add a new
   build report tab`.

   .. figure:: images/TeamCity_ReportTab.png
      :alt: report tab

      reportsTab

-  **Console output** can be seen while execution of steps and reports
   can be seen after execution.
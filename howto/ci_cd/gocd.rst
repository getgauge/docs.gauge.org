.. meta::
    :description: A tutorial on how to integrate Gauge with GoCD
    :keywords: testing gauge gocd automation
    
Tutorial: Integrating Gauge with GoCD
=====================================
.. role:: heading

.. cssclass:: topic

:heading:`Tutorial: Integrating Gauge with GoCD`
================================================

`GoCD <https://www.gocd.io/>`__ is a continuous integration and deployment
tool.

Setup
-----

-  `Setup a new pipeline on Go <https://docs.gocd.io/current/configuration/quick_pipeline_setup.html>`__

   .. image:: images/Gauge_Pipeline.png
-  :ref:`Download and Install Gauge <installation-instructions>` on the Go Agents
-  Install the required gauge :ref:`language plugin <install_plugins>` on the Go agents.

Tips on Installation
--------------------

-  Gauge is installed system wide by default and not user wide. However,
   plugins are installed per user. So plugins should be installed via
   user account with which the Go agent executes. Refer :ref:`default install
   location of Gauge and its plugins <installation-faq>`.

-  Alternately, you can set :ref:`custom location for plugins <custom-plugin-installation>` so that it is accessible to Go agent running as a different user.

Create execution task
---------------------

-  Create a new task which will run :highlighted-syntax:`gauge run specs`.
-  If you want to run only a subset of specs, you can use :ref:`tagged_execution`. 
    Eg. :highlighted-syntax:`gauge run --tags tag1 & tag2 specs`
-  Adding a flag :highlighted-syntax:`-p` runs them using :ref:`parallel_execution`.
-  Run against specific :ref:`environments` using the :highlighted-syntax:`--env` flag
-  See the `Manpage <https://manpage.gauge.org>`__ for list of all the flags that can be used.

   .. figure:: images/Configuring_Gauge.png
      :alt: adding new task

      configuring

Reports
-------

-  Gauge generates **html-reports** after execution which can be
   configured in Go by adding a new artifact in Artifacts tab.

   .. figure:: images/Configuring_Artifacts.png
      :alt: artifact

      artifact

-  Artifacts can be viewed in the artifacts tab.

   .. figure:: images/Arifacts.png
      :alt: artifact

      artifact

-  **Console output** can be seen while execution of job and reports can
   be seen after execution.

   .. figure:: images/Console_Output.png
      :alt: console

      console

-  You can also add a `custom tab <https://docs.gocd.io/current/configuration/managing_artifacts_and_reports.html#using-tabs>`__ to view your html reports generated.

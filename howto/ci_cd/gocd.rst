HOWTO: Integrating Gauge with GoCD
===================================

`GoCD <https://www.gocd.io/>`__ is a continuous integration and deployment
tool.


Setup
-----

-  `Setup a new pipeline on GoCD <https://docs.gocd.org/current/configuration/quick_pipeline_setup.html>`__

   .. image:: images/Gauge_Pipeline.png
-  `Download <http://getgauge.io/get-started/index.html>`__ and Install Gauge on the GoCD Agents
-  Install the required gauge :ref:`language plugin <plugins-installation>` on the GoCD agents.

Tips on Installation
--------------------

-  Gauge is installed system wide by default and not user wide. However,
   plugins are installed per user. So plugins should be installed via
   user account with which the GoCD agent executes. Refer default install
   location of Gauge and its plugins
   `here <https://docs.getgauge.io/troubleshooting.html#gauge-installation>`__.

-  Alternately, you can set `custom location for
   plugins <https://docs.getgauge.io/troubleshooting.html#custom-plugin-install-location>`__
   so that its accessible to GoCD agent running as a different user.

Create execution task
---------------------

-  Create a new task which will run ``gauge run specs``.
-  If you want to run only a subset of specs, you can use :ref:`tagged_execution`. 
    Eg. ``gauge run --tags "tag1 & tag2" specs``
-  Adding a flag ``-p`` runs them using :ref:`parallel_execution`.
-  Run against specific :ref:`environments` using the ``--env`` flag
-  See the :ref:`cli_interface` for list of all the flags that can be used.

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

-  You can also add a `custom tab <https://docs.gocd.org/current/configuration/managing_artifacts_and_reports.html#using-tabs>`__ to view your html reports generated.

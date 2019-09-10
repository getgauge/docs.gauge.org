.. role:: heading

:heading:`Tutorial: Integrating Gauge with Jenkins`
===================================================

`Jenkins <https://jenkins.io/>`__ is a continuous integration and deployment
tool.

Setup
-----
-  :ref:`Download and Install Gauge <installation-instructions>` on the Jenkins slave/local.
-  Install the required gauge :ref:`language plugin <install_plugins>`  on the Jenkins slave/local.

Tips on Installation
--------------------

-  Gauge is installed system wide by default and not user wide. However,
   plugins are installed per user. So plugins should be installed via
   user account with which the Jenkins slave executes. Refer :ref:`default install
   location of Gauge and its plugins <installation-faq>`.

-  Alternately, you can set :ref:`custom location for plugins <custom-plugin-installation>`
   so that its accessible to Jenkins slave running as a different user.

Create execution task
---------------------

-  Create a new job which will run :highlighted-syntax:`gauge run specs`.
   - In :highlighted-syntax:`Source Code Management` select :highlighted-syntax:`Git` give the git repository url.
   - In :highlighted-syntax:`Build` select :highlighted-syntax:`Execute Shell` and specify the command :highlighted-syntax:`gauge run specs`.

       .. figure:: images/Jenkins_config.png
         :alt: adding new job

         configuring

-  If you want to run only a subset of specs, you can use :ref:`tagged_execution`. 
    Eg. :highlighted-syntax:`gauge run --tags tag1 & tag2 specs`
-  Adding a flag :highlighted-syntax:`-p` runs them using :ref:`parallel_execution`.
-  Run against specific :ref:`environments` using the :highlighted-syntax:`--env` flag
-  See the `Manpage <https://manpage.gauge.org>`__ for list of all the flags that can be used.

Reports
-------

-  **Console output** can be seen while execution of job and reports can
   be seen after execution at :highlighted-syntax:`../reports/html-report/index.html`
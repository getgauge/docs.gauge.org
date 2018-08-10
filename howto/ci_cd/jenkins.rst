Tutorial: Integrating Gauge with Jenkins
========================================

`Jenkins <https://jenkins.io/>`__ is a continuous integration and deployment
tool.

Setup
-----
-  `Download <//gauge.org/get_started>`__ and Install Gauge on the Jenkins slave/local.
-  Install the required gauge :ref:`language plugin <install_plugins>` on the Jenkins slave/local.

Tips on Installation
--------------------

-  Gauge is installed system wide by default and not user wide. However,
   plugins are installed per user. So plugins should be installed via
   user account with which the Go agent executes. Refer default install
   location of Gauge and its plugins
   `here <https://docs.gauge.org/troubleshooting.html#gauge-installation>`__.

-  Alternately, you can set `custom location for
   plugins <https://docs.gauge.org/troubleshooting.html#custom-plugin-install-location>`__
   so that its accessible to Go agent running as a different user.

Create execution task
---------------------

-  Create a new job which will run ``gauge run specs``.
   - In ``Source Code Management`` select ``Git`` give the git repository url.
   - In ``Build`` select ``Execute Shell`` and specify the command ``gauge run specs``.

       .. figure:: images/Jenkins_config.png
         :alt: adding new job

         configuring

-  If you want to run only a subset of specs, you can use :ref:`tagged_execution`. 
    Eg. ``gauge run --tags "tag1 & tag2" specs``
-  Adding a flag ``-p`` runs them using :ref:`parallel_execution`.
-  Run against specific :ref:`environments` using the ``--env`` flag
-  See the `Manpage <https://manpage.gauge.org>` __ for list of all the flags that can be used.

Reports
-------

-  **Console output** can be seen while execution of job and reports can
   be seen after execution at ``../reports/html-report/index.html``
.. meta::
    :description: A tutorial on how to integrate Gauge with Azure
    :keywords: testing gauge azure automation

Tutorial: Integrating Gauge with Azure
======================================
.. role:: heading

:heading:`Tutorial: Integrating Gauge with Azure`
=================================================

`Azure Pipelines <https://dev.azure.com/>`__ build, test, and deploy with CI/CD that works with any language, platform and cloud.
Connect to Github or any other Git provider and deploy continuously.

Setup
-----

-  Login to Azure DevOps with GitHub/Microsoft account.
-  Create a new project and a build pipeline

    .. image:: images/azure_new_pipeline.png

- Select a repository which you want to build in azure pipeline

    .. image:: images/azure_github_repo.png


Creating tasks
--------------

-  Create a :highlighted-syntax:`azure-pipelines.yml` file in your project root.
-  Add these lines in :highlighted-syntax:`azure-pipelines.yml` according to the platform on which
   you want to build.

.. cssclass:: example

macOS

.. code-block:: yaml

        trigger:
        - master

        pool:
            vmImage: 'macOS-10.13'

        steps:
        -   script: |
                echo installing gauge
                brew install gauge
            displayName: 'install gauge'

        -   script: |
                echo starting gauge test
                gauge run specs
            displayName: 'gauge test'

.. cssclass:: example

Linux

.. code-block:: yaml

        trigger:
        -   master

        pool:
            vmImage: 'ubuntu-16.04'

        steps:
        -   script: |
                echo installing gauge
                sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B
                echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee -a /etc/apt/sources.list
                sudo apt-get update
                sudo apt-get install gauge
            displayName: 'install gauge'

        -   script: |
                echo starting gauge test
                gauge run specs
            displayName: 'gauge test'´


.. cssclass:: example

Windows

.. code-block:: yaml

    pool:
        vmImage: 'vs2017-win2016'

    steps:
    -   task: NodeTool@0
        inputs:
            versionSpec: '10.x'

    -   powershell: |
            echo installing gauge
            npm install -g @getgauge/cli
        displayName: 'install gauge'

    -   powershell: |
            echo starting gauge test
            gauge run specs
        displayName: 'gauge test'

-  If you want to run only a subset of specs, you can use :ref:`tagged_execution`.
    Eg. :highlighted-syntax:`gauge run --tags tag1 & tag2 specs` in your :highlighted-syntax:`azure-pipelines.yml`.

-  Adding a flag :highlighted-syntax:`-p` runs them using :ref:`parallel_execution`.
-  Run against specific :ref:`environments` using the :highlighted-syntax:`--env` flag
-  See the `Manpage <https://manpage.gauge.org>`__ for list of all the flags that can be used.


Reports
-------

-  Goto your pipeline and see the console output.

   .. figure:: images/azure_console_output.png
      :alt: console output

-  Gauge generates **html-report** after execution whose location can be
   set by environment variable :highlighted-syntax:`gauge_reports_dir`. This defaults to
   :highlighted-syntax:`reports` directory in the Gauge project.

-  You can upload Gauge execution reports to your choice of hosted web
   server. Read `more <https://docs.microsoft.com/en-us/azure/devops/artifacts/>`__ for
   uploading artifacts.

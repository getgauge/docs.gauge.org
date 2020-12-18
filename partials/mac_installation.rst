.. role:: installer-icon
.. role:: macos

.. cssclass:: dynamic-content macos

:macos:`Step 1: Installing Gauge on macOS`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section gives specific instructions on setting up Gauge in a macOS environment.

:installer-icon:`Install Using HomeBrew` (Preffered)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. admonition:: System Requirements

    - macOS  >= Mac OS X v10.6

    - Homebrew

    - Commandline tool

    - Terminal


`Install brew <https://brew.sh>`__, and run the following command

.. code-block:: console

    brew install gauge

if HomeBrew is working properly, you should see something similar to the following:

You can also use any of these other ways to install Gauge

:installer-icon:`Install using NPM installation`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can install Gauge by running the following command in Terminal.

.. code-block:: console

    npm install -g @getgauge/cli

:installer-icon:`Install using CURL`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install Gauge to /usr/local/bin by running

.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh


Or install Gauge to a [custom path] using

.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh -- --location=[custom path]

:installer-icon:`Install using ZIP file`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download the `Zip Installer <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip>`__
and run the following command to complete the installation.

.. code-block:: console

    unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip -d /usr/local/bin


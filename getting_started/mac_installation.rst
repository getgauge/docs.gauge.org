.. role:: alternate-methods
.. role:: installer-icon
.. role:: macos
.. cssclass:: dynamic-content macos

:macos:`Step 1: Installing Gauge on MacOS`
------------------------------------------

This section gives specific instructions on setting up Gauge in a Mac OS environment.

You can install Gauge using any of the following methods.


.. cssclass:: dynamic-content macos

:installer-icon:`Install Using HomeBrew`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. admonition:: System Requirements

    - Mac OS

    - Homebrew

    - Commandline tool

    - Terminal


1. Install brew if you haven't already: Go to the brew website, https://brew.sh/, and follow the
directions there.

2. Run the brew Command to Install Gauge: Installing Gauge using brew is as easy as the
directions there.

.. code-block:: console

    brew install gauge

if HomeBrew is working properly, you should see something similar to the following:


.. note::
    Gauge automatically sends `telemetry data <https://gauge.org/telemetry>`__ to help us improve the product. If you prefer not to have this data sent, you can choose to  `opt out <https://manpage.gauge.org/gauge_telemetry.html>`__.



.. cssclass:: dynamic-content macos alternate-installation

:alternate-methods:`Alternate Installation Methods`

.. cssclass:: dynamic-content macos collapsible curl-installer first

:installer-icon:`Install using CURL`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. cssclass:: toggle collapsible-content

Install Gauge to /usr/local/bin by running

.. cssclass:: toggle collapsible-content
.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh

.. cssclass:: toggle collapsible-content

Or install Gauge to a [custom path] using

.. cssclass:: toggle collapsible-content
.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh -- --location=[custom path]

.. cssclass:: dynamic-content macos collapsible zip-installer

:installer-icon:`Install using ZIP file`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. cssclass:: toggle collapsible-content

    .. admonition:: System Requirements

        - Mac OS

        - Commandline tool

        - Terminal

    1. For signed binaries first download the zip installer
        `Zip Installer  https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip>`__

    2. Run the following command in your Commnad line tool to complete the installation.

.. cssclass:: toggle collapsible-content
.. code-block:: console

    unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip -d /usr/local/bin


.. cssclass:: dynamic-content macos collapsible npm-installer

:installer-icon:`Install using NPM installation`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. cssclass:: toggle collapsible-content

    .. admonition:: System Requirements

        `Node.js <nodejs.org>`__


        To install gauge using NPM you will need the latest node version.

            - `If you have Node.js already installed - to get the latest version of npm use the following command:`

            'npm install -g npm@latest'


    You can install Gauge by running the following command in Terminal.


.. cssclass:: toggle collapsible-content

.. code-block:: console

    npm install -g @getgauge/cli


.. cssclass:: dynamic-content macos collapsible nightly-installer last

:installer-icon:`Nightly Installation`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. cssclass:: toggle collapsible-content

Nightly releases are latest development snapshots of Gauge. They have the latest features being developed, but are unstable.
Download the Gauge archive from `here <https://bintray.com/gauge/Gauge/Nightly/_latestVersion>`__.
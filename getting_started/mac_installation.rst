.. role:: alternate-methods
.. role:: installer-icon
.. cssclass:: dynamic-content macos

Installing Gauge on MacOS
=========================

This section gives specific instructions on setting up Gauge in a Mac OS environment.

You can install Gauge using any of the following methods.


.. cssclass:: dynamic-content macos

:installer-icon:`Install Using HomeBrew`
----------------------------------------

.. admonition:: System Requirements

    - Mac OS

    - Homebrew

    - Commandline tool

    - Terminal


.. cssclass:: dynamic-content macos

1. Install brew if you haven't already: Go to the brew website, https://brew.sh/, and follow the
directions there.

.. cssclass:: dynamic-content macos

2. Run the brew Command to Install Gauge: Installing Gauge using brew is as easy as the
directions there.

.. cssclass:: dynamic-content macos

.. code-block:: console

    brew install gauge

.. cssclass:: dynamic-content macos

if HomeBrew is working properly, you should see something similar to the following:


.. note::
    Gauge automatically sends `telemetry data <https://gauge.org/telemetry>`__ to help us improve the product. If you prefer not to have this data sent, you can choose to  `opt out <https://manpage.gauge.org/gauge_telemetry.html>`__.



.. cssclass:: dynamic-content macos

:alternate-methods:`Alternate Installation Methods`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


.. cssclass:: dynamic-content macos collapsible curl-installer

:installer-icon:`Install using CURL`
------------------------------------

.. cssclass:: dynamic-content macos collapsible-content

Install Gauge to /usr/local/bin by running

.. cssclass:: dynamic-content macos collapsible-content
.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh

.. cssclass:: dynamic-content macos collapsible-content

Or install Gauge to a [custom path] using

.. cssclass:: dynamic-content macos collapsible-content
.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh -- --location=[custom path]

.. cssclass:: dynamic-content macos collapsible zip-installer

:installer-icon:`Install using ZIP file`
----------------------------------------

.. cssclass:: dynamic-content macos collapsible-content

    .. admonition:: System Requirements

        - Mac OS

        - Commandline tool

        - Terminal

    1. For signed binaries first download the zip installer
        `Zip Installer  https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip>`__

    2. Run the following command in your Commnad line tool to complete the installation.

.. cssclass:: dynamic-content macos collapsible-content
.. code-block:: console

    unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip -d /usr/local/bin


.. cssclass:: dynamic-content macos collapsible npm-installer

:installer-icon:`Install using NPM installation`
------------------------------------------------

.. cssclass:: dynamic-content macos collapsible-content

    .. admonition:: System Requirements

        `Node.js <nodejs.org>`__


        To install gauge using NPM you will need the latest node version.

            - `If you have Node.js already installed - to get the latest version of npm use the following command:`

            'npm install -g npm@latest'


    You can install Gauge by running the following command in Terminal.


.. cssclass:: dynamic-content macos collapsible-content

.. code-block:: text

    npm install -g @getgauge/cli


.. cssclass:: dynamic-content macos collapsible nightly-installer

:installer-icon:`Nightly Installation`
--------------------------------------

.. cssclass:: dynamic-content macos collapsible-content

Nightly release are latest development snapshots of Gauge. They have the latest features being developed, but are unstable. Downnload the Gauge archive from here. Extract it to a location and add it to system path.

.. cssclass:: dynamic-content macos collapsible-content

`gauge-1.0.6.nightly-2019-07-19-darwin.x86.zip <https://bintray.com/gauge/Gauge/download_file?file_path=darwin%2Fgauge-1.0.6.nightly-2019-07-19-darwin.x86.zip>`__

.. cssclass:: dynamic-content macos collapsible-content

`gauge-1.0.6.nightly-2019-07-19-darwin.x86_64.zip <https://bintray.com/gauge/Gauge/download_file?file_path=darwin%2Fgauge-1.0.6.nightly-2019-07-19-darwin.x86_64.zip>`__
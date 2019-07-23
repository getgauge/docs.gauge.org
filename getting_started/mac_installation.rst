.. cssclass:: hidden macos

Step 1: Installing Gauge on MacOS
=================================

This section gives specific instructions on setting up Gauge in a Mac OS environment.

You can install Gauge using any of the following methods.


.. cssclass:: hidden macos collapsible

Install Using HomeBrew
======================

.. code-block:: console

    System Requirements
    Mac OS
    Homebrew
    Commandline tool
    Terminal


1. Install brew if you haven't already: Go to the brew website, https://brew.sh/, and follow the
directions there.

2. Run the brew Command to Install Gauge: Installing Gauge using brew is as easy as the
directions there.


    .. code-block:: console

        brew install gauge

    if HomeBrew is working properly, you should see something similar to the following:


.. cssclass:: hidden macos collapsible

Install using CURL
==================

Install Gauge to /usr/local/bin by running


.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh

Or install Gauge to a [custom path] using


.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh -- --location=[custom path]

.. cssclass:: hidden macos collapsible

ZIP install
===========

    System Requirements
    Mac OSCommandline tool- Terminal

1. For signed binaries first download the zip installer
    Zip Installer

2. Run the following command in your Commnad line tool to complete the installation.

.. code-block:: console

    unzip -o gauge-1.0.5-darwin.x86_64.zip -d /usr/local/bin
.. cssclass:: hidden macos collapsible

NPM install
===========

    System Requirements
    Node.js
    To install gauge using NPM you will need the latest node version.

        if you have Node.js already installed - to get the latest version use the following command:

        `npm install -g npm@latest`.

You can install Gauge by running the following command in Terminal.

.. code-block:: console

    npm install -g @getgauge/cli

.. code-block:: console

    npm install -g @getgauge/cli

.. cssclass:: hidden macos collapsible

Alternate methods
=================

Nightly release are latest development snapshots of Gauge. They have the latest features being developed, but are unstable. Downnload the Gauge archive from here. Extract it to a location and add it to system path.


`gauge-1.0.6.nightly-2019-07-19-darwin.x86.zip <https://bintray.com/gauge/Gauge/download_file?file_path=darwin%2Fgauge-1.0.6.nightly-2019-07-19-darwin.x86.zip>`__

`gauge-1.0.6.nightly-2019-07-19-darwin.x86_64.zip <https://bintray.com/gauge/Gauge/download_file?file_path=darwin%2Fgauge-1.0.6.nightly-2019-07-19-darwin.x86_64.zip>`__
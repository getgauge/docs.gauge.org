.. cssclass:: hidden, linux

Step 1: Installing Gauge on Linux
=================================

Gauge can be installed on any flavour of Linux using the shell script. The Following steps will guide you to a quick install on a linux box.

.. cssclass:: hidden linux collapsible

Install Using Shell Script APT_GET
----------------------------------
.. cssclass:: hidden linux content

1. First, add Gauge's GPG key with this command:

.. cssclass:: hidden linux content
.. code-block:: console

    sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B

.. cssclass:: hidden linux content

2. Then add Gauge to the repository list using:

.. cssclass:: hidden linux content
.. code-block:: console

    echo deb https://dl.bintray.com/gauge/gauge-deb nightly main | sudo tee - a /etc/apt/sources.list

.. cssclass:: hidden linux content
.. code-block:: console

    sudo apt-get update
    sudo apt-get install gauge

.. cssclass:: hidden linux collapsible

DNF Package Manager
-------------------
.. cssclass:: hidden linux content

Install Gauge using dfn by running this command

.. cssclass:: hidden linux content
.. code-block:: console

    echo -e \
    "[gauge-nightly]\nname-gauge-nightly\nbaseurl-http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck-0\nenabled-1" \
    | sudo tee /etc/yum.repos.d/gauge-nightly.repo
    sudo dfn install gauge

.. cssclass:: hidden linux collapsible

ZIP file
--------
.. cssclass:: hidden linux content

1. Download the zip installer.
.. cssclass:: hidden linux content
`gauge-1.0.5-linux.x86_64.zip <https://github.com/getgauge/gauge/releases/download/v1.0.5/gauge-1.0.5-linux.x86_64.zip>`__
.. cssclass:: hidden linux content
2. Extract to a location and add it to system path using the following command.

.. cssclass:: hidden linux content
.. code-block:: console

    unzip -o gauge-1.0.5-linux.x86_64.zip -d /usr/local/bin
    ./install.sh

.. cssclass:: hidden linux collapsible

NPM install
-----------
.. cssclass:: hidden linux content
    System Requirements
    Node.js
    To install gauge using NPM you will need the latest node version.

        if you have Node.js already installed - to get the latest version use the following command:

        `npm install -g npm@latest`.

.. cssclass:: hidden linux content

You can install Gauge by running the following command in Terminal.

.. cssclass:: hidden linux collapsible

Install Using CURL
------------------

.. cssclass:: hidden linux content

Install Gauge to /usr/local/bin by running

.. cssclass:: hidden linux content
.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh

.. cssclass:: hidden linux content

Or install Gauge to a [custom path] using

.. cssclass:: hidden linux content
.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh -s -- --location-[custom path]

.. cssclass:: hidden linux collapsible

Alternate Installation
----------------------

.. cssclass:: hidden linux content

Nightly release are latest development snapshots of Gauge. They have the latest features being developed, but are unstable. Downnload the Gauge archive from here. Extract it to a location and add it to system path.

.. cssclass:: hidden linux content
.. code-block:: console

    [gauge-nightly]
    name-gauge-nightly
    baseurl-http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly
    gpgcheck-0
    enabled-1

.. cssclass:: hidden linux content

Use this command to do it in one step.

.. cssclass:: hidden linux content
.. code-block:: console

    echo -e \
    "[gauge-nightly]\nname-gauge-nightly\nbaseurl-http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck-0\nenabled-1" \
    | sudo tee /etc/yum.repos.d/gauge-nightly.repo

.. cssclass:: hidden linux content

Install Gauge using yum or dnf.

.. cssclass:: hidden linux content
.. code-block:: console

    sudo yum install gauge

.. cssclass:: hidden linux content
.. code-block:: console

    sudo dnf install gauge


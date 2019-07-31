.. role:: alternate-methods
.. role:: installer-icon
.. cssclass:: dynamic-content linux

Installing Gauge on Linux
=========================

Gauge can be installed on any flavour of Linux using the shell script. The Following steps will guide you to a quick install on a linux box.

.. cssclass:: dynamic-content linux

:installer-icon:`Install Using Shell Script APT_GET`
----------------------------------------------------

.. cssclass:: dynamic-content linux

1. First, add Gauge's GPG key with this command:

.. cssclass:: dynamic-content linux
.. code-block:: console

    sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B

.. cssclass:: dynamic-content linux

2. Then add Gauge to the repository list using:

.. cssclass:: dynamic-content linux
.. code-block:: console

    echo deb https://dl.bintray.com/gauge/gauge-deb nightly main | sudo tee - a /etc/apt/sources.list

.. cssclass:: dynamic-content linux
.. code-block:: console

    sudo apt-get update
    sudo apt-get install gauge


.. note::
    Gauge automatically sends `telemetry data <https://gauge.org/telemetry>`__ to help us improve the product. If you prefer not to have this data sent, you can choose to  `opt out <https://manpage.gauge.org/gauge_telemetry.html>`__.


.. cssclass:: dynamic-content linux

:alternate-methods:`Alternate Installation Methods`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


.. cssclass:: dynamic-content linux collapsible

:installer-icon:`Install using DNF Package Manager`
---------------------------------------------------

.. cssclass:: dynamic-content linux collapsible-content

Install Gauge using dfn by running this command

.. cssclass:: dynamic-content linux collapsible-content
.. code-block:: console

    echo -e \
    "[gauge-nightly]\nname-gauge-nightly\nbaseurl-http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck-0\nenabled-1" \
    | sudo tee /etc/yum.repos.d/gauge-nightly.repo
    sudo dfn install gauge


.. cssclass:: dynamic-content linux collapsible zip-installer

:installer-icon:`Install using ZIP file dkfhd`
----------------------------------------------

.. cssclass:: dynamic-content linux collapsible-content

1. Download the zip installer.
.. cssclass:: dynamic-content linux collapsible-content
`gauge-1.0.5-linux.x86_64.zip <https://github.com/getgauge/gauge/releases/download/v1.0.5/gauge-1.0.5-linux.x86_64.zip>`__
.. cssclass:: dynamic-content linux collapsible-content
2. Extract to a location and add it to system path using the following command.

.. cssclass:: dynamic-content linux collapsible-content
.. code-block:: console

    unzip -o gauge-1.0.5-linux.x86_64.zip -d /usr/local/bin

.. cssclass:: dynamic-content linux collapsible npm-installer

:installer-icon:`Install using NPM installation`
------------------------------------------------

.. cssclass:: dynamic-content linux collapsible-content
    System Requirements
    Node.js
    To install gauge using NPM you will need the latest node version.

        if you have Node.js already installed - to get the latest version use the following command:

        `npm install -g npm@latest`.

.. cssclass:: dynamic-content linux collapsible-content

You can install Gauge by running the following command in Terminal.

.. cssclass:: dynamic-content linux collapsible curl-installer

:installer-icon:`Install Using CURL`
------------------------------------

.. cssclass:: dynamic-content linux collapsible-content

Install Gauge to /usr/local/bin by running

.. cssclass:: dynamic-content linux collapsible-content
.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh

.. cssclass:: dynamic-content linux collapsible-content

Or install Gauge to a [custom path] using

.. cssclass:: dynamic-content linux collapsible-content
.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh -s -- --location-[custom path]

.. cssclass:: dynamic-content linux collapsible

:installer-icon:`Alternate Installation`
----------------------------------------

.. cssclass:: dynamic-content hidden linux collapsible-content

Nightly release are latest development snapshots of Gauge. They have the latest features being developed, but are unstable. Downnload the Gauge archive from here. Extract it to a location and add it to system path.

.. cssclass:: dynamic-content linux collapsible-content
.. code-block:: console

    [gauge-nightly]
    name-gauge-nightly
    baseurl-http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly
    gpgcheck-0
    enabled-1

.. cssclass:: dynamic-content linux collapsible-content

Use this command to do it in one step.

.. cssclass:: dynamic-content linux collapsible-content
.. code-block:: console

    echo -e \
    "[gauge-nightly]\nname-gauge-nightly\nbaseurl-http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck-0\nenabled-1" \
    | sudo tee /etc/yum.repos.d/gauge-nightly.repo

.. cssclass:: dynamic-content linux collapsible-content

Install Gauge using yum or dnf.

.. cssclass:: dynamic-content linux collapsible-content
.. code-block:: console

    sudo yum install gauge

.. cssclass:: dynamic-content linux collapsible-content
.. code-block:: console

    sudo dnf install gauge


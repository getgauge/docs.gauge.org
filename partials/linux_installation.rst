.. role:: alternate-methods
.. role:: installer-icon
.. role:: linux

.. cssclass:: dynamic-content linux

:linux:`Step 1: Installing Gauge on Linux`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Gauge can be installed on any flavour of Linux using the shell script. The Following steps will guide you to a quick install on a linux box.

:installer-icon:`Install Using Shell Script APT_GET`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. First, add Gauge's GPG key with this command:

.. code-block:: console

    sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B


2. Then add Gauge to the repository list using:

.. code-block:: console

    echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee -a /etc/apt/sources.list

.. code-block:: console

    sudo apt-get update && sudo apt-get install gauge

.. cssclass:: alternate-installation

:alternate-methods:`Alternate Installation Methods`

.. cssclass:: collapsible first

:installer-icon:`Install using DNF Package Manager`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

Install Gauge using dfn by running this command

.. cssclass:: toggle collapsible-content
.. code-block:: console

    sudo dnf install gauge


.. cssclass:: collapsible zip-installer

:installer-icon:`Install using ZIP file`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

    .. admonition:: System Requirements

        - Commandline tool (`unzip` command)

        - Terminal


    1. Download the zip installer.

        `Zip Installer <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip>`__

    2. Extract to a location and add it to system path using the following command.

.. cssclass:: toggle collapsible-content
.. custom-code-block:: console

    unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip -d /usr/local/bin

.. cssclass:: collapsible npm-installer

:installer-icon:`Install using NPM installation`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

    .. admonition:: System Requirements

        - `Node.js <nodejs.org>`__  >= 10.16.3 (LTS)

        - `NPM <npmjs.org>`__ >= (6.9.0)


        To install gauge using NPM you will need the latest node version.

            - `If you have Node.js already installed - to get the latest version of npm use the following command:`

            'npm install -g npm@latest'


    You can install Gauge by running the following command in Terminal.


.. cssclass:: toggle collapsible-content

.. code-block:: console

    npm install -g @getgauge/cli

.. cssclass:: collapsible curl-installer

:installer-icon:`Install Using CURL`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

    .. admonition:: System Requirements

        - Commandline tool (`curl` command)

        - Terminal


    Install Gauge to /usr/local/bin by running

.. cssclass:: toggle collapsible-content
.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh

.. cssclass:: toggle collapsible-content

Or install Gauge to a [custom path] using

.. cssclass:: toggle collapsible-content
.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh -s -- --location-[custom path]

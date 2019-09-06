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

    echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee - a /etc/apt/sources.list

.. code-block:: console

    sudo apt-get update
    sudo apt-get install gauge


.. note::
    Gauge automatically sends `telemetry data <https://gauge.org/telemetry>`__ to help us improve the product. If you prefer not to have this data sent, you can choose to  `opt out <https://manpage.gauge.org/gauge_telemetry.html>`__.


.. cssclass:: alternate-installation

:alternate-methods:`Alternate Installation Methods`

.. cssclass:: collapsible first

:installer-icon:`Install using DNF Package Manager`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

Install Gauge using dfn by running this command

.. cssclass:: toggle collapsible-content
.. code-block:: console

    echo -e "[gauge-nightly]\nname-gauge-nightly\nbaseurl-http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck-0\nenabled-1" | sudo tee /etc/yum.repos.d/gauge-nightly.repo

.. cssclass:: toggle collapsible-content
.. code-block:: console

    sudo dnf install gauge


.. cssclass:: collapsible zip-installer

:installer-icon:`Install using ZIP file`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

    1. Download the zip installer.

    `gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip>`__

    2. Extract to a location and add it to system path using the following command.

.. cssclass:: toggle collapsible-content
.. custom-code-block:: console

    unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip -d /usr/local/bin

.. cssclass:: collapsible npm-installer

:installer-icon:`Install using NPM installation`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

.. cssclass:: collapsible curl-installer

:installer-icon:`Install Using CURL`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

Install Gauge to /usr/local/bin by running

.. cssclass:: toggle collapsible-content
.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh

.. cssclass:: toggle collapsible-content

Or install Gauge to a [custom path] using

.. cssclass:: toggle collapsible-content
.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh -s -- --location-[custom path]

.. cssclass:: collapsible nightly-installer last

:installer-icon:`Nightly Installation`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

Nightly releases are latest development snapshots of Gauge. They have the latest features being developed, but are unstable.
Download the Gauge archive from `here <https://bintray.com/gauge/Gauge/Nightly/_latestVersion>`__.
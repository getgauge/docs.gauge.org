.. role:: installer-icon
.. role:: linux

.. cssclass:: dynamic-content linux

:linux:`Step 1: Installing Gauge on Linux`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use one of the following ways to install Gauge on your
linux distribution

:installer-icon:`Install Using CURL`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install Gauge to /usr/local/bin by running

.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh

Or install Gauge to a [custom path] using

.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh -s -- --location=[custom path]


:installer-icon:`Install using NPM`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can install Gauge by running the following command in Terminal.

.. code-block:: console

    npm install -g @getgauge/cli


:installer-icon:`Install using ZIP file`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download the `Zip Installer <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip>`__
Extract to a location and add it to system path using the following command.

.. custom-code-block:: console

    unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip -d /usr/local/bin



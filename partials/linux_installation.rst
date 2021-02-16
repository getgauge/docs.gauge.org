.. role:: installer-icon
.. role:: linux

.. cssclass:: dynamic-content linux

:linux:`Step 1: Installing Gauge on Linux`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use one of the following ways to install Gauge on your
linux distribution

:installer-icon:`Install Using Shell Script APT-GET`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

    sudo gpg --no-default-keyring --keyring /usr/share/keyrings/gauge-archive-keyring.gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B
    sudo bash -c "echo deb [signed-by=/usr/share/keyrings/gauge-archive-keyring.gpg] https://dl.bintray.com/gauge/gauge-deb stable main > /etc/apt/sources.list.d/gauge.list"
    sudo apt-get update && sudo apt-get install gauge

Deprecated APT-KEY
""""""""""""""""""

The command ``apt-key`` is now considered deprecated. If you installed Gauge before February 2021, you should remove the globally imported Gauge key using

.. code-block:: console

    sudo gpg --no-default-keyring --keyring /etc/apt/trusted.gpg --delete-key 023EDB0B

and also remove the ``gauge-deb`` line from ``/etc/apt/sources.list`` to avoid a duplicate warning during ``apt-get update`` (W: Target Packages (...) is configured multiple times in /etc/apt/sources.list ...)

.. code-block:: console

    sudo sed --in-place '/https:\/\/dl.bintray.com\/gauge\/gauge-deb/d' /etc/apt/sources.list


:installer-icon:`Install Using NPM`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can install Gauge by running the following command in Terminal.

.. code-block:: console

    npm install -g @getgauge/cli


:installer-icon:`Install Using DNF Package Manager`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install Gauge using dnf by running this command

.. code-block:: console

    sudo dnf install gauge


:installer-icon:`Install Using ZIP file`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download the `Zip Installer <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip>`__
Extract to a location and add it to system path using the following command.

.. custom-code-block:: console

    unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip -d /usr/local/bin


:installer-icon:`Install Using CURL`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install Gauge to /usr/local/bin by running

.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh

Or install Gauge to a [custom path] using

.. code-block:: console

    curl -SsL https://downloads.gauge.org/stable | sh -s -- --location-[custom path]

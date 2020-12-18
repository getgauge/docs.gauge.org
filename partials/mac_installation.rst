.. role:: alternate-methods
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


.. code-block:: text

    ==> Downloading https://homebrew.bintray.com/bottles/gauge-1.0.6.mojave.bottle.tar.gz
    ==> Downloading from https://akamai.bintray.com/45/45b496b39ee682a95ca49b36a94e8041e03fca3644e80223c36539f495fee384?__gda__=exp=1568017021~hmac=f6ca3a9
    ######################################################################## 100.0%
    ==> Pouring gauge-1.0.6.mojave.bottle.tar.gz
    🍺  /usr/local/Cellar/gauge/1.0.6: 3 files, 18.5MB

.. cssclass:: alternate-installation

:macos:`Alternate installation methods for MacOS`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also use any of these other ways to install Gauge

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


.. code-block:: console

    npm install -g @getgauge/cli

:installer-icon:`Install using CURL`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

    .. admonition:: System Requirements

        - macOS >= Mac OS X v10.6

        - Commandline tool (`curl` command)

        - Terminal


    Install Gauge to /usr/local/bin by running

.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh


Or install Gauge to a [custom path] using

.. code-block:: console

    curl -Ssl https://downloads.gauge.org/stable | sh -- --location=[custom path]

:installer-icon:`Install using ZIP file`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: toggle collapsible-content

    .. admonition:: System Requirements

        - macOS >= Mac OS X v10.6

        - Commandline tool (`unzip` command)

        - Terminal

Download the `Zip Installer <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip>`__
and run the following command to complete the installation.

.. code-block:: console

    unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip -d /usr/local/bin


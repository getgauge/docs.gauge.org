.. role:: installer-icon
.. role:: windows
.. role:: alternate-methods

.. cssclass:: dynamic-content windows

:windows:`Step 1: Installing Gauge on Windows`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section gives specific instructions on setting up Gauge in a Microsoft Windows environment.
You can choose any ONE of the following.

:installer-icon:`Install using Windows Installer`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download the following installation bundle to get the latest stable release of Gauge.

.. cssclass:: extension-link download-icon

`Windows Installer <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-windows.x86_64.exe>`__

.. figure:: ../images/windows/installer.png
      :alt: Windows installer

Once you finished installing Gauge, you can go ahead and `install the Gauge Extension for VS Code Plugin <#step-2-installing-gauge-extension-for-vscode>`__

:installer-icon:`Install using Chocolatey Package Manager`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For this to work, you will need to install `Chocolatey Package Manager <https://chocolatey.org/>`__. 
If you have chocolatey installed then all you need to is to follow the steps below, 
it will download and install Gauge.

* Open your Windows Command Prompt as administrator
* In Search type, "cmd"
* Then click on "Command Prompt"
* Type the following command in your Command Prompt to install Gauge.

.. code-block:: console

    choco install gauge

:installer-icon:`Install using Zip file`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download the following `Zip Installer <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-windows.x86_64.zip>`__
extract it to a location and add it to system path using the following command in `Powershell <https://docs.microsoft.com/en-us/powershell/>`__.

.. custom-code-block:: console

    Expand-Archive -Path gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-windows.x86_64.zip -DestinationPath custom_path

:installer-icon:`Install using NPM installation`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To install gauge using NPM you will need the latest node version.
You can install Gauge by running the following command in Terminal.

.. code-block:: console

    npm install -g @getgauge/cli

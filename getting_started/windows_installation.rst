.. cssclass:: dynamic-content  windows

Step1: Installing Gauge on Windows
==================================

This section gives specific instructions on setting up Gauge in a Microsoft Windows environment.
You can install Gauge using any of the following methods. We recommed using Windows Installer


.. cssclass:: dynamic-content  windows collapsible

Windows Installer
-----------------
.. cssclass:: dynamic-content windows content

Download the following installation bundle to get the latest stable release of Gauge.

.. cssclass:: dynamic-content windows content

`windows Installer <gauge-1.0.5-windows.x86_64.exe>`__

.. cssclass:: dynamic-content  windows collapsible

Chocolatey Package Manager
--------------------------
.. cssclass:: dynamic-content windows content

    System Requirements
    `Chocolatey Package Manager <https://chocolatey.org/>`__

.. cssclass:: dynamic-content windows content

For this to work, you will need to install Chocolatey. If you have chocolatey installed then all you need to is to follow the steps below, it will download and install Gauge.
Note:
Some of the following instructions mention the 'command prompt'. Where this is used, it refers to the Windows cmd.

.. cssclass:: dynamic-content windows content

* To open your Command Prompt, click your Start Button
* In Search type, "cmd"
* Then click on "Command Prompt"
* Type the following command in your Command Prompt to install Gauge.

.. cssclass:: dynamic-content windows content

.. code-block:: console

    choco install gauge

.. cssclass:: dynamic-content  windows collapsible

Zip file
--------

.. cssclass:: dynamic-content windows content

Download the following zip installer.
    `gauge-1.0.5-windows.x86_64.zip <https://github.com/getgauge/gauge/releases/download/v1.0.5/gauge-1.0.5-windows.x86_64.zip>`__

.. cssclass:: dynamic-content windows content

2. Extract it to a location and add it to system path using the following command in `Powershell <https://docs.microsoft.com/en-us/powershell/>`__.

.. cssclass:: dynamic-content windows content

.. code-block:: console

    PS>  Expand-Archive -Path gauge-1.0.5-windows.x86_64.zip -DestinationPath custom_path


.. cssclass:: dynamic-content  windows collapsible

NPM install
-----------

.. cssclass:: dynamic-content windows content

    System Requirements
    Node.js
    To install gauge using NPM you will need the latest node version.

        if you have Node.js already installed - to get the latest version use the following command:

        `npm install -g npm@latest`.

.. cssclass:: dynamic-content windows content

You can install Gauge by running the following command in Powershell/Command Prompt.

.. cssclass:: dynamic-content windows content
.. code-block:: console

    npm install -g @getgauge/cli



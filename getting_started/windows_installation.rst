.. cssclass:: hidden, windows

Step1: Installing Gauge on Windows
==================================


This section gives specific instructions on setting up Gauge in a Microsoft Windows environment.
You can install Gauge using any of the following methods. We recommed using Windows Installer


.. cssclass:: hidden, windows

Windows Installer
=================

Download the following installation bundle to get the latest stable release of Gauge.

    `windows Installer <gauge-1.0.5-windows.x86_64.exe>`__

.. cssclass:: hidden, windows

Chocolatey Package Manager
==========================

    System Requirements
    `Chocolatey Package Manager <https://chocolatey.org/>`__

For this to work, you will need to install Chocolatey. If you have chocolatey installed then all you need to is to follow the steps below, it will download and install Gauge.

    Note:

    Some of the following instructions mention the 'command prompt'. Where this is used, it refers to the Windows cmd.

* To open your Command Prompt, click your Start Button
* In Search type, "cmd"
* Then click on "Command Prompt"
* Type the following command in your Command Prompt to install Gauge.

.. code-block:: console

    choco install gauge

.. cssclass:: hidden, windows

Zip file
========

Download the following zip installer.
    `gauge-1.0.5-windows.x86_64.zip <https://github.com/getgauge/gauge/releases/download/v1.0.5/gauge-1.0.5-windows.x86_64.zip>`__

2. Extract it to a location and add it to system path using the following command in `Powershell <https://docs.microsoft.com/en-us/powershell/>`__.

.. code-block:: console

    PS>  Expand-Archive -Path gauge-1.0.5-windows.x86_64.zip -DestinationPath custom_path



.. cssclass:: hidden, windows

NPM install
===========


    System Requirements
    Node.js
    To install gauge using NPM you will need the latest node version.

        if you have Node.js already installed - to get the latest version use the following command:

        `npm install -g npm@latest`.

You can install Gauge by running the following command in Powershell/Command Prompt.


.. code-block:: console

    npm install -g @getgauge/cli

.. cssclass:: hidden, windows

Alternate methods
=================

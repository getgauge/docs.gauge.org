.. role:: installer-icon
.. role:: windows
.. role:: alternate-methods
.. cssclass:: dynamic-content windows

:windows:`Step 1: Installing Gauge on Windows`
==============================================

This section gives specific instructions on setting up Gauge in a Microsoft Windows environment.

.. cssclass:: dynamic-content windows

:installer-icon:`Install using Windows Installer`
--------------------------------------------------

Download the following installation bundle to get the latest stable release of Gauge.

.. cssclass:: dynamic-content windows extension-link download-icon

`windows Installer <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-windows.x86_64.exe>`__

.. figure:: ../images/windows/installer.png
      :alt: Windows installer

Once you finished installing Gauge, you can go ahead and `install the Gauge Extension for VS Code Plugin <#step-2-installing-gauge-extension-for-vscode>`__

.. cssclass:: dynamic-content windows

.. note::
    Gauge automatically sends `telemetry data <https://gauge.org/telemetry>`__ to help us improve the product. If you prefer not to have this data sent, you can choose to  `opt out <https://manpage.gauge.org/gauge_telemetry.html>`__.


.. cssclass:: dynamic-content windows alternate-installation

:alternate-methods:`Alternate Installation Methods`

.. cssclass:: dynamic-content windows collapsible first

:installer-icon:`Install using Chocolatey Package Manager`
----------------------------------------------------------

.. cssclass:: dynamic-content windows code-block collapsible-content

    .. admonition:: System Requirements

        `Chocolatey Package Manager <https://chocolatey.org/>`__


    For this to work, you will need to install Chocolatey. If you have chocolatey installed then all you need to is to follow the steps below, it will download and install Gauge.


.. cssclass:: dynamic-content windows collapsible-content
.. note::
    Some of the following instructions mention the "command prompt". Where this is used, it refers to the Windows cmd.

.. cssclass:: dynamic-content windows collapsible-content

* To open your Command Prompt, click your Start Button
* In Search type, "cmd"
* Then click on "Command Prompt"
* Type the following command in your Command Prompt to install Gauge.

.. cssclass:: dynamic-content windows collapsible-content
.. code-block:: console

    choco install gauge

.. cssclass:: dynamic-content windows collapsible zip-installer

:installer-icon:`Install using Zip file`
----------------------------------------

.. cssclass:: dynamic-content windows collapsible-content

Download the following zip installer.

.. cssclass:: dynamic-content windows collapsible-content extension-link

`gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-windows.x86_64.zip <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-windows.x86_64.zip>`__

.. cssclass:: dynamic-content windows collapsible-content

2. Extract it to a location and add it to system path using the following command in `Powershell <https://docs.microsoft.com/en-us/powershell/>`__.

.. cssclass:: dynamic-content windows collapsible-content

.. code-block:: console

    Expand-Archive -Path gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-windows.x86_64.zip -DestinationPath custom_path


.. cssclass:: dynamic-content windows collapsible npm-installer

:installer-icon:`Install using NPM installation`
------------------------------------------------

.. cssclass:: dynamic-content windows collapsible-content

    .. admonition:: System Requirements

        `Node.js <nodejs.org>`__


        To install gauge using NPM you will need the latest node version.

            - `If you have Node.js already installed - to get the latest version of npm use the following command:`

            'npm install -g npm@latest'


    You can install Gauge by running the following command in Terminal.


.. cssclass:: dynamic-content windows collapsible-content

.. code-block:: console

    npm install -g @getgauge/cli



.. cssclass:: dynamic-content windows collapsible nightly-installer last

:installer-icon:`Nightly Installation`
--------------------------------------

.. cssclass:: dynamic-content windows collapsible-content

Nightly releases are latest development snapshots of Gauge. They have the latest features being developed, but are unstable.
Download the Gauge archive from `here <https://bintray.com/gauge/Gauge/Nightly/_latestVersion>`__.
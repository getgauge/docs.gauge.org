.. _advanced_installation:

Installation
============

This page provides information about installing Gauge. If you are new to Gauge, we recommend that you refer to the `Getting Started <https://gauge.org/get_started>`__ guide.

.. _install_gauge:

Install Gauge for your OS (Operating System)
--------------------------------------------

| You can install Gauge on your OS by using the package managers or certain commands for that particular OS. Alternately, for some of the Operating Systems, you can also install Gauge by downloading the latest Gauge release to a location on your system.
| Both the methods are listed on this page, you can choose whatever suits your requirements.


.. tab-container:: platforms

    .. tab:: Windows

       Gauge can be installed by using `Chocolatey <https://chocolatey.org/>`__ .

       Install Gauge at the command line prompt of your OS by using the following command:

        .. code-block:: console

           choco install gauge

    .. tab:: macOS

       Install Gauge by using `Homebrew <https://brew.sh/>`__.

        .. code-block:: console

           brew update
           brew install gauge

        .. note:: 
           If Gauge installation fails, upgrade Homebrew to the latest version and install Gauge again.

    .. tab:: Debian/APT

        You can install Gauge on any flavour of Linux by using the shell script. 

        Use the following steps to perform a quick install on a Linux system.

        1. Add Gauge's GPG key by using the following command:

        .. code-block:: console

           sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B

        2. Add Gauge to the repository list by using the following command:

        .. code-block:: console

           echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee -a /etc/apt/sources.list

        3. Install Gauge by using the following command:

        .. code-block:: console

           sudo apt-get update
           sudo apt-get install gauge

    .. tab:: YUM/DNF

        You can install Gauge on any flavour of Linux by using the shell script. 
        
        Install Gauge by using the following command:

        .. code-block:: console

           echo -e "[gauge-stable]\nname=gauge-stable\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-stable\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-stable.repo
           sudo dnf install gauge

    .. tab:: Freebsd

        Download the latest `Gauge release <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-freebsd.x86_64.zip>`__ and then run the following command:

        .. custom-code-block:: console

           unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-freebsd.x86_64.zip -d /usr/local/bin


    .. tab:: Curl

        Install Gauge to ``/usr/local/bin`` by using the following command:

        .. code-block:: console

           curl -SsL https://downloads.gauge.org/stable | sh

        Or 
        
        Install Gauge to a location of your choice on your system by using the following command:

        .. code-block:: console

           curl -SsL https://downloads.gauge.org/stable | sh -s -- --location=[custom path]

        ``[custom path]``: location of your choice on your system

    .. tab:: NPM

        Install Gauge by using the following command:

        .. code-block:: console

           npm install -g @getgauge/cli


.. note::
    Gauge automatically sends `telemetry data <https://gauge.org/telemetry>`__ to help us improve the product. If you prefer not to have this data sent, you can choose to  `opt out <https://manpage.gauge.org/gauge_telemetry.html>`__.

Alternately, you could also choose to install Gauge on your system by downloading the latest Gauge release from GitHub to a location on your system.

.. tab-container:: platforms

    .. tab:: Windows

        Download the `latest Gauge release <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-windows.x86_64.zip>`__ and then run the following command in PowerShell:

        .. custom-code-block:: console

           PS> Expand-Archive -Path gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-windows.x86_64.zip -DestinationPath [custom_path]
        
        ``[custom_path]`` - a location of your choice on your system

        For more information about PowerShell commands, see the appropriate PowerShell documentation.

    .. tab:: macOS

        For signed binaries, download the `latest Gauge release <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip>`__ and the run following command:

        .. custom-code-block:: console

           unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-darwin.x86_64.zip -d /usr/local/bin


    .. tab:: Debian/APT

        You can install Gauge on any flavour of Linux by using the shell script. 

        Download the `latest Gauge release <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip>`__ and then run following command:

        .. custom-code-block:: console

           unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip -d /usr/local/bin

    .. tab:: YUM/DNF

        You can install Gauge on any flavour of Linux by using the shell script. 
        
        Download the `latest Gauge release <https://github.com/getgauge/gauge/releases/download/vGAUGE_LATEST_VERSION_PLACEHOLDER/gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip>`__ and then run the following command:

        .. custom-code-block:: console

           unzip -o gauge-GAUGE_LATEST_VERSION_PLACEHOLDER-linux.x86_64.zip -d /usr/local/bin


Nightly releases
--------------------

Nightly releases are latest development snapshots of Gauge. If you choose to install the nightly releases, you can find the latest version of Gauge nightly releases `here <https://bintray.com/gauge/Gauge/Nightly/>`__. 

.. ATTENTION:: Nightly releases include latest features of Gauge, which are under development, hence the release can be unstable. 

Installing nightly releases on Linux systems
............................................

To install nightly releases on Linux systems, perform the following steps:

1. Create ``/etc/yum.repos.d/gauge-nightly.repo`` by using the following commands:

.. code-block:: text

    [gauge-nightly]
    name=gauge-nightly
    baseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly
    gpgcheck=0
    enabled=1

Alternately, you can also use the following command to create ``/etc/yum.repos.d/gauge-nightly.repo`` in a single step:

.. code-block:: console

    echo -e "[gauge-nightly]\nname=gauge-nightly\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-nightly.repo

2. Install Gauge by using ``yum`` or ``dnf``.

.. code-block:: console

    sudo yum install gauge

.. code-block:: console

    sudo dnf install gauge

.. note::
   If you choose to install plugins that are supported by Gauge, see :ref:`install_plugins`.

Verify paths after Gauge Installation
----------------------------------------

.. admonition:: Postrequisite

   After installing Gauge on your system, you must verify the location at which Gauge and Gauge plugins are installed.

.. tab-container:: platforms

    .. tab:: Windows

       Ensure the following:

       - The default installation location of Gauge is ``%ProgramFiles%\gauge``.
       - ``gauge_install_location\bin`` must be in ``PATH`` to run from the command line.
       - If you have installed plugins, then Gauge plugins are installed at ``%APPDATA%\gauge\plugins`` directory.
       - ``%APPDATA%`` directory is located at ``C:\Users\USER_NAME\AppData\Roaming``.


    .. tab:: macOS

       Ensure the following:

       - The default installation location of Gauge is ``/usr/local/``.
       - ``usr/local/bin/`` or ``[custom_install_location]/bin`` must be in ``PATH``.
       - If you have installed plugins, then Gauge plugins are installed under ``~/.gauge/plugins`` directory.
       
       ``[custom_install_location]`` - a location of your choice on your system
        
    .. tab:: Debian/APT

       Ensure the following:

       - The default installation location of Gauge is ``/usr/local/``.
       - ``usr/local/bin/`` or ``[custom_install_location]/bin`` must be in ``PATH``.
       - If you have installed plugins, then Gauge plugins are installed under ``~/.gauge/plugins`` directory.

       ``[custom_install_location]`` - a location of your choice on your system

    .. tab:: YUM/DNF

       Ensure the following:

       - The default installation location of Gauge is ``/usr/local/``.
       - ``usr/local/bin/`` or ``[custom_install_location]/bin`` must be in ``PATH``.
       - If you have installed plugins, then Gauge plugins are installed under ``~/.gauge/plugins`` directory.

       ``[custom_install_location]`` - a location of your choice on your system

Project Templates
-----------------

Gauge hosts a list of project templates to help you set up specific type of projects depending on the language of your tests.

Run the following command to see the list of updated available templates:

.. code-block:: console

    gauge init --templates


Uninstall Gauge for your OS
------------------------------

.. admonition:: Prerequisite
    
   Remove the Plugins before uninstalling Gauge. For information about removing plugins, see :ref:`plugins-uninstallation`.
    
   While uninstalling Gauge, you must remove the Gauge folder (~/.gauge in Mac/Linux and in %APPDATA%\Gauge in windows) manually. This folder contains Gauge config, logs and plugins.

    
.. tab-container:: platforms

    .. tab:: Windows

        Uninstall Gauge by using `Chocolatey <https://github.com/chocolatey/choco/wiki/CommandsUninstall>`__ .

        .. code-block:: console

            choco uninstall gauge

    .. tab:: macOS

        Uninstall Gauge by using `HomeBrew <https://docs.brew.sh/FAQ.html#how-do-i-uninstall-a-formula>`__ .

        .. code-block:: console

            brew uninstall gauge

    .. tab:: Debian/APT

        Uninstall Gauge by using the `apt-get <https://linux.die.net/man/8/apt-get>`__ command:

        .. code-block:: console

            sudo apt-get remove gauge

    .. tab:: YUM/DNF

        You can uninstall Gauge in one of the following ways:

        Uninstall by using ``yum``.

        .. code-block:: console

            yum remove gauge

        OR

        Uninstall by using ``dnf``.

        .. code-block:: console

            dnf remove gauge

    .. tab:: Freebsd

        Delete the Gauge files from the installed location.
        

    .. tab:: Curl

        Delete the Gauge files from the installed location.

    .. tab:: NPM

        Uninstall Gauge by using ``npm``.

        .. code-block:: console

            npm uninstall -g @getgauge/cli

.. note::
    If you have installed Gauge on your system by downloading the Gauge release from GitHub, then delete the Gauge files from the installed location.
    
Logs
----

-  Gauge logs are created in the ``logs`` directory in the Gauge project.
-  Three log files are created
    -  gauge.log - This log file contains information about test execution.
    -  api.log - This log file contains information about Gauge core API that are exposed for plugins.
    -  lsp.log - This log file contains information about Gauge when Gauge is launched in LSP (Language Server Protocol) mode.

-  To customize logs directory, set the ``logs_directory`` property in the ``env/default/default.properties`` file to a custom logs directory path.

.. code-block:: text

    logs_directory = my_logs_dir

-  For non-project specific actions such as plugin installation, log
   files are created in the following location:

.. code-block:: text

     Windows - %APPDATA%\gauge\logs
     MacOS*  - <user_home>/.gauge/logs
     Linux   - <user_home>/.gauge/logs

.. _advanced_installation:

Installation
============

This page provides information about installing Gauge. If you are new to Gauge, we recommend that you refer to the `Getting Started <//gauge.org/get_started>`__ guide.


Install Gauge for your OS (Operating System)
--------------------------------------------

.. tab-container:: platforms

    .. tab:: Windows

        Ensure the following:

        - The default installation location of Gauge is ``%ProgramFiles%\gauge``.
        - ``gauge_install_location\bin`` must be in ``PATH`` to run from the command line.
        - Gauge plugins are installed at ``%APPDATA%\gauge\plugins`` directory.
        - APPDATA directory is located at ``C:\Users\USER_NAME\AppData\Roaming``.

        **1. Chocolatey**

        Install Gauge by using `Chocolatey <https://chocolatey.org/>`__ .

        .. code-block:: console

            choco install gauge

        **2. ZIP File**

        `Download the zip installer <https://github.com/getgauge/gauge/releases/download/v1.0.5/gauge-1.0.5-windows.x86_64.zip>`__ and the run following command in powershell

        .. code-block:: console

            PS> Expand-Archive -Path gauge-1.0.5-windows.x86_64.zip -DestinationPath custom_path

    .. tab:: macOS

        Ensure the following:

        - The default installation location of Gauge is ``/usr/local/``.
        - ``usr/local/bin/`` or ``custom_install_location/bin`` must be in ``PATH``.
        - Gauge plugins are installed under ``~/.gauge/plugins`` directory.

        **1. Homebrew**

        Install Gauge by using `Homebrew <https://brew.sh/>`__.

        .. code-block:: console

            brew update
            brew install gauge

        .. note:: 
            If Gauge installation fails, upgrade Homebrew to the latest version and install Gauge again.

        **2. ZIP File**

        For signed binaries `download the zip installer <https://github.com/getgauge/gauge/releases/download/v1.0.5/gauge-1.0.5-darwin.x86_64.zip>`__ and the run following command

        .. code-block:: console

            unzip -o gauge-1.0.5-darwin.x86_64.zip -d /usr/local/bin


    .. tab:: Debian/APT

        You can install Gauge on any flavour of Linux by using the shell script. 

        Ensure the following:

        - The default installation location of Gauge is ``/usr/local/``.
        - ``usr/local/bin/`` or ``custom_install_location/bin`` must be in ``PATH``.
        - Gauge plugins are installed under ``~/.gauge/plugins`` directory.

        Use the following steps to perform a quick install on a Linux system.

        **1. APT-GET**

        Add Gauge's GPG key by using the following command:

        .. code-block:: console

            sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B

        Add Gauge to the repository list by using the following command:

        .. code-block:: console

            echo deb https://dl.bintray.com/gauge/gauge-deb nightly main | sudo tee -a /etc/apt/sources.list

        Install Gauge by using the following command:

        .. code-block:: console

            sudo apt-get update
            sudo apt-get install gauge


        **2. ZIP Download**

        `Download the zip installer <https://github.com/getgauge/gauge/releases/download/v1.0.5/gauge-1.0.5-linux.x86_64.zip>`__ and then run following command

        .. code-block:: console

            unzip -o gauge-1.0.5-linux.x86_64.zip -d /usr/local/bin


    .. tab:: YUM/DNF

        You can install Gauge on any flavour of Linux by using the shell script. 
        
        Ensure the following:

        - The default installation location of Gauge is ``/usr/local/``.
        - ``usr/local/bin/`` or ``custom_install_location/bin`` must be in ``PATH``.
        - Gauge plugins are installed under ``~/.gauge/plugins`` directory.

        Use the following steps to perform a quick install on a Linux system:

        **1. DNF**

        Install Gauge by using the following command:

        .. code-block:: console

            echo -e "[gauge-stable]\nname=gauge-stable\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-stable\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-stable.repo
            sudo dnf install gauge

        **2. ZIP Download**

        `Download the zip installer <https://github.com/getgauge/gauge/releases/download/v1.0.5/gauge-1.0.5-linux.x86_64.zip>`__ and then run the following command:

        .. code-block:: console

            unzip -o gauge-1.0.5-linux.x86_64.zip -d /usr/local/bin

    .. tab:: Freebsd

        Download the `zip installer <https://github.com/getgauge/gauge/releases/download/v1.0.5/gauge-1.0.5-freebsd.x86_64.zip>`__ and then run following command.

        .. code-block:: console

            unzip -o gauge-1.0.5-freebsd.x86_64.zip -d /usr/local/bin


    .. tab:: Curl

        You can install Gauge in the following ways:

        Install Gauge to ``/usr/local/bin`` by using the following command:

        .. code-block:: console

            curl -SsL https://downloads.gauge.org/stable | sh

        Or 
        
        Install Gauge to a ``[custom path]`` by using the following command:

        .. code-block:: console

            curl -SsL https://downloads.gauge.org/stable | sh -s -- --location=[custom path]

    .. tab:: NPM

        1. Install the `LTS (Long Term Support) version of the Node <https://nodejs.org/en/>`_ by using the following command:

        .. code-block:: console

            npm install -g npm@latest

        2. Install Gauge by using the following command:

        .. code-block:: console

            npm install -g @getgauge/cli


.. note::
    Gauge automatically sends `telemetry data <https://gauge.org/telemetry>`__ to help us improve the product. If you prefer not to have this data sent, you can choose to turn off the telemetry by using the ``gauge telemetry off`` command. For more information about the ``gauge telemetry`` commands, see the `man page <https://manpage.gauge.org/gauge_telemetry.html>`__.


Alternate Installation Methods
------------------------------

You can also install Gauge on your system in the following different ways:

**Offline Installation**

1. Download the latest version of Gauge from `here <https://github.com/getgauge/gauge/releases/latest>`__. 

2. Extract the files to a location on your system and add the files to your system path.

**Nightly installation**

Nightly releases are latest development snapshots of Gauge. 

.. ATTENTION:: Nightly releases include latest features of Gauge, which are under development, hence the release can be unstable. 

1. Download the latest version of Gauge from `here <https://bintray.com/gauge/Gauge/Nightly/>`__. 

2. Extract the files to a location on your system and add the files to your system path.

For nightly installation on Linux systems, perform the following steps:

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

Project Templates
-----------------

Gauge hosts a list of project templates to help you set up specific type of projects depending on the language of your tests.

Run the following command to see the list of updated available templates:

.. code-block:: console

    gauge init --templates


Uninstall Gauge for your OS
---------------------------

.. important::
    
    Remove the Plugins before uninstalling Gauge. For information about removing plugins, see .
.. Deepti - need to cross reference to plugin page    
    
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

        Uninstall by using `yum <https://www.centos.org/docs/5/html/5.1/Deployment_Guide/s1-yum-useful-commands.html>`__ .

        .. code-block:: console

            yum remove gauge

        OR

        Uninstall by using ``dnf``.

        .. code-block:: console

            dnf remove gauge

    .. tab:: Zip

        Remove the `gauge` binary from the location at which you have installed Gauge.
        You can also remove the entry from `PATH` that was added during installation.

    .. tab:: Curl

        Remove the `gauge` binary from installed location.
        The entry from `PATH` that was added during installation, can also be removed.

    .. tab:: NPM

        Uninstall Gauge by using ``npm``.

        .. code-block:: console

            npm uninstall -g @getgauge/cli

.. note::
    If Gauge is installed in custom location, remove corresponding files or directories.
    
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

.. _advanced_installation:

Installation
============

.. note:: 
    For recommended installation, refer `Getting Started <//gauge.org/get_started>`__.
    This page lists alternate methods of installing Gauge and plugins.

Gauge
-----

.. tab-container:: platforms

    .. tab:: Windows

        **Offline Installation**

        Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

        **Nightly installation**

        Nightly releases are latest development snapshots of Gauge. They have
        the latest features being developed, but are unstable.

        Download the Gauge archive from `here <https://bintray.com/gauge/Gauge/Nightly/>`__. Extract it to a location and add it to system path.

    .. tab:: macOS

        **Offline Installation**

        Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.


        **Nightly installation**

        Nightly releases are latest development snapshots of Gauge. They have
        the latest features being developed, but are unstable.

        Download the Gauge archive from `here <https://bintray.com/gauge/Gauge/Nightly/>`__. Extract it to a location and add it to system path.

    .. tab:: Debian/APT

        **Offline Installation**

        Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

        **Nightly Installation**

        Nightly releases are latest development snapshots of Gauge. They have
        the latest features being developed, but are unstable.

        Add Gauge's GPG key:

        .. code-block:: console

            sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B

        Add to repository list:

        .. code-block:: console

            echo deb https://dl.bintray.com/gauge/gauge-deb nightly main | sudo tee -a /etc/apt/sources.list

        Install

        .. code-block:: console

            sudo apt-get update
            sudo apt-get install gauge

    .. tab:: YUM/DNF

        **Offline Installation**

        Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

        **Nightly Installation**

        Nightly releases are latest development snapshots of Gauge. They have
        the latest features being developed, but are unstable.

        ``create /etc/yum.repos.d/gauge-nightly.repo`` with the following content:

        .. code-block:: text

            [gauge-nightly]
            name=gauge-nightly
            baseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly
            gpgcheck=0
            enabled=1

        Use this command to do it in one step:

        .. code-block:: console

            echo -e "[gauge-nightly]\nname=gauge-nightly\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-nightly.repo

        Install

        .. code-block:: console

            sudo yum install gauge

        or

        .. code-block:: console

            sudo dnf install gauge

    .. tab:: Zip

        **Nightly Installation**

        Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

    .. tab:: Curl

        To install at custom location

        .. code-block:: console

            curl -SsL https://downloads.gauge.org/stable | sh -s -- --location=[custom path]

    .. note:: Having trouble with installation? Head over to our :ref:`installation-faq` FAQ's.


.. _install_plugins:

Plugins
-------

Plugins are an easy way to extend the features of Gauge. There are
various types of plugins that Gauge currently supports.

Language Runner
^^^^^^^^^^^^^^^

Language plugins enable the users to write the implementation of specs in a language of their choice. 

.. _install-language-runner:

.. tab-container:: languages

    .. tab:: CSharp

            to use .Net Framework as runtime

            .. code-block:: console

                gauge install csharp

            Read more `here <https://github.com/getgauge/gauge-csharp>`__

            to use .Net Core as runtime

            .. code-block:: console

                gauge install dotnet

            Read more `here <https://github.com/getgauge/gauge-dotnet>`__


    .. tab:: Java

        .. code-block:: console

            gauge install java

        Read more `here <https://github.com/getgauge/gauge-java>`__

    .. tab:: JavaScript

        .. code-block:: console

            gauge install js

        Read more `here <https://github.com/getgauge/gauge-js>`__

    .. tab:: Python

        .. code-block:: console

            gauge install python

        Read more `here <https://github.com/getgauge/gauge-python>`__

    .. tab:: Ruby

        .. code-block:: console

            gauge install ruby

        Read more `here <https://github.com/getgauge/gauge-ruby>`__

.. _reporting_plugins:

Reporting Plugins
^^^^^^^^^^^^^^^^^

Reporting plugins generate execution reports in various formats.


.. tab-container:: reports

    .. tab:: Html-Report

        .. code-block:: console

            gauge install html-report

        Read more `here <https://github.com/getgauge/html-report>`__

    .. tab:: Xml-Report

        .. code-block:: console

            gauge install xml-report

        Read more `here <https://github.com/getgauge/xml-report>`__

.. _documentation_plugins:

Documentation Plugins
^^^^^^^^^^^^^^^^^^^^^

Documentation plugins generate readable and easy to navigate documentation from the specs.

.. tab-container:: documentation

    .. tab:: Spectacle

        .. code-block:: console

            gauge install spectacle

        Read more `here <https://github.com/getgauge/spectacle>`__


Install a specific plugin version 
---------------------------------

To install a specific version of a plugin use the ``--version`` flag.

.. code-block:: console

    gauge install html-report --version 2.1.0


Add plugin to a project
-----------------------

Run ``gauge install <plugin_name>`` from within the project directory, to install
the plugin and add it to project. If plugin is already installed it just add it to the project.


Offline Installation of Plugin
------------------------------

Any Gauge plugin can be installed from a zip file instead of downloading
from plugin repository by using the ``--file`` or ``-f`` flag.

.. code-block:: console

    gauge install html-report --file ZIP_FILE_PATH

Download the latest version of plugin from the ``Releases`` section of
the respective repository. See `plugin list <//gauge.org/plugins/>`__ to
find the repositories.

Updating plugins
----------------

Run ``gauge update <plugin_name>`` to update the plugin. 
This downloads the latest compatible plugin from our plugin repository.

.. note:: 
    Every Gauge plugin when published, has metadata indicating the ``min`` and ``max`` version of Gauge that
    it is compatible with. This is used when installing plugin on a system running a particular gauge version.

**Example:**

.. code-block:: console

    gauge update java

To update a plugin to a specific version, use the ``--version``
flag.

.. code-block:: console

    gauge update java --version 0.3.2

You can also update all the installed plugins by running

.. code-block:: console

    gauge update --all

Read the :ref:`Installation troubleshooting <troubleshoot_plugin_installation>` for more.

.. note::

    The html-report and screenshot plugins are installed automatically on the first run.

Discovering Project templates
-----------------------------

Gauge hosts a list of project templates, to help setup specific type of projects. 
Run ``gauge init --templates`` to see the list of available templates.


Build Tools
-----------

-  `Maven <https://github.com/getgauge/gauge-maven-plugin>`__
-  `Gradle <https://github.com/manupsunny/gauge-gradle-plugin>`__


Uninstall Gauge
---------------

.. warning::
   - The Gauge folder(~/.gauge in Mac/Linux and in %APPDATA%\Gauge in windows) has to be removed manually.
        This folder contains Gauge config, logs and plugins.
   - Plugins should be removed before uninstalling gauge. Follow the steps in :ref:`plugins-uninstallation`.

.. tab-container:: platforms

    .. tab:: Windows

        Uninstallation using `chocolatey <https://github.com/chocolatey/choco/wiki/CommandsUninstall>`__

        .. code-block:: console

            choco uninstall gauge

    .. tab:: macOS

        Uninstallation using `HomeBrew <https://docs.brew.sh/FAQ.html#how-do-i-uninstall-a-formula>`__

        .. code-block:: console

            brew uninstall gauge

    .. tab:: Debian/APT

        Uninstallation using `apt-get <https://linux.die.net/man/8/apt-get>`__

        .. code-block:: console

            sudo apt-get remove gauge

    .. tab:: YUM/DNF

        Uninstallation using `yum <https://www.centos.org/docs/5/html/5.1/Deployment_Guide/s1-yum-useful-commands.html>`__

        .. code-block:: console

            yum remove gauge

        or

        .. code-block:: console

            dnf remove gauge

    .. tab:: Zip

        Remove the `gauge` binary from installed location.
        The entry from `PATH` that was added during installation, can also be removed.

    .. tab:: Curl

        Remove the `gauge` binary from installed location.
        The entry from `PATH` that was added during installation, can also be removed.


.. note:: 
    If Gauge is installed in custom location, remove corresponding files/directory.
    More on Gauge install location can be found :ref:`here <troubleshoot_gauge_installation>`.

.. _plugins-uninstallation:

Uninstall Plugins
-----------------

Plugins can be uninstalled using the ``uninstall`` subcommand. The command is

``gauge uninstall <plugin-id>``

Example:

.. code-block:: console

   gauge uninstall java

To uninstall a specific version of the plugin, use the
``--version`` flag.

Example:

.. code-block:: console

   gauge uninstall java --version 0.3.2

Troubleshooting
===============

Logs
----

-  Gauge logs are created under the ``logs`` directory in the project.
-  Three log files are created
    -  **gauge.log** - logs for test execution
    -  **api.log** - logs for gauge core api exposed for plugins
    -  **lsp.log** - logs for gauge when launched in LSP mode.

-  To customize logs directory set the ``logs_directory`` property in the ``env/default/default.properties`` file to a custom logs directory path.

.. code-block:: text

    logs_directory = my_logs_dir

-  For **non-project specific actions** like plugin installation log
   files are created in the following location.

.. code-block:: text

     Windows - %APPDATA%\gauge\logs
     MacOS*  - <user_home>/.gauge/logs
     Linux   - <user_home>/.gauge/logs

.. _troubleshoot_gauge_installation:

Gauge Installation
------------------

Windows
^^^^^^^

-  The default installation location is ``%ProgramFiles%\gauge``.

-  ``gauge_install_location\bin`` should be in PATH to run from command line.

-  Gauge plugins are installed at ``%APPDATA%\gauge\plugins`` directory.

-  `APPDATA <https://msdn.microsoft.com/windows/uwp/app-settings/store-and-retrieve-app-data>`__ directory is usually located at ``C:\Users\USER_NAME\AppData\Roaming``.

Mac OS X
^^^^^^^^

-  The default installation location is ``/usr/local/``.

-  ``usr/local/bin/`` or ``custom_install_location/bin`` should be in PATH.

-  Run ``brew update`` before installing the latest version of gauge.

-  If installation is failing `Upgrade homebrew <http://docs.brew.sh/FAQ.html#how-do-i-update-my-local-packages>`__

-  Gauge plugins are installed under ``~/.gauge/plugins`` directory.

Linux
^^^^^

-  The default installation location is ``/usr/local/``.

-  ``usr/local/bin/`` or ``custom_install_location/bin`` should be in PATH.

-  Gauge plugins are installed under ``~/.gauge/plugins`` directory.

.. _troubleshoot_plugin_installation:

Plugin installation
-------------------

-  If :ref:`plugin installation <install_plugins>` fails due to a network connection issue, you can **manually download** the plugin distributable zip and install it using the ``-f`` flag.

.. code-block:: console

    gauge install plugin_name -f path_to_zip_file

Example:

.. code-block:: console

    gauge install html-report -f html-report-1.0.3-darwin.x86.zip

-  Find the plugin zip files under ``Releases`` section of the plugin github repositories. See the `gauge plugin list <https://gauge.org/plugins/>`__ for plugin repositories details.

Plugins directory
^^^^^^^^^^^^^^^^^

Plugins are installed in the ``.gauge/plugins`` directory in user's home. You can check this directory to manually install / uninstall plugins as well as to verify the installed plugins.

The plugin installation directory for various operating systems are listed below.

-  **Windows:** ``%APPDATA%\.gauge\plugins``
-  **Mac OS X:** ``~/.gauge/plugins``
-  **Linux:** ``~/.gauge/plugins``

Custom Plugin Install location
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default the plugins are stored at ``%APPDATA%\gauge\plugins`` for windows and ``~/.gauge/plugins`` in mac and linux.

To install plugins at different location, set ``GAUGE_HOME`` environment variable to the custom location. After setting the ``GAUGE_HOME`` env, run the install command. The plugin will get installed at the ``GAUGE_HOME`` custom location.


Plugins
============

| This page provides information about different types of plugins supported by Gauge and plugin install and uninstall. Plugins help you to use additional features of Gauge.
| For information about installing Gauge on your system, see :ref:`install_gauge`.

.. _install_plugins:

Install Plugins
------------------
To install a plugin and add the plugin to a Gauge project, use the following command from within the project directory:

.. code-block:: console

    gauge install <plugin_name>

If the plugin is already installed, Gauge just adds the plugin to the project.

.. note::

    The html-report and screenshot plugins are installed automatically on the first run.

Install a specific plugin version
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To install a specific version of a plugin, use the ``--version`` flag on your command line:

.. code-block:: console

    gauge install <plugin_name> --version <plugin_version>
    

**Example**

.. code-block:: console

    gauge install html-report --version 4.0.7

Install plugins offline 
^^^^^^^^^^^^^^^^^^^^^^^^^^

You can also install a plugin from a zip file instead of downloading from the plugin repository by using the following command:

.. code-block:: console

    gauge install <plugin_name> --file ZIP_FILE_PATH

You can download the latest version of a plugin from the ``Releases`` section of the plugin's GitHub repository. See the `plugin list <https://gauge.org/plugins/>`_ to find the Gauge repositories.

Customize plugin install location
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, the plugins are stored at ``%APPDATA%\gauge\plugins`` in Windows and ``~/.gauge/plugins`` in Mac OS X and Linux systems. You can also install the plugins at different locations.

1. To install plugins at a different location, set ``GAUGE_HOME`` environment variable to the custom location. 
2. | Run the ``plugin install`` command. 
   | The plugin is installed at the ``GAUGE_HOME`` custom location.

For troubleshooting information during plugin installation, see :ref:`Troubleshooting plugin installation <troubleshoot_plugin_installation>`.

Update Plugins
----------------

You can update a plugin by using the ``gauge update`` command. This command downloads the latest compatible plugin from the `Gauge plugin repository <https://gauge.org/plugins/>`_ .

.. code-block:: console

    gauge update <plugin_name>

.. note::
    Every Gauge plugin when published has metadata indicating the ``min`` and ``max`` version of Gauge that the plugin is compatible with. The ``gauge update`` command is used when installing plugins on a system running a particular gauge version.


**Example**

.. code-block:: console

    gauge update java

- To update a plugin to a specific version, use the ``--version`` flag as follows:

.. code-block:: console

    gauge update java --version 0.7.1

- To update all the installed plugins, use the following command:

.. code-block:: console

    gauge update --all

.. _plugins-uninstallation:

Uninstall Plugins
--------------------

Uninstall the plugins by using the following command:

``gauge uninstall <plugin_name>``

Example:

.. code-block:: console

   gauge uninstall java

To uninstall a specific version of the plugin, use the
``--version`` flag.

Example:

.. code-block:: console

   gauge uninstall java --version 0.7.1

.. _troubleshoot_plugin_installation:

Troubleshooting Plugin Installation
-----------------------------------

If :ref:`plugin installation <install_plugins>` fails due to a network connection issue, you can manually download the plugin distributable zip and install the plugin by using the following command:

 .. code-block:: console

    gauge install <plugin_name> -f path_to_zip_file

Example:

.. code-block:: console

    gauge install html-report -f html-report-4.0.7-darwin.x86.zip

-  You can find the plugin zip files in the ``Releases`` section of the plugin GitHub repositories. See the `gauge plugin list <https://gauge.org/plugins/>`__ for plugin repository details.

Plugins directory
-----------------

Plugins are installed in the ``.gauge/plugins`` directory in the user's home directory. You can check this directory to manually install or uninstall plugins and also to verify the installed plugins.

The plugin installation directory for various operating systems are listed below.

-  Windows: ``%APPDATA%\.gauge\plugins``
-  Mac OS X: ``~/.gauge/plugins``
-  Linux: ``~/.gauge/plugins``

Types of Plugins
----------------

The different types of plugins currently supported by Gauge are as follows:

.. 1. :ref:`IDE Plugins <ide_plugins>` (As per discussion, IDE plugins are not exactly a type of Gauge plugins. Hence, moved this out of "Types of Plugins" and kept it under a seperate heading)

2. :ref:`Language Runners/Plugins <language_plugins>`
3. :ref:`Reporting Plugins <reporting_plugins>`
4. :ref:`Other Plugins <other_plugins>`

.. _language_plugins:

Language Plugins
^^^^^^^^^^^^^^^^^^^

Language plugins or language runners enable the users to write the implementation of specifications in a language of the user's choice. When you intitialize a Gauge project, the language plugin is installed by default.

.. _install-language-runner:

.. tab-container:: languages

    .. tab:: CSharp

            To run Gauge projects in the .Net framework, use the following command:

            .. code-block:: console

                gauge install csharp

            For more information about running and configuring CSharp with Gauge, read `the Gauge GitHub repository <https://github.com/getgauge/gauge-csharp>`__

            To run Gauge projects in the .Net Core framework, use the following command:

            .. code-block:: console

                gauge install dotnet

            For more information about running and configuring .Net with Gauge, read `the Gauge GitHub repository <https://github.com/getgauge/gauge-dotnet>`__


    .. tab:: Java

        To run Gauge projects with Java, use the following command:
        
        .. code-block:: console

            gauge install java

        For more information about running and configuring Java with Gauge, read `the Gauge GitHub repository <https://github.com/getgauge/gauge-java>`__

    .. tab:: JavaScript

        To run Gauge projects with JavaScript, use the following command:

        .. code-block:: console

            gauge install js

        For more information about running and configuring JavaScript with Gauge, read `the Gauge GitHub repository <https://github.com/getgauge/gauge-js>`__

    .. tab:: Python

        For more information about running and configuring Python with Gauge,

        .. code-block:: console

            gauge install python

        For more information about running and configuring Python with Gauge, read `the Gauge GitHub repository <https://github.com/getgauge/gauge-python>`__

    .. tab:: Ruby

        To run Gauge projects with Ruby, use the following command:

        .. code-block:: console

            gauge install ruby

        For more information about running and configuring Ruby with Gauge, read `the Gauge GitHub repository <https://github.com/getgauge/gauge-ruby>`__

.. _reporting_plugins:

Reporting Plugins
^^^^^^^^^^^^^^^^^^^^

Reporting plugins generate execution reports in various formats. Depending on the format of the report you need, you can install the appropriate plugin.

.. tab-container:: reports

    .. tab:: HTML-Report

        .. code-block:: console

            gauge install html-report

        For more information about HTML report generation plugin for Gauge, see `here <https://github.com/getgauge/html-report>`__ .

    .. tab:: XML-Report

        .. code-block:: console

            gauge install xml-report

        For more information about XML-report generation plugin for Gauge, see `here <https://github.com/getgauge/xml-report>`__ .

.. _other_plugins:

Other Plugins
^^^^^^^^^^^^^^^^^^^^^^^^

The spectacle plugin generates a readable HTML format of the specifications:

        .. code-block:: console

            gauge install spectacle

        For more information about gauge spectacle, see `here <https://github.com/getgauge/spectacle>`__

Gauge also supports the dependency management workflow with custom plugins for `Maven <https://github.com/getgauge/gauge-maven-plugin>`__ and `Gradle <https://github.com/getgauge/gauge-gradle-plugin>`__.

.. _ide_plugins:

IDE Plugins
------------

Gauge has plugins for popular IDEs that improve the experience of authoring test specifications. We recommend that you use the VSCode plugin. However, Gauge can be used without a plugin on any editor of your choice.

.. tab-container:: ide

    .. tab:: Visual Studio Code

        Gauge projects can be created and run in Visual Studio Code by using the `Gauge extension for VSCode <https://marketplace.visualstudio.com/items?itemName=getgauge.gauge>`__.
        This plugin currently supports Gauge with JavaScript, Ruby, and Python.

    .. tab:: IntelliJ Idea

        Gauge projects can be created and run in IntelliJ IDEA by using the `Gauge plugin for IntelliJ IDEA <https://github.com/getgauge/Intellij-Plugin/blob/master/README.md>`__.
        This plugin supports Gauge with Java only.

    .. tab:: Visual Studio

        Gauge projects can be created and run in Visual Studio by using the `Gauge extension for Visual Studio <https://github.com/getgauge/gauge-visualstudio/blob/master/README.md>`__.
        This plugin currently supports Gauge with C#.


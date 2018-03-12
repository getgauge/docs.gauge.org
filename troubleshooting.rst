Troubleshooting
===============

Logs
----

-  Gauge logs are created under the ``logs`` directory in the project.
-  Two log files are created
    -  **gauge.log** - logs for test execution
    -  **api.log** - logs for gauge core api exposed for plugins
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

-  If :ref:`plugin installation <plugins-installation>` fails due to a network connection issue, you can **manually download** the plugin distributable zip and install it using the ``-f`` flag.

.. code-block:: console

    gauge install plugin_name -f path_to_zip_file

Example:

.. code-block:: console

    gauge install html-report -f html-report-1.0.3-darwin.x86.zip

-  Find the plugin zip files under ``Releases`` section of the plugin github repositories. See the `gauge plugin list <http://gauge.org/plugins.html>`__ for plugin repositories details.

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

Execution
---------

It is advised to use the latest version of gauge and `gauge plugins <http://gauge.org/plugins.html>`__. See our `download page <http://gauge.org/get-started.html>`__ for links to latest installation

Validation Errors
^^^^^^^^^^^^^^^^^

.. code-block:: text

    [WARN] Validation failed. The following steps have errors
    ...

These generally occur if step implementation is not found for a particular step.

- Ensure the :ref:`step implementation <language-steps>` for the step has been added.
- The :ref:`step template <language-steps>` marking the step in code is case sensitive and should match the step usage in the spec file.

Compatibility errors
^^^^^^^^^^^^^^^^^^^^

.. code-block:: text

    Failed to start a runner. Compatible runner version to 0.0.7 not found

-  The language plugin installed is not compatible with the gauge version installed.
-  Run ``gauge install language_NAME`` to install the latest compatible version. See :ref:`plugin installation <plugins-installation>` for
   more details

Execution Errors
^^^^^^^^^^^^^^^^

.. code-block:: text

    Error: too many open files

-  This error occurs when the upper limit to open the number of files is too low. To fix the error, increase the upper limit by adding the command ``ulimit -S -n 2048`` to your ``~/.profile`` file and relogin.

Intellij idea plugin
--------------------

It is advised to use the latest version of `gauge <http://gauge.org/download>`__ and `Intellij-gauge <https://plugins.jetbrains.com/plugin/7535?pr=idea>`__.

Intellij idea Errors
^^^^^^^^^^^^^^^^^^^^

Gauge API error
~~~~~~~~~~~~~~~

.. code-block:: text

    Could not start gauge api: Could not find executable in PATH or GAUGE_ROOT. Gauge is not installed.

This can occur because of following reasons :

- Gauge is not installed
- Gauge is installed at custom location and ``custom_install_location/bin`` is not in ``PATH``.

To Solve this :

- If gauge is not installed, :ref:`install gauge <installing_gauge_recomd_options>`.
- If gauge is installed at custom location, add ``custom_install_location/bin`` to ``PATH``
- On custom installation location Set ``GAUGE_ROOT`` to ``custom_install_location``
- Restart Intellij

Steps marked as unimplemented
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If steps have implementation code and are still marked as unimplemented:

- Ensure that ``src/test/java`` directory is marked as test sources root in the project. Right click on the ``src/test/java`` directory and select ``Mark Directory as -> Test sources root``
- Ensure the project is compiling. Press ctrl/cmd + F9 to build project or select ``Build -> Make project``.
- Ensure ``Module SDK`` is set to a valid JDK under ``Module settings``.
- Restart Intellij or close and reopen the project.

Check dependencies
""""""""""""""""""

For a gauge maven project
'''''''''''''''''''''''''

-  The gauge-java dependency should be added in the pom.xml
-  Enable auto-import for the project. Under ``File > Settings > Maven > Importing``, mark the checkbox ``Import Maven projects automatically``.

For a simple gauge java project
'''''''''''''''''''''''''''''''

-  Under ``Project Settings -> Modules`` select the gauge module. Under
   the ``dependencies`` tab should be ``gauge-lib`` and ``project-lib``.
-  If not present restart Intellij or close and re-open project. They
   should be added

Project Build failing with compilation error but the Java Files do not mark any errors.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  The project compilation fails however the java files do not mark any
   errors in the file.
-  This is a specific issue with Java <= 1.7 on Windows.
-  To resolve set **-Duser.home=USER_HOME** in the **IDEA_INSTALLATION\bin\idea.exe.vmoptions** file.

.. code-block:: text

    -Duser.home=C:\\Users\\<username>

-  See the `Intellij idea forum post <https://devnet.jetbrains.com/message/5545889#5545889>`__ for more details

Troubleshooting
===============

Logs
----

-  Gauge logs are created under the ``logs`` directory in the project.
-  2 log files are created
-  **gauge.log** - logs for test execution
-  **api.log** - logs for gauge core api exposed for plugins
-  To customize logs directory set the ``logs_directory`` property in
   the ``env/default/default.properties`` file to a custom logs
   directory path.

::

    logs_directory = my_logs_dir

-  For **non-project specific actions** like plugin installation log
   files are created in the following location.

::

     Windows - %APPDATA%\gauge\logs
     MacOS*  - <user_home>/.gauge/logs
     Linux   - <user_home>/.gauge/logs

Gauge Installation
------------------

Windows
^^^^^^^

-  ``GAUGE_ROOT`` environment variable should be set to the gauge
   installation path.

-  The default installation location is ``%ProgramFiles%\gauge``.

-  ``gauge_install_location\bin`` should be in PATH to run from command
   line.

-  Gauge plugins are installed at ``%APPDATA%\gauge\plugins`` directory.

-  `APPDATA <http://windows.microsoft.com/en-in/windows-8/what-appdata-folder>`__
   directory is usually located at
   ``C:\Users\USER_NAME\AppData\Roaming``.

Mac OS X
^^^^^^^^

-  The default installation location is ``/usr/local/``.

-  On custom installation location set the environment variable
   ``GAUGE_ROOT`` to custom\_install\_location.

-  ``usr/local/bin/`` should be in PATH.

-  Run ``brew update`` before installing the latest version of gauge.

-  If installation is failing `Upgrade
   homebrew <https://github.com/Homebrew/brew/blob/master/share/doc/homebrew/FAQ.md#how-do-i-update-my-local-packages>`__

-  Gauge plugins are installed under ``~/.gauge/plugins`` directory.

Linux
^^^^^

-  The default installation location is ``/usr/local/``.

-  On custom installation location Set the environment variable
   ``GAUGE_ROOT`` to custom\_install\_location.

-  ``usr/local/bin/`` or ``custom_install_location/bin`` should be in
   PATH.

-  Gauge plugins are installed under ``~/.gauge/plugins`` directory.

Plugin installation
-------------------

-  If `plugin installation <../plugins/installation.md>`__ fails due to
   a network connection issue, you can **manually download** the plugin
   distributable zip and install it using the ``-f`` flag.

::

    gauge --install plugin_name -f path_to_zip_file

Example:

::

    gauge --install html-report -f html-report-1.0.3-darwin.x86.zip

-  Find the plugin zip files under ``Releases`` section of the plugin
   github repositories. See the `gauge plugins
   list <../plugins/README.md>`__ for plugin repositories details.

Plugins directory
^^^^^^^^^^^^^^^^^

Plugins are installed in the ``.gauge/plugins`` directory in user's
home. You can check this directory to manually install / uninstall
plugins as well as to verify the installed plugins.

The plugin installation directory for various operating systems are
listed below.

-  **Windows:** ``%APPDATA%\.gauge\plugins``
-  **Mac OS X:** ``~/.gauge/plugins``
-  **Linux:** ``~/.gauge/plugins``

Custom Plugin Install location
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default the plugins are stored at ``%APPDATA%\gauge\plugins`` for
windows and ``~/.gauge/plugins`` in mac and linux.

To install plugins at different location, set ``GAUGE_HOME`` environment
variable to the custom location. After setting the ``GAUGE_HOME`` env,
run the install command. The plugin will get installed at the
``GAUGE_HOME`` custom location.

Execution
---------

It is advised to use the latest version of gauge and `gauge
plugins <../plugins/README.md>`__. See our `download
page <http://getgauge.io/get-started/index.html>`__ for links to latest
installation

Validation Errors
^^^^^^^^^^^^^^^^^

::

    [WARN] Validation failed. The following steps have errors
    ...

These generally occur if step implementation is not found for a
particular step. \* Ensure the `step
implementation <../language_features/step_implementations.md>`__ for the
step has been added. \* The `step
template <../language_features/step_implementations.md>`__ marking the
step in code is case sensitive and should match the step usage in the
spec file.

Compatibility errors
^^^^^^^^^^^^^^^^^^^^

::

    Failed to start a runner. Compatible runner version to 0.0.7 not found

-  The language plugin installed is not compatible with the gauge
   version installed.
-  Run ``gauge --install language_NAME`` to install the latest
   compatible version. See `plugin
   installation <../Installations/install_language_runners.md>`__ for
   more details

Execution Errors
^^^^^^^^^^^^^^^^

::

    Error: too many open files

-  This error occurs when the upper limit to open the number of files is
   too low. To fix the error, increase the upper limit by adding the
   command ``ulimit -S -n 2048`` to your ``~/.profile`` file and
   relogin.

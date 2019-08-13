.. cssclass:: topic
.. role:: heading

:heading:`FAQs`
===============

This page lists FAQs (Frequently Asked Questions) about installing Gauge, running a Gauge specification (spec), configuring Gauge, language runners used with Gauge, and using text editors while writing a Gauge spec. 
To understand these concepts, see Gauge documentation.

.. _installation-faq:

Installation
------------

Where is the Gauge executable installed by default?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-container:: platforms

    .. tab:: Windows

        `%ProgramFiles%\\gauge\\bin`

    .. tab:: macOS

        `/usr/local/bin`

    .. tab:: linux

        `/usr/local/bin`


Where are the plugins installed by default?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-container:: platforms

    .. tab:: Windows

        `%APPDATA%\\gauge\\plugins`

    .. tab:: macOS

        `~/.gauge/plugins`

    .. tab:: linux

        `~/.gauge/plugins`

What is GAUGE_HOME?
^^^^^^^^^^^^^^^^^^^

``GAUGE_HOME`` environment variable can be used to customize config files and plugins installation location.

How can I manually install a plugin?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Download the plugin's zip file from github release and install the plugin by using the ``-f`` flag.

.. code-block:: console

   gauge install <plugin_name> -f <path_to_gauge_csharp_zip_file>

Configuration
-------------

.. note::

    Gauge specific properties are stored in ``gauge.properties`` under gauge configuration folder. Refer to :ref:`Gauge Properties<gauge_properties>`.

How can I increase the language runner timeout?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By setting

.. code-block:: python

   runner_connection_timeout = 3000

Logs
----

Where does gauge log the test execution output. warnings, validation results etc?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You'll find the logged at ``logs/gauge.log`` in your projects directory.

.. note::

    ``logs`` is the default location for log files. This can be changed using ``logs_directory`` in :ref:`project's properties<default_properties>`.

Where can I find gauge API logs for debugging IDE plugins?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You'll find that at ``logs/api.log`` in your projects directory.

.. note::

    ``logs`` is the default location for log files. This can be changed using ``logs_directory`` in :ref:`project's properties<default_properties>`.

How can I customize the log directory location?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can specify a custom directory by changing the ``logs_directory`` property under
``env/default/default.properties`` Refer to :ref:`project's properties<default_properties>`.

.. code-block:: python

   logs_directory = my_custom_log_directory

Where does gauge non project specific logs like plugin installation etc.?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. tab-container:: platforms

    .. tab:: Windows

        `%APPDATA%\\gauge\\logs`

    .. tab:: macOS

        `~/.gauge/logs`

    .. tab:: linux

        `~/.gauge/logs`

Uninstall Gauge
---------------

How can I uninstall Gauge?
^^^^^^^^^^^^^^^^^^^^^^^^^^

Remove the Plugins before uninstalling Gauge. For information about removing plugins, see :ref:`plugins-uninstallation`.

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

Gauge Javascript
----------------

How to debug without IDE
^^^^^^^^^^^^^^^^^^^^^^^^

gauge-js supports debugging your test implementation code using node-inspector.

Requirements
^^^^^^^^^^^^

Ensure you have the latest Chrome browser and node-inspector installed. Please consult the node-inspector documentation for installation instructions.
Ensure that the binaries node-debug and node-inspector are available on PATH.
Starting gauge-js with debugger
You can do either of these:

Set the DEBUG key to true in env/<env-name>/js.properties file in your gauge project.
Set the environment variable DEBUG=true when calling gauge. Like: DEBUG=true gauge specs/. This needs gauge v0.3.2 or newer.

How it works
^^^^^^^^^^^^^

Setting the debug option will launch the runner code through node-debug. It will start node-inspector, launch Chrome DevTools and pause on the first line of execution. You will need to continue execution to let gauge carry on with its execution.

You can set debugger; inside step implementation or hook callbacks to pause execution in the debugger. This retains the gauge context and gives you a full blown debugger to debug your test implementations.

Example:

.. code-block:: text

    gauge.step("There are <num> vowels.", function (num) {
        debugger;
        assert.equal(num, 5);
    });

This will pause the debugger when this step's callback is executed by gauge-js.

Caveats
+++++++

The debugger exposes entire gauge-js runner code.
You need to be quick enough to hit continue in the browser when node-inspector launches. If this takes too long, gauge will timeout connecting to the API. A workaround for this is to increase the runner_connection_timeout property to an acceptable value.


Gauge Python
------------

How to change/rename default step implementation(``step_impl``) directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create ``python.properties`` file in the ``<PROJECT_DIR>/env/default`` directory and add the following line to it.

::

    STEP_IMPL_DIR = PATH_TO_STEP_IMPLEMENTATION_DIR

.. note::
   The path specified in ``STEP_IMPL_DIR`` property should be relative to project root.


How to use different version of python while running specs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default the language runner uses ``python`` command to run specs. To change the default behaviour, add ``GAUGE_PYTHON_COMMAND`` property to the ``python.properties`` file in the ``<PROJECT_DIR>/env/default`` directory.

::

    GAUGE_PYTHON_COMMAND = <python_command>
    GAUGE_PYTHON_COMMAND = python3
    GAUGE_PYTHON_COMMAND = python2

How to debug gauge-python without using an IDE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Gauge-Python supports debugging your test implementation code using `pbd`_.

.. _pbd: https://docs.python.org/2/library/pdb.html

::

    import pdb

The typical usage to break into the debugger from a running program is to insert

::

    pdb.set_trace()

Execution will stop where it finds the above statement and you can debug.


Gauge VS Code
-------------

Why are some features not working?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you notice that any of the documented features (ex. goto definition, Code Lens of implementation files, find usages)
are not working then make sure the required language runner is installed, by running ``gauge version``.
If not installed, install using ``gauge install <plugin_name>``.


Why does the debugger not stop at the right breakpoint (gauge-java)?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In Java projects, if the debugger does not stop at the right breakpoint, it is related to `this issue
<https://github.com/getgauge/gauge-vscode/issues/344>`_.

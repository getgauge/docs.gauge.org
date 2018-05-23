:page_header: FAQs

FAQs
====

.. _installation-faq:

Installation
------------

Where's the gauge executable installed by default?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

============= ================================
OS            Path
============= ================================
Windows       ``%ProgramFiles%\gauge\bin``
MacOS/Linux   ``/usr/local/bin``
============= ================================



Where are the plugins installed?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

============= ================================
OS            Path
============= ================================
Windows       ``%APPDATA%\gauge\plugins``
MacOS/Linux   ``~/.gauge/plugins``
============= ================================

What is GAUGE_HOME?
^^^^^^^^^^^^^^^^^^^^^^

``GAUGE_HOME`` environment variable can be used to customize config files and plugins installation location.

How can I manually install a plugin?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download the plugin distributable zip file and install it using the ``-f`` flag.

.. code-block:: console

   gauge install plugin_name -f path_to_zip_file

Execution
---------

Why do I get validation failure warning?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: text

   [WARN] Validation failed. The following steps have errors
   ...

Check if the step is implemented.
The steps are case sensitive, check if the cases match.

Why does the runner fail to start?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: text

   Failed to start a runner. Compatible runner version to 0.0.7 not found

The language plugin is not compatible with the gauge version installed. Run

.. code-block:: console

   gauge install language_name

Why are there too many open files?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: text

   Error: too many open files

The upper limit to the number of open files is low.
Increase the upper limit by adding a command ``ulimit -S -n 2048`` to you ~/.profile.
Don't forget to re-login for the changes to take effect.

Why can't gradle execute gauge specs, despite adding a task as per the document?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: console

    * What went wrong:
    A problem occurred evaluating root project 'INDYGauge'.
    > Could not get unknown property 'GaugeTask' for root project 'INDYGauge' of type org.gradle.api.Project.

This can happen when gradle is unable to recognize the GaugeTask. Try using the fully qualified name for GaugeTask as below:

.. code-block:: console

    task customGauge(type: com.thoughtworks.gauge.gradle.GaugeTask) {
        gauge {
            specsDir = 'specs'
            env = 'default'
            tags = 'tag1'
            inParallel = true
            nodes = 4
            additionalFlags = '--verbose'
        }
    }

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

Where can I find gauge core API logs for debugging IDE plugins?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

============= ===============================
OS            Path
============= ===============================
Windows       ``%APPDATA%\gauge\logs``
MacOS / Linux ``~/.gauge/logs``
============= ===============================

.. _js_faq:

Gauge Javascript
----------------

How to debug without IDE
^^^^^^^^^^^^^^^^^^^^^^^^

gauge-js supports debugging your test implementation code using node-inspector.

Requirements
++++++++++++

Ensure you have the latest Chrome browser and node-inspector installed. Please consult the node-inspector documentation for installation instructions.
Ensure that the binaries node-debug and node-inspector are available on PATH.
Starting gauge-js with debugger
You can do either of these:

Set the DEBUG key to true in env/<env-name>/js.properties file in your gauge project.
Set the environment variable DEBUG=true when calling gauge. Like: DEBUG=true gauge specs/. This needs gauge v0.3.2 or newer.

How it works
############

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

.. _python_faq:

Gauge Python
------------

ImportError: No module named getgauge
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Installing the getgauge package using pip should fix this. You can install the package by running the following command

::

    [sudo] pip install getgauge


Failed to start gauge API: Plugin 'python' not installed on following locations : [PATH]
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Installing the gauge-python plugin should fix this. You can install the plugin by running the following command

::

    gauge install python


Make sure you have the getgauge package. If you don't have, run the following command to install
::

    [sudo] pip install getgauge

For more details, refer Installation_ docs.

.. _Installation: ./installation.html

ImportError: No module named step_impl.<file_name>
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This error happens on older versions of Python(2.7, 3.2). Create ``step_impl/__init__.py`` to fix this.

How to change/rename default step implementation(``step_impl``) directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

VSCode
------
Why are some functionalities not working?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you notice that any of the documented functionalities (ex. goto definition, codelense of implementation files, find usages)
are not working then make sure the required language runner is installed, by running ``gauge version``.
If not installed, install using ``gauge install <plugin_name>``.

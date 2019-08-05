.. role:: vscode
.. role:: javascript
.. role:: python

FAQs
====

.. include:: change_filter.rst


This page lists FAQs (Frequently Asked Questions) about installing Gauge, running a Gauge specification (spec), configuring Gauge, language runners used with Gauge, and using text editors while writing a Gauge spec. 
To understand these concepts, see Gauge documentation.

.. _installation-faq:

Installation
------------

Where is the Gauge executable installed by default?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: dynamic-content windows

`%ProgramFiles%\\gauge\\bin`

.. cssclass:: dynamic-content macos

`/usr/local/bin`

.. cssclass:: dynamic-content linux

`/usr/local/bin`



Where are the plugins installed by default?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. cssclass:: dynamic-content windows

`%APPDATA%\\gauge\\plugins`

.. cssclass:: dynamic-content macos

`~/.gauge/plugins`

.. cssclass:: dynamic-content linux

`~/.gauge/plugins`


What is GAUGE_HOME?
^^^^^^^^^^^^^^^^^^^

``GAUGE_HOME`` environment variable can be used to customize config files and plugins installation location.

How can I manually install a plugin?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Download the plugin's zip file from github release and install the plugin by using the ``-f`` flag.

.. cssclass:: dynamic-content csharp
.. code-block:: console

   gauge install csharp -f <path_to_gauge_csharp_zip_file>

.. cssclass:: dynamic-content java
.. code-block:: console

   gauge install java -f <path_to_gauge_java_zip_file>

.. cssclass:: dynamic-content javascript
.. code-block:: console

   gauge install js -f <path_to_gauge_js_zip_file>

.. cssclass:: dynamic-content python
.. code-block:: console

   gauge install python -f <path_to_gauge_python_zip_file>

.. cssclass:: dynamic-content ruby
.. code-block:: console

   gauge install ruby -f <path_to_gauge_ruby_zip_file>



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

.. cssclass:: dynamic-content windows

`%APPDATA%\\gauge\\logs`

.. cssclass:: dynamic-content macos

`~/.gauge/logs`

.. cssclass:: dynamic-content linux

`~/.gauge/logs`


.. cssclass:: dynamic-content javascript
.. _js_faq:

:javascript:`Gauge Javascript`
==============================

How to debug without IDE
------------------------

gauge-js supports debugging your test implementation code using node-inspector.

Requirements
-------------

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


.. cssclass:: dynamic-content python
.. _python_faq:

:python:`Gauge Python`
======================

How to change/rename default step implementation(``step_impl``) directory
--------------------------------------------------------------------------

Create ``python.properties`` file in the ``<PROJECT_DIR>/env/default`` directory and add the following line to it.

::

    STEP_IMPL_DIR = PATH_TO_STEP_IMPLEMENTATION_DIR

.. note::
   The path specified in ``STEP_IMPL_DIR`` property should be relative to project root.


How to use different version of python while running specs
-----------------------------------------------------------

By default the language runner uses ``python`` command to run specs. To change the default behaviour, add ``GAUGE_PYTHON_COMMAND`` property to the ``python.properties`` file in the ``<PROJECT_DIR>/env/default`` directory.

::

    GAUGE_PYTHON_COMMAND = <python_command>
    GAUGE_PYTHON_COMMAND = python3
    GAUGE_PYTHON_COMMAND = python2

How to debug gauge-python without using an IDE
-----------------------------------------------

Gauge-Python supports debugging your test implementation code using `pbd`_.

.. _pbd: https://docs.python.org/2/library/pdb.html

::

    import pdb

The typical usage to break into the debugger from a running program is to insert

::

    pdb.set_trace()

Execution will stop where it finds the above statement and you can debug.


.. cssclass:: dynamic-content vscode
.. _vscode_faq:

:vscode:`Gauge VS Code`
========================

Why are some features not working?
-----------------------------------

If you notice that any of the documented features (ex. goto definition, Code Lens of implementation files, find usages)
are not working then make sure the required language runner is installed, by running ``gauge version``.
If not installed, install using ``gauge install <plugin_name>``.


.. cssclass:: dynamic-content vscode

Why does the debugger not stop at the right breakpoint (gauge-java)?
---------------------------------------------------------------------

In Java projects, if the debugger does not stop at the right breakpoint, it is related to `this issue
<https://github.com/getgauge/gauge-vscode/issues/344>`_.

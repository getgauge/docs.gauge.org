.. cssclass:: topic
.. role:: heading

:heading:`Troubleshooting`
==========================

.. _execution-troubleshooting:

Execution (Run Gauge specification)
-------------------------------------

Validation failure warning
^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error message:**

.. code-block:: text

   [WARN] Validation failed. The following steps have errors
   ...

**Cause:**

This error occurs if the step implementation for a particular step does not exist.

**Solution:**

* Add the step implementation for the failed step.
* | Ensure that the cases match between the step and the corresponding code in the implementation file. 
  | The code for the step in the step implementation file is case sensitive.

Failed to start a runner
^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

   Failed to start a runner. Compatible runner version to 0.0.7 not found

**Cause:**

The language plugin is not compatible with the Gauge version installed on your system. 

**Solution:**

Run the following command:

.. code-block:: console

   gauge install language_name

For more information about plugin installation, see :ref:`install_plugins`.

Too many open files
^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

   Error: too many open files

**Cause:**

The upper limit to the number of open files is low.

**Solution:**

1. Increase the upper limit by adding a command ``ulimit -S -n 2048`` to your ``~/.profile``.
2. Log out and log in again for the changes to take effect.

Gradle unable to execute Gauge specs, despite adding GaugeTask
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

    * What went wrong:
    A problem occurred evaluating root project 'INDYGauge'.
    > Could not get unknown property 'GaugeTask' for root project 'INDYGauge' of type org.gradle.api.Project.

**Cause:**

This error occurs when Gradle is unable to recognize the GaugeTask. 

**Solution:**

Use the fully qualified name for GaugeTask as shown below:

.. code-block:: text

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

Parse errors
^^^^^^^^^^^^

**Error:**

The following is an example of a Parse error:

.. code-block:: text

    [ParseError] hello_world.spec : line no: 25, Dynamic parameter <product> could not be resolved

List of various Parse errors:

+-------------------------------------------+--------------------------------+
| Parse Error                               | Gauge Execution Behaviour      |
+===========================================+================================+
| Step is not defined inside a concept      | Stops                          |
| heading                                   |                                |
+-------------------------------------------+--------------------------------+
| Circular reference found in concept       | Stops                          |
+-------------------------------------------+--------------------------------+
| Concept heading can only have dynamic     | Stops                          |
| parameters                                |                                |
+-------------------------------------------+--------------------------------+
| Concept should have at least one step     | Stops                          |
+-------------------------------------------+--------------------------------+
| Duplicate concept definition found        | Stops                          |
+-------------------------------------------+--------------------------------+
| Scenario heading is not allowed in        | Stops                          |
| concept file                              |                                |
+-------------------------------------------+--------------------------------+
| Table does not belong to any step         | Ignores table;                 |
|                                           | Gauge execution continues      |
+-------------------------------------------+--------------------------------+
| Table header cannot have repeated column  | Marks that spec as             |
| values                                    | failed; Gauge execution        |
|                                           | continues for other spes       | 
+-------------------------------------------+--------------------------------+
| Teardown should have at least three       | Marks that spec as             |
| underscore characters                     | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Scenario heading should have at least one | Marks that spec as             |
| character                                 | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Table header should be not blank          | Marks that spec as             |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Multiple spec headings found in the same  | Marks that spec as             |
| file                                      | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Scenario should be defined after the spec | Marks that spec as             |
| heading                                   | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Could not resolve table from file         | Marks that spec as             |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Spec does not have any element            | Marks that spec as             |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Spec heading not found                    | Marks that spec as             |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Spec heading should have at least one     | Marks that spec as             |
| character                                 | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Dynamic param could not be resolved       | Marks that spec as             |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Step should not be blank                  | Marks that spec as             |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Duplicate scenario definition found in    | Marks that spec as             |
| the same specification                    | failed; continues for others   |
+-------------------------------------------+--------------------------------+

**Cause:**

Parse errors occur if the spec or concept files do not follow the appropriate guidelines 
necessary for writing a spec or concept.

**Solution:**

| Ensure that the spec and concept files follow the appropriate guidelines.
| For more information about how to write a spec, see :ref:`specs`.
| For more information about how to write a concept, see :ref:`concept`. 

Validation Errors
^^^^^^^^^^^^^^^^^
Validation errors are those for which Gauge does not run the spec when the error occurs.

**Error:**

Step implementation not found

The following is an example:

.. code-block:: text

    [ValidationError] login.spec:33: Step implementation not found. login with "user" and "p@ssword"

**Cause:**
 
This error occurs if the spec file has a step that does not have an implementation in the language runner used for the Gauge project.

**Solution:**

Add the appropriate code in the step implementation file.

**Error:**

Duplicate step implementation

The following is an example:

.. code-block:: text

    [ValidationError] foo.spec:11 Duplicate step implementation => 'Vowels in English language are <table>'

**Cause:**

This error occurs if the spec file has a step that is implemented multiple times in the projects.

**Solution:**

Ensure that the duplicate instances of the step implementation is removed.

Configuration
-------------

gRPC issues
^^^^^^^^^^^^

**Error:**

Failed to load gRPC binary module because it was not installed for the current system

.. code-block:: sh

    Error: Failed to load gRPC binary module because it was not installed for the current system
    Expected directory: node-v67-darwin-x64-unknown
    Found: [node-v57-darwin-x64-unknown]
    This problem can often be fixed by running "npm rebuild" on the current system
    Original error: Cannot find module '/Users/someone/.gauge/plugins/js/2.3.4/node_modules/grpc/src/node/extension_binary/node-v67-darwin-x64-unknown/grpc_node.node'

**Cause:**

gauge-js uses `gRPC <https://github.com/grpc/grpc-node/tree/master/packages/grpc-native-core>`_ to communicate with Gauge.
The package  ``gRPC`` has native bindings.
When Node is updated, ``gauge run`` fails due to binary incompatibility with the newer version.

**Solution:**

Run  ``npm rebuild`` in ``PLUGIN_INSTALL_LOCATION\js\PLUGIN_VERSION`` directory.

or

Perform the following steps:

1) Remove ``PLUGIN_INSTALL_LOCATION\js``.
2) Run ``npm cache clean -f``.
3) Install the plugin again by running ``gauge install js``. 

For more information about plugin install location, see Plugins Directory at :ref:`install_plugins`.

.. _python_troubleshooting:

Gauge Python
------------

ImportError: No module named getgauge
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

ImportError: No module named getgauge

**Cause:**

``pip module getgauge`` is not installed.

**Solution:**

Install the ``getgauge`` package by using ``pip`` as follows:

.. code-block:: console

    [sudo] pip install getgauge

.. _Installation: ./installation.html

ImportError: No module named step_impl.<file_name>
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

ImportError: No module named step_impl.<file_name>

**Cause:**

This error occurs in versions lower than Python 2.7 and versions lower than Python 3.2.

**Solution:**

* Use Python versions other than those in which the error occurs.

Or

* If you cannot use other Python versions, create ``step_impl/__init__.py`` file.

VSCode
------

GAUGE-VSCode-001 : Language client is not ready yet
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

    Language client is not ready yet

**Cause:**

``getgauge`` package is not installed.

**Solution:**

Install ``getgauge`` package by running the following command:

.. code-block:: console

    [sudo] pip install getgauge

VS
--

Gauge-VS-001 : Gauge API not started
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

    Gauge API not started

**Cause:**

Gauge-VisualStudio support requires ``gauge.exe`` to run as a daemon. 
Hence, Gauge-VisualStudio tries to launch Gauge as a child process in the same working directory as the Gauge project. 
This behavior is flaky, hence sometimes the Gauge API does not get started. 

**Solution:**

1) | Ensure that the latest Gauge is installed and available in ``PATH``. 
   | You can install Gauge by following the instructions as specified in the `Getting Started page <//gauge.org/get_started>`__.
2) | As you are using Gauge with Visual Studio, it is assumed that you are using Gauge with CSharp, and hence you must install the CSharp plugin by using the following command:

   .. code-block:: console

      gauge install csharp
   
3) Verify the previous two steps by running the following command:

   .. code-block:: console

      gauge version

4) If the Windows firewall is enabled, ensure that you can run ``gauge.exe``. 
   
5) Ensure that Gauge can use the port range 46337-46997 in the firewall because Gauge-VisualStudio uses this port number by default.

6) | If port range 46337-46997 has a conflict or these ports cannot be used in the firewall, then set a different port in Gauge-VisualStudio. 
   
   1) To set a different port, select ``Tools->Option->Gauge->API Options``.
   
   Ensure that the port set is white-listed in your firewall.

GAUGE-VS-002 : Incompatible Gauge Version installed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

    Incompatible Gauge Version installed

**Cause:**

This error occurs when the version of Gauge installed is incompatible with the Gauge VisualStudio plugin version installed.

Gauge-VisualStudio support requires ``gauge.exe`` to be above a certain minimum version of Gauge. 

**Solution:**

Install the latest version of Gauge and update your Gauge VisualStudio plugin.

GAUGE-VS-003 : Unable to read Gauge version
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

    Unable to read Gauge version

**Cause:**

This error occurs when Gauge Visual Studio is unable to read the installed Gauge version.
Gauge-Visualstudio support requires ``gauge.exe`` to be more than a certain minimum version of Gauge.

**Solution:**

1. Ensure that the latest version of Gauge is installed and available in ``PATH`` by using the following command:

   .. code-block:: console

      gauge version

2. Navigate to the ``Output Window`` of Visual Studio and see the log for suggested actions.

IntelliJ
--------

GAUGE-IntelliJ-001 : Gauge API Not Started
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

    Could not start gauge api: Could not find executable in PATH or GAUGE_ROOT. Gauge is not installed.

**Cause:**

- Gauge is not installed
- Gauge is installed at custom location and ``custom_install_location/bin`` is not in ``PATH``.

**Solution:**

- If Gauge is not installed, `Install Gauge <//gauge.org/get_started>`__.
- If Gauge is installed at custom location, add ``custom_install_location/bin`` to ``PATH``
- At custom installation location, set ``GAUGE_ROOT`` to ``custom_install_location``.
- Restart Intellij.

GAUGE-IntelliJ-002 : Error adding module to project
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

    Given location is already a Gauge Project. Please try to initialize a Gauge project in a different location.

**Cause:**

This error occurs when the ``create new project`` option is used to open an existing Gauge project.

**Solution:**

Use the ``open`` option to open an existing Gauge project.

GAUGE-IntelliJ-003 : Steps marked as unimplemented
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Steps marked as unimplemented

**Cause:**

IntelliJ or Gauge plugin are not configured correctly.

**Solution:**

- Ensure that the ``src/test/java`` directory is marked as test sources root in the project. 
- Right click on the ``src/test/java`` directory and select ``Mark Directory as -> Test sources root``.
- Ensure that the project compiles. Press ctrl/cmd + F9 to build project or select ``Build -> Make project``.
- Ensure ``Module SDK`` is set to a valid JDK under ``Module settings``.
- Restart Intellij or close and reopen the project.
- Check dependencies for a gauge maven project and simple gauge java project.

For a gauge maven project
.........................

-  Add the gauge-java dependency in the ``pom.xml``.
-  Enable auto-import for the project; in ``File > Settings > Maven > Importing``, select the checkbox ``Import Maven projects automatically``.

For a simple gauge java project
...............................

1) In ``Project Settings -> Modules``, select the gauge module. 
2) Ensure that the following are present in the ``dependencies`` tab: ``gauge-lib`` and ``project-lib``.
3) | If the dependencies are not present, restart Intellij or close and reopen the project. 
   | ``gauge-lib`` and ``project-lib`` are added automatically.

GAUGE-IntelliJ-004 : Project Build failing with compilation error but the Java Files do not mark any errors.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Project Build failing with compilation error but the Java Files do not mark any errors.

**Cause:**

This error occurs in versions lower than or equal to Java 1.7 on Windows.

**Solution:**

Set ``-Duser.home=USER_HOME`` in the ``IDEA_INSTALLATIONbinidea.exe.vmoptions`` file as follows:

.. code-block:: text

    -Duser.home=C:\\Users\\<username>

For more details about this issue, see the `Intellij idea forum post <https://devnet.jetbrains.com/message/5545889#5545889>`__.



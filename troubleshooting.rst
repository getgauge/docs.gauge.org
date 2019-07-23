Troubleshooting
===============

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

Issue the following command:

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

1. Increase the upper limit by adding a command ``ulimit -S -n 2048`` to you ``~/.profile``.
2. Log out and log in again for the changes to take effect.

Gradle unable to execute Gauge specs, despite adding a task as per the document
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: console

    * What went wrong:
    A problem occurred evaluating root project 'INDYGauge'.
    > Could not get unknown property 'GaugeTask' for root project 'INDYGauge' of type org.gradle.api.Project.

**Cause:**

This can happen when gradle is unable to recognize the GaugeTask. 

**Solution:**

Use the fully qualified name for GaugeTask as below:

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
| Table doesn’t belong to any step          | Ignores table,Continue         |
+-------------------------------------------+--------------------------------+
| Table header cannot have repeated column  | Marks that spec as             |
| values                                    | failed,Continues for others    |
+-------------------------------------------+--------------------------------+
| Teardown should have at least three       | Marks that spec as             |
| underscore characters                     | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Scenario heading should have at least one | Marks that spec as             |
| character                                 | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Table header should be not blank          | Marks that spec as             |
|                                           | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Multiple spec headings found in the same  | Marks that spec as             |
| file                                      | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Scenario should be defined after the spec | Marks that spec as             |
| heading                                   | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Could not resolve table from file         | Marks that spec as             |
|                                           | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Spec does not have any element            | Marks that spec as             |
|                                           | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Spec heading not found                    | Marks that spec as             |
|                                           | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Spec heading should have at least one     | Marks that spec as             |
| character                                 | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Dynamic param could not be resolved       | Marks that spec as             |
|                                           | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Step should not be blank                  | Marks that spec as             |
|                                           | failed,Continues for other     |
+-------------------------------------------+--------------------------------+
| Duplicate scenario definition found in    | Marks that spec as             |
| the same specification                    | failed,Continues for other     |
+-------------------------------------------+--------------------------------+

**Cause:**

This occurs if the spec or concept file doesn't follow the 
expected :ref:`specifications <spec_syntax>` or :ref:`concepts <concept>` syntax.

**Solution:**


Validation Errors
^^^^^^^^^^^^^^^^^
These are errors for which Gauge skips executing the spec where the error occurs.

**Error:**

Step implementation not found

The following is an example:

.. code-block:: text

    [ValidationError] login.spec:33: Step implementation not found. login with "user" and "p@ssword"

**Cause:**
 
If the spec file has a step that does not have an implementation in the projects programming language.

**Solution:**

**Error:**

Duplicate step implementation

The following is an example:

.. code-block:: text

    [ValidationError] foo.spec:11 Duplicate step implementation => 'Vowels in English language are <table>'

**Cause:**

If the spec file has a step that is implemented multiple times in the projects.

**Solution:**


Configuration
-------------

gRPC issues
^^^^^^^^^^^^

**Error:**

When Node is updated, ``gauge run`` fails due to binary incompatibility with the newer version.

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

Run  ``npm rebuild`` in ``PLUGIN_INSTALL_LOCATION\js\PLUGIN_VERSION`` dir.

or

Remove ``PLUGIN_INSTALL_LOCATION\js``, then run ``npm cache clean -f`` and install the plugin again by running ``gauge install js``.

Refer `this <https://docs.gauge.org/latest/installation.html#plugins-directory>`__ to find plugin install location.

.. _python_troubleshooting:

Gauge Python
------------

ImportError: No module named getgauge
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

ImportError: No module named getgauge

**Cause:**


**Solution:**

Install the ``getgauge`` package by using ``pip`` as follows:

::

    [sudo] pip install getgauge


Failed to start gauge API: Plugin 'python' not installed on following locations : [PATH]
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Failed to start gauge API: Plugin 'python' not installed on following locations : [PATH]

**Cause:**


**Solution:**

1) Install the ``gauge-python`` plugin by using the following command:

   ::

      gauge install python


2) Ensure that you have the ``getgauge`` package. If you don't have the package, run the following command to install the package:

   ::

      [sudo] pip install getgauge

For more details, refer Installation_ docs.

.. _Installation: ./installation.html

ImportError: No module named step_impl.<file_name>
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

ImportError: No module named step_impl.<file_name>

**Cause:**

This error happens on older versions of Python(2.7, 3.2).

**Solution:**

Create ``step_impl/__init__.py`` to fix this issue.

VSCode
------

Why are some features not working?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Documented features of VSCode not working

**Cause:**


**Solution:**

If you notice that any of the documented features (ex. goto definition, Code Lens of implementation files, find usages)
are not working then make sure the required language runner is installed, by running ``gauge version``.
If not installed, install using ``gauge install <plugin_name>``.

Why does the debugger not stop at the right breakpoint (gauge-java)?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Debugger does not stop at the right breakpoint (gauge-java)

**Cause:**

In Java projects, if the debugger does not stop at the right breakpoint, it is related to `this issue
<https://github.com/getgauge/gauge-vscode/issues/344>`_.

**Solution:**


GAUGE-VSCode-001 : Language client is not ready yet
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

    Language client is not ready yet

**Cause:**

``getgauge`` package is not installed.

**Solution:**

Install ``getgauge`` package by running the following command:

::

    [sudo] pip install getgauge

VS
--

Gauge-VS-001 : Gauge API not started
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Gauge API not started

**Cause:**

Gauge-Visualstudio support requires ``gauge.exe`` to run as a daemon. 
Hence, Gauge-Visualstudio tries to launch gauge as a child Process with the same working directory as the project. 
Sometimes this can fail. 

**Solution:**

1) | Ensure latest Gauge is installed and available in PATH. 
   | You can install gauge from `here <//gauge.org/get_started>`__.
2) | Ensure that the latest Gauge CSharp plugin is installed.
   | Since you are using Gauge + VisualStudio, it is assumed that you are using Gauge + CSharp, and this requires the gauge-csharp plugin to be installed.
   | Run gauge install csharp in your Command Prompt to get the latest plugin.
3) Verify (1) and (2) above by running `gauge version` in your Command Prompt.
4) | Allow ``gauge.exe`` via Windows Firewall, if you have firewall enabled. 
   | You also need to allow gauge to use port range 46337-46997 in the firewall, since this is the port number that Gauge-Visualstudio uses by default.
5) | If port range 46337-46997 has a conflict for some reason, or you cannot allow these ports in Windows Firewall, you can tell Gauge-Visualstudio to use a different port by setting it in Tools->Options->Gauge->API Options in Visual Studio. 
   | Ensure that the port set in this setting is white-listed in your firewall.

GAUGE-VS-002 : Incompatible Gauge Version installed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Incompatible Gauge Version installed

**Cause:**

Gauge-Visualstudio support requires `gauge.exe` to be above a certain minimum version of Gauge. 
This error indicates that the version of Gauge installed is incompatible with the Gauge VisualStudio plugin version installed.

**Solution:**

Install the latest version of ``gauge`` and update your Gauge Visualstudio plugin.

GAUGE-VS-003 : Unable to read Gauge version
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Unable to read Gauge version

**Cause:**

Gauge-Visualstudio support requires `gauge.exe` to be above a certain minimum version of Gauge. This error indicates that Gauge Visual Studio is unable to read the installed Gauge version.

**Solution:**

1. Verify that the latest version of ``gauge`` is installed and available in ``PATH``. An easy way to do this is to run ``gauge version`` in your command prompt.
2. Inspect ``Output Window`` of Visual Studio and see the log for possible actions.

Intellij
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

- If gauge is not installed, `Install Gauge <//gauge.org/get_started>`__.
- If gauge is installed at custom location, add ``custom_install_location/bin`` to ``PATH``
- On custom installation location Set ``GAUGE_ROOT`` to ``custom_install_location``
- Restart Intellij

GAUGE-IntelliJ-002 : Error adding module to project
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

.. code-block:: text

    Given location is already a Gauge Project. Please try to initialize a Gauge project in a different location.

**Cause:**

Opening an existing gauge project from the ``create new project`` option of Intellij.

**Solution:**

Use the ``open`` option of Intellij to open an existing gauge project.

GAUGE-IntelliJ-003 : Steps marked as unimplemented
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Steps marked as unimplemented

**Cause:**

If steps have implementation code and are still marked as unimplemented:

**Solution:**

- Ensure that ``src/test/java`` directory is marked as test sources root in the project. Right click on the ``src/test/java`` directory and select ``Mark Directory as -> Test sources root``
- Ensure the project is compiling. Press ctrl/cmd + F9 to build project or select ``Build -> Make project``.
- Ensure ``Module SDK`` is set to a valid JDK under ``Module settings``.
- Restart Intellij or close and reopen the project.
- Check dependencies for a gauge maven project and simple gauge java project.

For a gauge maven project
.........................

-  The gauge-java dependency should be added in the pom.xml
-  Enable auto-import for the project. Under ``File > Settings > Maven > Importing``, mark the checkbox ``Import Maven projects automatically``.

For a simple gauge java project
...............................

-  Under ``Project Settings -> Modules`` select the gauge module. Under
   the ``dependencies`` tab should be ``gauge-lib`` and ``project-lib``.
-  If not present restart Intellij or close and re-open project. They
   should be added

GAUGE-IntelliJ-004 : Project Build failing with compilation error but the Java Files do not mark any errors.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error:**

Project Build failing with compilation error but the Java Files do not mark any errors.

**Cause:**

The project compilation fails however the java files do not mark any errors in the file.
This is a specific issue with Java <= 1.7 on Windows.

**Solution:**

Set **-Duser.home=USER_HOME** in the **IDEA_INSTALLATION\bin\idea.exe.vmoptions** file.

.. code-block:: text

    -Duser.home=C:\\Users\\<username>

See the `Intellij idea forum post <https://devnet.jetbrains.com/message/5545889#5545889>`__ for more details



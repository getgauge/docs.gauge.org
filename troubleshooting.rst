.. meta::
    :description: Some common problems and ways to troubleshoot them.
    :keywords: troubleshoot testing vscode automation mac windows linux java javascript ruby python c#

.. cssclass:: topic
.. role:: heading

:heading:`Troubleshooting`
==========================

.. _installtion-troubleshooting:

Installation
------------

Gauge installation via NPM (npm install @getgauge/cli -g)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Error message:**

.. code-block:: js

   { [Error: EACCES: permission denied, open 'bin/gauge'] errno: -13, code: 'EACCES', syscall: 'open', path: 'bin/gauge' }

**Cause:**

If npm was invoked with root privileges, then it will change the uid to the user
account or uid specified by the user config, which defaults to nobody.


**Solution:**

Set the unsafe-perm flag to run scripts with root privileges.

For example run the following command:

.. code-block:: console

   npm install -g @getgauge/cli --unsafe-perm


.. _execution-troubleshooting:

Execution (Run Gauge specification)
-------------------------------------

Validation failure warning
~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~

**Error:**

.. code-block:: text

   Error: too many open files

**Cause:**

The upper limit to the number of open files is low.

**Solution:**

1. Increase the upper limit by adding a command ``ulimit -S -n 2048`` to your ``~/.profile``.
2. Log out and log in again for the changes to take effect.

Gradle unable to execute Gauge specs, despite adding GaugeTask
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~

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
| Table header cannot have repeated column  | Marks that specification as    |
| values                                    | failed; Gauge execution        |
|                                           | continues for other spes       | 
+-------------------------------------------+--------------------------------+
| Teardown should have at least three       | Marks that specification as    |
| underscore characters                     | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Scenario heading should have at least one | Marks that specification as    |
| character                                 | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Table header should be not blank          | Marks that specification as    |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Multiple spec headings found in the same  | Marks that specification as    |
| file                                      | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Scenario should be defined after the spec | Marks that specification as    |
| heading                                   | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Could not resolve table from file         | Marks that specification as    |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Spec does not have any element            | Marks that specification as    |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Spec heading not found                    | Marks that specification as    |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Spec heading should have at least one     | Marks that specification as    |
| character                                 | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Dynamic param could not be resolved       | Marks that specification as    |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Step should not be blank                  | Marks that specification as    |
|                                           | failed; continues for others   |
+-------------------------------------------+--------------------------------+
| Duplicate scenario definition found in    | Marks that specification as    |
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
~~~~~~~~~~~~~~~~~
Validation errors are those for which Gauge does not run the scenario when the error occurs.

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
~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Error:**

ImportError: No module named step_impl.<file_name>

**Cause:**

This error occurs in versions lower than Python 2.7 and versions lower than Python 3.2.

**Solution:**

* Use Python versions other than those in which the error occurs.

Or

* If you cannot use other Python versions, create ``step_impl/__init__.py`` file.

VS Code
------------------

GAUGE-VSCode-001 : Language client is not ready yet
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Error:**

.. code-block:: text

    Language client is not ready yet

**Cause:**

``getgauge`` package is not installed.

**Solution:**

Install ``getgauge`` package by running the following command:

.. code-block:: console

    [sudo] pip install getgauge


Troubleshooting
===============

.. _execution-troubleshooting:

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

gRPC issues
^^^^^^^^^^^^

gauge-js uses `gRPC <https://github.com/grpc/grpc-node/tree/master/packages/grpc-native-core>`_ to communicate with Gauge.
The package  ``gRPC`` has native bindings.

When Node is updated, ``gauge run`` fails due to binary incompatibility with the newer version.

Example Stacktrace:

.. code-block:: sh

    Error: Failed to load gRPC binary module because it was not installed for the current system
    Expected directory: node-v67-darwin-x64-unknown
    Found: [node-v57-darwin-x64-unknown]
    This problem can often be fixed by running "npm rebuild" on the current system
    Original error: Cannot find module '/Users/someone/.gauge/plugins/js/2.3.4/node_modules/grpc/src/node/extension_binary/node-v67-darwin-x64-unknown/grpc_node.node'


To fix this

Run  ``npm rebuild`` in ``PLUGIN_INSTALL_LOCATION\js\PLUGIN_VERSION`` dir.

or

Remove ``PLUGIN_INSTALL_LOCATION\js``, then run ``npm cache clean -f`` and install the plugin again by running ``gauge install js``.

Refer `this <https://docs.gauge.org/latest/installation.html#plugins-directory>`__ to find plugin install location.


.. _python_troubleshooting:

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

VSCode
------
Why are some features not working?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you notice that any of the documented features (ex. goto definition, Code Lens of implementation files, find usages)
are not working then make sure the required language runner is installed, by running ``gauge version``.
If not installed, install using ``gauge install <plugin_name>``.

Why does the debugger not stop at the right breakpoint (gauge-java)?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In Java projects, if the debugger does not stop at the right breakpoint, it is related to `this issue
<https://github.com/getgauge/gauge-vscode/issues/344>`_.

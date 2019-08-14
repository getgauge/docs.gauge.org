.. _run_gauge_specifications:
.. cssclass:: topic
.. role:: heading

:heading:`Run Gauge specifications`
===================================

.. include:: change_filter.rst


This page provides information about how to run a specification, multiple arguments that can be used with the ``gauge run`` command when a spec is executed, 
verbose reporting, data driven execution, parallel execution of specs, how to rerun failed and flaky tests, errors that occur when a spec is run, and troubleshooting information.

For information about what a specification is and related details, see :ref:`write_gauge_specification`.

Run a specification
-------------------
You can run a Gauge specification by using the ``gauge run`` command. 
When this command is run, Gauge scans the directories and sub-directories at ``<project_root>`` (location at which the Gauge project is created) and picks up valid specification files.

.. admonition:: Prerequisite

    You must have already created specification(s) at the ``specs`` directory or configured a directory(s) of your choice. For more information about ``specs`` directory, see :ref:`specs_directory`.

You can use the following command at ``<project_root>`` to run a Gauge specification:

.. code-block:: console

    gauge run [args] [flags]

| ``<project_root>`` - location at which a Gauge project is created
| ``[args]`` - directories in which specifications are stored, location of specification files and scenarios
| ``[flags]`` - options that can be used with this command such as ``--tags``, ``-e``, ``-f``, and so on
| For more information about ``gauge run`` command, see the Gauge man page.

.. note::
    Gauge specifications can also be run from within the IDE
    (`Visual Studio Code <https://github.com/getgauge/gauge-vscode/blob/master/README.md#run-specifications-and-scenarios>`__,
    `IntelliJ IDEA <https://github.com/getgauge/Intellij-Plugin/blob/master/README.md#execution>`__, Visual Studio)

Multiple arguments passed to ``gauge run``
------------------------------------------
You can choose to run specifications at the directory, file, or scenario level or a combination of these by passing appropriate arguments to the ``gauge run`` command. 
The arguments are separated with a space when used with the command.

The arguments can be one of the following:

* Directories and sub-directories that contain specifications
* Path to specification files and scenarios
* Combination of the arguments mentioned in this list

Run specifications by using directory(s) as an agrument
-------------------------------------------------------
Specifications can be run from a single directory, sub-directories, or multiple directories. 
You can specify the directory(s) or path to sub-directory(s) with the ``gauge run`` command.

To run all the specifications in the ``specs`` directory, use the following command:

.. code-block:: console

    gauge run specs

To run specifications at the sub-directory level, use the following command:

.. code-block:: console

    gauge run <path_dir>

``<path_dir>`` - location of the sub-directory where specifications are stored

To run specifications stored in multiple directories (including sub-directories), use the following command:

.. code-block:: console

    gauge run <dir1> <path_dir2> <path_dir3>

``<path_dir2>`` ``<path_dir3>`` - location of the directories where specifications are stored

Example - single directory
^^^^^^^^^^^^^^^^^^^^^^^^^^
In the following example, specifications stored at ``test_specs`` are run:

.. code-block:: console

    gauge run test_specs

Example - multiple directories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In the following example, specifications stored at ``specs`` and ``test_specs`` are run:

.. code-block:: console

    gauge run specs test_specs

Example - sub-directories
^^^^^^^^^^^^^^^^^^^^^^^^^
In the following example, specifications stored at ``sub1_specs`` and ``sub2_specs`` are run: 

.. code-block:: console

    gauge run specs/sub1_specs specs/sub2_specs

``sub1_specs``, ``sub2_specs`` - directories located in ``specs``

Run specifications by using spec file path as argument
-------------------------------------------------------
You can choose and run only certain specifications by providing the appropriate location of these specifications with the ``gauge run`` command.

To run a single specification, use the following command:

.. code-block:: console

    gauge run <path_to_spec>

``<path_to_spec>`` - location of the specification

To run multiple specifications, use the following command:

.. code-block:: console

    gauge run <path_to_spec1> <path_to_spec2> <path_to_spec3>

Example - run a single specification file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In the following example, Gauge runs the ``example.spec`` stored in the ``specs`` directory:

.. code-block:: console

    gauge run specs/example.spec

Example - run multiple specification files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In the following example, Gauge runs multiple specifications stored in ``specs`` and its sub-directory, ``sub1_specs``:

.. code-block:: console

    gauge run specs/example.spec specs/sub1_specs/sub1_example.spec

Run specifications by using path to scenario as argument
--------------------------------------------------------
You can choose to run only scenarios of a specification. 
This can be either a single scenario or multiple scenarios. 
The argument to the ``gauge run`` command can be a specific scenario or a list of scenarios and the line number in the span of that scenario. 
Any line number which the scenario spans across can be used. 

.. note::
   For more information about scenarios, see :ref:`longstart-scenarios`.

To run a single scenario, use the following command:

.. code-block:: console

    gauge run <specification_path>:<scenario_line_number>

To run multiple scenarios, use the following command:

.. note::
   Multiple scenarios can belong to different specifications.

.. code-block:: console

    gauge run <specification_path>:<scenario_line_number> <specification_path>:<scenario_line_number>...

.. _spec_example_scenario:

Example
^^^^^^^
Consider the following specification, ``spec1.spec`` located at ``specs`` directory:

.. code-block:: gauge
    :linenos:
    :name: specify_scenario
    :emphasize-lines: 7-9

    # Configuration    

    ## Admin Login
    * User must login as "admin"
    * Navigate to the configuration page

    ## User Login
    * User must login as "user1"
    * Navigation to configuration page is restricted.

Single scenario
...............
To run only the second scenario, ``User Login``, of ``spec1.spec``, use the following command:

.. code-block:: console

    gauge run specs/spec1.spec:7

Line 7 indicates that the second scenario is run. 
As this scenario spans from line 7 to 9, any line number including and between 7 and 9 can be used. 
Hence, you can also mention line 9 in the command as follows: 

.. code-block:: console

    gauge run specs/spec1.spec:9

In both cases, the ``User Login`` scenario is run.

Multiple scenarios
..................
In addition to ``spec1`` used as an :ref:`example <spec_example_scenario>` previously, let us consider another spec, ``test1``, in the ``specs`` directory as follows:

.. code-block:: gauge
    :linenos:
    :name: specify_additional_scenario
    
    # Search specification    

    ## Successful search
    * Log in as "admin"
    * Open the product search page
    * Search for product "Cup Cakes"
    * "Cup Cakes" should show up in the search results

To execute scenarios from both ``spec1`` and ``test1``, run the following command:

.. code-block:: console

    gauge run specs/spec1.spec:3 specs/test1.spec:4

In this case, ``Admin Login`` scenario is run from ``spec1.spec`` and ``Successful search`` scenario is run from ``test1.spec``.

.. note::
   ``test1.spec`` can be located in a directory other than ``specs``.

.. _tagged_execution:

Filter specifications and scenarios by using tags
-------------------------------------------------
Tags allow filtering specs and scenarios. 
You can use the ``--tags`` flag with the ``gauge run`` command to filter specs and scenarios. 

.. admonition:: Prerequisite

    You must have already labelled the specs and scenarios with tags. For more information about Tags, see :ref:`longstart-tags`.

Use the following command to filter a Gauge specification or scenario by using tags:

.. code-block:: console

   gauge run --tags "Tag_Name" specs

``Tag_Name`` - tag associated with the specs or scenarios

When this command is run, only the scenarios and specifications which are tagged with ``Tag_Name`` are executed.

.. _spec_example_tag:

Example
^^^^^^^
Consider the following spec in the ``specs`` directory, which has tags ``search`` and ``admin``. 
The scenario, ``Successful search``, is tagged with ``successful`` and the scenario, ``Unsuccessful search`` has no tags.

.. code-block:: gauge
    :linenos:

    # Search Specification

    The admin user must be able to search for available products on the search page.

    Tags: search,  admin

    * User must be logged in as "admin"
    * Open the product search page

    ## Successful search

    Tags: successful

    For an existing product name, the search result will contain the product name.

    * Search for product "Cup Cakes"
    * "Cup Cakes" should show up in the search results

    ## Unsuccessful search

    On an unknown product name search, the search results will be empty

    * Search for product "unknown"
    * The search results will be empty

If the tag ``search`` is used, then the entire spec is run. 

.. code-block:: console

   gauge run --tags "search" specs

If the tag ``successful`` is used, the scenario, ``Successful search`` is run.

.. code-block:: console

   gauge run --tags "successful" specs

Execution hooks can also be filtered based on tags. For more information, see :ref:`write_gauge_specification`.

.. _tag_expressions:

Tag expressions
---------------
Tags can be used with expressions.
This helps you search and filter specs and scenarios effectively. 
The following table lists the tags and expressions and their corresponding action while selecting specs and scenarios.

.. attention::
   In the command line, while using the not symbol (!) with tags, (!) has to be preceded by escape (\\).

================================== ===============================================================
Tags                               Selects specs/scenarios that
================================== ===============================================================
``!TagA``                          do not have ``TagA``
``TagA & TagB`` or ``TagA,TagB``   have both ``TagA`` and ``TagB``.
``TagA & !TagB``                   have ``TagA`` and not ``TagB``.
``TagA | TagB``                    have either ``TagA`` or ``TagB``.
``(TagA & TagB) | TagC``           have either ``TagC`` or both ``TagA`` and ``TagB``
``!(TagA & TagB) | TagC``          have either ``TagC`` or do not have both TagA and TagB
``(TagA | TagB) & TagC``           have either [``TagA`` and ``TagC``] or [``TagB`` and ``TagC``]
================================== ===============================================================

Example
^^^^^^^

Consider the spec of the previous :ref:`example <spec_example_tag>` - if all the scenarios tagged with ``search`` and ``successful`` must be run, then use the following command:

.. code-block:: console

   gauge run --tags "search & successful" specs

Based on the Tags expressions table, ``Successful Search`` scenario is run.

Verbose reporting
-----------------

By default, Gauge generates reports that display whether a spec has passed or failed when executed. 
To ease debugging, reports can also be generated for every step to display whether a step has been executed successfully. 
Such reports can be generated by using the ``--verbose`` flag.
These reports are generated on the console.

Use the following command to generate reports at the step level:

.. code-block:: console

    gauge run --verbose specs

.. _table_driven_execution:

Data driven execution
---------------------
A data table is defined in Markdown table format at the beginning of the spec prior to steps. 
The data table should have a header row and one or more data rows.
The header names from the table can be used in the steps within angular brackets ``< >`` to refer to a particular column from the data table as a parameter.

When a spec is run, each scenario is executed for every data row of the table.
Table parameters are written in Multi-Markdown table formats.

Example
^^^^^^^
In the following specification ``hello.spec``, the data table is defined at the beginning of the spec. 
The step uses the ``name`` column from the data table as a dynamic parameter.
When the spec is run, ``Scenario`` and ``Second Scenario`` are executed first for the first row values ``1``, ``Alice`` followed by the second and third row values from the table.

.. code-block:: gauge
    :linenos:
    :name: data_driven

    # Table driven execution

         |id| name    |
         |--|---------|
         |1 |Alice    |
         |2 |Bob      |
         |3 |Eve      |

    ## Scenario
    * Say "hello" to <name>

    ## Second Scenario
    * Say "namaste" to <name>

Selected data table rows
------------------------
By default, scenarios in a spec are run for every data table row. 
Scenarios can also be run against selected data table rows by using the ``--table-rows`` flag along with specifying the row numbers for which the scenarios should be run. 
If there are multiple row numbers, the row numbers should be separated by commas. 
A range of table rows can also be specified.

.. important::
   Only a single specification can be run while using the ``--table-rows`` flag.

Examples
^^^^^^^^
In the following example, the scenarios in ``hello.spec`` (see :ref:`Data driven execution <table_driven_execution>`) are run only for the first row of the data table.

.. code-block:: console

    gauge run --table-rows "1" specs/hello.spec

| In the following example, multiple rows are specified by separating them with commas. 
| The scenarios from the ``hello.spec`` are run for the first and third rows of the data table.

.. code-block:: console

    gauge run --table-rows "1,3" specs/hello.spec

| In the following example, a range of table rows is specified.
| The scenarios from the ``hello.spec`` are run for the first, second, and third rows of the data table.

.. code-block:: console

    gauge run --table-rows "1-3" specs/hello.spec

External CSV for data table
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Data Tables for a specification can also be passed from an external CSV file. 

For more information about external CSV files used in data tables, see :ref:`parameters`.

Example
^^^^^^^
In this example, ``users.csv`` is the external CSV file that contains the following data table:

.. code-block:: gauge

    |id| name    |
    |--|---------|
    |1 |Alice    |
    |2 |Bob      |
    |3 |Eve      |

In the spec, the steps use the ``<name>`` column from the CSV file.

.. code-block:: gauge
    :linenos:
    :name: data_driven_external

    # Table driven execution

    table: /system/users.csv

    ## Scenario
    * Say "hello" to <name>

    ## Second Scenario
    * Say "namaste" to <name>

.. _parallel_execution:

Parallel execution
------------------
Specs can be executed in parallel to run the tests faster. 
Running tests in parallel creates a number of execution streams depending on the  number of CPU cores available on your system and distributes the load among worker processes.

The number of parallel execution streams can be specified by using the ``-n`` flag.

.. note::
   It could lead to undesirable results if the number of streams specified is more than the number of CPU cores available on your system.
   For optimizations, you can also use threads. See :ref:`Parallel execution by using threads <parallel execution using threads>`.

Use the following command to run specs in parallel:

.. code-block:: console

    gauge run --parallel specs

OR

.. code-block:: console

    gauge run -p specs

Example
^^^^^^^
In the following example, four parallel execution streams are created.

.. code-block:: console

    gauge run --parallel -n=4 specs

.. _parallel execution using threads:

Parallel execution by using threads
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In parallel execution, every stream starts a new worker process. This can be optimized 
by using multithreading instead of processes. Multithreading uses only one worker process and 
starts multiple threads for parallel execution.

| To use the multithreading feature, the ``enable_multithreading`` environment variable must be set to ``true``. If not already present, you can add this variable to the ``default.properties`` file. 
| For more information about ``default.properties``, see :ref:`local_configuration_Gauge`.


.. admonition:: Prerequisites

    Use thread-safe test code. Use a language runner that supports multithreading.

.. note::
   Currently, only the Java language runner supports parallel execution of specs by using threads.

Run specs before parallel execution
-----------------------------------

Specs can be filtered based on tags to run in parallel, so that only those will be run in parallel after executing other specs in serial.

Set ``allow_filtered_parallel_execution`` variable to ``true`` in ``/env/default/default.properties`` to enable this feature.

Execution can be done by the command:

.. code-block:: console

    gauge run specs --parallel --only "parallelizable"


This runs all the specs that are not tagged as ``parallelizable`` in serial first,
and then runs the tagged ones in parallel.


.. note::
    This feature is currently available in gauge >= 1.0.5


Test suite execution by using the ``--strategy`` option
-------------------------------------------------------
The ``--strategy`` option allows you to set the strategy for parallel execution of tests. 
This option has two values: ``lazy`` and ``eager``. By default, the option is set to ``lazy``. 

``lazy``
^^^^^^^^
The ``lazy`` feature enables Gauge to dynamically allocate specs to streams during execution instead of at the beginning of execution. 
This allows Gauge to optimise the resources on your system or execution environment. 
Such optimization is useful because some specs might take more time to get executed than the others. 
This could be either because of the number of scenarios in the specs or the nature of the feature under test.

``lazy`` is the default value of the ``--strategy`` option.

The following command assigns tests lazily across the specified number of streams:

.. code-block:: console

    gauge run -n=4 --strategy="lazy" specs

OR

.. code-block:: console

    gauge run -n=4 specs

.. note:: 
    The ``lazy`` value cannot be used when the ``-g`` flag is used with the ``gauge run`` command. 
    This is because the grouping of tests depends on allocation of tests before the beginning of test execution, however, ``lazy`` is used during execution of tests.  
    Using the ``-g`` flag with ``--strategy=lazy`` has no impact on your test suite execution.

Example
.......
If there are 100 tests, which have to be run across four streams or cores, Gauge dynamically assigns the next spec in queue to the stream that has completed its previous test execution and is waiting for more work.

``eager``
^^^^^^^^^
When the ``-g (grouping)`` flag is used, the value of the ``strategy`` option is ``eager``. 
In this strategy, Gauge allocates specs to streams at the beginning of test execution. 

Example
.......
When ``eager`` is used, if 100 tests are run, these tests are equally distributed before execution in the number of streams as mentioned by the ``-n`` option.

.. code-block:: console

    gauge run -n=4 --strategy="eager" specs

Executing a group of specification
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Gauge sorts the specifications by alphabetical order and then distributes these specifications into groups.
You can use the ``--group`` \| ``-g`` flag to execute a specific group of specs.

Executing specs with  the ``-n`` and ``--g`` flags ensures that Gauge executes the same group of specifications in the same order
regardless of the number of times the ``gauge run`` command is executed. 

Use the following command to execute a group of specifications:

.. code-block:: console

    gauge run -n=<number_of_groups> -g=<group_number> specs

| ``-n`` - number of groups
| ``-g`` - group number

Example
.......
In the following example, Gauge creates four groups of specification and selects the second group for execution.

.. code-block:: console

    gauge run -n=4 -g=2 specs

Even if the command is run multiple times, Gauge still executes the same group of specifications in the same order.

Rerun failed scenarios
----------------------
Gauge provides the ability to rerun only the scenarios which failed in the previous execution. 
You can use the ``--failed`` flag with the ``gauge run`` command to rerun failed scenarios.

.. admonition:: Prerequisite
   
    You must have already run the specifications by using the ``gauge run`` command.

Use the following command to rerun failed scenarios:

.. code-block:: console

    gauge run --failed

For example, if three scenarios failed during ``gauge run specs``, the failed scenarios can be rerun instead of executing all scenarios.

When the ``--failed`` flag is used with the ``gauge run`` command, the flags that were set during the previous execution is once again set.

Example
^^^^^^^
| Consider an example, where specs are run with a ``--env`` and ``--verbose`` flags.
| Three scenarios fail during this run.

.. code-block:: console

    gauge run --env="chrome" --verbose specs

To rerun only the failed scenarios, use the following command:

.. code-block:: console

    gauge run --failed

When this command is run, Gauge internally sets the ``--env`` and ``--verbose`` flags  to corresponding values used in the previous execution.
Hence, ``gauge run --failed`` is equivalent to the following command:

.. code-block:: console

    gauge run --env="chrome" --verbose specs <path_to_failed_scenarios>

Rerun failed scenarios by using ``--max-retries-count``
-------------------------------------------------------
You can use the ``--max-retries-count`` flag to rerun failed tests for a specific number of times.

.. note::
   ``--max-retries-count`` feature is also useful if there are flaky tests in your test suite.

Use the following command to rerun failed tests for a specific number of times:

.. code-block:: console

    gauge run --max-retries-count=<number of retries>

Example
^^^^^^^
In the following example, Gauge reruns a failed test for a maximum of three times and then marks the spec as failed. 

.. code-block:: console

    gauge run --max-retries-count=3

Rerun failed scenarios by using ``--retry-only``
------------------------------------------------
You can filter scenarios that must be rerun a specific number of times when failed by using the ``--retry-only`` flag.
The value of this flag is the tag used to associate the scenario(s).

Use the following command to rerun failed scenarios for a specific number of times:

.. code-block:: console

    gauge run --max-retries-count=<number of retries> --retry-only "<tag_name>"

``<tag_name>`` - name of the tag used to label the scenario(s) that should be rerun when failed

.. note::
   Tags can also be used with expressions. For more information about using tags with expressions, see :ref:`Tag expressions <tag_expressions>` .

Example
^^^^^^^
In the following example, Gauge reruns only those scenarios that have the ``should-retry`` tag . 
Gauge runs these scenarios thrice as specified by the ``--max-retries-count`` flag.

.. code-block:: console

    gauge run --max-retries-count=3 --retry-only="should-retry"

.. note::
   If ``--retry-only`` flag is not specified, all scenarios are retried the number of times as specified in ``--max-retries-count``.

Errors during execution
-----------------------

Parse errors
^^^^^^^^^^^^

This occurs if the spec or concept file doesn't follow the 
expected :ref:`specifications <spec_syntax>` or :ref:`concepts <concept>` syntax.

**Example:**

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

Validation Errors
^^^^^^^^^^^^^^^^^

These are errors for which `Gauge` skips executing the spec where the error occurs.

There are two types of validation error which can occurs

    1. Step implementation not found
        If the spec file has a step that does not have an implementation in the projects programming language.
    2. Duplicate step implementation
        If the spec file has a step that is implemented multiple times in the projects.

**Example**

.. code-block:: text

    [ValidationError] login.spec:33: Step implementation not found. login with "user" and "p@ssword"

.. code-block:: text

    [ValidationError] foo.spec:11 Duplicate step implementation => 'Vowels in English language are <table>'

Troubleshooting
===============

Ensure that the latest version of gauge and `gauge plugins <//gauge.org/plugins/>`__. 

Run ``gauge update -c`` to check if there are updates available for gauge and the plugins.

Validation Errors
-----------------

.. code-block:: text

    [WARN] Validation failed. The following steps have errors
    ...

These generally occur if step implementation is not found for a particular step.

- Ensure the :ref:`step implementation <language-steps>` for the step has been added.
- The :ref:`step template <language-steps>` marking the step in code is case sensitive and should match the step usage in the spec file.

Compatibility errors
--------------------

.. code-block:: text

    Failed to start a runner. Compatible runner version to 0.0.7 not found

-  The language plugin installed is not compatible with the gauge version installed.
-  Run ``gauge install language_NAME`` to install the latest compatible version. See :ref:`plugin installation <install_plugins>` for
   more details

Execution Errors
----------------

.. code-block:: text

    Error: too many open files

-  This error occurs when the upper limit to open the number of files is too low. To fix the error, increase the upper limit by adding the command ``ulimit -S -n 2048`` to your ``~/.profile`` file and relogin.

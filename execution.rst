Run Gauge specifications
========================
This page provides information about how to run a specification, multiple arguments that can be used with the ``gauge run`` command when a spec is executed, 
verbose reporting, data driven execution, parallel execution of specs, and how to rerun failed and flaky tests.

For information about what a specification is and related details, see :ref:`write_gauge_specification`.

Run a specification
-------------------
You can run a Gauge specification by using the ``gauge run`` command. 
When this command is run, Gauge scans the directories and sub-directories at ``<project_root>`` (location at which the Gauge project is created) and picks up valid specification files.

.. admonition:: Prerequisite
    
   | You must have already created specification(s) at the ``specs`` directory or configured a directory(s) of your choice.
   | For more information about writing a specification and ``specs`` directory, see :ref:`write_gauge_specification`.

You can use the following command at ``<project_root>`` to run a Gauge specification:

.. code-block:: console

    gauge run [args][flags]

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

``<path_to_dir>`` - location of the sub-directory where specifications are stored

To run specifications stored in multiple directories (including sub-directories), use the following command:

.. code-block:: console

    gauge run <dir1> <path_dir2> <path_dir3>

``<path_dir2>`` ``<path_dir3>`` - location of the directories where specifications are stored

Example - single directory
^^^^^^^^^^^^^^^^^^^^^^^^^^
In the following example, specifications stored at ``test_specs`` are run:

.. code-block:: console

    gauge run test_specs

Example - multipe directories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
   For more information about scenarios, see :ref:`write_gauge_specification`.

To run a single scenario, use the following command:

.. code-block:: console

    gauge run <specification_path>:<scenario_line_number>

To run multiple scenarios, use the following command:

.. note::
   Multiple scenarios can belong to different specifications.

.. code-block:: console

    gauge run <specification_path>:<scenario_line_number> <specification_path>:<scenario_line_number>...

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
------------------
In addition to ``spec1`` considered in the previous example, let us consider another spec, ``test1``, in the ``specs`` directory as follows:

.. code-block:: gauge
    :linenos:
    :name: specify_additional_scenario
    
    # Search specification    

    ## Successful search
    * User must be logged in as "admin"
    * Open the product search page
    * Search for product "Die Hard"
    * "Die Hard" should show up in the search results

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

   | You must have already labelled the specs and scenarios with tags.
   | For more information about Tags, see :ref:`write_gauge_specification`.

Use the following command to filter a Gauge specification or scenario by using tags:

.. code-block:: console

   gauge run --tags "Tag_Name" specs

``Tag_Name`` - tag associated with the specs or scenarios

When this command is run, only the scenarios and specifications which are tagged with ``Tag_Name`` are executed.

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

    * Search for product "Die Hard"
    * "Die Hard" should show up in the search results

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

Execution hooks can also be filtered based on tags.
For more information, see :ref:`filtering hooks with tags <filtering_hooks_with_tags>`.

Tag expressions
---------------
Tags can be used with expressions. 
This helps you search and filter specs and scenarios effectively. 
The following table lists the tags and expressions and their corresponding action while selecting specs and scenarios.

.. attention::
   In the command line, while using the not symbol(!) with tags, (!) has to be preceded by escape (\).

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

Consider the spec of the previous example - if all the scenarios tagged with ``search`` and ``successful`` must be run, then use the following command:

.. code-block:: console

   gauge run --tags "search & successful" specs

Based on the Tags expressions table, ``Successful Search`` scenario is run.

Verbose reporting
-----------------

By default, ``gauge`` reports at the specification level when executing
tests. Enable verbose step-level reporting by using the
``--verbose`` flag. For example,

.. code-block:: console

    gauge run --verbose specs/


.. _table_driven_execution:

Data driven execution
---------------------
-  A *data table* is defined in markdown table format in the beginning
   of the spec before any steps.
-  The data table should have a header row and one or more data rows
-  The header names from the table can be used in the steps within
   angular brackets ``< >`` to refer a particular column from the data
   table as a parameter.
-  On execution each scenario will be executed for every data row from
   the table.
-  Table can be easily created in IDE using template
   ``table:<no of columns>``, and hit ``Tab``.
-  Table parameters are written in Multi-markdown table formats.

For example,

.. code-block:: gauge
    :linenos:
    :name: data_driven

    # Table driven execution

         |id| name    |
         |--|---------|
         |1 |vishnu   |
         |2 |prateek  |
         |3 |navaneeth|

    ## Scenario
    * Say "hello" to <name>

    ## Second Scenario
    * Say "namaste" to <name>

In the above example the step uses the ``name`` column from the data
table as a dynamic parameter.

Both ``Scenario`` and ``Second Scenario`` are executed first for the
first row values ``1, vishnu`` and then consecutively for the second and
third row values from the table.

External CSV for data table
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Data Tables for a specification can also be passed from an external CSV file. 
The parameter contains a prefix table and the path to the csv file.

**Prefix** : The prefix is table

**Value** : The value is the path to the csv file. This can be absolute file path or relative to project.


For example,

.. code-block:: gauge
    :linenos:
    :name: data_driven_external

    # Table driven execution

    table: /system/users.csv

    ## Scenario
    * Say "hello" to <name>

    ## Second Scenario
    * Say "namaste" to <name>


In the above example the step uses the ``name`` column from the csv file.

Execute selected data table rows
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, scenarios in a spec are run against all the data table rows.
It can be run against selected data table rows with flag
``--table-rows`` and specifying the row numbers against which the
scenarios should be executed. If there are multiple row numbers, they
should be separated by commas.

For example,

.. code-block:: console

    gauge run --table-rows "1" specs/hello.spec
    gauge run --table-rows "1,4,7" specs/hello.spec

Range of table rows can also be specified, against which the scenarios
are run.

For example,

.. code-block:: console

    gauge run --table-rows "1-3" specs/hello.spec

This executes the scenarios against table rows 1, 2, 3.

.. note::

    This flag does not work well for multiple specifications, since there is no way to choose 
    different table rows for different specifications.

.. _parallel_execution:

Parallel Execution
------------------

Specs can be executed in parallel to run the tests faster and distribute
the load.

This can be done by the command:

.. code-block:: console

    gauge run --parallel specs

or,

.. code-block:: console

    gauge run -p specs

This creates a number of execution streams depending on the number of
cores of the machine and distribute the load among workers.

The number of parallel execution streams can be specified by ``-n``
flag.

Example:

.. code-block:: console

    gauge run --parallel -n=4 specs

This creates four parallel execution streams.

.. note:: 
    The number of streams should be specified depending on number of CPU 
    cores available on the machine, beyond which it could lead to undesirable results. 
    For optimizations, try `parallel execution using threads`_.

.. _parallel execution using threads:

Parallel Execution using threads
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In parallel execution, every stream starts a new worker process. This can be optimized 
by using multithreading instead of processes. This uses only one worker process and 
starts multiple threads for parallel execution.

To use this, Set `enable_multithreading` env var to true. 
This property can also be added to the default/custom env.

.. code-block:: text

    enable_multithreading = true

**Requirements:**

* Thread safe test code.
* Language runner should support multithreading.

.. note:: Currently, this feature is only supported by Java language runner/plugin.

Executing a group of specification
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Specifications can be distributed into groups and ``--group`` \| ``-g``
flag provides the ability to execute a specific group.

This can be done by the command:

.. code-block:: console

    gauge run -n=4 -g=2 specs

This creates 4 groups (provided by -n flag) of specification and selects
the 2nd group (provided by -g flag) for execution.

Specifications are sorted by alphabetical order and then distributed
into groups, which guarantees that every group will have the same set of
specifications, no matter how many times it is being executed.

Example:

.. code-block:: console

    gauge run -n=4 -g=2 specs

.. code-block:: console

    gauge run -n=4 -g=2 specs

The above two commands will execute the same group of specifications.

Rerun one execution stream
...........................

Executing specs with ``-n`` and ``--g`` flags guarantee the same execution. 

Example, execute the below command twice:

.. code-block:: console

    gauge run -n=4 -g=2 specs

On both occassions, gauge will execute the same group of specifications, in the same order.


Run your test suite with lazy assignment of tests
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This features dynamically allocates specs to streams during execution instead 
of at the start of execution.

This allows Gauge to optimise the resources on your agent/execution
environment. This is useful because some specs may take much longer than
other, either because of the number of scenarios in them or the nature
of the feature under test

The following command will assign tests lazily across the specified
number of streams:

.. code-block:: console

    gauge run -n=4 --strategy="lazy" specs

or,

.. code-block:: console

    gauge run -n=4 specs

As an example, if there are 100 tests, which have to be run across 4
streams/cores; lazy assignment will dynamically assign the next spec 
in line to the stream that has completed it's previous execution and 
is waiting for more work.

Lazy assignment of tests is the default behaviour.

Another strategy called ``eager`` can also be useful depending on need.
In this case, the 100 tests are distributed before execution, thus
making them an equal number based distribution.

.. code-block:: console

    gauge run -n=4 --strategy="eager" specs

.. note:: 
    The 'lazy' assignment strategy only works when you do NOT use
    the -g flag. This is because grouping is dependent on allocation of
    tests before the start of execution. Using this in conjunction with a
    lazy strategy will have no impact on your test suite execution.


Re-run failed tests
-------------------

Gauge provides the ability to re-run only the scenarios which failed
in previous execution. Failed scenarios can be run using the
``--failed`` flag of Gauge.

As an example if 3 scenarios failed during ``gauge run specs`` , the failed scenarios can be re-run
instead of executing all scenarios by following command.

.. code-block:: console

    gauge run --failed

This command will even set the flags which you had provided in your
previous run. For example, if previous command was

.. code-block:: console

    gauge run --env="chrome" --verbose specs

and 3 scenarios failed in this run, the ``gauge run --failed`` command sets
the ``--env`` and ``--verbose`` flags to corresponding values and
executes only the 3 failed scenarios. In this case ``gauge run --failed`` is
equivalent to command

.. code-block:: console

    gauge run --env="chrome" --verbose specs <path_to_failed_scenarios>

Re-run flaky tests with max retry
---------------------------------

Gauge provides a way to retry tests which may have failed.
The failed tests can be retry using following command.

.. code-block:: console

    gauge run --max-retries-count=3

This command will retry a failed test for a maximum of 3 times before it marks it as failed.

``--max-retries-count`` can be used along ``--retry-only`` flag. The ``--retry-only`` can be used to filter scenarios that should be retried when failed.

.. code-block:: console

    gauge run --max-retries-count=3 --retry-only="should-retry"

If ``--retry-only`` flag is not specified, all scenarios will retried ``--max-retries-count`` number of times.



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

Advanced
========

.. _execution_hooks:

Execution hooks
---------------

Test execution hooks can be used to run arbitrary test code as different
levels during the test suite execution.

**Implementation**

.. tab-container:: languages

    .. tab:: CSharp

        .. code-block:: java

            public class ExecutionHooks
            {

                [BeforeSuite]
                public void BeforeSuite() {
                    // Code for before suite
                }

                [AfterSuite]
                public void AfterSuite() {
                    // Code for after suite
                }

                [BeforeSpec]
                public void BeforeSpec() {
                    // Code for before spec
                }

                [AfterSpec]
                public void AfterSpec() {
                    // Code for after spec
                }

                [BeforeScenario]
                public void BeforeScenario() {
                    // Code for before scenario
                }

                [AfterScenario]
                public void AfterScenario() {
                    // Code for after scenario
                }

                [BeforeStep]
                public void BeforeStep() {
                    // Code for before step
                }

                [AfterStep]
                public void AfterStep() {
                    // Code for after step
                }

            }

    .. tab:: Java

        .. code-block:: java

            public class ExecutionHooks {

                @BeforeSuite
                public void BeforeSuite() {
                    // Code for before suite
                }

                @AfterSuite
                public void AfterSuite() {
                    // Code for after suite
                }

                @BeforeSpec
                public void BeforeSpec() {
                    // Code for before spec
                }

                @AfterSpec
                public void AfterSpec() {
                    // Code for after spec
                }

                @BeforeScenario
                public void BeforeScenario() {
                    // Code for before scenario
                }

                @AfterScenario
                public void AfterScenario() {
                    // Code for after scenario
                }

                @BeforeStep
                public void BeforeStep() {
                    // Code for before step
                }

                @AfterStep
                public void AfterStep() {
                    // Code for after step
                }

            }

    .. tab:: JavaScript

        .. code-block:: javascript

            beforeSuite(fn, [opts]) {
                // Code for before suite
            }

            beforeSpec(fn, [opts]) {
                // Code for before spec
            }

            beforeScenario(fn, [opts]) {
                // Code for before scenario
            }

            beforeStep(fn, [opts]) {
                // Code for before step
            }

            afterSuite(fn, [opts]) {
                // Code for after suite
            }

            afterSpec(fn, [opts]) {
                // Code for after spec
            }

            afterScenario(fn, [opts]) {
                // Code for after scenario
            }

            afterStep(fn, [opts]) {
                // Code for after step
            }

    .. tab:: Python

        .. code-block:: python

            from getgauge.python import before_step, after_step, before_scenario, after_scenario, before_spec, after_spec, before_suite, after_suite

            @before_step
            def before_step_hook():
                print("before step hook")

            @after_step
            def after_step_hook():
                print("after step hook")

            @before_scenario
            def before_scenario_hook():
                print("before scenario hook")

            @after_scenario
            def after_scenario_hook():
                print("after scenario hook")

            @before_spec
            def before_spec_hook():
                print("before spec hook")

            @after_spec
            def after_spec_hook():
                print("after spec hook")

            @before_suite
            def before_suite_hook():
                print("before suite hook")

            @after_suite
            def after_suite_hook():
                print("after suite hook")

    .. tab:: Ruby

        .. code-block:: ruby

            before_suite do
                # Code for before suite
            end

            after_suite do
                # Code for after suite
            end

            before_spec do
                # Code for before spec
            end

            after_spec do
                # Code for after spec
            end

            before_scenario do
                # Code for before scenario
            end

            after_scenario do
                # Code for after scenario
            end

            before_step do
                # Code for before step
            end

            after_step do
                # Code for after step
            end


By default, Gauge clears the state after each scenario so that new
objects are created for next scenario execution. You can :ref:`configure <default_properties>`
to change the level at which Gauge clears cache.

Current Execution Context in the Hook
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  To get additional information about the **current specification,
   scenario and step** executing, an additional **ExecutionContext**
   parameter can be added to the :ref:`hooks <execution_hooks>` method.

.. tab-container:: languages

    .. tab:: CSharp

        .. code-block:: java

            using Gauge.CSharp.Lib;
            using static Gauge.CSharp.Lib.ExecutionContext;

            [BeforeScenario]
            public void BeforeScenario(ExecutionContext context)
            {
                String scenarioName = context.CurrentScenario.Name;
                //Code for before scenario
            }

            [AfterSpec]
            public void AfterSpec(ExecutionContext context)
            {
                Specification specification = context.CurrentSpecification;
                //Code for after spec
            }

    .. tab:: Java

        .. code-block:: java

            @BeforeScenario
            public void loginUser(ExecutionContext context) {
                String scenarioName = context.getCurrentScenario().getName();
                // Code for before scenario
            }

            @AfterSpec
            public void performAfterSpec(ExecutionContext context) {
            Specification currentSpecification = context.getCurrentSpecification();
                //Code for after spec
            }

    .. tab:: JavaScript

        .. code-block:: javascript

            beforeScenario(function (context) {
                var scenario = context.currentScenario
                // Code for before scenario
            });

            afterSpec(function (context) {
                var specification = context.currentSpec
                //Code for after spec
            });

    .. tab:: Python

        .. code-block:: python

            from getgauge.python import before_step, after_scenario

            @before_step
            def before_step_hook(context):
                print(context)

            @after_spec
            def after_spec_hook(context):
                print(context)

    .. tab:: Ruby

        .. code-block:: ruby

            before_spec do |execution_info|
                puts execution_info.inspect
            end

            after_spec do |execution_info|
                puts execution_info.inspect
            end


.. _filtering_hooks_with_tags:

Filtering Hooks execution based on tags
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  You can specify tags for which the execution :ref:`hooks <execution_hooks>` can run. This
   will ensure that the hook only runs on scenarios and specifications
   that have the required tags.

.. tab-container::

    .. tab:: CSharp

        .. code-block:: java

            // A before spec hook that runs when tag1 and tag2
            // is present in the current scenario and spec.
            [BeforeSpec("tag1, tag2")]
            public void LoginUser() {
                // Code for before scenario
            }

            // A after step hook runs when tag1 or tag2
            // is present in the current scenario and spec.
            // Default tagAggregation value is Operator.AND.
            [AfterStep("tag1", "tag2")]
            [TagAggregationBehaviour(TagAggregation.Or)]
            public void PerformAfterStep() {
                // Code for after step
            }
    .. tab:: Java

        .. code-block:: java

            // A before spec hook that runs when tag1 and tag2
            // is present in the current scenario and spec.
            @BeforeSpec(tags = {"tag1, tag2"})
            public void loginUser() {
                // Code forbefore scenario
            }

            // A after step hook runs when tag1 or tag2
            // is present in the currentscenario and spec.
            // Default tagAggregation value is Operator.AND.
            @AfterStep(tags = {"tag1", "tag2"}, tagAggregation = Operator.OR)
            public void performAfterStep() {
                // Code for after step
            }

    .. tab:: JavaScript

        .. code-block:: javascript

            // A before spec hook that runs when tag1 and tag2
            // is present in the current scenario and spec.
            beforeSpec(function () {
                //implementation
            }, { tags: [ "tag1", "tag2" ]});

            // A after step hook runs when tag1 or tag2
            // is present in the currentscenario and spec.
            // Default tagAggregation value is Operator.AND.
            afterStep(function () {
                //implementation
            }, { tags: [ "tag1", "tag2" ]});

    .. tab:: Python

        .. code-block:: python

            // A before spec hook that runs when tag1 and tag2
            // is present in the current scenario and spec.
            @before_spec("<tag1> and <tag2>")
            def before_spec_hook():
                print("before spec hook with tag")

            // A after step hook runs when tag1 or tag2
            // is present in the currentscenario and spec.
            // Default tagAggregation value is Operator.AND.
            @after_step("<tag1> and <tag2>")
            def after_step_hook():
                print("after step hook with tag")
    .. tab:: Ruby

        .. code-block:: ruby

            # A before spec hook that runs when
            # tag1 and tag2 is present in the current scenario and spec.
            before_spec({tags: ['tag2', 'tag1']}) do
                # Code for before scenario
            end

            # A after step hook runs when tag1 or tag2
            # is present in the current scenario and spec.
            # Default tagAggregation value is Operator.AND.
            after_step({tags: ['tag2', 'tag1'], operator: 'OR'}) do
                # Code for after step
            end

.. note:: Tags cannot be specified on @BeforeSuite and @AfterSuite hooks


Data Store
----------

Data (Objects) can be shared in steps defined in different classes at
runtime using DataStores exposed by gauge.

There are 3 different types of DataStores based on the lifecycle of when
it gets cleared.

ScenarioStore
^^^^^^^^^^^^^

This data store keeps values added to it in the lifecycle of the
scenario execution. Values are cleared after every scenario executes.

.. tab-container::

    .. tab:: CSharp

        .. code-block:: java

            using Gauge.CSharp.Lib;

            // Adding value
            var scenarioStore = DataStoreFactory.ScenarioDataStore;
            scenarioStore.Add("element-id", "455678");

            // Fetching Value
            var elementId = (string) scenarioStore.Get("element-id");

            // avoid type cast by using generic Get
            var anotherElementId = scenarioStore.Get("element-id");

    .. tab:: Java

        .. code-block:: java

            import com.thoughtworks.gauge.datastore.*;

            // Adding value
            DataStore scenarioStore = DataStoreFactory.getScenarioDataStore();
            scenarioStore.put("element-id", "455678");

            // Fetching Value
            String elementId = (String) scenarioStore.get("element-id");

    .. tab:: JavaScript

        .. code-block:: javascript

            // Adding value
            gauge.dataStore.scenarioStore.put(key, value);

            // Fetching Value
            gauge.dataStore.scenarioStore.get(key);

    .. tab:: Python

        .. code-block:: python

            # Import Package
            from getgauge.python import data_store
            
            # Adding value
            data_store.scenario["key"] = value
            # OR
            data_store.scenario.key = value

            # Fetching Value
            data_store.scenario["key"]
            # OR
            data_store.scenario.key

    .. tab:: Ruby

        .. code-block:: ruby

            // Adding value
            scenario_store = DataStoreFactory.scenario_datastore;
            scenario_store.put("element-id", "455678");


            // Fetching Value
            element_id = scenario_store.get("element-id");


SpecStore
^^^^^^^^^

This data store keeps values added to it during the lifecycle of the
specification execution. Values are cleared after every specification
executes

.. tab-container::

    .. tab:: CSharp

        .. code-block:: java

            using Gauge.CSharp.Lib;

            // Adding value
            var specStore = DataStoreFactory.SpecDataStore;
            specStore.Add("element-id", "455678");

            // Fetching Value
            var elementId = (string) specStore.Get("element-id");

            // avoid type cast by using generic Get
            var anotherElementId = specStore.Get("element-id");

    .. tab:: Java

        .. code-block:: java

            // Import Package 
            import com.thoughtworks.gauge.datastore.*;

            // Adding value 
            DataStore specStore = DataStoreFactory.getSpecDataStore();
            specStore.put("key", "455678");

            // Fetching value 
            String elementId = (String) specStore.get("key");

    .. tab:: JavaScript

        .. code-block:: javascript

            // Adding value 
            DataStore specStore = gauge.dataStore.specStore.put(key, value);

            // Fetching value 
            DataStore specStore = gauge.dataStore.specStore.get(key);

    .. tab:: Python

        .. code-block:: python

            # Import Package
            from getgauge.python import data_store

            # Adding value 
            data_store.spec["key"] = value
            # OR
            data_store.spec.key = value

            # Fetching value 
            data_store.spec["key"]
            # OR
            data_store.spec.key

    .. tab:: Ruby

        .. code-block:: ruby

            // Adding value
            spec_store = DataStoreFactory.spec_datastore;
            spec_store.put("element-id", "455678");

            // Fetching Value
            element_id = spec_store.get("element-id");

SuiteStore
^^^^^^^^^^

This data store keeps values added to it during the lifecycle of entire
suite execution. Values are cleared after entire suite execution.

.. warning::
   ``SuiteStore`` is not advised to be used when executing specs in parallel.
   The values are not retained between parallel streams of execution.

.. tab-container::

    .. tab:: CSharp

        .. code-block:: java

            using Gauge.CSharp.Lib;

            // Adding value 
            var suiteStore = DataStoreFactory.SuiteDataStore;
            suiteStore.Add("element-id", "455678");

            // Fetching Value 
            var suiteStore = DataStoreFactory.SuiteDataStore; 
            var elementId = (string) suiteStore.Get("element-id");

            // Avoid type cast by using generic Get 
            var anotherElementId = suiteStore.Get("element-id");

    .. tab:: Java

        .. code-block:: java

            // Import Package 
            import com.thoughtworks.gauge.datastore.*;

            // Adding value
            DataStore suiteStore = DataStoreFactory.getSuiteDataStore();
            suiteStore.put("element-id", "455678");

            // Fetching value
            DataStore suiteStore = DataStoreFactory.getSuiteDataStore();
            String elementId = (String) suiteStore.get("element-id");

    .. tab:: JavaScript

        .. code-block:: javascript

            // Adding value 
            DataStore suiteStore = gauge.dataStore.suiteStore.put(key, value);
            
            // Fetching value 
            DataStore specStore = gauge.dataStore.suiteStore.get(key);

    .. tab:: Python

        .. code-block:: python

            # Import Package 
            from getgauge.python import data_store
            
            # Adding value 
            data_store.suite["key"] = value
            # OR
            data_store.suite.key = value

            # Fetching value 
            data_store.suite["key"]
            # OR
            data_store.suite.key

    .. tab:: Ruby

        .. code-block:: ruby

            // Adding value
            suite_store = DataStoreFactory.suite_datastore;
            suite_store.put("element-id", "455678");

            // Fetching Value
            suite_store = DataStoreFactory.suite_datastore;
            element_id = suite_store.get("element-id");

Taking Custom Screenshots
-------------------------

-  By default gauge captures the display screen on failure if this
   feature has been enabled.

-  If you need to take CustomScreenshots (using webdriver for example)
   because you need only a part of the screen captured, this can be done
   by **implementing** the ``ICustomScreenshotGrabber`` interface;

.. note::

    If multiple custom ScreenGrabber implementations are found in
    classpath then gauge will pick one randomly to capture the screen.
    This is because gauge selects the first ScreenGrabber it finds,
    which in turn depends on the order of scanning of the libraries.


.. tab-container::

    .. tab:: CSharp

        .. code-block:: java

            //Using Webdriver public
            class CustomScreenGrabber : ICustomScreenshotGrabber {

                // Return a screenshot byte array
                public byte[] TakeScreenshot() {
                    var driver = DriverFactory.getDriver();
                    return ((ITakesScreenshot) driver).GetScreenshot().AsByteArray;
                }
            }

    .. tab:: Java

        .. code-block:: java

            // Using Webdriver public class
            CustomScreenGrabber implements ICustomScreenshotGrabber {
                // Return a screenshot byte array
                public byte[] takeScreenshot() {
                    WebDriver driver = DriverFactory.getDriver();
                    return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
                }

            }

    .. tab:: JavaScript

        .. code-block:: javascript

            // Using Taiko
            // Return a screenshot byte array
            gauge.screenshotFn = async function() {
                return await screenshot({ encoding: 'base64' });
            };


    .. tab:: Python

        .. code-block:: python

            # Using Webdriver
            from getgauge.python import screenshot
            @custom_screen_grabber
            # Return a screenshot byte array
            def take_screenshot():
                return Driver.driver.get_screenshot_as_png()

    .. tab:: Ruby

        .. code-block:: ruby

            # Using Webdriver
            Gauge.configure do |config|
                # Return a screenshot byte array
                config.screengrabber = -> {
                driver.save_screenshot('/tmp/screenshot.png')
                return File.binread("/tmp/screenshot.png")
                }
            end


.. _reports_custom_messages:

Custom messages in reports
--------------------------

Custom messages/data can be added to execution reports using the below
API from the step implementations or hooks.

These messages will appear under steps in the execution reports.

.. tab-container::

    .. tab:: CSharp

        .. code-block:: java

            GaugeMessages.WriteMessage("Custom message for report");
            var id = "4567";
            GaugeMessages.WriteMessage("User id is {0}", id);

    .. tab:: Java

        .. code-block:: java

            Gauge.writeMessage("Custom message for report");
            String id = "4567";
            Gauge.writeMessage("User id is %s", id);

    .. tab:: JavaScript

        .. code-block:: javascript

            gauge.message("Custom message for report");

    .. tab:: Python

        .. code-block:: python

            from getgauge.python import Messages

            Messages.write_message("Custom message for report")

    .. tab:: Ruby

        .. code-block:: ruby

            Gauge.write_message("Custom message for report")
            id = "4567"
            Gauge.write_message("User id is" + id)

.. _reports_custom_screenshots:

Custom screenshots in reports
-----------------------------

Custom screenshot can be added to execution reports using the below
API from the step implementations or hooks.

These screenshots will appear under steps in the execution reports.

.. tab-container::

    .. tab:: CSharp

        .. code-block:: java

            GaugeScreenshots.Capture();

    .. tab:: Java

        .. code-block:: java

            Gauge.captureScreenshot();

    .. tab:: JavaScript

        .. code-block:: javascript

            gauge.screenshot();

    .. tab:: Python

        .. code-block:: python

            from getgauge.python import Screenshots

            Screenshots.capture_screenshot()

    .. tab:: Ruby

        .. code-block:: ruby

            Gauge.capture


Continue on Failure
-------------------

The default behaviour in gauge is to break execution on the first
failure in a :ref:`step <step_syntax>`. So, if the
first step in a :ref:`scenario <scenario_syntax>`
fails, the subsequent steps are skipped. While this works for a majority
of use cases, there are times when you need to execute all steps in a
scenario irrespective of whether the previous steps have failed or not.

To address that requirement, gauge provides a way for language runners
to mark steps as recoverable, depending on whether the step
implementation asks for it explicitly. Each language runner uses
different syntax, depending on the language idioms to allow a step
implementation to be marked to continue on failure.

.. tab-container::

    .. tab:: CSharp

        .. code-block:: java

            // The ``[ContinueOnFailure]`` attribute tells Gauge to continue executing others
            // steps even if the current step fails.

            public class StepImplementation {
                [ContinueOnFailure]
                [Step("Say <greeting> to <product name>")]
                public void HelloWorld(string greeting, string name) {
                    // If there is an error here, Gauge will still execute next steps
                }

            }

    .. tab:: Java

        .. code-block:: java

            // The ``@ContinueOnFailure`` annotation tells Gauge to continue executing other
            // steps even if the current step fails.

            public class StepImplementation {
                @ContinueOnFailure
                @Step("Say <greeting> to <product name>")
                public void helloWorld(String greeting, String name) {
                    // If there is an error here, Gauge will still execute next steps
                }

            }

    .. tab:: JavaScript

        .. code-block:: javascript

            // The ``@ContinueOnFailure`` annotation tells Gauge to continue executing other
            // steps even if the current step fails.

            gauge.step("Say <greeting> to <product>.", { continueOnFailure: true}, function (greeting,product) {
            });

    .. tab:: Python

        .. code-block:: python

            // The ``@ContinueOnFailure`` annotation tells Gauge to continue executing other
            // steps even if the current step fails.

            @continue_on_failure([RuntimeError])
            @step("Say <greeting> to <product>")
            def step2(greeting,product):
                pass

    .. tab:: Ruby

        .. code-block:: ruby

            # The ``:continue_on_failure => true`` keyword argument
            # tells Gauge to continue executing other steps even
            # if the current step fails.

            step 'Say <greeting> to <name>', :continue_on_failure => true do |greeting, name|
                # If there is an error here, Gauge will still execute next steps
            end

Continue on Failure can take an optional parameter to specify the list
of error classes on which it would continue to execute further steps in
case of failure. This is currently supported only with the following runners.

.. code-block:: java
  :caption: Java

  @ContinueOnFailure({AssertionError.class, CustomError.class})
  @Step("hello")
  public void sayHello() {
    // code here
  }

  @ContinueOnFailure(AssertionError.class)
  @Step("hello")
  public void sayHello() {
    // code here
  }

  @ContinueOnFailure
  @Step("hello")
  public void sayHello() {
    // code here
  }

.. code-block:: python
  :caption: Python

  @continue_on_failure([RuntimeError])
  @step("Step 2")
  def step2():
      pass

In case no parameters are passed to ``@ContinueOnFailure``, on any type
of error it continues with execution of further steps by default.

This can be used to control on what type of errors the execution should
continue, instead of just continuing on every type of error. For
instance, on a ``RuntimeException`` it's ideally not expected to
continue further. Whereas if it's an assertion error, it might be fine
to continue execution.

.. note::

  -  Continue on failure comes into play at post execution, i.e. after the step method is executed. If there is a failure in executing the step, ex. parameter count/type mismatch, gauge will not honour the ``ContinueOnFailure`` flag.
  -  Continue on failure does not apply to :ref:`hooks <execution_hooks>`. Hooks always fail on first error.
  -  Step implementations are still non-recoverable by default and Gauge does not execute subsequent steps upon failure. To make a step implementation continue on failure, it needs to be explicitly marked in the test code.
  -  There is no way to globally mark a test run to treat all steps to continue on failure. Each step implementation has to be marked explicitly.
  -  If an implementation uses step aliases, marking that implementation to continue on failure will also make all the aliases to continue on failure. So, if a step alias is supposed to break on failure and another step alias is supposed to continue on failure, they need to be extracted to two different step implementations.

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

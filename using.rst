Using Gauge
===========

Gauge is a first class command line tool. This means that you can
operate entirely from the command line. Or, if you prefer to use an IDE
then Gauge also has excellent integration with multiple IDEs.

.. _cli:

Command Line Interface
----------------------

Gauge has first-class command line support. With gauge :doc:`installed <installing>`, list the subcommands/flags supported by running.

.. code-block:: console

   gauge

The command-line interface works across platforms. On GNU/Linux and OSX,
you can use any terminal. On Windows, you can use ``cmd`` or Powershell.

.. _cli_interface:

Help
^^^^

Since subcommands/flags get added/deprecated with versions, it is recommended to get this reference via ``gauge`` itself.

.. code-block:: console

   gauge help


Creating a project
^^^^^^^^^^^^^^^^^^

To create or initialize a Gauge project use run

.. code-block:: console

   gauge init <template>

For details, see how to :ref:`create a Gauge project <create_a_project>`.

.. _executing_tests:

Executing tests
^^^^^^^^^^^^^^^

Inside a Gauge project, you can execute your tests by invoking ``gauge`` with path to :ref:`specifications <spec_syntax>`. By convention, specifications are stored in the the ``./specs/`` sub-directory in the project root.

The syntax is:

.. code-block:: console

    gauge run [flags] <path-to-specs>

The ``gauge`` command-line utility allows multiple ways to specify the
specifications to be executed. A valid path for executing tests can be
path to directories that contain specifications or path to specification
files or path to scenarios or a mix of any of these three methods.

To execute all the tests in a given folder ``specs``, use

.. code-block:: console

    gauge run specs/

This will give a colored console output with details of the execution as
well an execution summary.

Specify scenarios
~~~~~~~~~~~~~~~~~

A single scenario of a specification can be executed by specifying the
line number in the span of that scenario in the spec. To execute a
``Admin Login`` scenario in the following spec use
``gauge run specs/login_test.spec:4`` command.

.. code-block:: gauge
    :linenos:
    :name: specify_scenario
    :emphasize-lines: 4-7

    Configuration
    =============

    Admin Login
    -----------
    * User must login as "admin"
    * Navigate to the configuration page

This executes only the scenario present at line number ``4`` i.e
``Admin Login`` in ``login_test.spec``. In the above spec, specifying
line numbers 4-7 will execute the same scenario because of the span.

Multiple scenarios can be executed selectively as follows :

.. code-block:: console

    gauge run specs/helloworld.spec:4 specs/helloworld.spec:7

These scenarios can also belong to different specifications.

You can also specify a specific :ref:`scenario <scenario_syntax>` or a list of scenarios to execute. To execute scenarios, ``gauge`` takes path to a specification file, followed by a colon and a zero-indexed number of scenarios.

For example, to execute the second scenario of a specification file
named ``spec1.spec``, you would do:

.. code-block:: console

    gauge run specs/spec1.spec:1

To specify multiple scenarios, add multiple such arguments. For example,
to execute the first and third scenarios of a specification file named
``spec1.spec``, you would do:

.. code-block:: console

    gauge run specs/spec1.spec:0 specs/spec1.spec:2

Specify directories
~~~~~~~~~~~~~~~~~~~

You can specify a single directory in which specifications are stored.
Gauge scans the directory and picks up valid specification files.

For example:

.. code-block:: console

    gauge run specs/

You can also specify multiple directories in which specifications are
stored. Gauge scans all the directories for valid specification files
and executes them in one run.

For example:

.. code-block:: console

    gauge run specs-dir1/ specs-dir2/ specs-dir3/

Specify files
~~~~~~~~~~~~~

You can specify path to a specification files. In that case, Gauge
executes only the specification files provided.

For example, to execute a single specification file:

.. code-block:: console

    gauge run specs/spec1.spec

Or, to execute multiple specification files:

.. code-block:: console

    gauge run specs/spec1.spec specs/spec2.spec specs/spec3.spec


Verbose reporting
~~~~~~~~~~~~~~~~~

By default, ``gauge`` reports at the specification level when executing
tests. You can enable verbose, step-level reporting by using the
``--verbose`` flag. For example:

.. code-block:: console

    gauge run --verbose specs/


Errors during execution
~~~~~~~~~~~~~~~~~~~~~~~

Parse error in a spec file:
""""""""""""""""""""""""""""""

This occurs if the spec file doesn't follow the expected :ref:`specifications <spec_syntax>` syntax or parameters could not be resolved.

**Example**

.. code-block:: text

    [ParseError] hello_world.spec : line no: 25, Dynamic parameter <product> could not be resolved

Unimplemented steps present in spec file
"""""""""""""""""""""""""""""""""""""""""""

If the spec file has a step that does not have an implementation in the
projects programming language there will be a validation error.

Appropriate underlying code implementation has to be provided for all
the steps in the specs to be executed.

**Example**

.. code-block:: text

    login.spec:33: Step implementation not found. login with "user" and "p@ssword"

Failure to launch the language runner plugin
"""""""""""""""""""""""""""""""""""""""""""""""

If the language specific plugin for the project has not been installed
then the execution will fail.

.. _table_driven_execution:

Data driven execution
~~~~~~~~~~~~~~~~~~~~~

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

**Example:**

.. code-block:: gauge
    :linenos:
    :name: data_driven

    Table driven execution
    ======================

         |id| name    |
         |--|---------|
         |1 |vishnu   |
         |2 |prateek  |
         |3 |navaneeth|

    Scenario
    --------
    * Say "hello" to <name>

    Second Scenario
    ---------------
    * Say "namaste" to <name>

In the above example the step uses the ``name`` column from the data
table as a dynamic parameter.

Both ``Scenario`` and ``Second Scenario`` are executed first for the
first row values ``1, vishnu`` and then consecutively for the second and
third row values from the table.

Execute selected data table rows
""""""""""""""""""""""""""""""""

By default, scenarios in a spec are run against all the data table rows.
It can be run against selected data table rows with flag
``--table-rows`` and specifying the row numbers against which the
scenarios should be executed. If there are multiple row numbers, they
should be separated by commas.

Example:

.. code-block:: console

    gauge run --table-rows "1" specs/hello.spec
    gauge run --table-rows "1,4,7" specs/hello.spec

Range of table rows can also be specified, against which the scenarios
are run.

Example:

.. code-block:: console

    gauge run --table-rows "1-3" specs/hello.spec

This executes the scenarios against table rows 1, 2, 3.

.. _tagged_execution:

Tagged Execution
~~~~~~~~~~~~~~~~

Tags allow you to filter the specs and scenarios quickly for execution.
To execute all the specs and scenarios which are labelled with certain
tags, use the following command.

.. code-block:: console

    gauge run --tags tag1,tag2 specs

or,

.. code-block:: console

    gauge run --tags "tag1, tag2" specs

This executes only the scenarios and specifications which are tagged
with ``tag1`` and ``tag2``.

Example:

.. figure:: images/spec.png
   :alt: Specification

   Spec

In the above spec, if all the scenarios tagged with "search" and "admin"
should be executed, then use the following command:

.. code-block:: console

    gauge run --tags "search & admin" SPEC_FILE_NAME

Tag expressions
"""""""""""""""

Tags can be selected using expressions. Examples:

================================== ===============================================================
Tags                               Selects specs/scenarios that
================================== ===============================================================
``!TagA``                          do not have ``TagA``
``TagA & TagB``                    have both ``TagA`` and ``TagB``.
``TagA & !TagB``                   have ``TagA`` and not ``TagB``.
``TagA | TagB``                    have either ``TagA`` or ``TagB``.
``(TagA & TagB) | TagC``           have either ``TagC`` or both ``TagA`` and ``TagB``
``!(TagA & TagB) | TagC``          have either ``TagC`` or do not have both TagA and TagB
``(TagA | TagB) & TagC``           have either [``TagA`` and ``TagC``] or [``TagB`` and ``TagC``]
================================== ===============================================================

.. _parallel_execution:

Parallel Execution
~~~~~~~~~~~~~~~~~~

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

.. note:: The number of streams should be specified depending on number of CPU cores available on the machine, beyond which it could lead to undesirable results. For optimizations, try `parallel execution using threads`_.

.. _parallel execution using threads:

Parallel Execution using threads
""""""""""""""""""""""""""""""""

In parallel execution, every stream starts a new worker process. This can be optimized by using multithreading instead of processes. This uses only one worker process and starts multiple threads for parallel execution.

To use this, Set `enable_multithreading` env var to true. This property can also be added to the default/custom env.

.. code-block:: text

    enable_multithreading = true

**Requirements:**

* Thread safe test code.
* Language runner should support multithreading.

**Note:** Currently, this feature is only supported by Java langauge runner/plugin.

Executing a group of specification
""""""""""""""""""""""""""""""""""

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

Run your test suite with lazy assignment of tests
"""""""""""""""""""""""""""""""""""""""""""""""""

This features allows you to dynamically allocate your specs to streams
during execution instead of at the start of execution.

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

Say you have 100 tests, which you have chosen to run across 4
streams/cores; lazy assignment will dynamically, during execution,
assign the next spec in line to the stream that has completed it's
previous execution and is waiting for more work.

Lazy assignment of tests is the default behaviour.

Another strategy called ``eager`` can also be useful depending on need.
In this case, the 100 tests are distributed before execution, thus
making them an equal number based distribution.

.. code-block:: console

    gauge run -n=4 --strategy="eager" specs

**Note:** The 'lazy' assignment strategy only works when you do NOT use
the -g flag. This is because grouping is dependent on allocation of
tests before the start of execution. Using this in conjunction with a
lazy strategy will have no impact on your test suite execution.

Rerun one execution stream
""""""""""""""""""""""""""

Specifications can be distributed into groups and ``--group`` \| ``-g``
flag provides the ability to execute a specific group.

This can be done by the command:

.. code-block:: console

    gauge run -n=4 -g=2 specs

This creates 4 groups (provided by ``-n`` flag) of specification and
selects the 2nd group (provided by ``-g`` flag) for execution.

Specifications are sorted by alphabetical order and then distributed
into groups, which guarantees that every group will have the same set of
specifications, no matter how many times it is being executed.

Example:

.. code-block:: console

    gauge run -n=4 -g=2 specs

The above two commands will execute the same group of specifications.

Current Execution Context in the Hook
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  To get additional information about the **current specification,
   scenario and step** executing, an additional **ExecutionContext**
   parameter can be added to the :ref:`hooks <execution_hooks>` method.


.. code-block:: java
  :caption: Java

    @BeforeScenario
    public void loginUser(ExecutionContext context) {
      String scenarioName = context.getCurrentScenario().getName();
      // Code for before scenario
    }

    @AfterSpec
    public void performAfterSpec(ExecutionContext context) {
      Specification currentSpecification = context.getCurrentSpecification();
      // Code for after step
    }


.. code-block:: java
  :caption: C#

    This feature is not yet
    supported in Gauge-CSharp. Please refer to
    https://github.com/getgauge/gauge-csharp/issues/53 for updates.

.. code-block:: ruby
  :caption: ruby

    before_spec do |execution_info|
        puts execution_info.inspect
    end

    after_spec do |execution_info|
        puts execution_info.inspect
    end

Filtering Hooks execution based on tags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  You can specify tags for which the execution :ref:`hooks <execution_hooks>` can run. This
   will ensure that the hook runs only on scenarios and specifications
   that have the required tags.

.. code-block:: java
  :caption: Java

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

.. code-block:: java
  :caption: C#

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

.. code-block:: ruby
  :caption: Ruby

    # A before spec hook that runs when
    # tag1 and tag2 is present in the current scenario and spec.
    before_spec({tags: ['tag2', 'tag1']}) do
        # Code for before scenario
    end

    # A after step hook runs when tag1 or tag2 is present in the current scenario and spec.
    # Default tagAggregation value is Operator.AND.

    after_spec({tags: ['tag2', 'tag1'], operator: 'OR'}) do
        # Code for after step
    end

.. note:: Tags cannot be specified on @BeforeSuite and @AfterSuite hooks

Gauge Project Templates
^^^^^^^^^^^^^^^^^^^^^^^

Gauge provides templates that can be used to bootstrap the process of
initializing a Gauge project along with a suitable build dependency
tool, webdriver etc.

To list all the Gauge project templates available, run the following
command:

.. code-block:: console

    gauge init --templates

These templates can also be found in `Bintray Gauge Templates <https://bintray.com/gauge/Templates/gauge-templates/view#files>`__.

Initialize a Gauge project with Template
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Say you want to initialize a Gauge project with Java as language for
writing test code and Selenium as driver of choice. You can quickly
setup such project which is ready to start writing tests with selenium
by using ``java_maven_selenium`` Gauge template.

To initialize a Gauge project with a template, choose a name from the
list shown on running ``gauge init --templates`` and pass that name as
an argument when initializing the Gauge project.

For example, to create a Gauge project with the ``java_maven_selenium``
template, you need to run this command:

.. code-block:: console

    gauge init java_maven_selenium

This template creates a Gauge project with Maven as build tool and the
selenium Webdriver. This will download the Gauge template
``java_maven_selenium`` and setup your project with useful sample code.

Now, you can start writing :ref:`Specifications <spec_syntax>` and
execute them.

Step alias
^^^^^^^^^^

Multiple Step names for the same implementation. The number and type of
parameters for all the steps names must match the number of parameters
on the implementation.

Use case
~~~~~~~~

There may be situations where while authoring the specs, you may want to
express the same functionality in different ways in order to make the
specs more readable.

Example 1
~~~~~~~~~

.. code-block:: gauge

    User Creation
    =============
    Multiple Users
    --------------
    * Create a user "user 1"
    * Verify "user 1" has access to dashboard
    * Create another user "user 2"
    * Verify "user 2" has access to dashboard

In the scenario named Multiple Users, the underlying functionality of
the first and the third step is the same. But the way it is expressed is
different. This helps in conveying the intent and the functionality more
clearly. In such situations like this, step aliases feature should be
used so that you can practice DRY principle at code level, while
ensuring that the functionality is expressed clearly.

Implementation
""""""""""""""

.. code-block:: java
  :caption: Java

    public class Users {

        @Step({"Create a user <user_name>", "Create another user <user_name>"})
        public void helloWorld(String user_name) {
            // create user user_name
        }

    }

.. code-block:: java
  :caption: C#

    public class Users {

        [Step({"Create a user <user_name>", "Create another user <user_name>"})]
        public void HelloWorld(string user_name) {
            // create user user_name
        }

    }

.. code-block:: ruby
  :caption: Ruby

    step 'Create a user ','Create another user ' do |user_name|
        // create user user_name
    end

Example 2
~~~~~~~~~

.. code-block:: gauge

    User Creation
    -------------
    * User creates a new account
    * A "welcome" email is sent to the user

    Shopping Cart
    -------------
    * User checks out the shopping cart
    * Payment is successfully received
    * An email confirming the "order" is sent

In this case, the underlying functionality of the last step (sending an
email) in both the scenarios is the same. But it is expressed more
clearly with the use of aliases. The underlying step implementation
could be something like this.

Implementation
""""""""""""""

.. code-block:: java
  :caption: Java

    public class Users {

        @Step({"A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"})
        public void helloWorld(String email_type) {
            // Send email of email_type
        }

    }

.. code-block:: java
  :caption: C#

    public class Users {

        [Step({"A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"})]
        public void HelloWorld(string email_type) {
            // Send email of email_type
        }

    }

.. code-block:: ruby
  :caption: Ruby

    step 'A email is sent to the user', 'An email confirming the is sent' do |email_type|
        email_service.send email_type
    end

Re-run failed tests
^^^^^^^^^^^^^^^^^^^

Gauge provides you the ability to re-run only the scenarios which failed
in previous execution. Failed scenarios can be run using the
``--failed`` flag of Gauge.

Say you run ``gauge run specs`` and 3 scenarios failed, you can run re-run
only failed scenarios instead of executing all scenarios by following
command.

.. code-block:: console

    gauge run --failed

This command will even set the flags which you had provided in your
previous run. For example, if you had executed command as

.. code-block:: console

    gauge run --env="chrome" --verbose specs

and 3 scenarios failed in this run, the ``gauge run --failed`` command sets
the ``--env`` and ``--verbose`` flags to corresponding values and
executes only the 3 failed scenarios. In this case ``gauge run --failed`` is
equivalent to command

.. code-block:: console

    gauge run --env="chrome" --verbose specs <path_to_failed_scenarios>

Refactoring
^^^^^^^^^^^

Rephrase steps
~~~~~~~~~~~~~~

Gauge allows you to rephrase a step across the project. To rephrase a
step run:

.. code-block:: console

    gauge refactor "old step <name>" "new step name"

Here ``<`` and ``>`` are used to denote parameters in the step.
**Parameters can be added, removed or changed while rephrasing.**

This will change all spec files and code files (for language plugins
that support refactoring).

Example
"""""""

Let's say we have the following steps in our ``spec`` file:

.. code-block:: gauge

    * create user "john" with id "123"
    * create user "mark" with id "345"

Now, if we now need to add an additional parameter, say ``last name``,
to this step we can run the command:

.. code-block:: console

    gauge refactor "create user <name> with id <id>" "create user <name> with <id> and last name <watson>"

This will change all spec files to reflect the change.

.. code-block:: gauge

    * create user "john" with id "123" and last name "watson"
    * create user "mark" with id "345" and last name "watson"

.. _project_structure:

Project Structure
-----------------

On initialization of a gauge project for a particular language a project
skeleton is created with the following files

Common Gauge files
^^^^^^^^^^^^^^^^^^

.. _gauge_project_root:

``GAUGE_PROJECT_ROOT`` environment variable holds the path in which the Gauge project is created.

.. code-block:: text

    ├── env
    │  └── default
    │     └── default.properties
    ├── manifest.json
    ├── specs
       └── example.spec

Env Directory
~~~~~~~~~~~~~

The env directory contains multiple environment specific directories.
Each directory has `.property files <https://en.wikipedia.org/wiki/.properties>`__ which define the environment variables set during execution for that specific environment.

A **env/default** directory is created on project initialization which
contains the default environment variables set during execution.

Learn more about :ref:`managing environments <environments>`.

Specs Directory
~~~~~~~~~~~~~~~

The specs directory contains all :ref:`spec <spec_syntax>` files for the
project. They are the business layer specifications written in simple
markdown format.

A simple example spec (**example.spec**) is created in the specs
directory to better understand the format of specifications.

Learn more about :ref:`spec <spec_syntax>`.

Manifest file
~~~~~~~~~~~~~

The **manifest.json** contains gauge specific configurations which
includes the information of plugins required in the project.

After project initialization, the ``manifest.json`` will have the
following content.

.. code:: js

   {
     "Language": "<language>",
     "Plugins": [
       "html-report"
     ]
   }

-  **language** : Programming language used for the test code. Gauge uses the corresponding language runner for executing the specs.

-  **Plugins** : The gauge plugins used for the project. Some plugins are used by default on each gauge project. The plugins can be added to project by running the following command :

  .. code:: console

      gauge add <plugin-name>

  Example :

  .. code:: console

      gauge add xml-report

After running the above command, the manifest.json would have the
following content:

.. code:: js

   {
     "Language": "<language>",
     "Plugins": [
       "html-report",
       "xml-report"
     ]
   }

.. _`ide_support`:

C# Project files
^^^^^^^^^^^^^^^^

When creating a new Gauge C# project, the csharp specific project files
created in the project are:

.. code-block:: text

   ├── foo.csproj
   ├── foo.sln
   ├── manifest.json
   ├── packages.config
   ├── StepImplementation.cs
   │
   ├── env
   │   └───default
   │           default.properties
   │
   ├───packages
       └───<Nuget Package Binaries>
   ├───Properties
   │       AssemblyInfo.cs
   │
   └───specs
           hello_world.spec

packages.config
~~~~~~~~~~~~~~~

For ``nuget``. Contains the dependencies for Gauge. One can add more to
this list, depending on your project needs.

StepImplementation.cs
~~~~~~~~~~~~~~~~~~~~~

Contains the implementations for the sample steps defined in
``hello_world.spec``.

default.properties
~~~~~~~~~~~~~~~~~~

This defines default configurations for gauge csharp runner plugin.
Currently the configuration parameters are:

-  ``gauge_reports_dir`` - The path to the gauge reports directory. Should be either relative to the project directory or an absolute path
-  ``overwrite_reports`` - Set as false if gauge reports should not be overwritten on each execution. A new time-stamped directory will be created on each execution. This is ``true`` by default.

Java project files
^^^^^^^^^^^^^^^^^^

The java specific project files create in the project are:

.. code-block:: text

   ├── libs
   └── src
       └── test
           └── java
               └── StepImplementation.java
   ├── env
       └── default
           └── java.properties

libs
~~~~

This contains the additional java dependencies for the project.

src
~~~~

Src directory contains the classes the test code including step
implementations.

java.properties
~~~~~~~~~~~~~~~~

This defines configurations for java runner plugin. See :doc:`configuration` for more details.

Ruby Project files
^^^^^^^^^^^^^^^^^^

The ruby specific project files create in the project are:

.. code-block:: text

   ├── env
   │   └── default
   │       └── ruby.properties
   └── step_implementations
       └── step_implementation.rb

step_implementations directory
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This contains all the ``.rb`` files with the test code including step implementations in ruby

ruby.properties
~~~~~~~~~~~~~~~

This defines configurations for ruby runner plugin.

IDE Support
-----------

The listed IDE plugins are available for gauge to make writing specs and
test code simpler.

-  Intellij IDEA
-  Visual Studio

.. _`intellij_idea`:

IntelliJ IDEA
^^^^^^^^^^^^^

Gauge projects can be created and executed from Intellij IDEA. The
plugin can be downloaded from the JetBrains plugin repository.

This plugin currently supports only Gauge with Java.

Installation
~~~~~~~~~~~~

Plugin can be installed by downloading from Jetbrains plugin repository.

Steps to install Gauge Intellij IDEA plugin from IDE:

-  Open the Settings dialog (e.g. ⌘ Comma).
-  In the left-hand pane, select Plugins.
-  On the Plugins page that opens in the right-hand part of the dialog,
   click the Install JetBrains plugin or the Browse repositories button.
-  In the dialog that opens, search for Gauge. Right-click on **Gauge**
   and select Download and Install.

   |install plugin|
-  Confirm your intention to download and install the selected plugin.
-  Click Close.
-  Click OK in the Settings dialog and restart IntelliJ IDEA for the
   changes to take effect.

*Note:* The plugin you have installed is automatically enabled. When
necessary, you can disable it as described in Enabling and Disabling
plugins.

To install plugin by downloading it manually or to update plugin, follow
the steps
`here <https://www.jetbrains.com/help/idea/2017.1/installing-a-plugin-from-the-disk.html>`__.

Create a new Gauge project and start writing your tests.

Explore all the :ref:`features of Gauge Intellij IDEA plugin <intellij-features>` now!

Installing Nightly
~~~~~~~~~~~~~~~~~~

Nightly builds are also available in IntelliJ plugin repository.

-  Follow the
   `instructions <https://www.jetbrains.com/idea/help/managing-enterprise-plugin-repositories.html>`__
   to add ``Nightly`` channel to IntelliJ Idea.
-  Add the following repository URL

.. code-block:: text

       https://plugins.jetbrains.com/plugins/nightly/7535

Creating a Java project
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  File -> New Project.
-  Choose 'Gauge'
-  Choose the project location and java sdk
-  Finish

*Note:* If ``gauge-java`` is not installed, it will download it for the
first time.

.. figure:: images/intellij-screenshots/creation/creation.gif
   :alt: project creation

   creation

.. _maven_project_idea_using_plugin:

Maven project using gauge-maven-plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  File -> New Project
-  Choose ``Maven``
-  Select ``Create from Archetype``
-  Select the gauge archetype - ``com.thoughtworks.gauge.maven``
-  If the ``com.thoughtworks.gauge.maven`` archetype is not added select
   ``Add Archetype``

   -  Enter GroupId: com.thoughtworks.gauge.maven
   -  Enter ArtifactId: gauge-archetype-java
   -  Enter Version: 1.0.1 or the `latest version
      number from <https://repo1.maven.org/maven2/com/thoughtworks/gauge/maven/gauge-archetype-java/>`__

.. figure:: images/intellij-screenshots/creation/maven_add_archetype.png
   :alt: maven add archetype

   maven add archetype

-  Enter the ``groupId`` and ``artifactId`` for your project.
-  Enter ``Project Name`` and finish
-  The project will be created in batch mode, watch the console for
   progress.
-  After project creation ``close and re-open the project`` to enable
   auto-complete features.
-  Enable ``auto-import`` for the project. Under
   ``File > Settings > Maven > Importing``, mark the checkbox
   ``Import Maven projects automatically``.

See :ref:`gauge-maven-plugin <maven>` for more details on using the gauge maven plugin.

.. _intellij-features:

Syntax Highlighting
~~~~~~~~~~~~~~~~~~~

Gauge specs are in `Markdown <https://daringfireball.net/projects/markdown/syntax>`__
syntax. This plugin highlights Specifications, Scenarios, Steps and
Tags.

Steps with missing implementation are also highlighted.

.. figure:: images/intellij-screenshots/syntax_highlight.png
   :alt: syntax highlighting

   syntax highlighting

Auto Completion
~~~~~~~~~~~~~~~

Steps present in the current project can be listed by invoking the auto
completion pop up ``ctrl+space`` after the '\*'. After choosing a step,
it gets inserted with parameters highlighted, you can press ``tab`` to
cycle between the parameters and edit them.

.. figure:: images/intellij-screenshots/auto_completion/completion.gif
   :alt: step completion

   creation

Implement Step
~~~~~~~~~~~~~~

If you have an unimplemented step in the spec file, it will be annotated
saying 'undefined step'. A smart tag appears when you hover on the step.
Clicking the smart tag opens the quick fix pop up.
The destination of the implementation can be chosen, either
a new class or from a list of existing classes. It will then generate
the step with required annotation and parameters.

.. figure:: images/intellij-screenshots/quick_fix/fix.gif
   :alt: step quick fix

   step quick fix

Navigation
~~~~~~~~~~

Jump from Step text to it's implementation.

Usage: ``right Click`` -> ``Go to`` -> ``Declaration``

Formatting
~~~~~~~~~~

-  A specification file can be formatted easily using the keyboard
   shortcut of `Spec Format` in the action menu ``ctrl+shift+a``.

This formats the specification including indentation of tables and
steps.

Execution
~~~~~~~~~

-  Specs can be executed by ``right click -> Run spec``.
-  Execute all specs inside a directory by
   ``right click -> Run specifications``

Single Scenario Execution
~~~~~~~~~~~~~~~~~~~~~~~~~

A single scenario can be executed by doing a right click on the scenario
which should be executed and choosing the scenario.
``right click -> run -> Scenario Name``

*Note:* If the right click is done in context other than that of
scenario, by default, first scenario will be executed.

.. figure:: images/intellij-screenshots/execution/scenario.gif
   :alt: scenario execution

   scenario execution

Parallel Execution
~~~~~~~~~~~~~~~~~~

To run multiple specifications in parallel

-  Right click on the ``specs`` directory and select
   ``Create Specifications`` option.
-  In the new Run configuration select ``In Parallel`` options. This
   will distribute specs execution based on number of cores the machine
   has.
-  You can also specify the ``Number of parallel execution streams``.
   This is optional

.. warning::
       Select parallel nodes based on current systems performance.
       For example on a 2 core machine select upto 4 parallel streams.
       A very large number may affect performance.

-  Select ``ok``. Now you can run this new configuration for parallel
   execution of specs.

Debugging
~~~~~~~~~

Debugging can be performed the same way spec execution works.

-  Right click on a specification or specs directory -> Debug. Execution
   will halt on marked `breakpoints <https://www.jetbrains.com/idea/help/breakpoints.html>`__.

Run Configuration
~~~~~~~~~~~~~~~~~

You can edit the run configuration to make changes to:

    - The scenario or spec file to be executed
    - Choose table-rows to be executed
    - The environment to run against
    - Add a tag filter to the execution
    - Choose the number of parallel streams
    - Add program arguments (Example: --log-level)

.. figure:: images/intellij-screenshots/execution/intelliJRunConfig.gif
   :alt: run configuration

   run configuration

Multiple Spec Files Execution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To execute multiple specs/scenarios add ``||`` seperated list of spec/scenarios in `Specification to execute` section

.. figure:: images/intellij-screenshots/execution/multipleSpec.png
   :alt: multiple spec run configuration

   multiple spec run configuration

.. warning::
   The delimiter for multiple spec files in run config has been changed from comma (``,``) to double bar (``||``). Until v0.1.0 of IntelliJ plugin, the delimiter is ``,``. Any higher version will have delimiter ``||``.

Rephrase Steps
~~~~~~~~~~~~~~

- ``right click -> Refactor -> Rename`` on a step to rephrase it.
-  The parameters will be in ``< >`` in the rephrase dialog. They can be
   reordered,removed or new parameters can be added.
-  The rephrase change will reflect across **all the specs** in the
   project.

Find Usages
~~~~~~~~~~~

-  ``right click -> Find Usages`` on step/concept to see the usages.

.. figure:: images/intellij-screenshots/find_usages/find_usages.gif
   :alt: find usages

   find usages

Extract Concept
~~~~~~~~~~~~~~~

-  In the editor, select the steps to be transformed into a concept.
-  On the main menu or on the context menu of the selection, choose
   Refactor \| Extract to Concept or press ⌥⌘C.
-  In the Extract Concept dialog box that opens

   -  Specify the concept name with parameters to be passed from the
      usage. For Example: Say "hello" to "gauge".
   -  Select the file name from the spec file dropdown list or specify
      the new file name/path relative to the project.
   -  Click OK.

-  The selected steps will be replaced with the specified concept name.
   |extract concept| # Additional Usability features

The intellij idea gauge plugin comes with more features to simplify
writing specifications.

Create Spec and Concept files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  You can right-click in under any directory in the specs directory and
   create a new
   :ref:`specification <spec_syntax>` or :ref:`concept <concept_syntax>` file. They will be
   created with a template to get you started.

.. figure:: images/intellij-screenshots/additional/create_spec_file.png
   :alt: Spec creation

   create spec

Creating markdown table
~~~~~~~~~~~~~~~~~~~~~~~

-  To easily create markdown tables in specification(.spec) or
   concept(.cpt) files you can use predefined table templates specifying
   the number of columns needed.

For example, to create a table with 4 columns type

.. figure:: images/intellij-screenshots/additional/table_type.png
   :alt: table template fill

   table template enter

Then fill the column names in the template.

.. figure:: images/intellij-screenshots/additional/table_column_fill.png
   :alt: table template fill

   table template fill

Writing Specification Heading
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  To write the specification heading in markdown, you can use the
   predefined heading template.

.. figure:: images/intellij-screenshots/additional/spec_heading.png
   :alt: spec heading enter

   spec heading enter

Then fill the specification name in the template.

.. figure:: images/intellij-screenshots/additional/spec_heading_fill.png
   :alt: spec heading fill

   spec heading fill

Writing Scenario Heading
~~~~~~~~~~~~~~~~~~~~~~~~

-  Scenario heading in markdown can be easily written using the
   predefined scenario heading template.

.. figure:: images/intellij-screenshots/additional/sce_heading_enter.png
   :alt: scenario heading enter

   scenario heading enter

Then fill the scenario name in the template.

.. figure:: images/intellij-screenshots/additional/sce_heading_fill.png
   :alt: sce heading fill

   scenario heading fill

HTML Preview Tab
~~~~~~~~~~~~~~~~

-  A specification file, written in markdown can be viewed as HTML in browser.

This is a spec file in markdown.

.. figure:: images/intellij-screenshots/html_preview/specfile.png
   :alt: spec text

   spec text

Press `alt + F2` or right click and select `open in Browser` option. It gives option to choose a browser.
On choosig a browser, it opens a browser window with HTML equivalent preview of spec file.

.. figure:: images/intellij-screenshots/html_preview/browser_preview.png
   :alt: browser preview

   browser preview

Since specs are written in markdown, they can be converted to HTML using
any markdown to HTML convertors.

.. _`visual_studio`:

Visual Studio
^^^^^^^^^^^^^

Gauge projects can be created and executed in Visual Studio using the
Visual Studio plugin for Gauge. This plugin can be installed from Visual
Studio Gallery.

Installation
~~~~~~~~~~~~

-  Open Visual Studio Extension Manager from ``Tools`` ->
   ``Extensions and Updates``.
-  Go to ``Visual Studio Gallery`` and search for ``Gauge VS2013``.
-  Click on ``Download`` and select ``Install`` option.
-  Restart Visual Studio in order for the changes to take effect.

The extension resides on the `Visual Studio
Gallery <https://marketplace.visualstudio.com/items?itemName=vs-publisher-1071478.GaugepluginforVisualStudio>`__.

.. figure:: images/visual_studio_screenshots/VS_Installation.png
   :alt: install Gauge plugin

   install plugin


Creating a new Gauge Project
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Go to ``File`` -> ``New Project``.
-  Choose ``Gauge Test Project`` under Visual C# Test category.

.. figure:: images/visual_studio_screenshots/features/Create_Project.png
   :alt: Create New Project

   ProjectCreation

-  Choose the Project location and Project Name.
-  Click ``OK``.

This should setup a new Gauge project, and add the required meta data
for Gauge to execute this project.

Alternately, you can create a Gauge project from command-line as:

.. code-block:: console

    mkdir <project_name>
    cd <project_name>
    gauge init csharp

This creates ``<project_name>.sln`` file which can be opened with Visual
Studio.

Syntax Highlighting
~~~~~~~~~~~~~~~~~~~

Gauge specs are in `Markdown <https://daringfireball.net/projects/markdown/syntax>`__
syntax. This plugin highlights Specifications, Scenarios, Steps and
Tags.

Steps with missing implementation are also highlighted.

.. figure:: images/visual_studio_screenshots/features/Syntax_highlighting.png
   :alt: syntax highlighting

   syntax highlighting

Auto Completion
~~~~~~~~~~~~~~~

This plugin hooks into VisualStudio Intellisense, and brings in
autocompletion of Step text. The step texts brought in is a union of
steps already defined, concepts defined, and step text from
implementation.

*Hint:* Hit Ctrl + Space to bring up the Intellisense menu.

.. figure:: images/visual_studio_screenshots/features/AutoComplete.png
   :alt: Auto Complete

   AutoComplete

Implement Step
~~~~~~~~~~~~~~~
If you have an unimplemented step in the spec file, it will be get highlighted with a red underline.
Hover over towards the end of step text to get the Smart Tag to implement it.
On clicking the Smart Tag a pop up opens. The destination of the implementation can be chosen, either
a new class or from a list of existing classes. It will then generate
the step with required annotation and parameters.

.. figure:: images/visual_studio_screenshots/features/quickfix/QuickFix.gif
   :alt: step quick fix

   step quick fix

Navigation
~~~~~~~~~~

Jump from Step text to it's implementation.

Usage: ``Right Click`` -> ``Go to Declaration`` or hit F12

Formatting
~~~~~~~~~~

-  A specification file can be formatted easily using ``Right Click`` -> ``Format File``

This formats the specification including indentation of tables and
steps.

Execution with Test Explorer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
    Refer `MSDN Documentation on Unit Test Explorer <https://msdn.microsoft.com/en-us/library/hh270865.aspx#Anchor_2>`__ for
    all features of Unit Test Explorer.


When you build the test project, all the test scenarios appear in Test Explorer.
If Test Explorer is not visible, choose Test on the Visual Studio menu, choose Windows, and then choose Test Explorer.

.. figure:: images/visual_studio_screenshots/features/TestExplorer.png
   :alt: Test Explorer

   Test Explorer

Run tests
"""""""""

* To run all the scenarios in a solution, choose Run All.
* To run all the scenarios of a specification, choose Run... and then choose the group on the menu.
* To run one or more scenarios, select the individual scenarios that you want to run, open the context menu for a selected scenario and then choose Run Selected Tests.

Run tests in parallel
"""""""""""""""""""""

If individual scenarios have no dependencies that prevent them from being run in any order,
turn on parallel test execution with the |ute_parallel| toggle button on the toolbar.

If you want to use the parallel run of Gauge please refer the :ref:`command line parallel execution <parallel_execution>`.

Test results
""""""""""""

The pass/fail bar at the top of the Test Explorer window is animated as the scenarios run.
At the conclusion of the run, the pass/fail bar turns green if all tests passed or turns red if any test failed.

As you run, write, and rerun your tests, Test Explorer displays the results in default groups of Failed Tests,
Passed Tests, Skipped Tests and Not Run Tests. You can change the way Test Explorer groups your tests.
You can perform much of the work of finding, organizing and running tests from the Test Explorer toolbar.

.. figure:: images/visual_studio_screenshots/features/TestExplorerOptions.png
  :alt: Test Explorer Options

  Test Explorer options

Traits
""""""
Groups of scenarios by specification, tags that are defined.

Search and filter the test list
"""""""""""""""""""""""""""""""
This Test Explorer feature can be used as mentioned in `Search and filter the test list <https://msdn.microsoft.com/en-us/library/hh270865.aspx#BKMK_Search_and_filter_the_test_list>`__ of Visual Studio documentation.

Debugging
~~~~~~~~~

Debugging can be performed the same way spec execution works.

``Right click`` -> ``Debug Selected Tests`` on a scenario(s) in the Test explorer. Execution
will halt on marked `breakpoints <https://msdn.microsoft.com/en-us/library/5557y8b4.aspx>`__.

Rephrase Steps
~~~~~~~~~~~~~~

-  ``right click`` -> ``Rename`` on a step to rephrase it.
-  The parameters can also be reordered,removed or new parameters can be
   added.
-  The rephrase change will reflect across **all the specs** in the
   project.

Find Usages
~~~~~~~~~~~

-  Right click on a step -> Find All References

Create Spec and Concept files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  You can right-click on ``specs`` directory or any nested directory,
   choose ``Add`` -> ``New Item`` -> Go to ``Gauge`` under
   ``Visual C# Items``.
-  Choose ``Specification`` or ``Concept`` file type.
-  Enter file name and click ``Add``.

.. figure:: images/visual_studio_screenshots/features/Create_FileType.png
   :alt: Create FileType

   Create File Type

.. |install plugin| image:: images/intellij-screenshots/add_plugin.png
.. |extract concept| image:: images/intellij-screenshots/etc.gif
.. |ute_parallel| image:: images/visual_studio_screenshots/UTE_parallelicon-small.png
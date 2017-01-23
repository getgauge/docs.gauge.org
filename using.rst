Using Gauge
===========

Gauge is a first class command line tool. This means that you can
operate entirely from the command line. Or, if you prefer to use an IDE
then Gauge also has excellent integration with multiple IDEs.

Command Line Interface
----------------------

Gauge has **first-class command line support**. With gauge `installed <../installations/README.md>`__, list 
the flags supported by running.

.. code-block:: console

   gauge

The command-line interface works across platforms. On GNU/Linux and OSX,
you can use any terminal. On Windows, you can use ``cmd`` or Powershell.

Creating a project
^^^^^^^^^^^^^^^^^^

To create or initialize a Gauge project use run 

.. code-block:: console

   gauge --init

For details, see how to `create a Gauge project <../getting_started/creating_a_gauge_project.md>`__.

Example
~~~~~~~

.. code-block:: console
   :caption: C#

   gauge --init csharp 
 
.. code-block:: console
   :caption: Java

   gauge --init java 

  
.. code-block:: console
   :caption: Ruby

   gauge --init ruby 

Executing tests
^^^^^^^^^^^^^^^

Inside a Gauge project, you can execute your tests by invoking ``gauge``
with path to
`specifications <../gauge_terminologies/specifications.md>`__. By
convention, specifications are stored in the the ``./specs/``
sub-directory in the project root. 

The syntax is:

.. code-block:: console

    gauge [options] <path-to-specs>

The ``gauge`` command-line utility allows multiple ways to specify the
specifications to be executed. A valid path for executing tests can be
path to directories that contain specifications or path to specification
files or path to scenarios or a mix of any of these three methods.

To execute all the tests in a given folder ``specs``, use

::

    $ gauge specs/

This will give a colored console output with details of the execution as
well an execution summary.

Specify scenarios
~~~~~~~~~~~~~~~~~

A single scenario of a specification can be executed by specifying the
line number in the span of that scenario in the spec. To execute a
``Admin Login`` scenario in the following spec use
``gauge specs/login_test.spec:4`` command.

::

    1>   Configuration
    2>   =============
    3>
    4>   Admin Login
    5>   -----------
    6>   * User must login as "admin"
    7>   * Navigate to the configuration page

This executes only the scenario present at line number ``4`` i.e
``Admin Login`` in ``login_test.spec``. In the above spec, specifying
line numbers 4-7 will execute the same scenario because of the span.

Multiple scenarios can be executed selectively as follows :

::

    $ gauge specs/helloworld.spec:4 specs/helloworld.spec:7

These scenarios can also belong to different specifications.

You can also specify a specific
`scenario <../gauge_terminologies/scenarios.md>`__ or a list of
scenarios to execute. To execute scenarios, ``gauge`` takes path to a
specification file, followed by a colon and a zero-indexed number of
scenarios.

For example, to execute the second scenario of a specification file
named ``spec1.spec``, you would do:

.. code-block:: console

    gauge specs/spec1.spec:1

To specify multiple scenarios, add multiple such arguments. For example,
to execute the first and third scenarios of a specification file named
``spec1.spec``, you would do:

.. code-block:: console

    gauge specs/spec1.spec:0 specs/spec1.spec:2

Specify directories
~~~~~~~~~~~~~~~~~~~

You can specify a single directory in which specifications are stored.
Gauge scans the directory and picks up valid specification files.

For example:

.. code-block:: console

    gauge specs/

You can also specify multiple directories in which specifications are
stored. Gauge scans all the directories for valid specification files
and executes them in one run.

For example:

.. code-block:: console

    gauge specs-dir1/ specs-dir2/ specs-dir3/

Specify files
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can specify path to a specification files. In that case, Gauge
executes only the specification files provided.

For example, to execute a single specification file:

.. code-block:: console

    gauge specs/spec1.spec

Or, to execute multiple specification files:

.. code-block:: console

    gauge specs/spec1.spec specs/spec2.spec specs/spec3.spec


Verbose reporting
~~~~~~~~~~~~~~~~~

By default, ``gauge`` reports at the specification level when executing
tests. You can enable verbose, step-level reporting by using the
``--verbose`` flag. For example:

.. code-block:: console

    gauge --verbose specs/


Errors during execution
~~~~~~~~~~~~~~~~~~~~~~~

Parse error in a spec file:
""""""""""""""""""""""""""""""

This occurs if the spec file doesn't follow the expected
`specifications <../../gauge_terminologies/specifications.md>`__ syntax
or parameters could not be resolved.

**Example**

::

    [ParseError] hello_world.spec : line no: 25, Dynamic parameter <product> could not be resolved

Unimplemented steps present in spec file
"""""""""""""""""""""""""""""""""""""""""""

If the spec file has a step that does not have an implementation in the
projects programming language there will be a validation error.

Appropriate underlying code implementation has to be provided for all
the steps in the specs to be executed.

**Example**

::

    login.spec:33: Step implementation not found. login with "user" and "p@ssword"

Failure to launch the language runner plugin
"""""""""""""""""""""""""""""""""""""""""""""""

If the language specific plugin for the project has not been installed
then the execution will fail.

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

::

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

::

    $ gauge --table-rows "1" specs/hello.spec
    $ gauge --table-rows "1,4,7" specs/hello.spec

Range of table rows can also be specified, against which the scenarios
are run.

Example:

::

    $ gauge --table-rows "1-3" specs/hello.spec

This executes the scenarios against table rows 1, 2, 3.

Tagged Execution
~~~~~~~~~~~~~~~~

Tags allow you to filter the specs and scenarios quickly for execution.
To execute all the specs and scenarios which are labelled with certain
tags, use the following command.

::

    $ gauge --tags tag1,tag2 specs

or,

::

    $ gauge --tags "tag1, tag2" specs

This executes only the scenarios and specifications which are tagged
with ``tag1`` and ``tag2``.

Example:

.. figure:: images/spec.png
   :alt: Specification

   Spec

In the above spec, if all the scenarios tagged with "search" and "admin"
should be executed, then use the following command:

::

    $ gauge --tags "search & admin" SPEC_FILE_NAME

Tag expressions
"""""""""""""""

Tags can be selected using expressions. Like:

-  **!TagA:** Selects specs/scenarios that do not have TagA.
-  **TagA & TagB:** Selects specs/scenarios that have both TagA and
   TagB.
-  **TagA & !TagB:** Selects specs/scenarios that have TagA and not
   TagB.
-  **TagA \| TagB:** Selects specs/scenarios that have either TagA or
   TagB.
-  **(TagA & TagB) \| TagC:** Selects specs/scenarios that have either
   TagC or both the tags TagA and TagB
-  **!(TagA & TagB) \| TagC:** Selects specs/scenarios that have either
   TagC or do not have both the tags TagA and TagB
-  **(TagA \| TagB) & TagC:** Selects specs/scenarios that either TagA
   and TagC or TagB and TagC

Parallel Execution
~~~~~~~~~~~~~~~~~~

Specs can be executed in parallel to run the tests faster and distribute
the load.

This can be done by the command:

::

    $ gauge --parallel specs

or,

::

    $ gauge -p specs

This creates a number of execution streams depending on the number of
cores of the machine and distribute the load among workers.

The number of parallel execution streams can be specified by ``-n``
flag.

Example:

::

    $ gauge --parallel -n=4 specs

This creates four parallel execution streams.

**Note:** The number of streams should be specified depending on number
of CPU cores available on the machine, beyond which it could lead to
undesirable results.

Executing a group of specification
""""""""""""""""""""""""""""""""""

Specifications can be distributed into groups and ``--group`` \| ``-g``
flag provides the ability to execute a specific group.

This can be done by the command:

::

    $ gauge -n=4 -g=2 specs

This creates 4 groups (provided by -n flag) of specification and selects
the 2nd group (provided by -g flag) for execution.

Specifications are sorted by alphabetical order and then distributed
into groups, which guarantees that every group will have the same set of
specifications, no matter how many times it is being executed.

Example:

::

    $ gauge -n=4 -g=2 specs

::

    $ gauge -n=4 -g=2 specs

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

::

    $ gauge -n=4 --strategy="lazy" specs

or,

::

    $ gauge -n=4 specs

Say you have 100 tests, which you have chosen to run across 4
streams/cores; lazy assignment will dynamically, during execution,
assign the next spec in line to the stream that has completed it's
previous execution and is waiting for more work.

Lazy assignment of tests is the default behaviour.

Another strategy called ``eager`` can also be useful depending on need.
In this case, the 100 tests are distributed before execution, thus
making them an equal number based distribution.

::

    $ gauge -n=4 --strategy="eager" specs

**Note:** The 'lazy' assignment strategy only works when you do NOT use
the -g flag. This is because grouping is dependent on allocation of
tests before the start of execution. Using this in conjunction with a
lazy strategy will have no impact on your test suite execution.

Rerun one execution stream
""""""""""""""""""""""""""

Specifications can be distributed into groups and ``--group`` \| ``-g``
flag provides the ability to execute a specific group.

This can be done by the command:

::

    $ gauge -n=4 -g=2 specs

This creates 4 groups (provided by ``-n`` flag) of specification and
selects the 2nd group (provided by ``-g`` flag) for execution.

Specifications are sorted by alphabetical order and then distributed
into groups, which guarantees that every group will have the same set of
specifications, no matter how many times it is being executed.

Example:

::

    $ gauge -n=4 -g=2 specs

The above two commands will execute the same group of specifications.

Current Execution Context in the Hook
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  To get additional information about the **current specification,
   scenario and step** executing, an additional **ExecutionContext**
   parameter can be added to the
   `hooks <../../language_features/execution_hooks.md>`__ method.

{% codetabs name="Java", type="java" -%} public class ExecutionHooks {

::

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

} {%- language name="C#", type="csharp" -%} This feature is not yet
supported in Gauge-CSharp. Please refer to
https://github.com/getgauge/gauge-csharp/issues/53 for updates. {%-
language name="Ruby", type="ruby" -%} before\_spec do
\|execution\_info\| puts execution\_info.inspect end

after\_spec do \|execution\_info\| puts execution\_info.inspect end {%-
endcodetabs %}

Filtering Hooks execution based on tags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  You can specify tags for which the execution
   `hooks <../../language_features/execution_hooks.md>`__ can run. This
   will ensure that the hook runs only on scenarios and specifications
   that have the required tags.

{% codetabs name="Java", type="java" -%} // A before spec hook that runs
when tag1 and tag2 // is present in the current scenario and spec.
@BeforeSpec(tags = {"tag1, tag2"}) public void loginUser() { // Code for
before scenario }

// A after step hook runs when tag1 or tag2 // is present in the current
scenario and spec. // Default tagAggregation value is Operator.AND.
@AfterStep(tags = {"tag1", "tag2"}, tagAggregation = Operator.OR) public
void performAfterStep() { // Code for after step } {%- language
name="C#", type="cs" -%} // A before spec hook that runs when tag1 and
tag2 // is present in the current scenario and spec. [BeforeSpec("tag1,
tag2")] public void LoginUser() { // Code for before scenario }

// A after step hook runs when tag1 or tag2 // is present in the current
scenario and spec. // Default tagAggregation value is Operator.AND.
[AfterStep("tag1", "tag2")][TagAggregationBehaviour(TagAggregation.Or)]
public void PerformAfterStep() { // Code for after step } {%- language
name="Ruby", type="ruby" -%} # A before spec hook that runs when tag1
and tag2 is present in the current scenario and spec.
before\_spec({tags: ['tag2', 'tag1']}) do // Code for before scenario
end

// A after step hook runs when tag1 or tag2 is present in the current scenario and spec.
// Default tagAggregation value is Operator.AND.

after\_spec({tags: ['tag2', 'tag1'], operator: 'OR'}) do // Code for
after step end {%- endcodetabs %}

    Note: Tags cannot be specified on @BeforeSuite and @AfterSuite hooks


IDE Support
-----------

The listed IDE plugins are available for gauge to make writing specs and
test code simpler.

-  Intellij IDEA
-  Visual Studio

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
`here <https://www.jetbrains.com/idea/help/installing-plugin-from-disk.html>`__.

Create a new Gauge project and start writing your tests.

Explore all the :ref:`features of Gauge Intellij IDEA plugin <intellij-features>` now!

Installing Nightly
~~~~~~~~~~~~~~~~~~

Nightly builds are also available in IntelliJ plugin repository.

-  Follow the
   `instructions <https://www.jetbrains.com/idea/help/managing-enterprise-plugin-repositories.html>`__
   to add ``Nightly`` channel to IntelliJ Idea.
-  Add the following repository URL

   ::

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

See
`gauge-maven-plugin <../advanced_readings/dependency_management_plugins/maven-plugin.md>`__
for more details on using the gauge maven plugin.

.. _intellij-features:

Auto Completion
~~~~~~~~~~~~~~~

Steps present in the current project can be listed by invoking the auto
completion pop up ``ctrl+space`` after the '\*'. After choosing a step,
it gets inserted with parameters highlighted, you can press ``tab`` to
cycle between the parameters and edit them.

.. figure:: images/intellij-screenshots/auto_completion/completion.gif
   :alt: step completion

   creation

Step Quick Fix
~~~~~~~~~~~~~~

If you have an unimplemented step in the spec file, it will be annotated
saying 'undefined step'. ``alt+enter`` can be pressed to open the quick
fix pop up. The destination of the implementation can be chosen, either
a new class or from a list of existing classes. It will then generate
the step with required annotation and parameters.

.. figure:: images/intellij-screenshots/quick_fix/fix.gif
   :alt: step quick fix

   step quick fix

Formatting
~~~~~~~~~~

A spec file can be formatted by pressing ``ctrl+alt+shift l`` (in
windows and linux) and ``cmd+alt+shift l``\ (in mac).

This formats all the elements of current spec including indentation of
tables and steps.

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

   ::

       Caution: Select parallel nodes based on current systems performance.
       For example on a 2 core machine select upto 4 parallel streams.
       A very large number may affect performance.

-  Select ``ok``. Now you can run this new configuration for parallel
   execution of specs.

Debugging
~~~~~~~~~

Debugging can be performed the same way spec execution works.

-  Right click on a specification or specs directory -> Debug. Execution
   will halt on marked
   `breakpoints <https://www.jetbrains.com/idea/help/breakpoints.html>`__.

Run Configuration
~~~~~~~~~~~~~~~~~

You can edit the run configuration to make changes to: \* The scenario
or spec file to be executed \* The environment to run against \* Add a
tag filter to the execution \* Choose the number of parallel streams

.. figure:: images/intellij-screenshots/execution/config.gif
   :alt: run configuration

   run configuration

Rephrase Steps
~~~~~~~~~~~~~~

-  Press **Shift+F6** on a step to rephrase it.
-  The parameters will be in ``< >`` in the rephrase dialog. They can be
   reordered,removed or new parameters can be added.
-  The rephrase change will reflect across **all the specs** in the
   project.

Find Usages
~~~~~~~~~~~

-  Press **cmd/ctrl+alt+F7** on step/concept to see the usages.

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
   `specification <../gauge_terminologies/specifications.md>`__ or
   `concept <../gauge_terminologies/concepts.md>`__ file. They will be
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

Format Specification
~~~~~~~~~~~~~~~~~~~~

-  A specification file can be formatted easily using the keyboard
   shortcut ``ctrl+alt+shift+l`` (in windows and linux) and
   ``cmd+alt+shift+l``\ (in Mac).

This formats the specification including indentation of tables and
steps.

HTML Preview Tab
~~~~~~~~~~~~~~~~

-  A specification file, written in markdown can be viewed as an HTML
   preview.

This is a spec file in markdown.

.. figure:: images/intellij-screenshots/html_preview/spec_text.png
   :alt: spec text

   spec text

On click of the ``HTML Preview`` tab at the bottom of the editor, it
shows the HTML equivalent preview of spec file.

.. figure:: images/intellij-screenshots/html_preview/spec_markdown.png
   :alt: spec text

   spec text

Since specs are written in markdown, they can be converted to HTML using
any markdown to HTML convertors.

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
    gauge --init csharp

This creates ``<project_name>.sln`` file which can be opened with Visual
Studio.

Syntax Highlighting
~~~~~~~~~~~~~~~~~~~

Gauge specs are in
`Markdown <http://daringfireball.net/projects/markdown/syntax>`__
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

Navigation
~~~~~~~~~~

Jump from Step text to it's implementation.

Usage: ``Right Click`` -> ``Go to Declaration`` or hit F12

Smart Tag
~~~~~~~~~

Implement an unimplemented step - generates a method template, with a
``Step`` attribute having this Step Text.

.. figure:: images/visual_studio_screenshots/features/quickfix/QuickFix.gif
   :alt: Quick Fix

   Quick fix

Test Runner
~~~~~~~~~~~

Open the Test Explorer : ``Menu`` -> ``Test`` -> ``Windows`` ->
``Test Explorer`` All the scenarios in the project should be listed. Run
one or more of these tests.

.. figure:: images/visual_studio_screenshots/features/TestExplorer.png
   :alt: Test Explorer

   Test Explorer

Rephrase Steps
~~~~~~~~~~~~~~

-  Press **F2** on a step to rephrase it.
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


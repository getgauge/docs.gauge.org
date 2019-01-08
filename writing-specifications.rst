Writing Specifications
======================

In this page, we'll cover everything you need to know about writing Gauge specification. Before we start, do take a look at the IDE plugins for Gauge that improve your test authoring experience.  

.. tab-container:: ide

    .. tab:: Visual Studio Code

        Gauge projects can be created and executed in Visual Studio Code using the `Gauge extension for VSCode <https://marketplace.visualstudio.com/items?itemName=getgauge.gauge>`__.
        This plugin currently supports Gauge with JavaScript, Ruby and Python.

    .. tab:: IntelliJ Idea

        Gauge projects can be created and executed in IntelliJ IDEA using the `Gauge plugin for IntelliJ IDEA <https://github.com/getgauge/Intellij-Plugin/blob/master/README.md>`__.
        This plugin only supports Gauge with Java.

    .. tab:: Visual Studio

        Gauge projects can be created and executed in Visual Studio using the `Gauge extension for Visual Studio <https://github.com/getgauge/gauge-visualstudio/blob/master/README.md>`__.
        This plugin currently supports Gauge with C#.

.. note:: 
    For a better experience, we recommend using one of the IDE plugins. However, this is not mandatory, as you can author Gauge specifications using any text editor.

Specifications (spec)
---------------------

A specification is a business test case which can also act as feature
documentation. Typically a  specification describes a particular feature of the application
under test.

-  These are written in a ``.spec`` file. Gauge also supports ``.md`` file format.
-  The markup for a specification file is based on `markdown syntax <https://daringfireball.net/projects/markdown/syntax>`__.

Example
+++++++

.. code-block:: gauge

    # Search specification
    Tags: search, admin

    The admin user must be able to search for available products on the search page

    * User must be logged in as "admin"
    * Open the product search page

    ## Successful search
    Tags: successful

    For an existing product name, the search result will contain the product name

    * Search for product "Die Hard"
    * "Die Hard" should show up in the search results

    ## Unsuccessfull search

    On an unknown product name search the search results will be empty

    * Search for product "unknown"
    * The search results will be empty


Specification Heading
+++++++++++++++++++++

A specification must begin with a spec heading and a single specification can
contain only one spec heading.

It is written in ``<H1>`` syntax of markdown. This can be in two
forms:

.. _spec_syntax:

.. code-block:: gauge

    # Spec Heading

or

.. code-block:: gauge

    Spec Heading
    ============

Note:

-  Every spec must contain one or more :ref:`longstart-scenarios`.
-  Every spec can be marked with labels using :ref:`longstart-tags`.

.. _longstart-scenarios:

Scenario
--------

Each scenario represents a single flow in a particular specification. A
specification must contain at least one scenario.

A scenario starts after a scenario heading or a scenario name. The
scenario heading is written in markdown ``<H2>`` syntax. This can be
written in 2 ways:

.. _scenario_syntax:

.. code-block:: gauge

    ## Scenario heading

or

.. code-block:: gauge

    Scenario heading
    ----------------

Note:

-  A scenario contains one or more :ref:`steps <step_syntax>` under it.
-  A scenario can be tagged using :ref:`tags <tag_syntax>`.


Example
+++++++

.. code-block:: gauge

    # Configuration

    The Admin user should be able to switch permissions for other users.

    ## Admin Login

    * User must login as "admin"
    * Navigate to the configuration page
    * Change permissions for user "john" to "admin"
    * User "john" should have admin permissions

.. _longstart-steps:

Step
----

Steps are the executable components of your specification, 
written as markdown unordered list items (bulleted points).

Steps can exist inside a specification as

- :ref:`Context Steps<longstart-context>`
- :ref:`longstart-teardown`
- Inside a scenario or concepts

Every step has an underlying code implementation for the programming
language used. This is executed when the steps inside a spec are
executed.

See how to write :ref:`language-steps` for different languages.

.. _step_syntax:

Example
+++++++

.. code-block:: gauge

    * Login into my app
    * Search for "gauge"
    * Search for "gauge-java"

The values written in **quotes** are parameters which are passed into
the underlying step implementation as a language specific structure.

Note: The following characters are reserved for parameters, these
cannot be used in step text.

- ``"``
- ``<``
   - ``>``

Parameters
-----------

Steps can be defined to take values as parameters so that they can be
re-used with different parameter values.

.. code-block:: gauge

    * Check "product 1" exists
    * Check "product 2" exists

The underlying :ref:`step implementation <language-steps>` in
code must also take the same number of parameters as passed from the
step.

The parameters passed into a step are of the following types:

1. Simple parameters
++++++++++++++++++++

They are values passed into the steps in double quotes.

.. code-block:: gauge

    * Create a “gauge-java” project
    * Write “100” line specification

**Note:** Renaming the parameter will not rename the usages inside the
method. By design, the renamed parameter is considered a new parameter.
Therefore the usage of the old parameter (if any) has to be fixed
manually to resolve the corresponding compilation issue.

2. Dynamic Parameters
++++++++++++++++++++

Dynamic parameters are used as placeholder for values.

**Syntax**: ``<dynamic_param>``.

Dynamic parameters are primarily used when referring to a table column value in :ref:`table_driven_execution`,
or while passing values to :ref:`concept`.

**Example**

.. code-block:: gauge
    :caption: example.cpt

    # A sample concept that takes a <parameter>

    * And used the <parameter> in a step.

The above concept can be invoked and a value can be passed to the concept against ``<parameter>`` at the time of invocation.

.. code-block:: gauge

    * A sample concept that takes a "dummy value"

.. note:: Refer to this :ref:`example_inline_data_driven_table` for illustration on how table cell values can be referred using dynamic parameters.


3. Table Parameters
++++++++++++++++++++

Table parameters are used when a step is to be executed for multiple values. The step having an inline table parameter will be executed for each table row

.. _example_inline_table:

**Example**

.. code-block:: gauge

    # Create projects

    ## First scenario

    * Create the following projects
         |project name| username |
         |------------|----------|
         | Gauge java | Daredevil|
         | Gauge ruby | Iron Fist|

Inline data tables can be externalized as :ref:`special csv parameter<special_parameter_csv>`

4. Special Parameters
++++++++++++++++++++

Special parameters provide the ability to pass larger and richer data
into the steps as parameters.

- They are entered in angular brackets - ``<>`` in the step.
- They contain 2 parts separated by a colon ``:``

.. code-block:: gauge

    <prefix:value>

**Prefix** : This defines the type of special parameter. e.g. file,
table.

**Value** : This defines the value for the type of special parameter.

There are two types of special parameters:

i. :ref:`File<special_parameter_file>`
ii. :ref:`CSV<special_parameter_csv>`

.. _special_parameter_file:

Special Parameter: File
^^^^^^^^^^^^^^^^^^^^^^^^^^

These are used to read files and pass the file content as a string
parameter to the underlying steps.

**Syntax** : ``<file:[value]>`` where ``[value]`` is the path to the file.

.. note:: ``[value]`` can be an absolute or relative path. Relative paths are resolved relative to :ref:`GAUGE_PROJECT_ROOT<gauge_project_root>`.

.. code-block:: gauge

    * Verify email text is <file:email.txt>
    * Check if <file:/work/content.txt> is visible

The path to the file can be the relative path from the Gauge project or
an absolute path to the file.

.. _special_parameter_csv:

Special Parameter: CSV
^^^^^^^^^^^^^^^^^^^^^^^^^^

Tables are used to pass table values into steps read from an external CSV
file. The parameter text in the step contains a prefix table and the
path to the csv file.

**Syntax** : ``<table:[value]>`` where ``[value]`` is the path to the csv file.

.. note:: ``[value]`` can be an absolute or relative path. Relative paths are resolved relative to :ref:`GAUGE_PROJECT_ROOT<gauge_project_root>`.

.. code-block:: gauge

    * Step that takes a table <table:data.csv>
    * Check if the following users exist <table:/Users/john/work/users.csv>

**Sample csv file**:

.. code-block:: text

    Id,Name
    1,The Way to Go On
    2,Ivo Jay Balbaert

The first row is considered as the table header. Following rows are
considered as the row values.


Data Table values in inline tables
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Dynamic values from the data table can also be referred to in table
parameters passed into steps

.. _example_inline_data_driven_table:

Example
+++++++

.. code-block:: gauge

    # Create projects

        |id| name |
        |--|------|
        |1 | john |
        |2 | mike |

    ## First scenario

    * Create the following projects
        |project name| username |
        |------------|----------|
        | Gauge java | <name>   |
        | Gauge ruby | <name>   |

In the above example the table parameter uses a dynamic value from the
data table.


.. _longstart-tags:

Tags
----

Tags are used to associate labels with specifications or scenarios. Tags are written as comma separated values in the spec with a prefix ``Tags:`` .

-  Both scenarios and specifications can be separately tagged
-  Only **one** set of tags can be added to a single specification or scenario.

They help in filtering specs or scenarios based on tags used.

Example: Tag(s)
+++++++++++++++

Both the ``Login specification`` and the scenario
``Successful login scenario`` have tags in the below example.

.. code-block:: gauge

    # Login specification

     Tags: login, admin, user-abc

    ## Successful login scenario

     Tags: login-success, admin

A tag applied to a spec automatically applies to a scenario.

Example: Multi-line tag(s)
++++++++++++++++++++++++++

Tags can be defined in multiple lines

Both the ``Login specification`` and the scenario
``Successful login scenario`` have tags in multiple lines in the below example.

.. code-block:: gauge

    # Login specification

    Tags: login, 
     admin, user-abc

    ## Successful login scenario

    Tags: admin,
     login-success

> Note: As shown in the example above, indentation is required to specify tags in multiple lines

.. _concept:

Concepts
--------

Concepts provide the ability to combine re-usable logical groups of
steps into a single unit. It provides a higher level abstraction of a
business intent by combining steps.

They are defined in ``.cpt`` format files in the ``specs`` directory
in the project. They can be inside nested directories inside the specs
directory.

-  Concepts are used inside a spec just like any other step. The
   appropriate parameters are passed to them.
-  On execution all the steps under the concepts are executed in the
   defined order.

**Note:** A single .cpt file can contain multiple concept definitions.

Defining a concept
++++++++++++++++++

Create a ``.cpt`` file under specs directory with the concept
definition.

The concept definition contains the 2 parts:

- :ref:`Concept header<concept_header>`
- :ref:`Steps<concept_steps>`

.. _concept_header:

Concept header
++++++++++++++

The concept header defines the name of the concept and the parameters
that it takes. It is written in the markdown **``H1``** format.

-  All parameters are defined in angular brackets ``< >``.
-  A concept definition must have a concept header.

.. code-block:: gauge

    # Concept name with <param0> and <param1>

.. _concept_steps:

Concept Steps
+++++++++++++

The concept header is followed by the steps that are used inside the
concept. They are defined in the usual :ref:`steps <step_syntax>` structure.

-  All the parameters used from the concept header will be in ``< >``
   brackets.
-  Fixed static parameter values are written in quotes ``" "``.
-  Other concepts can also be called inside the concept definition.

.. code-block:: gauge

    # Login as user <username> and create project <project_name>

    * Login as user <username> and "password"
    * Navigate to project page
    * Create a project <project_name>

In the example above:

-  The first line is the concept header
-  The following 3 steps are abstracted into the concept

.. _longstart-context:

The concept above can now be used in any spec as shown below

.. code-block:: gauge

    # Login specification

    ## Successful login scenario

    * Login as user "john" and create project "Gauge java"

Contexts
--------

**Contexts** or **Context steps** are steps defined in a spec before any
scenario.

They allow you to specify a set of conditions that are necessary for
executing scenarios in a spec. Context steps can be used to set up data
before running scenarios. They can also perform a setup or tear down
function.

-  Any regular :ref:`steps <step_syntax>` can be used as a context.
-  Contexts are executed before every scenario in the spec.

.. code-block:: gauge

    # Delete project

    These are context steps

    * User is logged in as "mike"
    * Navigate to the project page

    ## Delete single project

    * Delete the "example" project
    * Ensure "example" project has been deleted

    ## Delete multiple projects

    * Delete all the projects in the list
    * Ensure project list is empty

In the above example spec the context steps are ``User is logged in as Mike`` and
``Navigate to the project page``, they are defined before any
scenario.

These steps are executed before the execution of each scenario ``Delete single project`` and ``Delete multiple projects``.

The spec execution flow would be:

1. Context steps execution
2. ``Delete single project`` scenario execution
3. Context steps execution
4. ``Delete multiple projects`` scenario execution

.. _longstart-teardown:

Tear Down Steps
---------------

**Tear Down Steps** are the steps defined in a spec after the last
scenario. They allow you to specify a set of clean-up steps after every
execution of a scenario in a spec. They are used to perform a tear down
function.

-  Any regular :ref:`steps <step_syntax>` can be used as a tear down step.
-  Tear down steps are executed after every scenario in the spec.

Syntax
++++++

``___``: Three or more consecutive underscores will indicate the start
of tear down. Steps that are written in tear down (after three or more
consecutive underscores) will be considered as tear down steps.

.. code-block:: gauge

    ___
    * Tear down step 1
    * Tear down step 2
    * Tear down step 3

Example
+++++++

.. code-block:: gauge

    # Delete project

    * Sign up for user "mike"
    * Log in as "mike"

    ## Delete single project

    * Delete the "example" project
    * Ensure "example" project has been deleted

    ## Delete multiple projects

    * Delete all the projects in the list
    * Ensure project list is empty

    ____________________
    These are teardown steps

    * Logout user "mike"
    * Delete user "mike"

In the above example spec, the tear down steps are
``Logout user "mike"`` and ``Delete user "mike"``, they are
defined after three or more consecutive underscores.

The spec execution flow would be:

1. Context steps execution
2. ``Delete single project`` scenario execution
3. Tear down steps execution
4. Context steps execution
5. ``Delete multiple projects`` scenario execution
6. Tear down steps execution


.. _language-steps:

Step implementations
--------------------

:ref:`longstart-steps` have a language specific implementation that gets executed on the spec execution.

Simple step
+++++++++++

**Step name**

.. code-block:: gauge

  * Say "hello" to "gauge"

**Implementation**

.. tab-container:: languages

    .. tab:: CSharp

        .. code-block:: java

            // The Method can be written in **any C# class** as long as it is part of the project.
            public class StepImplementation {

                [Step("Say <greeting> to <product name>")]
                public void HelloWorld(string greeting, string name) {
                    // Step implementation
                }
            }

    .. tab:: Java

        .. code-block:: java

            // This Method can be written in any java class as long as it is in classpath.

            public class StepImplementation {

                @Step("Say <greeting> to <product name>")
                public void helloWorld(String greeting, String name) {
                    // Step implementation
                }
            }

    .. tab:: JavaScript

        .. code-block:: javascript

            step("Say <greeting> to <name>", async function(greeting, name) {
                throw 'Unimplemented Step';
            });

    .. tab:: Python

        .. code-block:: python

            @step("Say <greeting> to <product name>")
            def hello_world(greeting, name):
                assert False, "Add implementation code"

    .. tab:: Ruby

        .. code-block:: ruby

            step 'Say <greeting> to <product name>' do |greeting, name|
                # Code for the step
            end

Step with table
+++++++++++++++

**Step**

.. code-block:: gauge

  * Create following "hobbit" characters
    |id |name   |
    |---|-------|
    |123|frodo  |
    |456|bilbo  |
    |789|samwise|

**Implementation**

.. tab-container:: languages

    .. tab:: CSharp

        .. code-block:: java

            // Here Table is a custom data structure defined by gauge.
            // This is available by adding a reference to the Gauge.CSharp.Lib.
            // Refer : http://nuget.org/packages/Gauge.CSharp.Lib/

            public class StepImplementation {

                [Step("Create following <race> characters <table>")]
                public void CreateCharacters(string race, Table table) {
                    // Step implementation
                }

            }

    .. tab:: Java

        .. code-block:: java

            // Table is a custom data structure defined by gauge.
            public class StepImplementation {

                @Step("Create following <race> characters <table>")
                public void createCharacters(String race, Table table) {
                    // Step implementation
                }

            }

    .. tab:: JavaScript

        .. code-block:: javascript

            step("Create following <race> characters <table>", async function(race, table) {
                throw 'Unimplemented Step';
            });

    .. tab:: Python

        .. code-block:: python

            # Here Table is a custom data structure defined by gauge.

            @step("Create following <race> characters <table>")
            def create_characters(race, table):
                assert False, "Add implementation code"

    .. tab:: Ruby

        .. code-block:: ruby

            # Here table is a custom data structure defined by gauge-ruby.

            step 'Create following <race> characters <table>' do |race, table|
                puts table.rows
                puts table.columns
            end

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

    # User Creation

    ## Multiple Users

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

.. tab-container:: languages

    .. tab:: CSharp

        .. code-block:: java

            public class Users {

                [Step("Create a user <user_name>", "Create another user <user_name>")]
                public void CreateUser(string user_name) {
                    // create user user_name
                }

            }

    .. tab:: Java

        .. code-block:: java

            public class Users {

                @Step({"Create a user <user_name>", "Create another user <user_name>"})
                public void createUser(String user_name) {
                    // create user user_name
                }

            }

    .. tab:: JavaScript

        .. code-block:: javascript

            step(["Create a user <username>", "Create another user <username>"], function (username) {
                // do cool stuff
            });

    .. tab:: Python

        .. code-block:: python

            from getgauge.python import step

            @step(["Create a user <user name>", "Create another user <user name>"])
            def create_user(user_name):
                print("create {}.".format(user_name))

    .. tab:: Ruby

        .. code-block:: ruby

            step 'Create a user <user name>','Create another user <user name>' do |user_name|
                // create user user_name
            end

Example 2
~~~~~~~~~

.. code-block:: gauge

    ## User Creation

    * User creates a new account
    * A "welcome" email is sent to the user

    ## Shopping Cart

    * User checks out the shopping cart
    * Payment is successfully received
    * An email confirming the "order" is sent

In this case, the underlying functionality of the last step (sending an
email) in both the scenarios is the same. But it is expressed more
clearly with the use of aliases. The underlying step implementation
could be something like this.

Implementation
""""""""""""""

.. tab-container:: languages

    .. tab:: CSharp

        .. code-block:: java

            public class Users {

                [Step({"A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"})]
                public void SendEmail(string email_type) {
                    // Send email of email_type
                }

            }

    .. tab:: Java

        .. code-block:: java

            public class Users {

                @Step({"A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"})
                public void sendEmail(String email_type) {
                    // Send email of email_type
                }

            }

    .. tab:: JavaScript

        .. code-block:: javascript

            step(["A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"], function (email_type) {
                // do cool stuff
            });

    .. tab:: Python

        .. code-block:: python

            from getgauge.python import step

            @step(["A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"])
            def email(email_type):
                print("create {}.".format(email_type))

    .. tab:: Ruby

        .. code-block:: ruby

            step 'A <email_type> email is sent to the user', 'An email confirming the <email_type> is sent' do |email_type|
                email_service.send email_type
            end

Enum as Step parameter
----------------------

.. note:: This feature is currently only supported for ``Java``.

The constant values of an Enum data type can be used as parameters to a
Step. However, the type of parameter should match the Enum name itself
in step implementation.

**Step**

.. code-block:: gauge

  * Navigate towards "SOUTH"

**Implementation**

.. code-block:: java
    :caption: Java

    public enum Direction { NORTH, SOUTH, EAST, WEST; }

    @Step("Navigate towards <direction>")
    public void navigate(Direction direction) {
        //  code here
    }


.. _project_structure:

Project Structure
-----------------

On initialization of a gauge project for a particular language a project
skeleton is created with the following files

Common Gauge files
++++++++++++++++++

.. _gauge_project_root:

``GAUGE_PROJECT_ROOT`` environment variable holds the path in which the gauge project is created.

.. code-block:: text

    ├── env
    │  └── default
    │     └── default.properties
    ├── manifest.json
    ├── specs
       └── example.spec

Env Directory
^^^^^^^^^^^^^

The env directory contains multiple environment specific directories.
Each directory has `.property files <https://en.wikipedia.org/wiki/.properties>`__ which define the environment variables set during execution for that specific environment.

A **env/default** directory is created on project initialization which
contains the default environment variables set during execution.

Learn more about :ref:`managing environments <environments>`.

Specs Directory
^^^^^^^^^^^^^^^

The specs directory contains all the :ref:`spec <spec_syntax>` files for the
project. They are the business layer specifications written in simple
markdown format.

A simple example spec (**example.spec**) is created in the specs
directory to better understand the format of specifications.

Learn more about :ref:`spec <spec_syntax>`.

Manifest file
^^^^^^^^^^^^^

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

      gauge install <plugin-name>

  Example :

  .. code:: console

      gauge install xml-report

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

Project files
+++++++++++++

Creating a new project adds some language specific files.

.. tab-container:: languages

    .. tab:: CSharp

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

        **packages.config**

        For ``nuget``. Contains the dependencies for gauge. One can add more to
        this list, depending on project needs.

        **StepImplementation.cs**

        Contains the implementations for the sample steps defined in
        ``hello_world.spec``.

    .. tab:: Java

        .. code-block:: text

            ├── manifest.json
            ├── libs
            └── src
                └── test
                    └── java
                        └── StepImplementation.java
            ├── env
                └── default
                    └── java.properties
            └───specs
                example.spec


        **libs**

        This contains the additional java dependencies required for the project.

        **src**

        Src directory contains the classes the test code including step
        implementations.

        **java.properties**

        This defines configurations for java runner plugin.
        See :doc:`configuration` for more details.

    .. tab:: JavaScript

        .. code-block:: text

            ├── manifest.json
            └── tests
                    └── step_implementation.js
            ├── env
                └── default
                    └── js.properties
            └───specs
                    example.spec

        **tests**

        tests directory contains the test code including step implementations.

        **js.properties**

        This defines configurations for Javascript runner plugin.
        See :doc:`configuration` for more details.

    .. tab:: Python

        .. code-block:: text

            ├── manifest.json
            └── step_impl
                    └── step_impl.py
            ├── env
                └── default
                    └── python.properties
            └───specs
                example.spec

        **step_impl**

        step_impl directory contains the test code including step implementations.

        **python.properties**

        This defines configurations for Python runner plugin.
        See :doc:`configuration` for more details.

    .. tab:: Ruby

        .. code-block:: text

            ├── manifest.json
            ├── env
            │   └── default
            │       └── ruby.properties
            └── step_implementations
                └── step_implementation.rb
            └───specs
                    example.spec

        **step_implementations directory**

        This contains all the ``.rb`` files with the test code including step implementations in ruby

        **ruby.properties**

        This defines configurations for ruby runner plugin.
        See :doc:`configuration` for more details.

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
+++++++++++++++++++++++++++++++++++++

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
+++++++++++++++++++++++++++++++++++++++

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
+++++++++++++

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
+++++++++

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
++++++++++

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

            gauge.screenshotFn = function () {
                return "base64encodedstring";
            };

    .. tab:: Python

        .. code-block:: python

            from getgauge.python import screenshot
            @screenshot
            def take_screenshot():
                return "base64encodedstring"

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

.. _reports_custom_messages:

Custom screenshots in reports
--------------------------

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


Refactoring
-----------

Rephrase steps
++++++++++++++

Gauge allows you to rephrase a step across the project. To rephrase a
step run:

.. code-block:: console

    gauge refactor "old step <name>" "new step name"

Here ``<`` and ``>`` are used to denote parameters in the step.
**Parameters can be added, removed or changed while rephrasing.**

This will change all spec files and code files (for language plugins
that support refactoring).

For example,

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

Troubleshooting
===============

.. include:: errors.rst
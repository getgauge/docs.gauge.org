Writing Specifications
======================

Specifications (spec)
---------------------

They are business layer test cases which can also act as your feature
documentation. They are written in the business language. Typically a
spec or specification describe a particular feature of the application
under test.

-  They are written in a ``.spec`` file. Gauge also supports ``.md`` file format.
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
    * "Die hard" should ahow up in the search results

    ## Unsuccessfull search

    On an unknown product name search the search results will be empty

    * Search for product "unknown"
    * The search results will be empty


Specification Heading
^^^^^^^^^^^^^^^^^^^^^

A spec must begins with a spec heading and a single specification can
contain only one spec heading.

It is written in ``<H1>`` syntax of markdown. This can be in two
forms:

.. code-block:: gauge

    # Spec Heading

or

.. code-block:: gauge

    Spec Heading
    ============

-  Every spec must contain one or more :ref:`longstart-scenarios`.
-  Every spec can be marked with labels using :ref:`longstart-tags`.

.. _longstart-scenarios:

Scenarios
---------

Each scenario represents a single flow in a particular specification. A
specification must contain at least one scenario.

A scenario starts after a scenario heading or a scenario name. The
scenario heading is written in markdown ``<H2>`` syntax. This can be
written in 2 ways:

.. code-block:: gauge

    ## Scenario heading

or

.. code-block:: gauge

    Scenario heading
    ----------------

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

Steps
-----

Steps are the executable components of your specification. They are
written as markdown unordered list items (bulleted points).

They are written inside a specification as

   - :ref:`Context Steps<longstart-context>`
   - :ref:`longstart-teardown`
   - Steps inside a scenario or concepts

Every step has an underlying code implementation for the programming
language used. This is executed when the steps inside a spec are
executed.

See how to write :ref:`language-steps` for different languages.

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
----------

Steps can be defined to take values as parameters so that they can be
re-used with different parameter values.

.. code-block:: gauge

    * Check "product 1" exists
    * Check "product 2" exists

The underlying :ref:`step implementation <language-steps>` in
code must also take the same number of parameters as passed from the
step.

The parameters passed into a step are of the following types:

Simple parameters
+++++++++++++++++

They are values passed into the steps in double quotes.

.. code-block:: gauge

    * Create a “gauge-java” project
    * Write “100” line specification

**Note:** Renaming the parameter will not rename the usages inside the
method. By design, the renamed parameter is considered a new parameter.
Therefore the usage of the old parameter (if any) has to be fixed
manually to resolve the corresponding compilation issue.

Dynamic Parameters
++++++++++++++++++

Dynamic parameters are used as placeholder for values.

**Syntax**: ``<dynamic_param>``.

Dynamic parameters are primarily used when referring to a table column value in :ref:`table_driven_execution`,
or while passing values to :ref:`concept`.

Example
+++++++

.. code-block:: gauge
    :caption: example.cpt

    # A sample concept that takes a <parameter>

    * And used the <parameter> in a step.

The above concept can be invoked and a value can be passed to the concept against ``<parameter>`` at the time of invocation.

.. code-block:: gauge

    * A sample concept that takes a "dummy value"

.. note:: Refer to this :ref:`example_inline_data_driven_table` for illustration on how table cell values can be referred using dynamic parameters.


Table Parameters
^^^^^^^^^^^^^^^^
Table parameters are used when a step is to be exucuted for multiple values. The step having a inline table parameter will be executed for each table row

.. _example_inline_table:

Example
+++++++

.. code-block:: gauge

    # Create projects

    ## First scenario

    * Create the following projects
         |project name| username |
         |------------|----------|
         | Gauge java | Daredevil|
         | Gauge ruby | Iron Fist|

Iniline data tables can be externalized as :ref:`special csv paramter<special_parameter_csv>`

Special Parameters
^^^^^^^^^^^^^^^^^^

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

1. :ref:`File<special_parameter_file>`
2. :ref:`CSV<special_parameter_csv>`

.. _special_parameter_file:

Special Parameter: File
^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^

Tables are used to pass table value into steps read from an external CSV
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

The first row is considered as table header. Following rows are
considered as the row values.

Data Table values in inline tables
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Dynamic values from the data table can also be referred in table
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
-  Only **one** set of tags can be added to a single specification or
   scenario.

They help in filtering specs or scenarios based on tags used.

Example
+++++++

Both the ``Login specification`` and the scenario
``Successful login scenario`` have tags in the below example.

.. code-block:: gauge

    # Login specification

     Tags: login, admin, user-abc

    ## Successful login scenario

     Tags: login-success, admin

A tag applied to a spec automatically applies to a scenario.

.. _concept:

Concepts
--------

Concepts provide the ability to combine re-usable logical groups of
steps into a single unit. It provides a higher level abstraction of a
business intent by combining steps.

They are defined in ``.cpt`` format files in the ``specs`` directory
in the project. They can be inside nested directories inside the specs
directory.

-  Concepts are used inside spec just like any other step. The
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

Steps
+++++

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
execution of scenario in a spec. They are used to perform a tear down
function.

-  Any regular :ref:`steps <step_syntax>` can be used as a tear down step.
-  Tear down steps are executed after every scenario in the spec.

Syntax
++++++

``___``: Three or more consecutive underscores will indicate the start
of tear down. Steps that are written in tear down(after three or more
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

    .. tab:: C#

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
            def create_following_characters(greeting, name):
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

            public class Users {

                [Step("Create following <role> users <table>")]
                public void HelloWorld(string role, Table table) {
                    // Step implementation
                }

            }

    .. tab:: Java

        .. code-block:: java

            // Table is a custom data structure defined by gauge.
            public class Users {

                @Step("Create following <race> characters <table>")
                public void createCharacters(String type, Table table) {
                    // Step implementation
                }

            }

    .. tab:: JavaScript

        .. code-block:: javascript

            step("Create following <arg0> characters <arg1>", async function(arg0, arg1) {
                throw 'Unimplemented Step';
            });

    .. tab:: Python

        .. code-block:: python

            # Here Table is a custom data structure defined by gauge.

            @step("Create following <hobbit> characters <table>")
            def create_following_characters(hobbit, table):
                assert False, "Add implementation code"

    .. tab:: Ruby

        .. code-block:: ruby

            # Here table is a custom data structure defined by gauge-ruby.

            step 'Create following <race> characters <table>' do |role, table|
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

                [Step({"Create a user <user_name>", "Create another user <user_name>"})]
                public void HelloWorld(string user_name) {
                    // create user user_name
                }

            }

    .. tab:: Java

        .. code-block:: java

            public class Users {

                @Step({"Create a user <user_name>", "Create another user <user_name>"})
                public void helloWorld(String user_name) {
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
            def hello(user_name):
                print("create {}.".format(user_name))

    .. tab:: Ruby

        .. code-block:: ruby

            step 'Create a user ','Create another user ' do |user_name|
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
                public void HelloWorld(string email_type) {
                    // Send email of email_type
                }

            }

    .. tab:: Java

        .. code-block:: java

            public class Users {

                @Step({"A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"})
                public void helloWorld(String email_type) {
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

            step 'A email is sent to the user', 'An email confirming the is sent' do |email_type|
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


Advanced
========

Using IDE plugins
-----------------

The listed IDE plugins are available for gauge to make writing specs and test code simpler.

.. tab-container:: ide

    .. tab:: Visual Studio Code

        Gauge projects can be created and executed in Visual Studio Code using the `Gauge extension for VSCode <https://marketplace.visualstudio.com/items?itemName=getgauge.gauge>`__.
        This plugin currently supports Gauge with JavaScript, Ruby and Python.

        More information on IDE features and how to use it can be found `here <https://github.com/getgauge/gauge-vscode/blob/master/README.md>`__.


    .. tab:: IntelliJ Idea

        Gauge projects can be created and executed in IntelliJ IDEA using the `Gauge plugin for IntelliJ IDEA <https://plugins.jetbrains.com/plugin/7535-gauge>`__.
        This plugin only supports Gauge with Java.

        More information on IDE features and how to use it can be found `here <https://github.com/getgauge/Intellij-Plugin/blob/master/README.md>`__.

    .. tab:: Visual Studio

        Gauge projects can be created and executed in Visual Studio using the `Gauge extension for Visual Studio <https://marketplace.visualstudio.com/items?itemName=vs-publisher-1071478.GaugepluginforVisualStudio>`__.
        This plugin currently supports Gauge with C#.

        More information on IDE features and how to use it can be found `here <https://github.com/getgauge/gauge-visualstudio/blob/master/README.md>`__.

Refactoring
-----------

Rephrase steps
^^^^^^^^^^^^^^

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

.. include:: errors/index.rst

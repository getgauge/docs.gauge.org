.. role:: heading
.. role:: vscode
.. role:: intellij
.. role:: visualstudio
.. _write_gauge_specification:

.. cssclass:: topic

:heading:`Write Gauge specifications`
=====================================
.. include:: change_filter.rst

This page provides information about what a specification is, how to write a specification, and other related information such as concepts, step implementation, specs directory, and so on.  

Text editor for specs
----------------------

You can author Gauge specifications by using any text editor. It is recommended that you use the IDE plugin.

.. cssclass:: dynamic-content vscode

:vscode:`VSCode`
~~~~~~~~~~~~~~~~
Gauge projects can be created and run in Visual Studio Code by using the `Gauge extension for VSCode <https://marketplace.visualstudio.com/items?itemName=getgauge.gauge>`__.
This plugin currently supports Gauge with Java, JavaScript, Ruby, Python, C# (.Net Core), and TypeScript.

.. cssclass:: dynamic-content intellij

:intellij:`IntelliJ IDEA`
~~~~~~~~~~~~~~~~~~~~~~~~~
Gauge projects can be created and run in IntelliJ IDEA by using the `Gauge plugin for IntelliJ IDEA <https://github.com/getgauge/Intellij-Plugin/blob/master/README.md>`__.
This plugin only supports Gauge with Java.

.. cssclass:: dynamic-content visualstudio

:visualstudio:`Visual Studio`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Gauge projects can be created and run in Visual Studio by using the `Gauge extension for Visual Studio <https://github.com/getgauge/gauge-visualstudio/blob/master/README.md>`__.
This plugin currently supports Gauge with C# (.Net framework).

.. _specs:

Specifications (spec)
----------------------

A specification is a business test case which describes a particular feature of the application that needs testing.  
Gauge specifications support a ``.spec`` or ``.md`` file format and these specifications are written in a syntax similar to Markdown.

.. cssclass:: key-points

    * Every spec can contain one or more :ref:`longstart-scenarios`.
    * Every spec can be marked with labels using :ref:`longstart-tags`.

.. _specs_directory:

Specs directory
~~~~~~~~~~~~~~~~

When a Gauge project is created and initialized, a ``specs`` directory is automatically created at ``<project_root>`` with a sample file, ``example.spec``.
This sample file helps you understand how to write a specification.

.. note::
   The path and name of the ``specs`` directory can be changed by using key value pairs in the ``default.properties`` file of your project.

   For more information about ``default.properties``, see :ref:`local_configuration_Gauge`.

.. cssclass:: example

Example

The following is an example of a Gauge specification:

.. code-block:: gauge

    # Search specification
    Tags: search, admin

    The admin user must be able to search for available products on the search page

    ## Successful search
    Tags: successful

    For an existing product name, the search result will contain the product name

    * User must be logged in as "admin"
    * Open the product search page
    * Search for product "Cup Cakes"
    * "Cup Cakes" should show up in the search results

    
    ## Unsuccessfull search

    On an unknown product name search the search results will be empty

    * User must be logged in as "admin"
    * Open the product search page
    * Search for product "unknown"
    * The search results will be empty

For more information about Markdown, see `Markdown Syntax <https://daringfireball.net/projects/markdown/syntax>`__.

Components of a specification
-----------------------------

A specification consists of different sections; some of which are mandatory and few are optional.
The components of a spec are listed as follows:

.. cssclass:: key-points

    * Specification heading
    * Scenario
    * Step
    * Parameters
    * Tags
    * Comments

.. note::
   
   Tags - optional, executable component when the spec is run

   Comments - optional, non-executable component when the spec is run

Specification heading
~~~~~~~~~~~~~~~~~~~~~

A specification must begin with a spec heading. A specification must contain only one spec heading.

Spec heading is written in the `<H1>` Markdown syntax in one of the following ways:

.. _spec_syntax:

.. code-block:: gauge

    # Spec Heading

or

.. code-block:: gauge

    Spec Heading
    ============

.. cssclass:: example

Example

In the following example, ``# Search specificaiton`` is the spec heading, followed by tags and steps (statements preceded by ``*``).

.. code-block:: gauge

    # Search specification
    Tags: search, admin

    The admin user must be able to search for available products on the search page

    * User must be logged in as "admin"
    * Open the product search page

.. _longstart-scenarios:

Scenario
~~~~~~~~

Each scenario represents a single workflow in a particular specification. A
specification must contain at least one scenario.

A scenario starts after a scenario heading or a scenario name. 
The scenario heading is written in Markdown ``<H2>`` syntax in one of the following ways:

.. _scenario_syntax:

.. code-block:: gauge

    ## Scenario heading

or

.. code-block:: gauge

    Scenario heading
    ----------------

| A scenario contains one or more :ref:`steps <step_syntax>` in it.
| A scenario can be tagged by using :ref:`tags <longstart-tags>`.

.. cssclass:: example

Example

In the following example, the spec, ``Search specification`` contains the scenario, ``## Successful search``. This scenario heading is followed by tags and steps.

.. code-block:: gauge
    
    # Search specification
    
    The admin user must be able to search for available products on the search page

    ## Successful search
    Tags: successful

    For an existing product name, the search result will contain the product name

    * Search for product "Cup Cakes"
    * "Cup Cakes" should show up in the search results

Table driven scenario
^^^^^^^^^^^^^^^^^^^^^^

Gauge 1.0.3 adds an experimental feature to provide a table at scenario level. Gauge will iterate over the table and run that particular scenario against each row.
Set ``allow_scenario_datatable`` variable to ``true`` in ``/env/default/default.properties`` to enable this feature.

Example

.. code-block:: gauge

    # Search specification

    ## Vowel counts in multiple word

     |Word  |Vowel Count|
     |------|-----------|
     |Gauge |3          |
     |Mingle|2          |
     |Snap  |1          |
     |GoCD  |1          |
     |Rhythm|0          |

    This is the second scenario in this specification

    Here's a step that takes a table

    * The word <Word> has <Vowel Count> vowels.

Since this is ans experimental feature there are few cases in which it currently does not work:

* IDE plugins does not support this feature.
* CSV files can not be used as table for scenario.
* Reporting plugins does not accommodate this feature.

.. note::
    This feature is currently available in gauge >= 1.0.3,

.. _longstart-steps:

Step
~~~~

Steps are the executable components of a specification that are written by using the Markdown unordered list syntax.
In a specification, steps can exist either within a scenario or outside a scenario. 
When steps are used outside a scenario, they can be of the following types: Context steps and Tear Down steps. 

Steps also exist inside a Concept.

Every step implementation has an equivalent code as per the language plugin used while installing Gauge. 
This code is run when the steps inside a spec are executed.

.. _step_syntax:

.. cssclass:: example

Example

In the following example, the two sentences preceded by asterisk, \*\, are the unordered steps listed inside the ``Successful search`` scenario.

.. code-block:: gauge

    # Search specification

    ## Successful search
    Tags: successful

    For an existing product name, the search result will contain the product name

    * Search for product "Cup Cakes"
    * "Cup Cakes" should show up in the search results

The values written in *quotes*, ``"``, are parameters that are passed into the equivalent code of the step implementation for that particular language plugin.

.. attention::
   The following characters are reserved for parameters and cannot be used in the text of a step:

   * ``"``
   * ``<``
   * ``>``

| For more information about Context Steps and Tear Down steps, see :ref:`Context Steps<longstart-context>` and :ref:`longstart-teardown`.
| For more information about how to write step implementations for different languages, see :ref:`language-steps`.

.. _parameters:

Parameters
~~~~~~~~~~

Steps are defined to take values as parameters so that they can be reused with different parameter values.

The equivalent code of the step implementation for that particular language plugin must also have the same number of parameters as mentioned in the step.

.. cssclass:: example

Examples

In the following example, parameter values are ``“Cup Cakes”`` (within double quotes) within the two steps.

.. code-block:: gauge

    ## Successful search
    Tags: successful

    For an existing product name, the search result will contain the product name

    * Search for product "Cup Cakes"
    * "Cup Cakes" should show up in the search results

In the following example, parameter values are ``"product 1"`` and ``"product 2"``.

.. code-block:: gauge

    * Check "product 1" exists
    * Check "product 2" exists

A step can have the following types of parameters:

.. cssclass:: key-points

    * Simple parameters
    * Dynamic parameters
    * Table parameters
    * Special parameters

1. Simple parameters
^^^^^^^^^^^^^^^^^^^^

Simple parameters are values, which are used in a step within double quotes.

.. cssclass:: example

Example

In the following examples, ``Cup Cakes``, ``gauge-java``, and ``100`` are values within double quotes and are used in steps: 

.. code-block:: gauge

   * Search for product "Cup Cakes"
   * Create a “gauge-java” project
   * Write “100” line specification

2. Dynamic Parameters
^^^^^^^^^^^^^^^^^^^^^

Dynamic parameters are used as placeholders instead of actual values. 
These parameters are used when referring to a table column value of a data table. Data tables are defined at the beginning of a spec. 
Dynamic parameters are also used as values in a Concept.
Dynamic parameters have the following syntax: ``<dynamic_param>``.

.. cssclass:: example

Example: Dynamic Parameters used in a spec which has a data table

In the following example, ``<name>`` is a dynamic parameter. 
``<name>`` can take the values mentioned in the "name" column of the table. In this case, the values are "Alice", "Bob", or "Eve".

.. code-block:: gauge

    # Create projects

        |id| name      |
        |--|-----------|
        |1 | Alice    |
        |2 | Bob   |
        |3 | Eve |

    ## First scenario
    * Say "hello" to <name>.

    ## Second scenario
    * Say "namaste" to <name>.

.. cssclass:: example

Example: Dynamic parameters used in a Concept

In the following example, ``<username>`` and ``<project_name>`` are used in a Concept.

.. code-block:: gauge

    # Login as user <username> and create project <project_name>

    * Login as user <username> and "password"
    * Navigate to project page
    * Create a project <project_name>

| The dynamic parameters take actual values when a concept is invoked from within a spec. 
| In the following specification, the concept is invoked within the "Successful login scenario" and the dynamic parameters, ``<username>`` and ``<project_name>`` take the values "john" and "Gauge java" respectively.

.. code-block:: gauge

    # Login specification

    ## Successful login scenario

    * Login as user "john" and create project "Gauge java"


| For more information about using dynamic parameters in table column values, see :ref:`table_driven_execution`.
| For more information about concepts, see :ref:`concept`.
| For more information about using dynamic parameters in inline tables, see :ref:`example_inline_data_driven_table`.

3. Table Parameters
^^^^^^^^^^^^^^^^^^^^
Table parameters are used when a step is executed for multiple values in a table.
For a step with an inline table parameter, the entire table becomes the parameter value.

.. _example_inline_table:

.. cssclass:: example

Example

In the following example, the step has an inline table parameter.

.. code-block:: gauge

    # Create projects

    ## First scenario

    * Create the following projects
         |project name| username |
         |------------|----------|
         | Gauge java | Daredevil|
         | Gauge ruby | Iron Fist|

.. note::
   Inline data tables can be used as special CSV parameters. For more information about CSV parameters, see :ref:`special csv parameter<special_parameter_csv>`.

Dynamic parameters used in inline tables
""""""""""""""""""""""""""""""""""""""""

Dynamic parameters can be used in inline tables, which are used within a step. These parameters can take values from the data tables.

.. _example_inline_data_driven_table:

.. cssclass:: example

Example

In the following example, ``<name>`` is a dynamic parameter, which is used in the inline table.
This parameter takes values from the data table.

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



4. Special Parameters
^^^^^^^^^^^^^^^^^^^^^
Special parameters provide the ability to pass large and complex data such as tables and files into the steps as parameters.

| A special parameter has the following syntax: ``<prefix:value>``.
| ``prefix`` - defines the special type of parameter such as file or table
| ``value`` - defines the value for the type of special parameter

The two types of special parameters are as follows:

* File
* CSV

.. _special_parameter_file:

Special Parameter: File
"""""""""""""""""""""""

| These are used to read files and pass the file content as a string parameter to the steps in a specification.
| The syntax of file is as follows: ``<file:[value]>`` .
| ``[value]`` is the absolute or relative path to the file located at ``<project_root>`` (location at which the Gauge project is created). 

.. cssclass:: example

Examples

In the following example, ``email.txt`` is the absolute value of the special parameter, ``file``.

.. code-block:: gauge

    * Verify email text is <file:email.txt>

In the following example, ``content.txt`` is the file located at  ``<project_root>/work/content.txt``. 
``/work/content.txt`` is the relative path passed as the value to ``file``.

.. code-block:: gauge

    * Check if <file:/work/content.txt> is visible

.. _special_parameter_csv:

Special Parameter: CSV
"""""""""""""""""""""""

| Tables are used to pass table values into steps by using the values from an external CSV file. 
| The syntax of this parameter is as follows: ``<table:[value]>``
| ``[value]`` is the absolute or relative path to the file located at ``<project_root>`` (location at which the Gauge project is created). 

.. cssclass:: example

Examples

In the following example, ``data.csv`` is the absolute value of the special parameter, ``table``.

.. code-block:: gauge

    * Step that takes a table <table:data.csv>
    
In the following example, ``users.csv`` is the file located at ``/Users/john/work/``.
``/Users/john/work/`` is the relative path passed as the value to ``table``.

.. code-block:: gauge

    * Check if the following users exist <table:/Users/john/work/users.csv>

The following is an example of a sample CSV file, with the first row as table header and following rows are row values:

.. code-block:: text

    Id,Name
    1,The Way to Go On
    2,Ivo Jay Balbaert


.. _longstart-tags:

Tags
~~~~

Tags are used to associate labels with specifications or scenarios. 
Tags help in searching or filtering specs or scenarios.

Tags are written as comma separated values in the spec with a prefix ``Tags:`` .
Both scenarios and specifications can be separately tagged, however, only **one** set of tags can be added to a single specification or scenario.
A tag applied to a spec automatically applies to a scenario as well.

When the number of tags used is more, tags can be defined in multiple lines to enhance readability. 

.. cssclass:: example

Example: Single line tag

| In the following example, both the specification, ``Search specification``, and scenario, ``Successful search``, have tags. 
| ``search`` and ``admin`` tags, which are used for the spec also apply to the scenario.
| Additionally, the scenario has its own set of tag, which is ``successful``.

.. code-block:: gauge

    # Search specification
      Tags: search, admin

    ## Successful search
       Tags: successful

.. cssclass:: example

Example: Multi-line tag

| In the following example, both the specification and scenario have tags in multiple lines.
| Tags have to be indented when written in multiple lines.

.. code-block:: gauge

    # Login specification

    Tags: login, 
     admin, user-abc

    ## Successful login scenario

    Tags: admin,
     login-success

How to add comments in a specification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Any sentence in plain text which does not follow any syntax is seen as a comment in a spec.
Comments help enhance readability of a spec without being executed.

.. cssclass:: example

Example

In the following example, ``The admin user must be able to search for available products on the search page`` is a comment. 
This is in plain text without any syntax and provides information about the spec. 
Similarly, ``For an existing product name, the search result will contain the product name`` is also a comment within the scenario and provides information about the scenario.
These comments enhance readability without getting executed when the spec is run.

.. code-block:: gauge

    # Search specification
    Tags: search, admin

    The admin user must be able to search for available products on the search page

    ## Successful search
    Tags: successful

    For an existing product name, the search result will contain the product name

    * User must be logged in as "admin"
    * Open the product search page
    * Search for product "Cup Cakes"
    * "Cup Cakes" should show up in the search results

.. _concept:

Concepts
~~~~~~~~
Concepts provide the ability to combine re-usable, logical groups of steps into a single unit. 
A concept presents the summary of a business intent by combining logical groups of steps. 

.. It provides a higher level abstraction of a business intent by combining steps.

Concepts follow the same rules or guidelines that are required while using steps within a spec.
Multiple concepts can be used within a spec and concepts can be nested too.
When the spec is run, all concepts and their steps are executed in the defined order.

Defining a concept
^^^^^^^^^^^^^^^^^^
Concepts are defined in a ``.cpt`` file format at ``<project_root>/specs``, where ``<project_root>`` is the location at which the Gauge project is created. 
Concepts can also be inside nested directories within the ``specs`` directory. 
Multiple concept definitions can be invoked from within a concept definition.
A concept definition consists of a concept header and concept steps.

.. _concept_header:

Concept header
^^^^^^^^^^^^^^
Concept header defines the name of the concept and the parameters used in the concept. 
Concept header is written in the ``H1`` format of Markdown syntax. 
Parameters are defined as ``<parameters>``.

.. cssclass:: example

Example

| In the following example, the concept header is preceded by ``#``. 
| ``<username>`` and ``<project_name>`` are parameters used in the concept.

.. code-block:: gauge

    # Login as user <username> and create project <project_name>

.. _concept_steps:

Concept steps
^^^^^^^^^^^^^
Concept steps are used in a way similar to using steps in a specification. These follow the concept header.
If parameters are used from the the concept header, then these parameters must be used within ``< >``. 
Parameters within concepts steps can also have static values, which are written within double quotes ``" "``.

.. cssclass:: example

Example

The following example shows a concept ``(.cpt)`` file with a concept header (preceded by ``#``) and ``<username>`` and ``<project_name>`` as parameters. 
Parameters are defined in the concept header. This concept has three steps.
"password" is the static value of another parameter used in one of the concept steps.

.. code-block:: gauge

    # Login as user <username> and create project <project_name>

    * Login as user <username> and "password"
    * Navigate to project page
    * Create a project <project_name>

.. _longstart-context:

This concept is invoked from a spec as follows:

.. code-block:: gauge

    # Login specification

    ## Successful login scenario

    * Login as user "john" and create project "Gauge java"

Contexts
~~~~~~~~

Contexts or Context steps are steps defined in a spec prior to a scenario. 
These steps allow you to specify a set of conditions that are necessary for executing scenarios in a spec. 
If there are multiple scenarios, context steps are executed prior to every scenario in the spec. 
A context step must be preceded by ``*`` and are executed in the defined order. 
Hence, they are similar to steps used in a scenario or concept.

.. cssclass:: example

Example

| In the following example, the context steps are ``User is logged in as Mike`` and ``Navigate to the project page``.
| These steps are defined and executed prior to the two scenarios, ``## Delete single project`` and ``## Delete multiple projects``.

When the spec is run, the workflow is as follows:

1. Context steps execution
2. ``Delete single project`` scenario execution
3. Context steps execution
4. ``Delete multiple projects`` scenario execution


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

.. _longstart-teardown:

Tear Down Steps
~~~~~~~~~~~~~~~

Tear Down Steps are defined in a spec after the last scenario. 
These steps allow you to specify some sort of a conclusion after every execution of a scenario in a spec. 
They are used to perform a tear down function.

If there are multiple scenarios, tear down steps are executed prior to every scenario in the spec. 
A tear down step must be preceded by ``*`` and are executed in the defined order. 
Hence, they are similar to steps used in a scenario or concept.

Three or more consecutive underscores, ``___``, indicates the start of tear down steps. 

.. code-block:: gauge

    ___
    * Tear down step 1
    * Tear down step 2
    * Tear down step 3

.. cssclass:: example

Example

In the following example, the tear down steps that start after the three or more consecutive underscores, ___, are 
``Logout user "mike"`` and ``Delete user "mike"``.

When the spec is run, the workflow is as follows:

1. Context steps execution
2. ``Delete single project`` scenario execution
3. Tear down steps execution
4. Context steps execution
5. ``Delete multiple projects`` scenario execution
6. Tear down steps execution

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

.. _language-steps:

Step implementations
~~~~~~~~~~~~~~~~~~~~
Every step implementation has an equivalent code as per the language plugin used while installing Gauge. 
The code is run when the steps inside a spec are executed. 
The code must have the same number of parameters as mentioned in the step.

Steps can be implemented in different ways such as simple step, step with table, step alias, and enum data type used as step parameters.

Simple step
^^^^^^^^^^^
This is a simple step implementation, which has simple parameters.

.. cssclass:: example

Example

In the following example of a step, “hello” and “gauge” are two simple parameters. 
Hence, the step implementation must also contain the same number of parameters. 
The Implementation section shows the step implementation for different language plugins.

.. code-block:: gauge

  * Say "hello" to "gauge"

Implementation
""""""""""""""

.. cssclass:: dynamic-content csharp

.. code-block:: java

    // The Method can be written in **any C# class** as long as it is part of the project.
    public class StepImplementation {

        [Step("Say <greeting> to <product name>")]
        public void HelloWorld(string greeting, string name) {
            // Step implementation
        }
    }

.. cssclass:: dynamic-content java

.. code-block:: java

    // This Method can be written in any java class as long as it is in classpath.

    public class StepImplementation {

        @Step("Say <greeting> to <product name>")
        public void helloWorld(String greeting, String name) {
            // Step implementation
        }
    }

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    step("Say <greeting> to <name>", async function(greeting, name) {
        throw 'Unimplemented Step';
    });

.. cssclass:: dynamic-content python

.. code-block:: python

    @step("Say <greeting> to <product name>")
    def hello_world(greeting, name):
        assert False, "Add implementation code"

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    step 'Say <greeting> to <product name>' do |greeting, name|
        # Code for the step
    end

Step with table
^^^^^^^^^^^^^^^^
When steps have an inline table as a parameter, the step implementation must have the appropriate parameter.

.. cssclass:: example

Example

In the following example, “hobbit” and the table are step parameters. 
The Implementation section shows the step implementation for different language plugins.

.. code-block:: gauge

  * Create following "hobbit" characters
    |id |name   |
    |---|-------|
    |123|frodo  |
    |456|bilbo  |
    |789|samwise|

Implementation
""""""""""""""

.. cssclass:: dynamic-content csharp

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

.. cssclass:: dynamic-content java

.. code-block:: java

    // Table is a custom data structure defined by gauge.
    public class StepImplementation {

        @Step("Create following <race> characters <table>")
        public void createCharacters(String race, Table table) {
            // Step implementation
        }

    }

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    step("Create following <race> characters <table>", async function(race, table) {
        throw 'Unimplemented Step';
    });

.. cssclass:: dynamic-content python

.. code-block:: python

    # Here Table is a custom data structure defined by gauge.

    @step("Create following <race> characters <table>")
    def create_characters(race, table):
        assert False, "Add implementation code"

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    # Here table is a custom data structure defined by gauge-ruby.

    step 'Create following <race> characters <table>' do |race, table|
        puts table.rows
        puts table.columns
    end

Step alias
^^^^^^^^^^
Step alias is a feature when there are multiple step names for the same step functionality. 
The parameters in the step implementation must match the number and type of parameters used in all the steps names. 
Step alias feature can be used in a specification when the same functionality is expressed in different ways.
This enhances readability of the specification.

Step alias feature helps you follow a good software engineering practice such as the DRY (Don't Repeat Yourself) principle at the code level, while ensuring that the functionality is expressed clearly.
You can browse the web for more information about the DRY principle.

.. cssclass:: example

Example 1

In the following example, ``Create a user "user 1"`` and ``Create another user "user 2"`` are step aliases because they have the same functionality, but are expressed differently.
However, ``Verify "user 1" has access to dashboard`` and ``Verify "user 2" has access to dashboard`` are *not* step aliases.
The Implementation section shows the step implementation for different language plugins.

.. code-block:: gauge

    # User Creation

    ## Multiple Users

    * Create a user "user 1"
    * Verify "user 1" has access to dashboard
    * Create another user "user 2"
    * Verify "user 2" has access to dashboard

Implementation
""""""""""""""

.. cssclass:: dynamic-content csharp

.. code-block:: java

    public class Users {

        [Step("Create a user <user_name>", "Create another user <user_name>")]
        public void CreateUser(string user_name) {
            // create user user_name
        }

    }

.. cssclass:: dynamic-content java

.. code-block:: java

    public class Users {

        @Step({"Create a user <user_name>", "Create another user <user_name>"})
        public void createUser(String user_name) {
            // create user user_name
        }

    }

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    step(["Create a user <username>", "Create another user <username>"], function (username) {
        // do cool stuff
    });

.. cssclass:: dynamic-content python

.. code-block:: python

    from getgauge.python import step

    @step(["Create a user <user name>", "Create another user <user name>"])
    def create_user(user_name):
        print("create {}.".format(user_name))

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    step 'Create a user <user name>','Create another user <user name>' do |user_name|
        // create user user_name
    end

.. cssclass:: example

Example 2

In the following example, the functionality of sending an email in both scenarios is the same. 
However, the steps are expressed differently. 
The Implementation section shows the step implementation for different language plugins.

.. code-block:: gauge

    ## User Creation

    * User creates a new account
    * A "welcome" email is sent to the user

    ## Shopping Cart

    * User checks out the shopping cart
    * Payment is successfully received
    * An email confirming the "order" is sent

Implementation
"""""""""""""""

.. cssclass:: dynamic-content csharp

.. code-block:: java

    public class Users {

        [Step({"A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"})]
        public void SendEmail(string email_type) {
            // Send email of email_type
        }

    }

.. cssclass:: dynamic-content java

.. code-block:: java

    public class Users {

        @Step({"A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"})
        public void sendEmail(String email_type) {
            // Send email of email_type
        }

    }

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    step(["A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"], function (email_type) {
        // do cool stuff
    });

.. cssclass:: dynamic-content python

.. code-block:: python

    from getgauge.python import step

    @step(["A <email_type> email is sent to the user", "An email confirming the <email_type> is sent"])
    def email(email_type):
        print("create {}.".format(email_type))

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    step 'A <email_type> email is sent to the user', 'An email confirming the <email_type> is sent' do |email_type|
        email_service.send email_type
    end


.. cssclass:: dynamic-content java

Enum as a step parameter
~~~~~~~~~~~~~~~~~~~~~~~~
The constant values of "Enum" data type can be used as parameters in a step. 
However, the type of parameter should match the Enum name in the step implementation code.

.. note:: 
   Enum as a step parameter is currently supported for ``Java`` only.

.. cssclass:: dynamic-content java

.. cssclass:: example

Example

In the following example, the parameter ``SOUTH`` is of the "Enum" data type. 
In the equivalent code, the parameter ``<direction>`` matches with the Enum name, ``Direction``.
The Implementation section shows the step implementation for Java.

.. code-block:: gauge

  * Navigate towards "SOUTH"

Implementation
^^^^^^^^^^^^^^

.. code-block:: java

    public enum Direction { NORTH, SOUTH, EAST, WEST; }

    @Step("Navigate towards <direction>")
    public void navigate(Direction direction) {
        //  code here
    }


Refactoring (``gauge refactor``)
--------------------------------

Gauge allows you to rephrase a step, add and remove parameters, and change the order of parameters in all spec files and code files of a project. 

.. attention::
  Renaming the parameter does not rename the usage of the parameter inside the step implementation method. 
  By design, the renamed parameter is considered as a new parameter. 
  Therefore the usage of the old parameter (if any) has to be fixed manually to resolve the corresponding compilation issue.

The following command is used to rephrase a step:

.. code-block:: console

    gauge refactor "old step name" "new step name"

.. note::
  This command must be issued at ``<project_root>``, location at which the Gauge project is created.

.. cssclass:: example

Example

Consider the following spec:

.. code-block:: gauge

    # Vowels count specification
    
    ## Vowel counts in single word
    
    * The word "gauge" has "3" vowels

To rephrase the step, ``gauge refactor`` command can be used in the following ways:

Method 1
~~~~~~~~~

.. code-block:: console

    gauge refactor "The word \"gauge\" has \"3\" vowels" "The word \"gauge\" has \"3\" vowels and \"2\" consonants"

.. note::
   Use the appropriate syntax while giving values in quotes, " ", in the command.

Method 2
~~~~~~~~~

.. code-block:: console

    gauge refactor "The word <word> has <number> vowels" "The word <word> has <number> vowels and \"2\" consonants"

Both the methods give the same result - the new step is as follows:

.. code-block:: gauge

    # Vowels count specification
    
    ## Vowel counts in single word
    
    * The word "gauge" has "3" vowels and "2" consonants

Use cases of Refactoring
~~~~~~~~~~~~~~~~~~~~~~~~
Let us consider a few examples that show how to add a parameter, remove a parameter, and change the order of parameters.

Consider the following spec:

.. code-block:: gauge

    # Vowels count specification
    
    ## Vowel counts in single word
    
    * The word "gauge" has "3" vowels

How to add a parameter
~~~~~~~~~~~~~~~~~~~~~~
In the following example, a new parameter has been added to the step.

.. code-block:: console

    gauge refactor "The word \"gauge\" has \"3\" vowels" "The word \"gauge\" has \"3\" vowels and \"2\" consonants"

The result is as follows:

.. code-block:: gauge

    # Vowels count specification
    
    ## Vowel counts in single word
    
    * The word "gauge" has "3" vowels and "2" consonants

How to change the order of parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
In the following example, the order of parameters within the step has been changed.

.. code-block:: console

    gauge refactor "The word \"gauge\" has \"3\" vowels and \"2\" consonants" "The word \"gauge\" has \"2\" consonants and \"3\" vowels"

The result is as follows:

.. code-block:: gauge

    # Vowels count specification
    
    ## Vowel counts in single word
    
    * The word "gauge" has "2" consonants and "3" vowels

How to delete a parameter
~~~~~~~~~~~~~~~~~~~~~~~~~~
In the following example, a parameter has been deleted.

.. code-block:: console

    gauge refactor "The word \"gauge\" has \"2\" consonants and \"3\" vowels" "The word \"gauge\" has \"3\" vowels"

The result is as follows:

.. code-block:: gauge

    # Vowels count specification
    
    ## Vowel counts in single word
    
    * The word "gauge" has "3" vowels

.. _execution_hooks:

Execution hooks
---------------

Test execution hooks can be used to run arbitrary test code at different
levels during the test suite execution.

By default, Gauge clears the state after each scenario so that new objects are created for next scenario execution.

You can configure the level at which Gauge clears the in-memory objects by using the ``default.properties`` file.

For more information about configuring the appropriate environment variable in the ``default.properties`` file, see :ref:`local_configuration_Gauge`.

Implementation
~~~~~~~~~~~~~~

.. cssclass:: dynamic-content csharp

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

.. cssclass:: dynamic-content java

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

.. cssclass:: dynamic-content javascript

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

.. cssclass:: dynamic-content python

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

.. cssclass:: dynamic-content ruby

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

Current Execution Context in the Hook
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To get additional information about the current specification and scenario and step execution, an additional parameter called  ``ExecutionContext`` can be added to the :ref:`hooks <execution_hooks>` method.

.. cssclass:: dynamic-content csharp

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

.. cssclass:: dynamic-content java

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

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    beforeScenario(function (context) {
        var scenario = context.currentScenario
        // Code for before scenario
    });

    afterSpec(function (context) {
        var specification = context.currentSpec
        //Code for after spec
    });

.. cssclass:: dynamic-content python

.. code-block:: python

    from getgauge.python import before_step, after_scenario

    @before_step
    def before_step_hook(context):
        print(context)

    @after_spec
    def after_spec_hook(context):
        print(context)

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    before_spec do |execution_info|
        puts execution_info.inspect
    end

    after_spec do |execution_info|
        puts execution_info.inspect
    end


.. _filtering_hooks_with_tags:

Filtering Hooks execution based on tags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
You can specify tags for which the execution :ref:`hooks <execution_hooks>` can run. 

This ensures that the hook only runs on scenarios and specifications that have the specified tags.

.. note:: 
   Tags cannot be specified on @BeforeSuite and @AfterSuite hooks.

.. cssclass:: dynamic-content csharp

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

.. cssclass:: dynamic-content java

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

.. cssclass:: dynamic-content javascript

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

.. cssclass:: dynamic-content python

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

.. cssclass:: dynamic-content ruby

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

Data Store
-----------
Data (Objects) can be shared in steps defined in different classes at runtime using DataStores exposed by Gauge.

There are three different types of DataStores based on the lifecycle of when in-memory objects get cleared.

ScenarioStore
~~~~~~~~~~~~~
This DataStore keeps values added to memory during the lifecycle of the scenario execution. 
Values are cleared after every scenario is executed.

.. cssclass:: dynamic-content csharp

.. code-block:: java

    using Gauge.CSharp.Lib;

    // Adding value
    var scenarioStore = DataStoreFactory.ScenarioDataStore;
    scenarioStore.Add("element-id", "455678");

    // Fetching Value
    var elementId = (string) scenarioStore.Get("element-id");

    // avoid type cast by using generic Get
    var anotherElementId = scenarioStore.Get("element-id");

.. cssclass:: dynamic-content java

.. code-block:: java

    import com.thoughtworks.gauge.datastore.*;

    // Adding value
    DataStore scenarioStore = DataStoreFactory.getScenarioDataStore();
    scenarioStore.put("element-id", "455678");

    // Fetching Value
    String elementId = (String) scenarioStore.get("element-id");

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    // Adding value
    gauge.dataStore.scenarioStore.put(key, value);

    // Fetching Value
    gauge.dataStore.scenarioStore.get(key);

.. cssclass:: dynamic-content python

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

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    // Adding value
    scenario_store = DataStoreFactory.scenario_datastore;
    scenario_store.put("element-id", "455678");


    // Fetching Value
    element_id = scenario_store.get("element-id");


SpecStore
~~~~~~~~~
This DataStore keeps values added to memory during the lifecycle of the specification execution. 

Values are cleared after every specification is executed.

.. cssclass:: dynamic-content csharp

.. code-block:: java

    using Gauge.CSharp.Lib;

    // Adding value
    var specStore = DataStoreFactory.SpecDataStore;
    specStore.Add("element-id", "455678");

    // Fetching Value
    var elementId = (string) specStore.Get("element-id");

    // avoid type cast by using generic Get
    var anotherElementId = specStore.Get("element-id");

.. cssclass:: dynamic-content java

.. code-block:: java

    // Import Package
    import com.thoughtworks.gauge.datastore.*;

    // Adding value
    DataStore specStore = DataStoreFactory.getSpecDataStore();
    specStore.put("key", "455678");

    // Fetching value
    String elementId = (String) specStore.get("key");

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    // Adding value
    DataStore specStore = gauge.dataStore.specStore.put(key, value);

    // Fetching value
    DataStore specStore = gauge.dataStore.specStore.get(key);

.. cssclass:: dynamic-content python

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

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    // Adding value
    spec_store = DataStoreFactory.spec_datastore;
    spec_store.put("element-id", "455678");

    // Fetching Value
    element_id = spec_store.get("element-id");

SuiteStore
~~~~~~~~~~
This DataStore keeps values added to memory during the lifecycle of the entire test suite execution. 

Values are cleared after the entire test suite is executed.

.. warning::
   It is not recommended to use ``SuiteStore`` when executing specs in parallel.
   The values are not retained between parallel streams of execution.

.. cssclass:: dynamic-content csharp

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

.. cssclass:: dynamic-content java

.. code-block:: java

    // Import Package
    import com.thoughtworks.gauge.datastore.*;

    // Adding value
    DataStore suiteStore = DataStoreFactory.getSuiteDataStore();
    suiteStore.put("element-id", "455678");

    // Fetching value
    DataStore suiteStore = DataStoreFactory.getSuiteDataStore();
    String elementId = (String) suiteStore.get("element-id");

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    // Adding value 
    DataStore suiteStore = gauge.dataStore.suiteStore.put(key, value);

    // Fetching value
    DataStore specStore = gauge.dataStore.suiteStore.get(key);

.. cssclass:: dynamic-content python

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

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    // Adding value
    suite_store = DataStoreFactory.suite_datastore;
    suite_store.put("element-id", "455678");

    // Fetching Value
    suite_store = DataStoreFactory.suite_datastore;
    element_id = suite_store.get("element-id");

Taking Custom Screenshots
-------------------------

When Gauge takes a screenshot, Gauge captures the displayed screen. This is the default behavior. 
If you want to customize this behavior and enable Gauge to take screenshots of your choice, (for example, you might want a screenshot of only a part of the screen by using webdriver)
you can use appropriate APIs in the step implementation of the language runner used while creating the Gauge project.

.. cssclass:: dynamic-content csharp

.. code-block:: java

    //Using Webdriver public
    class CustomScreenGrabber : ICustomScreenshotGrabber {

        // Return a screenshot byte array
        public byte[] TakeScreenshot() {
            var driver = DriverFactory.getDriver();
            return ((ITakesScreenshot) driver).GetScreenshot().AsByteArray;
        }
    }

.. cssclass:: dynamic-content java

.. code-block:: java

    // Using Webdriver public class
    CustomScreenGrabber implements ICustomScreenshotGrabber {
        // Return a screenshot byte array
        public byte[] takeScreenshot() {
            WebDriver driver = DriverFactory.getDriver();
            return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
        }
    }

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    // Using Taiko
    // Return a screenshot byte array
    gauge.screenshotFn = async function() {
        return await screenshot({ encoding: 'base64' });
    };


.. cssclass:: dynamic-content python

.. code-block:: python

    # Using Webdriver
    from getgauge.python import screenshot
    @custom_screen_grabber
    # Return a screenshot byte array
    def take_screenshot():
        return Driver.driver.get_screenshot_as_png()

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    # Using Webdriver
    Gauge.configure do |config|
        # Return a screenshot byte array
        config.screengrabber = -> {
        driver.save_screenshot('/tmp/screenshot.png')
        return File.binread("/tmp/screenshot.png")
        }
    end

.. note::
   If multiple custom ScreenGrabber implementations are found in classpath then gauge will pick one randomly to capture the screen.
   This is because gauge selects the first ScreenGrabber it finds, which in turn depends on the order of scanning of the libraries.

.. _reports_custom_messages:

Custom messages in reports
--------------------------
Custom messages or data can be added to execution reports by using APIs in the step implementations or hooks.

These messages are displayed after the steps in the execution reports.

.. cssclass:: dynamic-content csharp

.. code-block:: java

    GaugeMessages.WriteMessage("Custom message for report");
    var id = "4567";
    GaugeMessages.WriteMessage("User id is {0}", id);

.. cssclass:: dynamic-content java

.. code-block:: java

    Gauge.writeMessage("Custom message for report");
    String id = "4567";
    Gauge.writeMessage("User id is %s", id);

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    gauge.message("Custom message for report");

.. cssclass:: dynamic-content python

.. code-block:: python

    from getgauge.python import Messages

    Messages.write_message("Custom message for report")

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    Gauge.write_message("Custom message for report")
    id = "4567"
    Gauge.write_message("User id is" + id)

.. _reports_custom_screenshots:

Adding screenshots in reports
-----------------------------
If there is any failure while running a spec, Gauge captures a screenshot on such a failure. 
This is the default behavior. 
If you want to enable Gauge to capture a screenshot at any point in time when a spec is run and add the screenshot to the reports, you can use appropriate APIs depending on the language runner used.

The APIs can be used in step implementations or hooks. 

These screenshots are displayed after steps in the execution reports.

.. cssclass:: dynamic-content csharp

.. code-block:: java

    GaugeScreenshots.Capture();

.. cssclass:: dynamic-content java

.. code-block:: java

    Gauge.captureScreenshot();

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    gauge.screenshot();

.. cssclass:: dynamic-content python

.. code-block:: python

    from getgauge.python import Screenshots

    Screenshots.capture_screenshot()

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    Gauge.capture


Continue on Failure
-------------------
Step implementations are non-recoverable by default and Gauge does not execute subsequent steps upon failure.
Sometimes, it is necessary to execute all steps in a scenario irrespective of whether the previous step has failed or not. 

To enable such a requirement, Gauge supports a feature called ``ContinueOnFailure``. 
This feature allows language runners to mark steps as recoverable. 
To make a step implementation continue on failure, the step implementation needs to be explicitly marked in the test code.

Each language runner uses a different syntax, depending on the language idioms, to allow a step implementation to be marked to continue on failure.

.. cssclass:: dynamic-content csharp

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

.. cssclass:: dynamic-content java

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

.. cssclass:: dynamic-content javascript

.. code-block:: javascript

    // The ``@ContinueOnFailure`` annotation tells Gauge to continue executing other
    // steps even if the current step fails.

    gauge.step("Say <greeting> to <product>.", { continueOnFailure: true}, function (greeting,product) {
    });

.. cssclass:: dynamic-content python

.. code-block:: python

    // The ``@ContinueOnFailure`` annotation tells Gauge to continue executing other
    // steps even if the current step fails.

    @continue_on_failure([RuntimeError])
    @step("Say <greeting> to <product>")
    def step2(greeting,product):
        pass

.. cssclass:: dynamic-content ruby

.. code-block:: ruby

    # The ``:continue_on_failure => true`` keyword argument
    # tells Gauge to continue executing other steps even
    # if the current step fails.

    step 'Say <greeting> to <name>', :continue_on_failure => true do |greeting, name|
        # If there is an error here, Gauge will still execute next steps
    end

``ContinueOnFailure`` can take an optional parameter to specify the list of error classes on which Gauge would continue to execute further steps in case of failure. 
Having an optional parameter can be used to control for what type of errors the Gauge execution must continue, instead of just continuing execution for every error. 

For example, when a ``RuntimeException`` error occurs, it is ideally not expected to
continue further execution. However, if it is an assertion error, it might be fine to continue test execution.

This is currently supported only with Java and Python.

If ``ContinueOnFailure`` has no parameters, then the step execution continues by default regardless of the type of error that occurs.

.. cssclass:: dynamic-content java

.. code-block:: java

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


.. cssclass:: dynamic-content python

.. code-block:: python

  @continue_on_failure([RuntimeError])
  @step("Step 2")
  def step2():
      pass

.. note::

   ``ContinueOnFailure`` is executed after the step method is executed. 

    If there is a failure in executing the step, for example, due to parameter count or type mismatch, then Gauge does not execute the ``ContinueOnFailure`` feature.

   ``ContinueOnFailure`` does not apply to :ref:`hooks <execution_hooks>`. 

    Hooks always fail on first error.

   Each step implementation has to be marked explicitly if the step needs to continue on failure. 

    It is not possible to globally apply ``ContinueOnFailure`` on all the steps.

   If an implementation uses step aliases, marking that implementation to continue on failure ensures that all the aliases also continue on failure. 

    So, if a step alias is supposed to break on failure and another step alias is supposed to continue on failure, the step aliases need to be extracted to two different step implementations.


.. _project_structure:

Gauge Project Structure
-----------------------
When a Gauge project is initialized for a particular language plugin, a project structure is created at ``<project_root>``. 
The project structure consists of language-specific files depending on the language plugin used and some common files and directories for all language plugins.

``<project_root>`` - location at which the Gauge project is created.

Common Gauge project files
~~~~~~~~~~~~~~~~~~~~~~~~~~
Regardless of the language plugin used, few common files and directories are created when a Gauge project is initialized. 

The following are the common files and directories in the Gauge project structure:

.. cssclass:: key-points

    * env
    * logs
    * specs
    * manifest.json

.. code-block:: text

    ├── env
    │  └── default
    │     └── default.properties
    ├── logs
    ├── manifest.json
    ├── specs
       └── example.spec
    
Env Directory
^^^^^^^^^^^^^
The ``env`` directory contains multiple environment specific directories.
Each directory has ``.property`` files which define the environment variables set during spec execution for that specific environment.

A ``env/default`` directory is created when a Gauge project is initialized. 
The default directory has the ``default.properties`` file, which contains the default environment variables set during spec execution.
This directory also has the language specific ``.property`` file which contains language-specific environment variables.

| For more information about environments, see :ref:`environments`. 
| For more information about the ``default.properties`` file, see :ref:`local_configuration_Gauge`.

Specs Directory
^^^^^^^^^^^^^^^
The specs directory contains all the specification files for the project. 
A sample specification file called ``example.spec`` is created in this directory to understand the format of a specification file.

A specification is a business test case, written in Markdown, which describes a particular feature of the application that needs testing.

For more information about what a specification is and spec directory, see :ref:`specs` and :ref:`specs_directory`.

Manifest file
^^^^^^^^^^^^^
The ``manifest.json`` file contains information such as the language used and plugins required for the Gauge project.

After the Gauge project is initialized, ``manifest.json`` has the following information:

.. code:: js

   {
     "Language": "<language>",
     "Plugins": [
       "html-report"
     ]
   }

``Language`` - indicates the programming language used for the test code. Gauge uses this language runner for executing specs.

``Plugins`` - indicates the plugins used for the project. Some plugins are used by default for each gauge project. Plugins can also be added to the project by installing the required plugin.

For example, if you want to add xml-report plugin to the ``manifest.json`` file, you must install the xml-report plugin. 
After the plugin is installed, manifest.json has the following content:

.. code:: js

   {
     "Language": "<language>",
     "Plugins": [
       "html-report",
       "xml-report"
     ]
   }

For more information about installing a plugin and related details, see :ref:`install_plugins`.

Language-specific project files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
When the Gauge project is initialized, depending on the language plugin used, language-specific files are created in the project.

The following table shows the project structure for each of the languages when used for creating a Gauge project.

.. cssclass:: dynamic-content csharp

.. code-block:: text

    ├── foo.csproj
    ├── foo.sln
    ├── manifest.json
    ├── packages.config
    ├── StepImplementation.cs
    │
    ├── env
    │   └───default
    │           csharp.properties
    │
    ├───packages
        └───<Nuget Package Binaries>
    ├───Properties
    │       AssemblyInfo.cs
    │
    └───specs
            example.spec


**packages.config**

Nuget Package Binaries contains nuget dependencies for Gauge.

**StepImplementation.cs**

This file contains the implementations for the sample steps defined in
``example.spec``.

**csharp.properties**

| This file defines configurations for CSharp runner plugin.
| For more information about language-specific configuration, see :ref:`language_config`.

.. cssclass:: dynamic-content java

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

This directory contains the classes including step implementations.

**java.properties**

| This file defines configurations for Java runner plugin.
| For more information about language-specific configuration, see :ref:`language_config`.

.. cssclass:: dynamic-content javascript

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

This directory contains the test code including step implementations.

**js.properties**

| This file defines configurations for Javascript runner plugin.
| For more information about language-specific configuration, see :ref:`language_config`.

.. cssclass:: dynamic-content python

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

This directory contains the test code including step implementations.

**python.properties**

| This file defines configurations for Python runner plugin.
| For more information about language-specific configuration, see :ref:`language_config`.

.. cssclass:: dynamic-content ruby

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

This directory contains all the ``.rb`` files with the test code including step implementations in ruby.

**ruby.properties**

| This file defines configurations for Ruby runner plugin.
| For more information about language-specific configuration, see :ref:`language_config`.

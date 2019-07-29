.. cssclass:: topic

What is Gauge
==============

.. role:: highlighted-syntax
.. role:: param-syntax-char

Gauge is a free and open source test automation framework. Gauge makes test automation a
natural part of the software development cycle by removing any hurdle that comes in the way of
writing and maintaining acceptance tests


.. cssclass:: topic

Why Gauge
=========

The communication breakdowns between Developers and Business Stakeholders is a common risk
of software development. Gauge is an advanced automation tool that allows requirements to be
written in a way that will be understood by all roles in a project and help bridge the gap.

Some of the key features of Gauge that make it stand unique include:

.. cssclass:: key-features

* A rich markup based on markdown
* Simple, Flexible and Rich Syntax
* Business Language Tests: Supports the concept of executable documentation
* Consistent Cross Platform/Language Support for writing test code. Currently supported languages
* Open Source,so it could be shared freely and improved by others as well.
* A modular architecture with Plugins support
* Extensible through Plugins and Hackable.
* Supports External Data Sources
* Helps you create Maintainable and Understandable test suites.
* IDE Support

.. cssclass:: topic

Gauge Terminologies
===================

Specifications
---------------------

They are business layer test cases which can also act as your feature documentation. They are written in the business language. Typically a spec or specification describe a particular feature of the application under test.

.. cssclass:: key-features

* They are written in a :highlighted-syntax:`.spec` file. Gauge also supports :highlighted-syntax:`.md` file format.
* The Markup for a Specification file is based on markdown syntax.

Example
+++++++

.. code-block:: gauge

    # Search specification
    Tags: search

    The admin user must be able to search for available products on the se

    User must be logged in as "admin"
    Open the product search page

    ## Successful search 2
    Tags: successful

    For an existing product name, the search result will contain the product

    Search for product "Die Hard" 3
    "Die Hard" should show up in the search results

    ## Unsuccessful search

    On an unknown product name search the search results will be empty

    Search for product "unknown"
    The search results will be empty

Specification Heading
+++++++++++++++++++++

A Spec must begins with a spec heading and a single specification can contain only one spec heading.

It is written in :highlighted-syntax:`<H1>` syntax of markdown. This can be in two forms:

.. code-block:: gauge

    # Spec Heading

or

.. code-block:: gauge

    Spec Heading
    ============

.. cssclass:: note

| Note:
| Every spec must contain one or more Scenarios.
| Every spec can be marked with labels using Tags.


Scenarios
---------

Each scenario represents a single flow in a particular specification. A specification must contain at least one scenario.

A scenario starts after a scenario heading or a scenario name. The scenario heading is written in markdown :highlighted-syntax:`<H2>` syntax. This can be written in 2 ways:

.. code-block:: gauge

    ## Scenario heading

or

.. code-block:: gauge

    Scenario heading
    ----------------

.. cssclass:: note

| Note:
| A scenario contains one or more steps under it.
| A scenario can be tagged using tags.

Example
+++++++

.. code-block:: gauge

    Configuration
    =============

    The Admin user should be able to switch permissions for other users.

    Admin Login
    -----------
    * User must login as "admin"
    * Navigate to the configuration page
    * Change permissions for user "john" to "admin"
    * User "john" should have admin permissions

Steps
-----

Steps are the executable components of your specification. They are written as markdown unordered list items (bulleted points).

They are written inside a specification as

.. cssclass:: key-features

* Context Steps
* Tear Down Steps
* Steps inside a scenario or concepts

Every step has an underlying code implementation for the programming language used. This is executed when the steps inside a spec are executed.

See how to write Step implementations for different languages.

Example
+++++++

.. code-block:: gauge

    * Login into my app
    * Search for "gauge"
    * Search for "gauge-java"

The values written in quotes are parameters which are passed into the underlying step implementation as a language specific structure.

The following characters are reserved for parameters, these cannot be used in step text.

.. cssclass:: key-features

* :param-syntax-char:`"`
* :param-syntax-char:`<`
* :param-syntax-char:`>`


Parameters
----------
Steps can be defined to take values as parameters so that they can be re-used with different parameter values.

.. code-block:: gauge

    * Check "product 1" exists
    * Check "product 2" exists

The underlying step implementation in code must also take the same number of parameters as passed from the step.

The parameters passed into a step are of the following types:

Simple parameters
+++++++++++++++++

They are values passed into the steps in double quotes.

.. code-block:: gauge

    * Create a “gauge-java” project
    * Write “100” line specification

.. cssclass:: note

| Note:
| Renaming the parameter will not rename the usages inside the method. By design, the renamed parameter is considered as a new parameter. Therefore the usage of the old parameter(if any) has to be fixed manually to resolve the corresponding compilation issue.


Dynamic Parameters
++++++++++++++++++

Dynamic parameters are used as placeholder for values.

Syntax: :highlighted-syntax:`<dynamic_param>`.

Dynamic parameters are primarily used when referring to a table column value in Data driven execution, or while passing values to Concepts.

Example
+++++++

example.cpt

.. code-block:: gauge

    # A sample concept that takes a <parameter>

    * And used the <parameter> in a step.

The above concept can be invoked and a value can be passed to the concept against :highlighted-syntax:`<parameter>` at the time of invocation.

.. code-block:: gauge

    * A sample concept that takes a "dummy value"

.. cssclass:: note

| Note:
| Refer to this example_inline_table for illustration on how table cell values can be referred using dynamic parameters.

Table Parameters
++++++++++++++++

Table parameters are used when a step is to be exucuted for multiple values. The step having a inline table parameter will be executed for each table row

Example
+++++++

.. code-block:: gauge

    Create projects
    ===============

    First scenario
    --------------

    * Create the following projects
        |project name| username |
        |------------|----------|
        | Gauge java | Daredevil|
        | Gauge ruby | Iron Fist|


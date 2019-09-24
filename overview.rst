.. meta::
  :description: Gauge is a free and open source test automation framework. Gauge makes test automation a natural part of the software development cycle by removing any hurdle that comes in the way of writing and maintaining acceptance tests...
  :keywords: gauge overview testing automation

.. cssclass:: topic
.. role:: heading

:heading:`Overview`
===================

Gauge is a free and open source framework for writing and running acceptance tests. 
Some of the key features of Gauge that makes it unique include:

.. cssclass:: key-features

* Simple, flexible and rich syntax based on Markdown.
* Consistent cross platform/language support for writing test code.
* A modular architecture with plugins support
* Extensible through plugins and hackable.
* Supports data driven execution and external data sources
* Helps you create maintainable test suites
* Supports Visual Studio Code, Intellij IDEA, IDE Support

.. cssclass:: sub-heading

The basics
----------

Gauge specifications are written using a `Markdown <https://www.markdownguide.org>`__ 
syntax. For example

.. code-block:: gauge

  # Search the Internet

  ## Look for something
  * Goto Google's home page

In this specification ``Search the Internet`` is the `specification heading <writing-specifications.html#specification-heading>`__,
``Look for something`` is a `scenario <writing-specifications.html#scenario>`__
with a `step <writing-specifications.html#step>`__ ``Goto Google’s home page`` 

You can implement the steps in a specification using a programming language 
for example

.. code-block:: javascript

  step("Goto Google's home page", () => {
    goto("google.com")
  });

The Gauge runner reads and runs steps and its implementation for every scenario in 
the specification andgenerates a report of passing or failing scenarios. 

.. code-block:: gauge

  # Search the Internet
  ## Look for something	 ✔

  Successfully generated html-report to => reports/html-report/index.html
  Specifications:	1 executed	1 passed	0 failed	0 skipped
  Scenarios:	1 executed	1 passed	0 failed	0 skipped

.. note::

  The examples in this article use Gauge specifications with JavaScript 
  and `Taiko <https://taiko.gauge.org>`__, a node js library for automating
  browsers (Taiko). However Gauge supports writing step implementations 
  in Java, C#, Python, Typescript and Golang. You can use also use any 
  driver like Selenium or Appium while implementing your steps.

Re-usability
------------

Gauge helps you focus on testing the flow of an application. Gauge
does this by making steps as re-usable as possible. With Gauge, you 
don't need to build custom frameworks using a programming language.

For example, Gauge steps can pass parameters to an implementation by using 
a text with quotes.

.. code-block:: gauge

  # Search the internet

  ## Search Google
  * Goto Google's home page
  * Search for "Cup Cakes"

The implementation can now use “Cup Cakes” as follows

.. code-block:: javascript

  step("Search for <query>", (query) => {
    write(query);
    press("Enter");
  });

You can then re-use this step within or across scenarios with different 
parameters 

.. code-block:: gauge

  # Search the internet

  ## Look for cakes
  * Goto Google's home page
  * Search for "Cup Cakes"

  ## Look for movies
  * Goto Google's home page
  * Search for "Star wars"

Or combine more than one step into `concepts <writing-specifications.html#concepts>`__

.. code-block:: gauge

  # Search Google for <query>
  * Goto Google's home page
  * Search for "Cup Cakes"

The concept, ``Search Google for <query>`` can be used like a step in a specification

.. code-block:: gauge

  # Search the internet

  ## Look for cakes
  * Search Google for "Cup Cakes"

  ## Look for movies
  * Search Google for "Star wars"

Gauge also supports data driven testing using Markdown tables as well as external 
csv files for example

.. code-block:: gauge

  # Search the internet

  |query    |
  |---------|
  |Cup Cakes|
  |Star wars|
  |Pies     |

  ## Look for things
  * Search Google for <query>

This will execute the scenario for all rows in the table.  

In the examples above, we refactored a specification to be concise and flexible 
without changing the implementation. 

This is brief introduction to a few Gauge features. Please browse through rest of the 
documentation for features like

* `Reports <../getting_started/view-a-report.html>`__
* `Tags <../execution.html?#filter-specifications-and-scenarios-by-using-tags>`__
* `Parallel execution  <../execution.html#filter-specifications-and-scenarios-by-using-tags>`__
* `Environments  <../configuration.html#using-environments-in-a-gauge-project>`__
* `Screenshots  <../writing-specifications.html#taking-custom-screenshots>`__
* `Plugins  <../plugin.html>`__
* And much more

Head over to the `installing <../getting_started/installing-gauge.html>`__ Gauge section 
to try out all it's features.

Quick start
============================

Prerequisites
-------------

-  JDK 6+ / .NET framework / Ruby 2.0+ is installed
-  `Gauge <../../installations/operating_system>`__ is installed.

Install language runner
-----------------------

C#
^^

.. code-block:: console

   gauge --install csharp

Java
^^^^

.. code-block:: console

   gauge --install java


Ruby
^^^^

.. code-block:: console

   gauge --install ruby

One can use IDEs to create the projects and run specifications, for this
example, we are using the command line options.

Creating a Project
------------------

C#
^^

.. code-block:: console

   gauge --init csharp

Java
^^^^

.. code-block:: console

   gauge --init java


Ruby
^^^^

.. code-block:: bash

   gauge --init ruby


On getting the message of ``Successfully initialized the project``, one
should be able to run the specifications.

Running the specs
-----------------

::

   gauge specs

The details of the run are displayed on the command line followed by a
statistics summary.

Interpret results
-----------------

The console report would give you the details of the run

::

    Specifications: (w) executed    (x) passed  (y) failed  (z) skipped
    Scenarios:  (a) executed    (b) passed  (c) failed  (d) skipped

The statistics of the scenarios indicate \* (a) is the total number of
scenarios executed. \* (b) is the total number of scenarios passed. \*
(c) is the total number of scenarios failed. \* (d) is the total number
of scenarios skipped.

The statistics of the specifications indicate \* (w) is the total number
specifications executed. \* (x) is the total number specifications with
all scenarios passed. \* (y) is the total number specifications with
atleast one scenario failed. \* (z) is the total number specifications
with all scenarios skipped.

    Other `formats of reporting <../reporting_features/README.md>`__ are
    available.

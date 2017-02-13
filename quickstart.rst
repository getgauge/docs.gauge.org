Quick start
============================

Prerequisites
-------------

-  JDK 6+ / .NET framework / Ruby 2.0+ is installed
-  :ref:`Gauge <installing_gauge>` is installed.

.. _install-language-runner:

.. _create_a_project:

Creating a Project
------------------

Follow the instructions for the respective language below. On getting the message of ``Successfully initialized the project``, one should be able to run the specifications.

.. note::

    Refer :ref:`project_structure` for files that get created for all languages.

C#
^^

.. code-block:: console

   gauge --init csharp

C# Project files
~~~~~~~~~~~~~~~~

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
"""""""""""""""

For ``nuget``. Contains the dependencies for Gauge. One can add more to
this list, depending on your project needs.

StepImplementation.cs
"""""""""""""""""""""

Contains the implementations for the sample steps defined in
``hello_world.spec``.

default.properties
""""""""""""""""""

This defines default configurations for gauge csharp runner plugin.
Currently the configuration parameters are:

-  ``gauge_reports_dir`` - The path to the gauge reports directory.
   Should be either relative to the project directory or an absolute
   path
-  ``overwrite_reports`` - Set as false if gauge reports should not be
   overwritten on each execution. A new time-stamped directory will be
   created on each execution. This is ``true`` by default.

Java
^^^^

.. code-block:: console

   gauge --init java

Java project files
~~~~~~~~~~~~~~~~~~

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
""""

This contains the additional java dependencies for the project.

src
"""

Src directory contains the classes the test code including step
implementations.

java.properties
"""""""""""""""

This defines configurations for java runner plugin. See :doc:`configuration` for more details.

Ruby
^^^^

.. code-block:: console

   gauge --init ruby

Ruby Project files
~~~~~~~~~~~~~~~~~~

The ruby specific project files create in the project are:

.. code-block:: text

    ├── env
    │   └── default
    │       └── ruby.properties
    └── step_implementations
        └── step_implementation.rb

step_implementations directory
""""""""""""""""""""""""""""""

This contains all the ``.rb`` files with the test code including step implementations in ruby

ruby.properties
"""""""""""""""

This defines configurations for ruby runner plugin.


Running the specs
-----------------

.. code-block:: console

   gauge specs

The details of the run are displayed on the command line followed by a
statistics summary.

Interpret results
-----------------

The console report would give you the details of the run

.. code-block:: text

    Specifications: (w) executed    (x) passed  (y) failed  (z) skipped
    Scenarios:      (a) executed    (b) passed  (c) failed  (d) skipped

The statistics of the scenarios indicate

======== ====================================
Value    Description
======== ====================================
``(a)``  total number of scenarios executed.
``(b)``  total number of scenarios passed.
``(c)``  total number of scenarios failed.
``(d)``  total number of scenarios skipped.
======== ====================================

The statistics of the specifications indicate

======== ===============================================================
Value    Description
======== ===============================================================
``(w)``  total number specifications executed.
``(x)``  total number specifications with all scenarios passed.
``(y)``  total number specifications with atleast one scenario failed.
``(z)``  total number specifications with all scenarios skipped.
======== ===============================================================

Check various supported formats for :doc:`reports`.

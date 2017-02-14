Quick start
============================

Prerequisites
-------------

-  JDK 6+ / .NET framework / Ruby 2.0+ is installed
-  :ref:`Gauge <installing_gauge_recomd_options>` is installed.

.. _install-language-runner:

.. _create_a_project:

Creating a Project
------------------

Follow the instructions for the respective language below. On getting the message of ``Successfully initialized the project``, one should be able to run the specifications.

.. code-block:: console
   :caption: C#

   gauge --init csharp

.. code-block:: console
   :caption: Java

   gauge --init java


.. code-block:: console
   :caption: Ruby

   gauge --init ruby

.. note::

   Refer :ref:`project_structure` for files that get created for all languages.

Running the specs
-----------------

.. code-block:: console

   gauge specs

The details of the run are displayed on the command line followed by a
statistics summary.

.. note::

   Refer :ref:`executing_tests` for more details.

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

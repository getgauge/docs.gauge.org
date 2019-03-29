Experimental Features
=====================

.. _run_specs_before_parallel_execution:

Run specs before parallel execution
-----------------------------------

Specs can be filtered based on tags to run in parallel, so that only those will be run in parallel after executing other specs in serial.

Set ``allow_filtered_parallel_execution`` variable to ``true`` in ``/env/default/default.properties`` to enable this feature.

Execution can be done by the command:

.. code-block:: console

    gauge run specs --parallel --only "parallelizable"


This runs all the specs that are not tagged as ``parallelizable`` in serial first,
and then runs the tagged ones in parallel. 


.. note:: 
    This feature is currently available in gauge nightlies >= 15-3-2019, 
    follow instruction `here <https://docs.gauge.org/latest/installation.html#alternate-installation-methods>`__ to install nightly builds.

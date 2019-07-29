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

Table driven scenario
---------------------

Gauge 1.0.3 adds an experimental feature to provide a table at scenario level. Gauge will iterate over the table and run that particular scenario against each row.
Set ``allow_scenario_datatable`` variable to ``true`` in ``/env/default/default.properties`` to enable this feature.

Since this is ans experimental feature there are few cases in which it currently does not work:

* IDE plugins does not support this feature.
* CSV files can not be used as table for scenario.
* Reporting plugins does not accommodate this feature.

.. note::
    This feature is currently available in gauge >= 1.0.3,

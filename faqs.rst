.. contents:: :local:

----

====
FAQs
====

.. _installation-faq: 

Installation
------------

Where's the gauge executable installed by default?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

============= ================================
OS            Path
============= ================================
Windows       ``%ProgramFiles%\gauge\bin``
MacOS/Linux   ``/usr/local/bin``  
============= ================================



Where are the plugins installed?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

============= ================================
OS            Path                          
============= ================================
Windows       ``%APPDATA%\gauge\plugins``
MacOS/Linux   ``~/.gauge/plugins``
============= ================================

How do I set a custom path for gauge configuration and plugins?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Set the environment variable ``GAUGE_ROOT`` to point to your custom configuration location.
- Set the environment variable ``GAUGE_HOME`` to install plugins at custom location.

How can I manually install a plugin?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download the plugin distributable zip file and install it using the ``-f`` flag.

.. code-block:: console

   gauge --install plugin_name -f path_to_zip_file

Execution
---------

Why do I get validation failure warning?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: text

   [WARN] Validation failed. The following steps have errors
   ...

Check if the step is implemented. 
The steps are case sensitive, check if the cases match.

Why does the runner fail to start?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: text
   
   Failed to start a runner. Compatible runner version to 0.0.7 not found

The language plugin is not compatible with the gauge version installed. Run 

.. code-block:: console

   gauge --install language_name
   
Why are there too many open files?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: text

   Error: too many open files

The upper limit to the number of open files is low. 
Increase the upper limit by adding a command ``ulimit -S -n 2048`` to you ~/.profile.
Don't forget to re-login for the changes to take effect.

IDE
---

Configuration
^^^^^^^^^^^^^

.. note::

    Gauge specific properties are stored in ``gauge.properties`` under gauge configuration folder. Refer to :ref:`Gauge Properties<gauge_properties>`.

How can I increase the language runner timeout?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

By setting

.. code-block:: python

   runner_connection_timeout = 3000

Logs
^^^^

Where does gauge log the test execution output. warnings, validation results etc?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You'll find the logged at ``logs/gauge.log`` in your projects directory.

.. note::

    ``logs`` is the default location for log files. This can be changed using ``logs_directory`` in :ref:`project's properties<default_properties>`.

Where can I find gauge core API logs for debugging IDE plugins?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You'll find that at ``logs/api.log`` in your projects directory.

.. note::

    ``logs`` is the default location for log files. This can be changed using ``logs_directory`` in :ref:`project's properties<default_properties>`.

How can I customize the log directory location?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can specify a custom directory by changing the ``logs_directory`` property under 
``env/default/default.properties`` Refer to :ref:`project's properties<default_properties>`.

.. code-block:: python

   logs_directory = my_custom_log_directory

Where does gauge non project specific logs like plugin installation etc.?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

============= ===============================
OS            Path
============= ===============================
Windows       ``%APPDATA%\gauge\logs``
MacOS / Linux ``~/.gauge/logs``
============= ===============================


====
FAQs
====

Installation
------------

Q. **Where's the gauge executable installed by default?**

+------------+-------------------------------+
| OS         | Path                          |
+============+===============================+
| Windows    | ``%ProgramFiles%\gauge\bin``  |
+------------+-------------------------------+
| MacOS/Linux| ``/usr/local/bin``            |
+------------+-------------------------------+



Where are the plugins installed?

+------------+-------------------------------+
| OS         | Path                          |
+============+===============================+
| Windows    | ``%APPDATA%\gauge\plugins``   |
+------------+-------------------------------+
| MacOS/Linux| ``~/.gauge/plugins``          |
+------------+-------------------------------+

Q. **How do I set a custom path for gauge configuration and plugins?**

Set the ``GAUGE_ROOT`` environment variable to point to your custom location.

Q. **How can I manually install a plugin?**

Download the plugin distributable zip file and install it using the ``-f`` flag.

.. code-block:: bash

   $ gauge --install plugin_name -f path_to_zip_file

Execution
---------

Q. **Why do I get validation failure warning?**

::

   [WARN] Validation failed. The following steps have errors
   ...

Check if the step is implemented. 
The steps are case sensitive, check if the cases match.

Q. **Why does the runner fail to start?**

::
   
   Failed to start a runner. Compatible runner version to 0.0.7 not found

The language plugin is not compatible with the gauge version installed. Run 

.. code-block:: bash

   $ gauge --install language_name
   
Q. **Why are there too many open files?**

:: 

   Error: too many open files

The upper limit to the number of open files is low. 
Increase the upper limit by adding a command ``ulimit -S -n 2048`` to you ~/.profile.
Don't forget to re-login for the changes to take effect.

IDE
---

Configuration
-------------

Gauge specific properties are stored in ``gauge.properties`` under gauge configuration folder.

Q. **How can I increase the language runner timeout?**

By setting

:: 

   runner_connection_timeout = 3000

Logs
----

Q. **Where does gauge log the test execution output. warnings, validation results etc?**

You'll find the logged at ``logs/gauge.log`` in your projects directory.

Q. **Where can I find gauge core API logs for debugging IDE plugins?**

You'll find that at ``logs/api.log`` in your projects directory.

Q. **How can I customize the log directory location?**

You can specify a custom directory by changing the ``logs_directory`` property under 
``env/default/default.properties`` 

::

   logs_directory = my_custom_log_directory

Q. **Where does gauge non project specific logs like plugin installation etc.?**

+------------+-------------------------------+
| OS         | Path                          |
+============+===============================+
| Windows    | ``%APPDATA%\gauge\logs``      |
+------------+-------------------------------+
| MacOS/Linux| ``~/.gauge/logs``             |
+------------+-------------------------------+


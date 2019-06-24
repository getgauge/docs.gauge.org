Configuration
=============
You can configure Gauge as per your requirements by using the *key value* pairs in the ``gauge.properties`` and ``default.properties`` files. 


The global key value pairs, in the ``gauge.properties`` file, allow you to configure Gauge across all Gauge projects. 
For example, you can change the timeout value of Gauge when Gauge connects to plugins by changing the value of the ``plugin_connection_timeout`` key. This value applies to all Gauge projects.  


The local key value pairs, in the ``default.properties`` file, allow you to configure Gauge for a particular Gauge project.
For example, you can have separate Gauge reports or a single, new, time-stamped directory created (overwrite previous report) every time Gauge runs a specification by using the ``overwrite_reports`` key.


.. note:: 
   You can open the ``.properties`` file by using any text editor.

Global
------
``gauge.properties`` is a ``.properties`` file that contains all Gauge specific configurations. You can use or change the *key value* pairs present in this file to configure Gauge across all Gauge projects. This file is located at ``~/.gauge/config`` in Mac OS and Linux systems and at ``%APPDATA%\Gauge\config`` in Windows systems.

You can also use the ``gauge.config`` command to change the value of a key in the ``gauge.properties`` file.

.. code-block:: console

   gauge config [flags] [args]

For example, to change the value of ``check_updates`` in ``gauge.properties``, use the command in the following way:

.. code-block:: console

   gauge config check_updates false

This changes the value of the key, ``check_updates``, to ``false``.

The list of *key value* pairs present in ``gauge.properties`` are listed as follows:

.. code-block:: python
    :linenos:
    :name: gauge_properties

    # Allow Gauge and its plugin updates to be notified to the user.
    check_updates = true

    # Set to a URL, which acts as plugin repository for Gauge.
    gauge_repository_url = https://downloads.gauge.org/plugin

    # Record user opt in or opt out for telemetry
    gauge_telemetry_action_recorded = false

    # Allow Gauge to collect usage statistics anonymously
    gauge_telemetry_enabled = true
   
    # Log request sent to Gauge telemetry engine
    gauge_telemetry_log_enabled = false

    # Set to a URL, which acts as a template repository for Gauge.
    gauge_templates_url = https://downloads.gauge.org/templates

    # Timeout in milliseconds for requests from language 
    # runner when connecting to IDE.
    ide_request_timeout = 30000

    # Sets the timeout in milliseconds for Gauge while
    # connecting to plugins (except language runner plugins).
    plugin_connection_timeout = 10000

    # Sets the timeout in milliseconds for a plugin to stop
    # after a kill message has been sent.
    plugin_kill_timeout = 10000

    # Sets the timeout in milliseconds for Gauge while
    # connecting to the language runner.
    runner_connection_timeout = 30000

    # Sets the timeout in milliseconds for requests from the
    # language runner to Gauge.
    # If the size of the Gauge project is too big, Gauge might time out before the
    # language runner returns the response message.
    runner_request_timeout = 10000


Local (Project level)
---------------------
``default.properties`` is a ``.properties`` file that contains *key value* pairs. You can use or change the key value pairs present in this file to configure a particular Gauge project. The changed value overrides the default value of a key.  
This file is located at ``<project_root>/env/default``, where ``<project_root>`` is the location at which you have created your Gauge project.

The list of *key value* pairs present in ``default.properties`` are listed as follows:

.. code-block:: python
    :linenos:
    :name: default_properties

    # The path to the gauge reports directory should be either relative to
    # the project directory or an absolute path.
    gauge_reports_dir = reports

    # Set as false if gauge reports should not be overwritten 
    # when Gauge runs a specification.
    # If set to true, a new, time-stamped directory is 
    # created every time when Gauge runs a specification.
    overwrite_reports = true

    # Set to false to disable screenshots on failure in Gauge reports.
    screenshot_on_failure = true

    # The path to the Gauge logs directory should be either relative to the
    # project directory or an absolute path.
    logs_directory = logs

    # Set to true to use multithreading for parallel execution
    enable_multithreading = false

    # Specify the level at which in-memory objects should get removed when
    # Gauge runs a specification.
    # Possible values for this property are 'suite', 'spec' or 'scenario'.
    # default: 'scenario'.
    # If set to 'spec', the objects are cleared after Gauge runs each specification 
    # so that new objects are created when Gauge runs the next specification.
    gauge_clear_state_level = spec
    
    # The path to the gauge specifications directory. 
    # Takes a comma separated list of specification files or directories.
    gauge_specs_dir = specs

    # CsvDelimiter holds delimiter used to parse csv files
    # default: `,`
    csv_delimiter = ,

    # Allows steps to be written in multiline
    allow_multiline_step = false


.. _language_config:

Language Plugin Configurations
------------------------------
``<language>.properties`` is the ``.properties`` file corresponding to the language plugin that you have used while creating a Gauge project.  
Configuration properties set in these files are available as environment variables when Gauge runs a specification. You can use these properties or change them as per your requirements.

.. note::
  ``<language>.properties`` file is automatically created when a Gauge project is created and initialized with a language of your choice.
   
| You can find the language specific ``.properties`` file at ``<project_root>/env/default/<language>.properties``, where ``<project_root>`` is the location at which you have created the Gauge project. 
| For example, if you have installed Java on your system, then the path of the ``.properties`` file is ``<project_root>/env/default/java.properties``.


Please see :ref:`Environments <environments>` for more details.

Java
^^^^
If you have installed Java, then you can  make Java specific configuration changes in the ``java.properties`` file. 
The following *key value* pairs are listed in ``java.properties``:

.. code-block:: python
    :linenos:
    :name: java.properties

    # Specify an alternate Java home if you want to use a custom version of the Java Development Kit (JDK).
    gauge_java_home = PATH_TO_JAVA_HOME

    # Use this property if you need to override the build path for the Gauge project.
    # IntelliJ and Eclipse out directory are usually auto-detected.
    gauge_custom_build_path = PATH_TO_CUSTOM_BUILDPATH

    # Specify the directory where additional libraries are kept.
    # You can specify multiple directory names separated with a comma `,`
    # `libs` directory in the gauge project is added by default.
    gauge_additional_libs = libs/*, PATH_TO_NEW_LIBRARY

    # Specify the JVM arguments passed to Java while launching.
    # Enter multiple values separated by comma (,). For example, Xmx1024m, Xms128m
    gauge_jvm_args = <JVM_ARGS>

    # Specify the directory containing Java files to be compiled.
    # You can specify multiple directory names separated with a comma (,).
    gauge_custom_compile_dir =

    # Specify the level at which the in-memory objects should be cleared
    # Possible values are suite, spec, and scenario. Default value is scenario.
    gauge_clear_state_level = scenario

Javascript
^^^^^^^^^^
| If you have installed JavaScript, then you can make JavaScript specific configuration changes in the ``js.properties`` file. 
| The following *key value* pairs are listed in ``js.properties``:

.. code-block:: python
    :linenos:
    :name: js.properties

    # Use this property if you need to override the timeout of a step when Gauge runs the step in a specification.
    test_timeout = 10000

    # Change this to true to enable browser debugging support
    DEBUG = false

    # Comma separated list of directories or paths (a path should be relative to project root).
    STEP_IMPL_DIR = tests

Python
^^^^^^
| If you have installed Python, then you can make Python specific configuration changes in the ``python.properties`` file. 
| The following *key value* pair is listed in ``python.properties``:

.. code-block:: python
    :linenos:
    :name: python

    # Comma separated list of dirs. path should be relative to project root.
    STEP_IMPL_DIR = tests

.. note::
   | C Sharp and Ruby do not have any specific configuration properties of their own. For these language runners, you must use the configuration properties (*key value* pairs) listed in ``default.properties``, located at ``<project_root>/env/default``. 
   | See :ref:`default properties <default_properties>` .


HTTP Proxy
----------

Gauge connects to the internet for downloading plugins and templates. If
you are behind a proxy, you must configure the proxy settings so
that Gauge connects to the internet via the proxy server.

Without Authentication
^^^^^^^^^^^^^^^^^^^^^^

If authentication is not required, set the environment variable
``HTTP_PROXY`` to proxy server URL.

.. tab-container:: http_proxy

    .. tab:: macOS

        .. code-block:: console

            export HTTP_PROXY=http://server-ip:port

    .. tab:: windows

        .. code-block:: console

            set HTTP_PROXY=http://server-ip:port

With Authentication
^^^^^^^^^^^^^^^^^^^

If authentication is required, set the environment variable
``HTTP_PROXY`` to proxy server URL along with the credentials.

.. tab-container:: http_proxy

    .. tab:: macOS

        .. code-block:: console

            export HTTP_PROXY=http://username:password@server-ip:port

    .. tab:: windows

        .. code-block:: console

            set HTTP_PROXY=http://username:password@server-ip:port


Gauge configuration while using build tools
-------------------------------------------
If you are using Gauge with the build tools such as Maven or Gradle, then you must be aware of specific configuration properties.

| For configuration information while using Gauge with Maven, see `GitHub for Gauge Maven Plugin <https://github.com/getgauge/gauge-maven-plugin/blob/master/README.md>`__ .
| For configuration information while using Gauge with Gradle, see `GitHub for Gauge Gradle Plugin <https://github.com/getgauge/gauge-gradle-plugin/blob/master/Readme.md>`__ .

.. _environments:

Environments
------------

Environment specific variables can be managed by using property files. The property files have a set of *key value* pairs which are set as environment variables when Gauge runs a specification.
Gauge allows you to create groups of property files by defining an environment.

A Gauge project can have multiple environments. ``default`` is the default environment.  
Gauge uses the ``–env`` flag to load an environment, when Gauge runs a specification. If ``–env`` is not specified, then the ``default`` environment is chosen during run time. 
Multiple environments can be specified along with the ``–env`` flag.

The following example shows an ``env`` directory structure for a Java project.  
``default.properties`` and ``java.properties`` are the ``.properties`` files created when you create a Gauge project with Java as the language runner. 
You can use or change the key value pairs in these ``.properties`` files as per your requirements.


.. code-block:: text

    ├── env
      └── default
         ├── default.properties
         └── java.properties

.. attention::
   You can either create a new ``.properties`` file or use an existing file to add your custom *key value* pairs.

Create a new environment
------------------------
For ease of testing, you can create an environment in addition to the ``default`` existing environment in your Gauge project .  
You can create a new ``.properties`` file or add an existing property file to this new environment and customize the configuration properties as per your requirements.

.. admonition:: Before you begin

   Ensure that you have created and initialized a Gauge project with a language of your choice.

.. admonition:: About this task:

   * A Gauge project can have multiple environments.
   * ``default`` is the default environment.

1. | Create a directory in the ``env`` folder of your Gauge project.
   | The environment folder is present at ``<project_root>``, where ``project_root`` is the location at which you have created your Gauge project.

   .. code-block:: console

      mkdir <name_of_env>

   For example, create an environment called ``ci``.

   .. code-block:: console

       mkdir ci
   
   A ``ci`` environment is created at ``<project_root>/env``.

2. If you want to add your own key value pairs, then create a ``.properties`` file within the newly created environment.

.. note::
   * You can also add or change the key value pairs in an existing ``.properties`` file and use this file in your newly created environment.
   * You can add any number of ``.properties`` file to your environment.

| The following example shows multiple environments in a Gauge project, where ``env`` is located at ``<project_root>``. 
| ``ci``, ``dev``, and ``experimental`` are newly created environments in addition to the already existing ``default`` environment. 
| The ``default`` environment is created when you create and initialize a Gauge project. 
| ``ci`` and ``dev`` have newly created ``user.properties`` file, whereas ``experimental`` has ``default.properties`` and ``java.properties``, which are already existing files.

.. code-block:: text

    ├── env
       ├── ci
          |── user.properties
       |── default
          ├── default.properties
          └── java.properties
       ├── dev
          |── user.properties    
       ├── experimental
          |── default.properties    
          └── java.properties

For more information about language plugin configurations, see :ref:`Language plugin configuration <language_config>` .

Run a specification with an environment
---------------------------------------

You can use the ``-env`` flag to load an environment when Gauge runs a specification. 
During run time, the key value pairs that you have used in the ``.properties`` file are set as environment variables. 
If ``-env`` is not specified, then the ``default`` environment is loaded during run time.

.. code-block:: console

    gauge run --env <name_of_env> specs

``<name_of_env>`` - name of the environment that you choose to load

In the following example, the ``ci`` environment is loaded when Gauge runs a specification.

.. code-block:: console

    gauge run --env ci specs

Run a specification with multiple environments
----------------------------------------------
You can load multiple environments by using the ``-env`` flag when Gauge runs a specification. 
This allows ease of testing.

.. admonition:: Before you begin

   You must have already created the environments and added the ``.properties`` file in these environments.

.. admonition:: About this task:

   * Gauge gives precedence to the environment variables as per the order of environments provided by the user in the ``gauge run`` command.
   * If there are common environment variables in a user created environment and the ``default`` environment, then the ``default`` environment does not overwrite those variables which are already loaded from the user created environment.

   For more information about the precedence of environments, see :ref:`Precedence of environments <precedence_environments>`.

.. code-block:: console

    gauge run --env "<name_of_env_1>, <name_of_env_2>, default" specs

.. note::
   Specifying the ``default`` environment is optional.


In the following example, ``ci``, ``experimental``, and ``default`` environments are loaded when Gauge runs a specification.

.. code-block:: console
   
   gauge run --env "ci, experimental, default" specs

As per the rules of precedence, the environment variables are set depending on the order of environments. 
In this case, environment variables from ``ci`` are set first, followed by ``experimental``, and then ``default``.

In the following example, environment variables from ``ci`` are set first, followed by ``default``, and then ``experimental``.

.. code-block:: console

   gauge run –env “ ci, default, experimental” specs

.. _precedence_environments:

Precedence of Environments
--------------------------

When multiple environments are loaded when Gauge runs a specification, then Gauge gives precedence to the environment variables as per the order of environments provided by the user in the ``gauge run`` command. 
In addition to this user-provided order, there are also certain other factors that are taken into account while giving precedence. 
It is recommended that you understand these factors to help you run your tests effectively.

Precedence to the env variable value is given in the below order. 1.
User shell / OS env variable values 2. Project environment passed in the
``--env`` flag 3. Project environment present in the ``env/default`` dir
(if present) 3. Gauge default env variable values, as below

+---------------------------+-----------+
|Property                   | Value     |
+===========================+===========+
| gauge_reports_dir         | reports   |
+---------------------------+-----------+
| overwrite_reports         | true      |
+---------------------------+-----------+
| screenshot_on_failure     | true      |
+---------------------------+-----------+
| logs_directory            | logs      |
+---------------------------+-----------+

Gauge loads the environment variables as below.

-  When Gauge starts, the environment(s) passed by the user in the
   ``--env`` flag will be loaded. If this flag is not passed by the
   user, ``default`` environment will be loaded.
-  Gauge will then load the ``default`` environment. Only the values
   which are not yet set will be loaded. This step won't overwrite the
   variables which are set in step 1.
-  Finally, Gauge will load the environment variables which are not yet
   set, as per the table above.
-  These values can be overwritten by explicitly setting the respective
   OS environment variables.
-  If the environment mentioned in the ``--env`` flag is not found in
   the project, Gauge will end with a non-zero exit code.
-  Gauge project doesn't need to have a ``default`` env since Gauge will
   use the above values as default. User can still set the ``default``
   env to either overwrite or add new env variables, but doesn't want to
   pass the ``--env`` flag.

Examples
^^^^^^^^

-  User executes ``gauge run specs``

   -  If ``<project_root>/env/default`` is **not** present, Gauge will
      set the default env variables with values mentioned in the table
      above.
   -  If ``<project_root>/env/default`` is present, Gauge will set the
      env variables mentioned in the ``default`` environment. It will
      then set any env variable (which is not already set) as per the
      table above.

-  User executes ``gauge run --env=java_ci specs``

   -  If ``<project_root>/env/java_ci`` is **not** present, Gauge will
      end with a non-zero exit code.
   -  If ``<project_root>/env/java_ci`` is present, Gauge will set the
      env variables mentioned in the ``java_ci`` environment. It will
      then load other variables from the ``default`` environment which
      are not already set. Finally, it will the set the env vars with
      values mentioned in the table above (if they are not already set).

-  User executes ``gauge_reports_dir=newReportsDir gauge run specs`` or user
   explicitly sets ``gauge_reports_dir=newReportsDir`` in shell and then
   runs ``gauge run specs``

   -  Gauge will set all the default env variables from ``env/default``
      directory and then from the above table, except for the variable
      ``gauge_reports_dir``. This variable's value will still continue
      to be ``newReportsDir``.

-  User executes
   ``gauge_reports_dir=newReportsDir gauge run --env=java_ci specs`` or user
   explicitly sets ``gauge_reports_dir=newReportsDir`` in shell and then
   runs ``gauge run --env=java_ci specs``

   -  Gauge will set the env variables mentioned in the ``java_ci``
      environment. It will then load other variables from the
      ``default`` environment which are not already set. Finally, it
      will the set the env vars with values mentioned in the table above
      (if they are not already set). However variable
      ``gauge_reports_dir``, which is explicitly set in the shell will
      not be overwritten. This variable's value will still continue to
      be ``newReportsDir``.
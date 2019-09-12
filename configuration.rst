.. meta::
    :description: Customise and configure Gauge using gauge.properties and default.properties files.
    :keywords: configuration global local language testing project vscode idea visualstudio automation mac windows linux

.. cssclass:: topic
.. role:: heading

:heading:`Configure Gauge`
==========================
.. include:: change_filter.rst

You can configure Gauge as per your requirements by using the *key value* pairs in the ``gauge.properties`` and ``default.properties`` files. 


The global key value pairs, in the ``gauge.properties`` file, allow you to configure Gauge across all Gauge projects. 
For example, you can change the timeout value of Gauge when Gauge connects to plugins by changing the value of the ``plugin_connection_timeout`` key. This value applies to all Gauge projects.  


The local key value pairs, in the ``default.properties`` file, allow you to configure Gauge for a particular Gauge project.
For example, you can have separate Gauge reports or a single, new, time-stamped directory created (overwrite previous report) every time Gauge runs a specification by using the ``overwrite_reports`` key.


.. note::

   You can open the ``.properties`` file by using any text editor.

.. _global_configuration_Gauge:

Global configuration of Gauge (``gauge.properties``)
----------------------------------------------------
``gauge.properties`` is a ``.properties`` file that contains all Gauge specific configurations. You can use or change the *key value* pairs present in this file to configure Gauge across all Gauge projects. This file is located at ``~/.gauge/config`` in macOS and Linux systems and at ``%APPDATA%\Gauge\config`` in Windows systems.

You can also use the ``gauge config`` command to change the value of a key in the ``gauge.properties`` file.

.. code-block:: console

   gauge config [flags] [args]

.. cssclass:: example

Example

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


.. _local_configuration_Gauge:

Local configuration of Gauge (``default.properties``)
-----------------------------------------------------
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

Language plugin configurations
------------------------------
``<language>.properties`` is the ``.properties`` file corresponding to the language plugin that you have used while creating a Gauge project.  
Configuration properties set in these files are available as environment variables when Gauge runs a specification. You can use these properties or change them as per your requirements.

.. note::
  ``<language>.properties`` file is automatically created when a Gauge project is created and initialized with a language of your choice.
   
| You can find the language specific ``.properties`` file at ``<project_root>/env/default/<language>.properties``, where ``<project_root>`` is the location at which you have created the Gauge project. 
| For example, if you have installed Java on your system, then the path of the ``.properties`` file is ``<project_root>/env/default/java.properties``.

For more details about running language plugins as an environment, see :ref:`Environments <environments>`.

.. cssclass:: dynamic-content java

    If you have installed Java, then you can  make Java specific configuration changes in the ``java.properties`` file. 
    The following *key value* pairs are listed in ``java.properties``:

    .. code-block:: python
        :linenos:
        :name: java.properties

        # Specify an alternate Java home if you want to use a custom version of the Java Development Kit (JDK).
        gauge_java_home = PATH_TO_JAVA_HOME

        # Use this property if you need to override the build path for the Gauge project.
        # IntelliJ Idea and Eclipse out directory are usually auto-detected.
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

.. cssclass:: dynamic-content javascript

    If you have installed JavaScript, then you can make JavaScript specific configuration changes in the ``js.properties`` file. 
    The following *key value* pairs are listed in ``js.properties``:

    .. code-block:: python
        :linenos:
        :name: js.properties

        # Use this property if you need to override the timeout of a step when Gauge runs the step in a specification.
        test_timeout = 10000

        # Change this to true to enable browser debugging support
        DEBUG = false

        # Comma separated list of directories or paths (a path should be relative to project root).
        STEP_IMPL_DIR = tests

.. cssclass:: dynamic-content python

    If you have installed Python, then you can make Python specific configuration changes in the ``python.properties`` file. 
    The following *key value* pair is listed in ``python.properties``:

    .. code-block:: python
        :linenos:
        :name: python

        # Comma separated list of dirs. path should be relative to project root.
        STEP_IMPL_DIR = tests

.. cssclass:: dynamic-content csharp

    If you have installed Csharp, then you can make Csharp specific configuration changes in the ``csharp.properties`` file. 
    The following *key value* pair is listed in ``csharp.properties``:

    .. code-block:: text
        :linenos:
        :name: csharp

        # Holds the location of the created Gauge project
        GAUGE_CSHARP_PROJECT_FILE = /Users/nivedhasenthil/Desktop/sample-csharp/SampleCsharp.csproj

        # The build configuration when running tests for the Gauge project
        GAUGE_CSHARP_PROJECT_CONFIG = Debug

        # The build platform when running tests for the Gauge project
        GAUGE_CSHARP_PROJECT_PLATFORM = Any CPU

.. cssclass:: dynamic-content ruby

If you have installed Ruby, then you can make Ruby specific configuration changes in the ``ruby.properties`` file.
Ruby do not have any specific default configuration properties of its own currently. 


HTTP_PROXY setting while using Gauge
------------------------------------

Gauge connects to the internet for downloading plugins and templates. If
you are behind a proxy, you must configure the proxy settings so
that Gauge connects to the internet via the proxy server.

Without Authentication
~~~~~~~~~~~~~~~~~~~~~~

If authentication is not required, set the environment variable
``HTTP_PROXY`` to proxy server URL.


.. cssclass:: dynamic-content macos
.. code-block:: console

    export HTTP_PROXY=http://server-ip:port

.. cssclass:: dynamic-content linux
.. code-block:: console

    export HTTP_PROXY=http://server-ip:port

.. cssclass:: dynamic-content windows`
.. code-block:: console

    set HTTP_PROXY=http://server-ip:port

With Authentication
~~~~~~~~~~~~~~~~~~~

If authentication is required, set the environment variable
``HTTP_PROXY`` to proxy server URL along with the credentials.

.. cssclass:: dynamic-content macos
.. code-block:: console

    export HTTP_PROXY=http://username:password@server-ip:port

.. cssclass:: dynamic-content linux
.. code-block:: console

    export HTTP_PROXY=http://username:password@server-ip:port

.. cssclass:: dynamic-content windows`
.. code-block:: console

    set HTTP_PROXY=http://username:password@server-ip:port


Gauge configuration while using build tools
-------------------------------------------
If you are using Gauge with the build tools such as Maven or Gradle, then you must be aware of specific configuration properties.

| For configuration information while using Gauge with Maven, see Gauge Maven Plugin  `repository <https://github.com/getgauge/gauge-maven-plugin/blob/master/README.md>`__.
| For configuration information while using Gauge with Gradle, see Gauge Gradle Plugin `repository  <https://github.com/getgauge/gauge-gradle-plugin/blob/master/Readme.md>`__.

.. _environments:

Using environments in a Gauge project
-------------------------------------

Environment specific variables can be managed by using property files. The property files have a set of *key value* pairs which are set as environment variables when Gauge runs a specification.
Gauge allows you to create groups of property files by defining an environment.

A Gauge project can have multiple environments. ``default`` is the default environment.  
Gauge uses the ``–env`` flag to load an environment, when Gauge runs a specification. If ``–env`` is not specified, then the ``default`` environment is chosen during run time. 
Multiple environments can be specified along with the ``–env`` flag.

.. cssclass:: example

Example

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

Create a new environment in a Gauge project
-------------------------------------------

For ease of testing, you can create an environment in addition to the ``default`` existing environment in your Gauge project .  
You can create a new ``.properties`` file or add an existing property file to this new environment and customize the configuration properties as per your requirements.

.. admonition:: Before you begin

   Ensure that you have created and initialized a Gauge project with a language runner of your choice.

.. admonition:: About this task:
   
   A Gauge project can have multiple environments.
   
   ``default`` is the default environment.

1. | Create a directory in the ``env`` folder of your Gauge project.
   | The environment folder is present at ``<project_root>``, where ``project_root`` is the location at which you have created your Gauge project.

   .. code-block:: console

      mkdir <name_of_env>

.. cssclass:: example

Example


For example, create an environment called ``ci``.

.. code-block:: console

    mkdir ci
   
A ``ci`` environment is created at ``<project_root>/env``.

2. If you want to add your own key value pairs, then create a ``.properties`` file within the newly created environment.

.. note::
   
   You can also add or change the key value pairs in an existing ``.properties`` file and use this file in your newly created environment.
   
   You can add any number of ``.properties`` file to your environment.

.. cssclass:: example

Example

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

Run a Gauge specification with an environment
---------------------------------------------

You can use the ``-env`` flag to load an environment when Gauge runs a specification. 
During run time, the key value pairs that you have used in the ``.properties`` file are set as environment variables. 
If ``-env`` is not specified, then the ``default`` environment is loaded during run time.

.. admonition:: Before you begin
   
   Ensure that you have the Gauge specification that needs to be run.
   
   You must have already created the environment and added the ``.properties`` file in this environment.

Use the following command at ``<project_root>`` (location at which you have created the Gauge project) to run a 
Gauge specification with an environment:


You can use the ``-env`` flag to load an environment when Gauge runs a specification. 
During run time, the key value pairs that you have used in the ``.properties`` file are set as environment variables. 
If ``-env`` is not specified, then the ``default`` environment is loaded during run time.

    gauge run --env <name_of_env> specs

``<name_of_env>`` - name of the environment that you choose to load

.. cssclass:: example

Example

In the following example, the ``ci`` environment is loaded when Gauge runs a specification.

.. code-block:: console

    gauge run --env ci specs

.. Provide cross references to run a gauge specification file

Run a Gauge specification with multiple environments
----------------------------------------------------

You can load multiple environments by using the ``-env`` flag when Gauge runs a specification. 
This allows ease of testing.

.. admonition:: Before you begin
   
   Ensure that you have the Gauge specification that needs to be run.
   
   You must have already created the environments and added the ``.properties`` file in these environments.

.. admonition:: About this task:

   Gauge loads the environment variables as per the rules of precedence.
   If there are common environment variables in a user-created environment and the ``default`` environment, then the ``default`` environment does not overwrite those variables which are already loaded from the user-created environment.
   If the ``default`` environment is not specified explicitly as an argument to the ``--env`` flag, then Gauge automatically adds ``default`` at the end of the arguments list. 

   For more information about the precedence of environments, see :ref:`Precedence of environments <precedence_environments>`.

Use the following command at ``<project_root>`` (location at which you have created the Gauge project) to run a 
Gauge specification with multiple environments:

.. code-block:: console

    gauge run --env "<name_of_env_1>, <name_of_env_2>, default" specs

``<name_of_env_1,2>`` - names of the environments that you choose to load

.. cssclass:: example

Example

In the following example, ``ci``, ``experimental``, and ``default`` environments are loaded when Gauge runs a specification.

.. code-block:: console
   
   gauge run --env "ci, experimental, default" specs

As per the rules of precedence, environment variables from ``ci`` are set first, followed by ``experimental``, and then ``default``.

.. cssclass:: example

Example

In the following example, environment variables from ``ci`` are set first, followed by ``default``, and then ``experimental``.

.. code-block:: console

   gauge run –env “ ci, default, experimental” specs

.. cssclass:: example

Example

In the following example, though ``default`` environment is not explicitly specified as an argument to ``--env``, Gauge automatically adds this environment at the end of the list, which is after ``experimental``.

.. code-block:: console

   gauge run –env “ ci, experimental” specs


.. _precedence_environments:

Precedence of environments when running Gauge
---------------------------------------------

If multiple environments are loaded when Gauge runs a specification, then Gauge follows the rules of precedence to load the environment variables as provided by the user and from the ``default`` environment. 
It is recommended that you understand these rules to run your tests effectively.

The rules of precedence to load the environment variables are as follows:

* Environment variables provided in the user shell of the user’s operating system.
* Environment variables (from the environments) provided by the user in the ``--env`` flag.
* Environment variables from ``gauge.properties`` (global configuration of Gauge; located at ``<project_root>/env``).
* Environment variables from the ``default`` environment.
  
  .. note::
    If the ``default`` environment is not present, Gauge internally sets the environment variables which have the same value as mentioned in ``default.properties``.
  
Gauge workflow with multiple environments
-----------------------------------------

When Gauge is run with multiple environments, the following events occur:

1. Gauge loads the environment variables set at the operating system's user shell.
2. Gauge loads the environment variables from the environments provided by the user in the ``--env`` flag.
   
   .. attention::
      If the environment mentioned in the ``--env`` flag is not found at  ``<project_root>/env``, Gauge ends with a non-zero exit code.

3. Next, Gauge loads the environment variables from ``gauge.properties`` (global configuration).
   
   .. important::
      Only those variables that are not yet set are loaded.

4. Lastly, Gauge loads the default environment variables as follows: 

   * If the ``default`` directory is not present at ``<project_root>/env``, Gauge internally sets the environment variables as mentioned in ``default.properties`` (local configuration).
   * If ``default`` is located at ``<project_root>/env``, Gauge loads the environment variables from ``default.properties``. 

   .. important::
      Only those variables that are not yet set are loaded.

For more information about global configuration, see :ref:`Global configuration of Gauge <global_configuration_Gauge>`.
For more information about local configuration, see :ref:`Local configuration of Gauge <local_configuration_Gauge>`.


Examples of Gauge workflows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Some of the possible Gauge workflows are listed on this page for your understanding.

Workflow : User runs ``gauge run specs``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
``default`` environment is located at <project_root>/env/.

* If ``default`` is **not** present, Gauge internally sets the environment variables with the same values as mentioned in ``default.properties`` (local configuration).
* If ``default`` is present, Gauge sets the environment variables as mentioned in the ``default`` environment. 
  
For more information about local configuration, see :ref:`Local configuration of Gauge <local_configuration_Gauge>`.

Workflow : User runs ``gauge run --env java_ci specs``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

``java_ci`` is the user-created environment at ``<project_root>/env``.

* If ``java_ci`` is **not** found, Gauge ends with a non-zero exit code.
* | If ``java_ci`` is present, Gauge sets the environment variables mentioned in the ``java_ci`` environment. 
  | Gauge then loads other environment variables from the ``default`` environment which are not yet set. 
  | If the ``default`` environment is not present, Gauge internally sets the environment variables, which is the same as those in ``default.properties``.

Workflow : User runs ``gauge_reports_dir=newReportsDir gauge run specs``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
   Alternately, user can explicitly set ``gauge_reports_dir=newReportsDir`` in the operating system's user shell and then run ``gauge run specs``.

``default`` environment is located at <project_root>/env/.

| Gauge sets all the environment variables from ``default``. 
| If ``default`` is not present, Gauge internally sets the environment variables, which is the same as those in ``default.properities``, except for ``gauge_reports_dir``. 

The value of ``gauge_reports_dir`` continues to be ``newReportsDir``.

Workflow : User runs ``gauge_reports_dir=newReportsDir gauge run --env=java_ci specs``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
``java_ci`` is the user-created environment at ``<project_root>/env``.

.. note::
   Alternately, user can explicitly set ``gauge_reports_dir=newReportsDir`` in the operating system's user shell and then run ``gauge run --env java_ci specs``

Gauge sets the environment variables as mentioned in the ``java_ci`` environment except for ``gauge_reports_dir``.
The value of ``gauge_reports_dir`` continues to be ``newReportsDir``.

Workflow : User runs ``gauge_reports_dir=newReportsDir gauge run --env “java_ci, experimental” specs``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
``java_ci, experimental`` are the user-created environments at ``<project_root>/env``.

.. note::
   Alternately, user can explicitly set ``gauge_reports_dir=newReportsDir`` in the operating system's user shell and then run ``gauge run --env "java_ci, experimental" specs``

* If either one of the user-created environment is not found, Gauge ends with a non-zero exit code.
* If all the user-created environments are present, Gauge sets the environment variables mentioned in the corresponding environments.
* Gauge then loads the environment variables, which are not yet set, from ``gauge.properties``.
* | If the ``default`` environment is not specified explicitly, then Gauge automatically runs ``default`` and loads the environment variables which are not yet set.
  | If ``default`` is not present, Gauge internally sets the environment variables, which is the same as ``default.properties``.

The value of ``gauge_reports_dir`` continues to be ``newReportsDir``.


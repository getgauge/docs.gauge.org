Configuration
=============

All the Gauge specific internal configurations are stored in
``gauge.properties`` file present in ``~/.gauge/config`` in Mac/Linux and in ``%APPDATA%\Gauge\config`` in windows (or ``GAUGE_ROOT``) repository. These properties are key value pairs.

Global
------

.. code-block:: python
    :linenos:
    :name: gauge_properties

    # set to a url, which acts as plugin repository for Gauge.
    gauge_repository_url = https://downloads.gauge.org/plugin

    # set to a url, which holds version information of Gauge.
    # This is used to determine if an update is available.
    gauge_update_url = https://downloads.gauge.org/gauge

    # set to an url, which acts as template repository for Gauge.
    gauge_templates_url = https://downloads.gauge.org/templates

    # sets the timeout in milliseconds for making a
    # connection to the language runner.
    runner_connection_timeout = 30000

    # sets the timeout in milliseconds for making a connection
    # to plugins (except language runner plugins).
    plugin_connection_timeout = 10000

    # sets the timeout in milliseconds for a plugin to stop
    # after a kill message has been sent.
    plugin_kill_timeout = 10000

    # sets the timeout in milliseconds for requests from the
    # language runner.
    # If the size of the project is too big, Gauge may timeout before the
    # runner returns the response message. This value can be configured
    # accordingly.
    runner_request_timeout = 10000

Local (Project level)
---------------------

Certain properties can be configured in
``env/default/default.properties``, which overrides the default
properties and are scoped only to the current project. These are key
value pairs.

.. code-block:: python
    :linenos:
    :name: default_properties

    # The path to the gauge reports directory. Should be either relative to
    # the project directory or an absolute path
    gauge_reports_dir = reports

    # Set as false if gauge reports should not be overwritten 
    # on each execution.
    # If set to true, a new time-stamped directory will be 
    # created on each execution.
    overwrite_reports = true

    # Set to false to disable screenshots on failure in reports.
    screenshot_on_failure = false

    # The path to the gauge logs directory. Should be either relative to the
    # project directory or an absolute path
    logs_directory = GaugeLogs

    # Specify the level at which cached objects should get removed while
    # execution.

    # Possible values for this property are 'suite', 'spec' or 'scenario'.
    # default: 'scenario'.
    gauge_clear_state_level = spec
    # The above clears the objects after the execution of each specification, so
    # that new objects are created for next execution.

    # Set to false to disable screenshots on failure in reports.
    screenshot_on_failure = true

    # Path to generate custom report theme. 
    # Should be either relative to the project directory or an absolute path.
    # Default theme is used if not set
    GAUGE_HTML_REPORT_THEME_PATH = custom_theme_path

    # sets the excluded dirs for gauge.
    # Gauge always looks for concepts in the whole project, folders starting
    # with dot(.) are excluded and a user can add folders to the excluded
    # folders list by passing a comma separeted paths of folder.Paths can be
    # relative to the path of directory or absolute.
    gauge_exclude_dirs = src/test,bin

.. _environments:

Environments
------------

Environment specific
`variables <https://en.wikipedia.org/wiki/Environment_variable>`__ can
be managed using property files. The `property
files <https://en.wikipedia.org/wiki/.properties>`__ have set of key
value pairs which are set as environment variables during execution.

Gauge allows you to create groups of property files, by defining and environment. 

A project can have multiple environments, and depending on the argument `--env` specified, 
the corresponding environment is loaded at runtime. `default` is the default environment, 
which is loaded when no `--env` is specified.

The env directory structure for a ``java`` project:

.. code-block:: text

    ├── env
      └── default
         ├── default.properties
         └── java.properties

Custom properties can be added to an existing property files or in a
newly created one.

Creating new environment
^^^^^^^^^^^^^^^^^^^^^^^^

To create an environment called ``ci``:

-  Create a directory called ``ci`` in ``env`` directory
-  Add property files (e.g. ``user.properties``)

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

Executing with environment
^^^^^^^^^^^^^^^^^^^^^^^^^^

The environment is specified using the ``env`` flag. For example if
``ci`` environment is used during execution

.. code-block:: console

    gauge run --env ci specs

Executing with multiple environments
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Multiple environments can be specified using the ``env`` flag. For example if
``ci``, ``experimental`` and ``default`` environments are used during execution

.. code-block:: console

    gauge run --env "ci, experimental, default" specs

Precedence to the env variable value is given to the order given by the user command.
Hence command `gauge run --env "ci, experimental, default" specs` is different than
`gauge run --env "ci, default, experimental" specs`

Precedence of Environments
^^^^^^^^^^^^^^^^^^^^^^^^^^

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
~~~~~~~~

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

.. _language_config:

Language Plugin
---------------

General
^^^^^^^

Configuration properties set here will be available to the test
execution as environment variables. Please see :ref:`Environments <environments>` 
for more details.

Properties are defined in the following format.

.. code-block:: text

   sample_key = sample_value
      
Java Specific configuration changes can be made in the
``env/default/java.properties`` file.

.. code-block:: python
    :linenos:
    :name: java.properties

    # Specify an alternate Java home if you want to use a custom version.
    gauge_java_home = PATH_TO_JAVA_HOME

    # Use this property if you need to override the build path for the
    # project.
    # Note: IntelliJ out directory will be usually auto-detected.
    gauge_custom_build_path = PATH_TO_CUSTOM_BUILDPATH

    # Specify the directory where additional libraries are kept.
    #   You can specify multiple directory names separated with a comma `,`
    #   `libs` directory in the gauge project is added by default.
    gauge_additional_libs = libs/*, PATH_TO_NEW_LIBRARY

    # Specify the JVM arguments passed to java while launching.
    gauge_jvm_args = <JVM_ARGS>

    # Comma separated list of dirs. path should be relative to project root.
    STEP_IMPL_DIR = tests

Javascript Specific configuration changes can be made in the
``env/default/js.properties`` file.

.. code-block:: python
    :linenos:
    :name: js.properties

    # Use this property if you need to override the timeout of step
    test_timeout = 10000

    # Change this to true to enable browser debugging support
    DEBUG = false

    # Comma separated list of dirs. path should be relative to project root.
    STEP_IMPL_DIR = tests

Python Specific configuration changes can be made in the
``env/default/python.properties`` file.

.. code-block:: python
    :linenos:
    :name: python

    # Override this if you want to use a different command
    GAUGE_PYTHON_COMMAND = python

    # Comma separated list of dirs. path should be relative to project root.
    STEP_IMPL_DIR = tests

.. note::
    CSharp and Ruby language runners do not hold any configuration beyond what is listed in :ref:`default properties <default_properties>`.


HTTP Proxy
----------

Gauge connects to internet for downloading plugins, templates, etc. If
you are behind a proxy, you will have to configure the proxy settings so
that Gauge connects to internet via the proxy server.

Without Authentication
^^^^^^^^^^^^^^^^^^^^^^

If authentication is not required, set the environment variable
``HTTP_PROXY`` to proxy server URL.

.. code-block:: text

    export HTTP_PROXY=http://10.0.2.2:5678

With Authentication
^^^^^^^^^^^^^^^^^^^

If authentication is required, set the environment variable
``HTTP_PROXY`` to proxy server URL along with the credentials.

.. code-block:: text

    export HTTP_PROXY=http://username:password@10.0.2.2:5678



Build tools
-----------

.. _maven:
.. _gradle:
.. _ant_task:

1. To use Gauge with `Maven <https://maven.apache.org/>`__, refer `Gauge Maven Plugin <https://github.com/getgauge/gauge-maven-plugin/blob/master/README.md>`__
2. To use Gauge with `Gradle <https://gradle.org/>`__, refer `Gauge Gradle Plugin <https://github.com/manupsunny/gauge-gradle-plugin/blob/master/Readme.md>`__
3. To invoke gauge specs using `Ant <https://ant.apache.org/manual/Tasks/ant.html>`__

    .. code-block:: xml
        :caption: Add the below configuration in your ``build.xml``

        <target name="specs">
            <exec executable="gauge">
                <arg value="specs"/>
            </exec>
        </target>

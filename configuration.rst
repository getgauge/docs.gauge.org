Configuration
=============

All the Gauge specific internal configurations are stored in
``gauge.properties`` file present in your Gauge install location
(``GAUGE_ROOT``). These properties are key value pairs.

Global
------

.. code-block:: python
    :linenos:
    :name: gauge_properties

    # set to a url, which acts as plugin repository for Gauge.
    gauge_repository_url = https://downloads.getgauge.io/plugin

    # set to a url, which holds version information of Gauge.
    # This is used to determine if an update is available.
    gauge_update_url = https://downloads.getgauge.io/gauge

    # set to an url, which acts as template repository for Gauge.
    gauge_templates_url = https://downloads.getgauge.io/templates

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

    # sets the excluded dirs for gauge.
    # Gauge always looks for concepts in the whole project, folders starting
    # with dot(.) are excluded and a user can add folders to the excluded
    # folders list by passing a comma separeted paths of folder.Paths can be
    # relative to the path of directory or absolute.
    gauge_exclude_dirs = "src/test,bin"

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

Executing with environment
^^^^^^^^^^^^^^^^^^^^^^^^^^

The environment is specified using the ``env`` flag. For example if
``ci`` environment is used during execution

.. code-block:: console

    gauge --env ci specs


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

Gauge loads the enviroment variables as below.

-  When Gauge starts, the environment passed by the user in the
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

-  User executes ``gauge specs``

   -  If ``<project_root>/env/default`` is **not** present, Gauge will
      set the default env variables with values mentioned in the table
      above.
   -  If ``<project_root>/env/default`` is present, Gauge will set the
      env variables mentioned in the ``default`` environment. It will
      then set any env variable (which is not already set) as per the
      table above.

-  User executes ``gauge --env=java_ci specs``

   -  If ``<project_root>/env/java_ci`` is **not** present, Gauge will
      end with a non-zero exit code.
   -  If ``<project_root>/env/java_ci`` is present, Gauge will set the
      env variables mentioned in the ``java_ci`` environment. It will
      then load other variables from the ``default`` environment which
      are not already set. Finally, it will the set the env vars with
      values mentioned in the table above (if they are not already set).

-  User executes ``gauge_reports_dir=newReportsDir gauge specs`` or user
   explicitly sets ``gauge_reports_dir=newReportsDir`` in shell and then
   runs ``gauge specs``

   -  Gauge will set all the default env variables from ``env/default``
      directory and then from the above table, except for the variable
      ``gauge_reports_dir``. This variable's value will still continue
      to be ``newReportsDir``.

-  User executes
   ``gauge_reports_dir=newReportsDir gauge --env=java_ci specs`` or user
   explicitly sets ``gauge_reports_dir=newReportsDir`` in shell and then
   runs ``gauge --env=java_ci specs``

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

Java
^^^^

Java Specific configuration changes can be made in the
``env/default/java.properties`` file.

.. code-block:: python
    :linenos:
    :name: java_properties

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

You can use Gauge with any of the build tools that you like.

Here are the sample build files for 

1. :ref:`Maven <maven>` 
2. :ref:`Gradle <gradle>` 
3. :ref:`Ant <ant_task>`

.. _maven:

Maven
^^^^^

Use the gauge-maven-plugin to execute specifications in your gauge java
project and manage dependencies using `maven <https://maven.apache.org/>`__.

Creating a new project from archetype
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

    mvn archetype:generate -DgroupId={projectGroupId} \
    -DartifactId={projectArtifactId} \
    -DarchetypeArtifactId=gauge-archetype-java \
    -DarchetypeGroupId=com.thoughtworks.gauge.maven

Set **{projectGroupId}** and **{projectArtifactId}** based on your
project. See `maven docs <https://maven.apache.org/pom.html#Maven_Coordinates>`__ to
understand what groupId and artifactId mean in a maven project.

Gauge maven project creation in IDE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

    See :ref:`maven_project_idea_using_plugin`

The generated **pom.xml** in the project will have the **gauge-java** dependency and 
a **gauge:execute** goal defined in the test phase.

.. code-block:: xml

    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>

        <groupId>com.foo</groupId>
        <artifactId>my-gauge-tests</artifactId>
        <version>1.0-SNAPSHOT</version>

        <dependencies>
            <dependency>
                <groupId>com.thoughtworks.gauge</groupId>
                <artifactId>gauge-java</artifactId>
                <version>0.2.2</version>
                <scope>test</scope>
            </dependency>
        </dependencies>

        <build>
            <testSourceDirectory>${project.basedir}/src/test/java</testSourceDirectory>
            <plugins>
                <plugin>
                    <groupId>com.thoughtworks.gauge.maven</groupId>
                    <artifactId>gauge-maven-plugin</artifactId>
                    <version>1.0.3</version>
                    <executions>
                        <execution>
                            <phase>test</phase>
                            <configuration>
                                <specsDir>specs</specsDir>
                            </configuration>
                            <goals>
                                <goal>execute</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    </project>

Executing specs using maven
~~~~~~~~~~~~~~~~~~~~~~~~~~~

If the execute goal is added for test phase (see above xml) then running
maven test phase will also execute gauge specs in the project

.. code-block:: console

    mvn test

To only run gauge specs,
""""""""""""""""""""""""

.. code-block:: console

    mvn gauge:execute -DspecsDir=specs

To only run gauge specs that correspond to a particular test profile in pom.xml,
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

.. code-block:: console

    mvn gauge:execute -P <profile-name>

Execute specs In parallel
"""""""""""""""""""""""""

.. code-block:: console

    mvn gauge:execute -DspecsDir=specs -DinParallel=true

Execute specs by tags
"""""""""""""""""""""

.. code-block:: console

    mvn gauge:execute -DspecsDir=specs -Dtags="!in-progress"

Specifying execution environment
""""""""""""""""""""""""""""""""

.. code-block:: console

    mvn gauge:execute -DspecsDir=specs -Denv="dev"

All additional Properties
"""""""""""""""""""""""""

The following plugin properties can be additionally set:

+----------------+--------+--------------+
| Property name  | Usage  | Description  |
+================+========+==============+
| specsDir       | -Dspec | Gauge specs  |
|                | sDir=s | directory    |
|                | pecs   | path.        |
|                |        | Required for |
|                |        | executing    |
|                |        | specs        |
+----------------+--------+--------------+
| tags           | -Dtags | Filter specs |
|                | ="tag1 | by specified |
|                | &      | tags         |
|                | tag2"  | expression   |
+----------------+--------+--------------+
| inParallel     | -DinPa | Execute      |
|                | rallel | specs in     |
|                | =true  | parallel     |
+----------------+--------+--------------+
| nodes          | -Dnode | Number of    |
|                | s=3    | parallel     |
|                |        | execution    |
|                |        | streams. Use |
|                |        | with         |
|                |        | ``parallel`` |
+----------------+--------+--------------+
| env            | -Denv= | gauge env to |
|                | qa     | run against  |
+----------------+--------+--------------+
| dir            | -Ddir= | Set working  |
|                | .      | directory    |
|                |        | for gauge.   |
|                |        | Default is   |
|                |        | project.base |
|                |        | dir.         |
+----------------+--------+--------------+
| flags          | -Dflag | Add          |
|                | s="--v | additional   |
|                | erbose | gauge flags  |
|                | "      | to execution |
+----------------+--------+--------------+

See gauge's :ref:`cli_flags` for list of all flags that be used with **-Dflags** option.

.. _gradle:

Gradle
^^^^^^

Use the gauge-gradle-plugin to execute specifications in your `Gauge <http://getgauge.io>`__ 
java project and manage dependencies using `Gradle <https://gradle.org//>`__.

Using plugin in project
~~~~~~~~~~~~~~~~~~~~~~~

Apply plugin ***gauge*** and add classpath to your ***build.gradle***.
Here is a sample gradle file,

.. code-block:: groovy

    apply plugin: 'java'
    apply plugin: 'gauge'
    apply plugin: 'application'

    group = "my-gauge-tests"
    version = "1.0.0"

    description = "My Gauge Tests"

    buildscript {
        repositories {
            mavenCentral()
        }
        dependencies {
            classpath 'com.thoughtworks.gauge.gradle:gauge-gradle-plugin:+'
        }
    }

    repositories {
        mavenCentral()
    }

    dependencies {
    }

    // configure gauge task here (optional)
    gauge {
        specsDir = 'specs'
        inParallel = true
        nodes = 2
        env = 'dev'
        tags = 'tag1'
        additionalFlags = '--verbose'
    }

The plugin is also available at `Gradle Plugin Portal <https://plugins.gradle.org/>`__. Find more details
`here <https://plugins.gradle.org/plugin/com.thoughtworks.gauge>`__.

Executing specs
~~~~~~~~~~~~~~~

To execute gauge specs,

.. code-block:: console

    gradle gauge

Execute specs in parallel
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

    gradle gauge -PinParallel=true -PspecsDir=specs

Execute specs by tags
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

    gradle gauge -Ptags="!in-progress" -PspecsDir=specs

Specifying execution environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

    gradle gauge -Penv="dev" -PspecsDir=specs

Note : Pass specsDir parameter as the last one.

All additional Properties
~~~~~~~~~~~~~~~~~~~~~~~~~

The following plugin properties can be additionally set:

+----------------+--------+--------------+
| Property name  | Usage  | Description  |
+================+========+==============+
| specsDir       | -Pspec | Gauge specs  |
|                | sDir=s | directory    |
|                | pecs   | path.        |
|                |        | Required for |
|                |        | executing    |
|                |        | specs        |
+----------------+--------+--------------+
| tags           | -Ptags | Filter specs |
|                | ="tag1 | by specified |
|                | &      | tags         |
|                | tag2"  | expression   |
+----------------+--------+--------------+
| inParallel     | -PinPa | Execute      |
|                | rallel | specs in     |
|                | =true  | parallel     |
+----------------+--------+--------------+
| nodes          | -Pnode | Number of    |
|                | s=3    | parallel     |
|                |        | execution    |
|                |        | streams. Use |
|                |        | with         |
|                |        | ``parallel`` |
+----------------+--------+--------------+
| env            | -Penv= | gauge env to |
|                | qa     | run against  |
+----------------+--------+--------------+
| additionalFlag | -Paddi | Add          |
| s              | tional | additional   |
|                | Flags= | gauge flags  |
|                | "--ver | to execution |
|                | bose"  |              |
+----------------+--------+--------------+

See gauge's :ref:`cli_flags` for list of all flags that be used with **-PadditionalFlags** option.

Adding/configuring custom Gauge tasks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is possible to define new custom Gauge tasks by extending
``GaugePlugin`` class. It can be used to create/configure tasks specific
for different environments. For example,

.. code-block:: groovy

    task gaugeDev(type: GaugeTask) {
        doFirst {
            gauge {
                specsDir = 'specs'
                inParallel = true
                nodes = 2
                env = 'dev'
                additionalFlags = '--verbose'
            }
        }
    }

    task gaugeTest(type: GaugeTask) {
        doFirst {
            gauge {
                specsDir = 'specs'
                inParallel = true
                nodes = 4
                env = 'test'
                additionalFlags = '--verbose'
            }
        }
    }

.. _ant_task:

Ant Task
^^^^^^^^

Gauge specs can be invoked via Ant by adding the below configuration in your ``build.xml``

.. code-block:: xml
    :caption: build.xml

    <target name="specs">
        <exec executable="gauge">
            <arg value="specs"/>
        </exec>
    </target>

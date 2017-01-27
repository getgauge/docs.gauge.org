Configuration
=============

All the Gauge specific internal configurations are stored in
``gauge.properties`` file present in your Gauge install location
(``GAUGE_ROOT``). These properties are key value pairs.

Global
------

**gauge_repository_url** : set to a url, which acts as plugin repository for Gauge.

::

    gauge_repository_url = https://downloads.getgauge.io/plugin

**gauge_update_url** : set to a url, which holds version information of Gauge.
This is used to determine if an update is available.

::

    gauge_update_url = https://downloads.getgauge.io/gauge

**gauge_templates_url** :  set to an url, which acts as template repository for Gauge.

::

    gauge_templates_url = https://downloads.getgauge.io/templates

**runner_connection_timeout** : sets the timeout in milliseconds for making a 
connection to the language runner.

::

    runner_connection_timeout = 30000

**plugin_connection_timeout** : sets the timeout in milliseconds for making a connection
to plugins (except language runner plugins).

::

    plugin_connection_timeout = 10000

**plugin_kill_timeout** : sets the timeout in milliseconds for a plugin to stop
after a kill message has been sent.

::

    plugin_kill_timeout = 10000

**runner_request_timeout** : sets the timeout in milliseconds for requests from the
language runner.

If the size of the project is too big, Gauge may timeout before the
runner returns the response message. This value can be configured
accordingly.

::

    runner_request_timeout = 10000

**gauge_exclude_dirs** : sets the excluded dirs for gauge.

Gauge always looks for concepts in the whole project, folders starting
with dot(.) are excluded and a user can add folders to the excluded
folders list by passing a comma separeted paths of folder.Paths can be
relative to the path of directory or absolute.

::

    gauge_exclude_dirs = "src/test,bin"

Local (Project level)
---------------------

Certain properties can be configured in
``env/default/default.properties``, which overrides the default
properties and are scoped only to the current project. These are key
value pairs.

**gauge_reports_dir**

The path to the gauge reports directory. Should be either relative to
the project directory or an absolute path

::

    gauge_reports_dir = reports

**overwrite_reports**

-  Set as false if gauge reports should not be overwritten on each
   execution.
-  If set to true, a new time-stamped directory will be created on each
   execution.

   ::

       overwrite_reports = true

**screenshot_on_failure**

-  Set to false to disable screenshots on failure in reports.

   ::

       screenshot_on_failure = false

**logs_directory**

The path to the gauge logs directory. Should be either relative to the
project directory or an absolute path

::

    logs_directory = GaugeLogs

**gauge_clear_state_level**

Specify the level at which cached objects should get removed while
execution.

Possible values for this property are ``suite``,\ ``spec`` and
``scenario``. By default, Gauge clears state at scenario level.

Example:

::

    gauge_clear_state_level = spec

This clears the objects after the execution of each specification, so
that new objects are created for next execution.

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

HTTP Proxy
----------

Gauge connects to internet for downloading plugins, templates, etc. If
you are behind a proxy, you will have to configure the proxy settings so
that Gauge connects to internet via the proxy server.

Without Authentication
^^^^^^^^^^^^^^^^^^^^^^

If authentication is not required, set the environment variable
``HTTP_PROXY`` to proxy server URL.

::

    export HTTP_PROXY=http://10.0.2.2:5678

With Authentication
^^^^^^^^^^^^^^^^^^^

If authentication is required, set the environment variable
``HTTP_PROXY`` to proxy server URL along with the credentials.

::

    export HTTP_PROXY=http://username:password@10.0.2.2:5678



Build tools
-----------

You can use Gauge with any of the build tools that you like.

Here are the sample build files for 1. `Maven <#maven>`__ 2.
`Gradle <#gradle>`__ 3. `Ant <#ant-task>`__

For more details, please take a look at the `Dependency
Management <dependency_management_plugins/README.md>`__ section.

Maven
^^^^^

Use the gauge-maven-plugin to execute specifications in your gauge java
project and manage dependencies using
`maven <https://maven.apache.org/>`__.

Creating a new project from archetype
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: bash

    mvn archetype:generate -DgroupId={projectGroupId}
    -DartifactId={projectArtifactId}
    -DarchetypeArtifactId=gauge-archetype-java
    -DarchetypeGroupId=com.thoughtworks.gauge.maven

Set **{projectGroupId}** and **{projectArtifactId}** based on your
project. See `maven
docs <https://maven.apache.org/pom.html#Maven_Coordinates>`__ to
understand what groupId and artifactId mean in a maven project.

Gauge maven project creation in IDE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  `Intellij
   idea <../../ide_support/features.html#creating-a-maven-project-using-gauge-maven-plugin>`__

The generated **pom.xml** in the project will have the\*\*
gauge-java\*\* dependency and a **gauge:execute** goal defined in the
test phase.

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
~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

    mvn gauge:execute -DspecsDir=specs

To only run gauge specs that correspond to a particular test profile in pom.xml,
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

    mvn gauge:execute -P <profile-name>

Execute specs In parallel
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

    mvn gauge:execute -DspecsDir=specs -DinParallel=true

Execute specs by tags
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

    mvn gauge:execute -DspecsDir=specs -Dtags="!in-progress"

Specifying execution environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

    mvn gauge:execute -DspecsDir=specs -Denv="dev"

All additional Properties
~~~~~~~~~~~~~~~~~~~~~~~~~

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

See gauge's `command line interface <../../cli/README.md>`__ for list of
all flags that be used with **-Dflags** option.

Gradle
^^^^^^

Use the gauge-gradle-plugin to execute specifications in your
`Gauge <http://getgauge.io>`__ java project and manage dependencies
using `Gradle <http://gradle.org//>`__.

Using plugin in project
^^^^^^^^^^^^^^^^^^^^^^^

Apply plugin ***gauge*** and add classpath to your ***build.gradle***.
Here is a sample gradle file,

.. code:: groovy

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

The plugin is also available at `Gradle Plugin
Portal <https://plugins.gradle.org/>`__. Find more details
`here <https://plugins.gradle.org/plugin/com.thoughtworks.gauge>`__..

Executing specs using gradle
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To execute gauge specs,

.. code:: groovy

    gradle gauge

Execute specs in parallel
^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: groovy

    gradle gauge -PinParallel=true -PspecsDir=specs

Execute specs by tags
^^^^^^^^^^^^^^^^^^^^^

.. code:: groovy

    gradle gauge -Ptags="!in-progress" -PspecsDir=specs

Specifying execution environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: groovy

    gradle gauge -Penv="dev" -PspecsDir=specs

Note : Pass specsDir parameter as the last one.

All additional Properties
^^^^^^^^^^^^^^^^^^^^^^^^^

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

See gauge's `command line interface <../../cli/README.md>`__ for list of
all flags that be used with **-PadditionalFlags** option.

Adding/configuring custom Gauge tasks
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to define new custom Gauge tasks by extending
``GaugePlugin`` class. It can be used to create/configure tasks specific
for different environments. For example,

.. code:: groovy

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

Ant Task
^^^^^^^^

.. code:: xml

    <target name="specs">
        <exec executable="gauge">
            <arg value="specs"/>
        </exec>
    </target>

Integration with CI
-------------------

Gauge can be easily integrated with any `Continuous
Integration <http://martinfowler.com/articles/continuousIntegration.html>`__
environment.

Since Gauge supports first class command line, invoking it from any
CI/CD tool is very straightforward.

Steps to Integrate Gauge with CI tool:

-  Install the Gauge and language plugin on CI machine
-  Add gauge commands as tasks in CI to run tests.

   For example, to run the specs use ``gauge specs``
-  If you want to run specific instance of gauge on CI, set
   ``GAUGE_ROOT`` as environment variable to the path of specific
   instance.
-  Gauge returns html-reports, console output as result of execution
   which can be configured to view on CI.

Go.cd
^^^^^

`Go.cd <http://www.go.cd/>`__, is a continuous integration and deployment
tool.

Integrating Gauge with Go.cd
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  `Setup a new pipeline on
   Go <http://www.go.cd/documentation/user/current/configuration/quick_pipeline_setup.html>`__

   |pipeline|
-  `Download <http://getgauge.io/get-started/index.html>`__ and Install
   Gauge on the Go Agents
-  Install the required gauge `language
   plugin <../../../installations/install_language_runners.md>`__ on the
   Go agents.

Tips on Installation
~~~~~~~~~~~~~~~~~~~~

-  Gauge is installed system wide by default and not user wide. However,
   plugins are installed per user. So plugins should be installed via
   user account with which the Go agent executes. Refer default install
   location of Gauge and its plugins
   `here <http://getgauge.io/documentation/user/current/troubleshooting/installation.html>`__.

-  Alternately, you can set `custom location for
   plugins <http://getgauge.io/documentation/user/current/troubleshooting/installation.html#custom-plugin-install-location>`__
   so that its accessible to Go agent running as a different user.

Create execution task
~~~~~~~~~~~~~~~~~~~~~

-  Create a new task which will run ``gauge specs``.
-  If you want to run only a subset of specs, you can use
   `tags <../execution_types/tagged_execution.md>`__. Eg.
   ``gauge --tags "tag1 & tag2" specs``
-  Adding a flag ``-p`` runs them in
   `parallel <../execution_types/parallel_execution.md>`__.
-  Run against specific `environments <../managing_environments.md>`__
   using the ``--env`` flag
-  See the `Gauge CLI <../../cli/README.md>`__ for list of all flags
   that can be used.

   .. figure:: images/Configuring_Gauge.png
      :alt: adding new task

      configuring

Reports
~~~~~~~

-  Gauge generates **html-reports** after execution which can be
   configured in Go by adding a new artifact in Artifacts tab.

   .. figure:: images/Configuring_Artifacts.png
      :alt: artifact

      artifact

-  Artifacts can be viewed in the artifacts tab.

   .. figure:: images/Arifacts.png
      :alt: artifact

      artifact

-  **Console output** can be seen while execution of job and reports can
   be seen after execution.

   .. figure:: images/Console_Output.png
      :alt: console

      console

-  You can also add a `custom
   tab <http://www.go.cd/documentation/user/current/configuration/managing_artifacts_and_reports.html#using-tabs>`__
   to view your html reports generated.

Snap
^^^^

`Snap <https://snap-ci.com/>`__, is a continuous integration and
deployment(in the cloud) tool.

Integrating Gauge with Snap
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Login to Snap and choose ``Add repository`` option to setup a new
   pipeline by selecting the repository which is a Gauge project.

Install Gauge
~~~~~~~~~~~~~

-  Gauge can be installed either by using the portable installer or by
   using any package manager. If you want to use Gauge installer, you
   can use a script like
   `this <https://raw.githubusercontent.com/getgauge/gauge-example-java/master/install_latest_gauge.sh>`__.

If your agent is Linux(RHEL, CentOS), you can install gauge via ``yum``
by adding following commands:

::

    $ echo -e "[gauge-stable]\nname=gauge-stable\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-stable\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-stable.repo
    $ sudo yum install gauge
    $ gauge_setup

More details on installation on all operating systems can be found
`here <http://getgauge.io/documentation/user/current/installations/operating_system/>`__.

-  Install Gauge language plugin as:

   ::

       gauge --install <language>

Create execution task
~~~~~~~~~~~~~~~~~~~~~

-  Add a task which will run ``gauge specs``.
-  If you want to run only a subset of specs, you can use
   `tags <../execution_types/tagged_execution.md>`__. Eg.
   ``gauge --tags "tag1 & tag2" specs``
-  Adding a flag ``-p`` runs them in
   `parallel <../execution_types/parallel_execution.md>`__.
-  Run against specific `environments <../managing_environments.md>`__
   using the ``--env`` flag
-  See the `Gauge CLI <../../cli/README.md>`__ for list of all flags
   that can be used.

   .. figure:: images/Snap_Commands.png
      :alt: adding execution task

      Adding tasks for execution stage

Reports
~~~~~~~

-  Gauge generates **html-report** after execution whose location can be
   set by environment variable ``gauge_reports_dir``. This defaults to
   ``reports`` directory in the Gauge project.

-  You can add Gauge execution reports as ``artifacts`` in Snap so that
   it can be downloaded after the stage run.

   .. figure:: images/Snap_Arifacts.png
      :alt: artifact

      artifact

-  **Console output** can be seen while execution of stage.

   .. figure:: images/Snap_Console_Output.png
      :alt: console

      console

Travis CI
^^^^^^^^^

`Travis CI <https://travis-ci.org/>`__ is a hosted, distributed
continuous integration service used to build and test software projects
hosted at GitHub.

Integrating Gauge with Travis CI
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Login to Travis CI and goto ``accounts`` menu.
-  Choose your project repository to be built and flick that switch on.
   |accounts|

Creating tasks
~~~~~~~~~~~~~~

-  Create a ``.travis.yml`` file in your peoject root.
-  Add these lines in ``.travis.yml`` according to the platform on which
   you want to build. 
   
.. code-block:: yaml
  :caption: OS X   

    language:
        -  language_name

    os: 
        - osx

    install: 
        - brew install gauge 
        - gauge --install <language>
        - gauge --install html-report

    script: 'gauge specs'

    sudo: false

.. code-block:: yaml
  :caption: Linux   

    language: 
        - language_name
    os: 
        - linux
    install: 
        - sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net
            --recv-keys 023EDB0B - echo deb https://dl.bintray.com/gauge/gauge-deb
            stable main \| sudo tee -a /etc/apt/sources.list 
        - sudo apt-get update 
        - sudo apt-get install gauge 
        - gauge_setup 
        - gauge --install <language>
        - gauge --install html-report

    script: 'gauge specs'

    sudo: true

* If you want to run only a subset of specs, you can use tags. 
  Example: add ``script: gauge --tags "tag1 & tag2" specs`` in your ``.travis.yml``. 

* Adding a flag ``-p`` runs them in `parallel <../execution_types/parallel_execution.md>`__. 
  Example: ``script: gauge -p specs`` in your ``.travis.yml``. 

* Run against specific `environments <../managing_environments.md>`__ using the ``--env`` flag. 

* See the `Gauge CLI <../../cli/README.md>`__ for list of all flags that can be used.


Reports
~~~~~~~

-  Goto your project on travis and see the console output.

   .. figure:: images/travis_console.png
      :alt: console output

      console

-  Gauge generates ``html-report`` after execution whose location can be
   set by environment variable ``gauge_reports_dir``. This defaults to
   ``reports`` directory in the Gauge project.

-  You can upload Gauge execution reports to your choice of hosted web
   server. Read
   `more <https://docs.travis-ci.com/user/uploading-artifacts/>`__ for
   uploading artifacts. # TeamCity
   `TeamCity <https://www.jetbrains.com/teamcity/>`__ is a powerful and
   user-friendly Continuous Integration and Deployment server that works
   out of the box.

TeamCity
^^^^^^^^

-  `Download <http://getgauge.io/get-started/index.html>`__ and Install
   Gauge on the agents. Read more on installing Gauge
   `here <http://getgauge.io/documentation/user/current/installations/operating_system/>`__.
-  Install the required Gauge `language
   plugins <../../../installations/install_language_runners.md>`__ on
   the agents as: ``gauge --install <language>``

Tips on Installation
~~~~~~~~~~~~~~~~~~~~

-  Gauge is installed system wide by default and not user wide. However,
   plugins are installed per user. So plugins should be installed via
   user account with which the TeamCity agent executes. Refer default
   install location of Gauge and its plugins
   `here <http://getgauge.io/documentation/user/current/troubleshooting/installation.html>`__.

-  Alternately, you can set `custom location for
   plugins <http://getgauge.io/documentation/user/current/troubleshooting/installation.html#custom-plugin-install-location>`__
   so that its accessible to TeamCity agent running as a different user.

Create execution task
~~~~~~~~~~~~~~~~~~~~~

-  Create a new project in TeamCity pointing to Gauge project repository
   URL.
-  Add a build step which will run ``gauge specs``. |New build step|

-  If you want to run only a subset of specs, you can use
   `tags <../execution_types/tagged_execution.md>`__. Eg.
   ``gauge --tags "tag1 & tag2" specs``
-  Adding a flag ``-p`` runs them in
   `parallel <../execution_types/parallel_execution.md>`__.
-  Run against specific `environments <../managing_environments.md>`__
   using the ``--env`` flag
-  See the `Gauge CLI <../../cli/README.md>`__ for list of all flags
   that can be used.

Reports
~~~~~~~

-  Gauge generates **html-reports** after execution which can be
   configured in TeamCity by adding a new artifact in Artifacts tab.
   These artifacts can be viewed/downloaded from the artifacts tab.

   .. figure:: images/TeamCity_Artifact.png
      :alt: artifact

      artifact

-  You can also add a `custom
   tab <https://confluence.jetbrains.com/display/TCD9/Including+Third-Party+Reports+in+the+Build+Results>`__
   to view your html reports generated.

   To add custom tab, go to Project Settings -> Report tabs -> Add a new
   build report tab.

   .. figure:: images/TeamCity_ReportTab.png
      :alt: report tab

      reportsTab

-  **Console output** can be seen while execution of steps and reports
   can be seen after execution.

.. |pipeline| image:: images/Gauge_Pipeline.png
.. |accounts| image:: images/travis_account.png
.. |New build step| image:: images/TeamCity_buildStep.png


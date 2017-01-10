Language Features
=================

Step implementations
--------------------

Every `step <../gauge_terminologies/steps.md>`__ needs to have a
language specific implementation that gets executed on the spec
execution.

Simple step
^^^^^^^^^^^

**Step name**

::

    * Say "hello" to "gauge"

**Implementation**

{% codetabs name="Java", type="java" -%} // This Method can be written
in any java class as long as it is in classpath.

public class StepImplementation {

::

    @Step("Say <greeting> to <product name>")
    public void helloWorld(String greeting, String name) {
        // Step implementation
    }

} {%- language name="C#", type="csharp" -%} // The Method can be written
in **any C# class** as long as it is part of the project. public class
StepImplementation {

::

    [Step("Say <greeting> to <product name>")]
    public void HelloWorld(string greeting, string name) {
        // Step implementation
    }

} {%- language name="Ruby", type="ruby" -%} step 'Say to ' do
\|greeting, name\| # Code for the step end {%- endcodetabs %}

Step with table
^^^^^^^^^^^^^^^

**Step:**

::

    * Create following "hobbit" characters
    |id |name   |
    |---|-------|
    |123|frodo  |
    |456|bilbo  |
    |789|samwise|

**Implementation:**

{% codetabs name="Java", type="java" -%} // Table is a custom data
structure defined by gauge. public class Users {

::

    @Step("Create following <race> characters <table>")
    public void createCharacters(String type, Table table) {
        // Step implementation
    }

} {%- language name="C#", type="csharp" -%} // Here Table is a custom
data structure defined by gauge. // This is available by adding a
reference to the Gauge.CSharp.Lib. // Refer :
http://nuget.org/packages/Gauge.CSharp.Lib/ public class Users {

::

    [Step("Create following <role> users <table>")]
    public void HelloWorld(string role, Table table) {
        // Step implementation
    }

} {%- language name="Ruby", type="ruby" -%} # Here table is a custom
data structure defined by gauge-ruby. step 'Create following characters

.. raw:: html

   <table>

' do \|role, table\| puts table.rows puts table.columns end {%-
endcodetabs %}

--------------

Learn More \* `Configuration <configuration.md>`__ \* `Execution
Hooks <execution_hooks.md>`__ \* `Data Store <data_store.md>`__

Execution hooks
---------------

Test execution hooks can be used to run arbitrary test code as different
levels during the test suite execution.

Before Suite Hook
^^^^^^^^^^^^^^^^^

Executes before the entire suite execution begins i.e, before the
execution of all specifications in the project.

After Suite Hook
^^^^^^^^^^^^^^^^

Executes after the entire suite execution finishes i.e, after the
execution of all specifications in the project.

Before Specification hook
^^^^^^^^^^^^^^^^^^^^^^^^^

Executes before every spec executes.

After Specification hook
^^^^^^^^^^^^^^^^^^^^^^^^

Executes after every spec executes.

Before Scenario hook
^^^^^^^^^^^^^^^^^^^^

Executes before every scenario executes.

After Specification hook
^^^^^^^^^^^^^^^^^^^^^^^^

Executes after every scenario executes.

Before Step hook
^^^^^^^^^^^^^^^^

Executes before every step executes.

After Step hook
^^^^^^^^^^^^^^^

Executes after every scenario executes.

Example
^^^^^^^

{% codetabs name="Java", type="java" -%} public class ExecutionHooks {
@BeforeSuite public void BeforeSuite() { // Code for before suite }

::

    @AfterSuite
    public void AfterSuite() {
      // Code for after suite
    }

    @BeforeSpec
    public void BeforeSpec() {
      // Code for before spec
    }

    @AfterSpec
    public void AfterSpec() {
      // Code for after spec
    }

    @BeforeScenario
    public void BeforeScenario() {
      // Code for before scenario
    }

    @AfterScenario
    public void AfterScenario() {
      // Code for after scenario
    }

    @BeforeStep
    public void BeforeStep() {
      // Code for before step
    }

    @AfterStep
    public void AfterStep() {
      // Code for after step
    }

} {%- language name="C#", type="csharp" -%} public class ExecutionHooks
{ [BeforeSuite] public void BeforeSuite() { // Code for before suite }

::

    [AfterSuite]
    public void AfterSuite() {
      // Code for after suite
    }

    [BeforeSpec]
    public void BeforeSpec() {
      // Code for before spec
    }

    [AfterSpec]
    public void AfterSpec() {
      // Code for after spec
    }

    [BeforeScenario]
    public void BeforeScenario() {
      // Code for before scenario
    }

    [AfterScenario]
    public void AfterScenario() {
      // Code for after scenario
    }

    [BeforeStep]
    public void BeforeStep() {
      // Code for before step
    }

    [AfterStep]
    public void AfterStep() {
      // Code for after step
    }

} {%- language name="Ruby", type="ruby" -%} before\_suite do // Code for
before suite end

after\_suite do // Code for after suite end

before\_spec do // Code for before spec end

after\_spec do // Code for after spec end

before\_scenario do // Code for before scenario end

after\_scenario do // Code for after scenario end

before\_step do // Code for before step end

after\_tep do // Code for after step end {%- endcodetabs %}

    By default, Gauge clears the state after each scenario so that new
    objects are created for next scenario execution. You can
    `configure <../advanced_readings/managing_environments.html#gauge_clear_state_level>`__
    to change the level at which Gauge clears cache.

Data Store
----------

Data (Objects) can be shared in steps defined in different classes at
runtime using DataStores exposed by Gauge.

There are 3 different types of DataStores based on the lifecycle of when
it gets cleared.

1. ScenarioStore
^^^^^^^^^^^^^^^^

This data store keeps values added to it in the lifecycle of the
scenario execution. Values are cleared after every scenario executes

{% codetabs name="Java", type="java" -%} // Import Package import
com.thoughtworks.gauge.datastore.\*;

// Adding value DataStore scenarioStore =
DataStoreFactory.getScenarioDataStore(); scenarioStore.put("element-id",
"455678");

// Fetching Value DataStore scenarioStore =
DataStoreFactory.getScenarioDataStore(); String elementId = (String)
scenarioStore.get("element-id"); {%- language name="C#", type="csharp"
-%} using Gauge.CSharp.Lib;

// Adding value var scenarioStore = DataStoreFactory.ScenarioDataStore;
scenarioStore.Add("element-id", "455678");

// Fetching Value var scenarioStore =
DataStoreFactory.ScenarioDataStore; var elementId = (string)
scenarioStore.Get("element-id");

// avoid type cast by using generic Get var anotherElementId =
scenarioStore.Get("element-id"); {%- language name="Ruby", type="ruby"
-%} // Adding value scenario\_store =
DataStoreFactory.scenario\_datastore; scenario\_store.put("element-id",
"455678");

// Fetching Value scenario\_store =
DataStoreFactory.scenario\_datastore; element\_id =
scenario\_store.get("element-id"); {%- endcodetabs %}

2. SpecStore
^^^^^^^^^^^^

This data store keeps values added to it during the lifecycle of the
specification execution. Values are cleared after every specification
executes

{% codetabs name="Java", type="java" -%} // Import Package import
com.thoughtworks.gauge.datastore.\*;

// Adding value DataStore specStore =
DataStoreFactory.getSpecDataStore(); specStore.put("key", "455678");

// Fetching value DataStore specStore =
DataStoreFactory.getSpecDataStore(); String elementId = (String)
specStore.get("key"); {%- language name="C#", type="csharp" -%} using
Gauge.CSharp.Lib;

// Adding value var specStore = DataStoreFactory.SpecDataStore;
specStore.Add("element-id", "455678");

// Fetching Value var specStore = DataStoreFactory.SpecDataStore; var
elementId = (string) specStore.Get("element-id");

// avoid type cast by using generic Get var anotherElementId =
specStore.Get("element-id"); {%- language name="Ruby", type="ruby" -%}
// Adding value spec\_store = DataStoreFactory.spec\_datastore;
spec\_store.put("element-id", "455678");

// Fetching Value spec\_store = DataStoreFactory.spec\_datastore;
element\_id = spec\_store.get("element-id"); {%- endcodetabs %}

3. SuiteStore
^^^^^^^^^^^^^

This data store keeps values added to it during the lifecycle of entire
suite execution. Values are cleared after entire suite execution.

    Warning: SuiteStore is not advised to be used when executing specs
    in parallel. The values are not retained between parallel streams of
    execution.

{% codetabs name="Java", type="java" -%} // Import Package import
com.thoughtworks.gauge.datastore.\*;

// Adding value DataStore suiteStore =
DataStoreFactory.getSuiteDataStore(); suiteStore.put("element-id",
"455678");

// Fetching value DataStore suiteStore =
DataStoreFactory.getSuiteDataStore(); String elementId = (String)
suiteStore.get("element-id"); {%- language name="C#", type="csharp" -%}
using Gauge.CSharp.Lib;

// Adding value var suiteStore = DataStoreFactory.SuiteDataStore;
suiteStore.Add("element-id", "455678");

// Fetching Value var suiteStore = DataStoreFactory.SuiteDataStore; var
elementId = (string) suiteStore.Get("element-id");

// avoid type cast by using generic Get var anotherElementId =
suiteStore.Get("element-id"); {%- language name="Ruby", type="ruby" -%}
// Adding value suite\_store = DataStoreFactory.suite\_datastore;
suite\_store.put("element-id", "455678");

// Fetching Value suite\_store = DataStoreFactory.suite\_datastore;
element\_id = suite\_store.get("element-id"); {%- endcodetabs %}

Custom messages in reports
--------------------------

Custom messages/data can be added to execution reports using the below
API from the step implementations or hooks.

These messages will appear under steps in the execution reports.

{% codetabs name="Java", type="java" -%} Gauge.writeMessage("Custom
message for report");

String id = "4567"; Gauge.writeMessage("User id is %s", id);

{%- language name="C#", type="csharp" -%}
GaugeMessages.WriteMessage("Custom message for report");

var id = "4567"; GaugeMessages.WriteMessage("User id is {0}", id); {%-
language name="Ruby", type="ruby" -%} Gauge.write\_message("Custom
message for report")

id = "4567" Gauge.write\_message("User id is" + id) {%- endcodetabs %}

Configuration
-------------

-  `General <#general>`__
-  `Java <#java>`__
-  `CSharp <#csharp>`__
-  `Ruby <#ruby>`__

General
^^^^^^^

Configuration properties set here will be available to the test
execution as environment variables. Please see
`Environments <#advanced_readings/managing_environments.md>`__ for more
details.

Properties are defined in the following format.

::

    sample_key = sample_value

Java
^^^^

Java Specific configuration changes can be made in the
***env/default/java.properties*** file.

gauge\_java\_home

Specify an alternate Java home if you want to use a custom version.

Example:

::

    gauge_java_home = PATH_TO_JAVA_HOME

gauge\_custom \_build\_path

::

    Note: IntelliJ out directory will be usually auto-detected.

Use this property if you need to override the build path for the
project.

Example:

::

    gauge_custom_build_path = PATH_TO_CUSTOM_BUILDPATH

gauge\_additional\_libs

-  Specify the directory where additional libraries are kept.
-  You can specify multiple directory names separated with a comma
   **','**
-  ***libs*** directory in the gauge project is added by default.

Example:

::

    gauge_additional_libs = libs/*, PATH_TO_NEW_LIBRARY

gauge\_jvm\_args

Specify the JVM arguments passed to java while launching.

gauge\_clear\_state\_level

Specify the level at which cached objects should get removed while
execution.

Possible values for this property are ``suite``,\ ``spec`` and
``scenario``. By default, Gauge clears state at scenario level.

Example:

::

    gauge_clear_state_level = spec

This clears the objects after the execution of each specification, so
that new objects are created for next execution.

CSharp
^^^^^^

CSharp Specific configuration changes can be made in the
***env/default/default.properties*** file.

gauge\_reports\_dir

-  The path to the gauge reports directory.
-  Should be either relative to the project directory or an absolute
   path.

Example:

::

    gauge_reports_dir = reports

overwrite\_reports

-  Set as false if gauge reports should not be overwritten on each
   execution.
-  A new time-stamped directory will be created on each execution.

Example:

::

    overwrite_reports = true

screenshot\_on\_failure

Set to false to disable screenshots on failure in reports.

Example:

::

    screenshot_on_failure = true

Ruby
^^^^

The default Ruby properties are similar to that of the CSharp
properties. # Enum as Step parameter

The constant values of an Enum data type can be used as parameters to a
Step. However, the type of parameter should match the Enum name itself
in step implementation.

Step:

::

    * Navigate towards "SOUTH"

Implementation:

{% codetabs name="Java", type="java" -%} public enum Direction { NORTH,
SOUTH, EAST, WEST; }

@Step("Navigate towards ") public void navigate(Direction direction) {
// code here } {%- endcodetabs %}

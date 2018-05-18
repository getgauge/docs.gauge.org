:page_header: Getting Started

.. _installing_gauge_recomd_options:

Getting Started
===============

Installation
------------

Gauge Core
^^^^^^^^^^

Windows
+++++++

**Using Chocolatey**

Requires `chocolatey <https://chocolatey.org//>`__, and Internet Connection.

.. code-block:: console

    choco install gauge # New Installation
    choco upgrade gauge # Upgrade current installation



**Offline Installation**

Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.



**Nightly installation**

Nightly releases are latest development snapshots of Gauge. They have
the latest features being developed, but are unstable.

Download the Gauge archive from `here <https://bintray.com/gauge/Gauge/Nightly/>`__. Extract it to a location and add it to system path.

macOS
+++++

**Using HomeBrew**

Requires `homebrew <https://brew.sh/>`__ and Internet Connection

.. code-block:: console

    brew update
    brew install gauge


**Offline Installation**

Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.


**Nightly installation**

Nightly releases are latest development snapshots of Gauge. They have
the latest features being developed, but are unstable.

Download the Gauge archive from `here <https://bintray.com/gauge/Gauge/Nightly/>`__. Extract it to a location and add it to system path.

Debian/APT
++++++++++

Add Gauge's GPG key, URL to repository list and install Gauge.

.. code-block:: console

    sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B
    echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee -a /etc/apt/sources.list
    sudo apt-get update
    sudo apt-get install gauge


**Offline Installation**

Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

**Nightly Installation**

Nightly releases are latest development snapshots of Gauge. They have
the latest features being developed, but are unstable.

Add Gauge's GPG key:

.. code-block:: console

    sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B

Add to repository list:

.. code-block:: console

    echo deb https://dl.bintray.com/gauge/gauge-deb nightly main | sudo tee -a /etc/apt/sources.list

Install

.. code-block:: console

    sudo apt-get update
    sudo apt-get install gauge

YUM/DNF
+++++++

Create file ``/etc/yum.repos.d/gauge-stable.repo`` with the following content:

.. code-block:: text

    [gauge-stable]
    name=gauge-stable
    baseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-stable
    gpgcheck=0
    enabled=1

Use this command to do it in one step:

.. code-block:: console

    echo -e "[gauge-stable]\nname=gauge-stable\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-stable\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-stable.repo

Install

.. code-block:: console

  sudo yum install gauge

or

.. code-block:: console

  sudo dnf install gauge

**Offline Installation**

Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

**Nightly Installation**

Nightly releases are latest development snapshots of Gauge. They have
the latest features being developed, but are unstable.

``create /etc/yum.repos.d/gauge-nightly.repo`` with the following content:

.. code-block:: text

    [gauge-nightly]
    name=gauge-nightly
    baseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly
    gpgcheck=0
    enabled=1

Use this command to do it in one step:

.. code-block:: console

    echo -e "[gauge-nightly]\nname=gauge-nightly\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-nightly.repo

Install

.. code-block:: console

    sudo yum install gauge

or

.. code-block:: console

    sudo dnf install gauge

Zip
+++

Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

Example

.. code-block:: console

  unzip gauge.$OS.$ARCH.zip -d $location

**Nightly Installation**

Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

Curl
++++

Install Gauge to /usr/local/bin by running

.. code-block:: console

  curl -SsL https://downloads.gauge.org/stable | sh

To install at custom location

.. code-block:: console

  curl -SsL https://downloads.gauge.org/stable | sh -s -- --location=[custom path]

.. note:: Having trouble with installation? Head over to our :ref:`installation-faq` FAQ's.


Plugins
--------
.. _install-language-runner:


Plugins are an easy way to extend the features of gauge. There are
various types of plugins that gauge currently supports.

Required Plugins
----------------

-  `html-report <https://github.com/getgauge/html-report>`__
-  `screenshot <https://github.com/getgauge/gauge_screenshot>`__

The html-report and screenshot plugins are installed automatically on the first run.

Language/Reporting Plugins
--------------------------
.. _language_plugins:

.. rubric:: Language Plugins

Language plugins, also known as **Language Runners**, enable the users to
write the implementation of specs in a language of their choice. For a
list of available language runners, see how to :ref:`install language runners <install-language-runner>`.
Allows you to write your tests in

-  `CSharp <https://github.com/getgauge/gauge-csharp>`__
-  `Java <https://github.com/getgauge/gauge-java>`__
-  `Javascript <https://github.com/getgauge/gauge-js>`__
-  `Python <https://github.com/getgauge/gauge-python>`__
-  `Ruby <https://github.com/getgauge/gauge-ruby>`__

C#
^^

.. code-block:: console

  gauge install csharp

Java
^^^^

.. code-block:: console

  gauge install java

JavaScript
^^^^^^^^^^

.. code-block:: console

  gauge install js

Python
^^^^^^

.. code-block:: console

  gauge install python

Ruby
^^^^

.. code-block:: console

  gauge install ruby


.. _reporting_plugins:

.. rubric:: Reporting Plugins

Reporting plugins generate execution reports in various formats.

-  `HTML Report <https://github.com/getgauge/html-report>`__
-  `XML Report <https://github.com/getgauge/xml-report>`__

.. _documentation_plugins:

.. rubric:: Documentation Plugins

Documentation plugins generate readable and easy to navigate documentation from the specs.

-  `Spectacle <https://github.com/getgauge/spectacle>`__

.. _plugins-installation:

Installation
^^^^^^^^^^^^

Plugins are installed using the subcommand ``install``, this checks our plugin
repository and downloads them. ``gauge install <plugin_name>``

**Example:**

.. code-block:: console

    gauge install html-report

To install a specific version of a plugin use the ``--version``
flag.

.. code-block:: console

    gauge install html-report --version 2.1.0

To add a plugin to project, issue subcommand ``install`` inside the project, this installs
the plugin and add it to project. If plugin is already installed it just add it to the project i.e.

``gauge install <plugin_name>``

**Example:**

.. code-block:: console

    gauge install xml-report

Offline Installation
~~~~~~~~~~~~~~~~~~~~

If plugin should be installed from a zip file instead of downloading
from plugin repository, use the ``--file`` or ``-f`` flag.

.. code-block:: console

    gauge install html-report --file ZIP_FILE_PATH

Download the latest version of plugin from the ``Releases`` section of
the respective repository. See `plugin list <https://gauge.org/plugins.html>`__ to
find the repositories.

Updating plugins
^^^^^^^^^^^^^^^^

To update a plugin to the latest version of it, use the ``update``
subcommand. This downloads the latest plugin from our plugin repository.

``gauge update <plugin_name>``

**Example:**

.. code-block:: console

    gauge update java

To update a plugin to a specific version, use the ``--version``
flag.

.. code-block:: console

    gauge update java --version 0.3.2

You can also update all the installed plugins by running

.. code-block:: console

    gauge update --all

Read the :ref:`Installation troubleshooting <troubleshoot_plugin_installation>` for more.

IDE plugins
-----------

Gauge has a bunch of plugins so that users can easily author specs on IDE. For more details, check :ref:`IDE Support <ide_support>`.

- Integration with :ref:`Visual Studio Code <vs_code>`
- Integration with :ref:`IntelliJ IDEA <intellij_idea>`
- Integration with :ref:`Visual Studio <visual_studio>`


Build Tools
-----------

-  `Maven <https://github.com/getgauge/gauge-maven-plugin>`__
-  `Gradle <https://github.com/manupsunny/gauge-gradle-plugin>`__


Reporting plugin
^^^^^^^^^^^^^^^^^

HTML Report
++++++++++++

.. code-block:: console

   gauge install html-report

XML Report
++++++++++++

.. code-block:: console

   gauge install xml-report

Verify your installation
------------------------

Check the version of your plugin and Gauge core by running:

.. code-block:: console

   gauge version

The output should look like:

.. code-block:: console

   Gauge version: <version number>

   Plugins
   -------
   plugin(<version number>)

You can read more about plugins :doc:`here <plugins>`.

After Gauge and a language runner is installed, see :ref:`create a Gauge project <create_a_project>`.

Uninstallation
--------------

.. warning::
   - The Gauge folder(~/.gauge in Mac/Linux and in %APPDATA%\Gauge in windows) has to be removed manually.
        This folder contains Gauge config, logs and plugins.
   - Plugins should be removed before uninstalling gauge. Follow the steps in :ref:`plugins-uninstallation`.

Gauge
^^^^^
To uninstall Gauge, run the following commands:

Windows
^^^^^^^

Uninstallation using `chocolatey <https://github.com/chocolatey/choco/wiki/CommandsUninstall>`__

.. code-block:: console

    choco uninstall gauge

macOS
^^^^^

Uninstallation using `HomeBrew <https://docs.brew.sh/FAQ.html#how-do-i-uninstall-a-formula>`__

.. code-block:: console

    brew uninstall gauge

Debian/APT
^^^^^^^^^^

Uninstallation using `apt-get <https://linux.die.net/man/8/apt-get>`__

.. code-block:: console

    sudo apt-get remove gauge

YUM/DNF
^^^^^^^

Uninstallation using `yum <https://www.centos.org/docs/5/html/5.1/Deployment_Guide/s1-yum-useful-commands.html>`__

.. code-block:: console

    yum remove gauge

or

.. code-block:: console

    dnf remove gauge

Zip
^^^

Remove the `gauge` binary from installed location.

Curl
^^^^

Remove the `gauge` binary from installed location.


.. note:: If Gauge is installed in custom location, remove corresponding files/directory.
  More on Gauge install location can be found :ref:`here <troubleshoot_gauge_installation>`.

.. _plugins-uninstallation:

Plugins
^^^^^^^^

Plugins can be uninstalled using the ``uninstall`` subcommand. The command is

``gauge uninstall <plugin-id>``

Example:

.. code-block:: console

   gauge uninstall java

To uninstall a specific version of the plugin, use the
``--version`` flag.

Example:

.. code-block:: console

   gauge uninstall java --version 0.3.2


Plugins
-------

-  JDK 8+ / .NET framework / Node 8.0+ / Python 2 or 3 / Ruby 2.0+ is installed
-  :doc:`Gauge <installing>` is installed.
-  :ref:`Language runner <install-language-runner>` is installed.

.. _create_a_project:

Creating a Project
^^^^^^^^^^^^^^^^^^

Follow the instructions for the respective language below. On getting the message of ``Successfully initialized the project``, one should be able to run the specifications.

.. code-block:: console
   :caption: C#

   gauge init csharp

.. code-block:: console
   :caption: Java

   gauge init java

.. code-block:: console
   :caption: Javascript

   gauge init js

.. code-block:: console
   :caption: Python

   gauge init python

.. code-block:: console
   :caption: Ruby

   gauge init ruby

.. note::

   Refer :ref:`project_structure` for files that get created for all languages.

Running the specs
^^^^^^^^^^^^^^^^^

.. code-block:: console

   gauge run specs

The details of the run are displayed on the command line followed by a
statistics summary.

.. note::

   Refer :ref:`executing_tests` for more details.

Interpret results
^^^^^^^^^^^^^^^^^

The console report would give you the details of the run

.. code-block:: text

    Specifications: (w) executed    (x) passed  (y) failed  (z) skipped
    Scenarios:      (a) executed    (b) passed  (c) failed  (d) skipped

The statistics of the scenarios indicate

======== ====================================
Value    Description
======== ====================================
``(a)``  total number of scenarios executed.
``(b)``  total number of scenarios passed.
``(c)``  total number of scenarios failed.
``(d)``  total number of scenarios skipped.
======== ====================================

The statistics of the specifications indicate

======== ===============================================================
Value    Description
======== ===============================================================
``(w)``  total number specifications executed.
``(x)``  total number specifications with all scenarios passed.
``(y)``  total number specifications with atleast one scenario failed.
``(z)``  total number specifications with all scenarios skipped.
======== ===============================================================

Check various supported formats for :doc:`reports`.
   
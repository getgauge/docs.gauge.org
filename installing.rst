.. _installing_gauge_recomd_options:

Installation
============

Here is the recommended installation steps for all OS.

Windows
-------

`Download <http://getgauge.io/get-started.html>`__ the installer based on your system configuration and run it. Click your way through till you're asked to select your language.

Gauge is installed in ``%PROGRAMFILES%`` by default. But you can select
where you want to install Gauge and complete Gauge installation.

MacOS
-----

The following command installs Gauge.

For this to work, you will need to install `homebrew <http://brew.sh/>`__. If you have brew installed then all you need to run is this command; it will download and install Gauge. This requires you to be connected to the Internet.

.. code-block:: console

    brew update
    brew install gauge

Linux
-----

`Download <http://getgauge.io/get-started.html>`__ the zip file. Choose the
archive file appropriate for your installation. And run the command
below to install Gauge.

.. code-block:: console

    unzip gauge-$VERSION-$OS.$ARCH.zip
    ./install.sh

Gauge can be installed at custom location by using ``GAUGE_PREFIX`` env.

Example :-

.. code-block:: console

    GAUGE_PREFIX=my/custom/location ./install.sh

Gauge Plugins also can be installed along with ``gauge`` ( requires Internet). Set ``GAUGE_PLUGINS`` ( comma separated list of plugins) env to install plugins.

Example :-

.. code-block:: console

    GAUGE_PLUGINS=java,xml-report ./install.sh

Having trouble with installation? Head over to our :ref:`installation-faq` FAQ's.

Alternate Methods
-----------------
Windows
^^^^^^^

Using Chocolatey
++++++++++++++++
You can install Gauge using Chocolatey as well.

.. code-block:: console

    choco install gauge

If you're upgrading to a newer version, then use the command:

.. code-block:: console

    choco upgrade gauge

MacOS
^^^^^

Offline Installation (pkg installer)
++++++++++++++++++++++++++++++++++++

You can `download the Gauge installer <http://getgauge.io/get-started.html>`__. This is a ``pkg`` file, so you can click your way through to finish installing Gauge.

Check the :ref:`install-language-runner` to install language runner plugins.

Linux
^^^^^

On Debian, Ubuntu
+++++++++++++++++

Setup
#####

Add Gauge's GPG key:

.. code-block:: console

    sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B

**Stable**

For stable releases, run this command to add URL to repository list:

.. code-block:: console

    echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee -a /etc/apt/sources.list

**Nightly**

Nightly releases are latest development snapshots of Gauge. They have
the latest features being developed, but are unstable. If you want to
try out Gauge nightly, do this:

.. code-block:: console

    echo deb https://dl.bintray.com/gauge/gauge-deb nightly main | sudo tee -a /etc/apt/sources.list

Install
#######

.. code-block:: console

    sudo apt-get update
    sudo apt-get install gauge


On RHEL, Fedora, CentOS
+++++++++++++++++++++++

Setup
#####

**Stable**

For stable releases, create file ``/etc/yum.repos.d/gauge-stable.repo``
with the following content:

.. code-block:: text

    [gauge-stable]
    name=gauge-stable
    baseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-stable
    gpgcheck=0
    enabled=1

You can use this command to do it in one step:

.. code-block:: console

    echo -e "[gauge-stable]\nname=gauge-stable\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-stable\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-stable.repo

**Nightly**


Note: Nightly releases are latest development snapshots and can be
unstable.

For nightly releases, ``create /etc/yum.repos.d/gauge-nightly.repo``
with the following content:

.. code-block:: text

    [gauge-nightly]
    name=gauge-nightly
    baseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly
    gpgcheck=0
    enabled=1

You can use this command to do it in one step:

.. code-block:: console

    echo -e "[gauge-nightly]\nname=gauge-nightly\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-nightly.repo

Install
#######

Install on Fedora:

.. code-block:: console

    sudo dnf install gauge

Install on CentOS/RHEL:

.. code-block:: console

    sudo yum install gauge

Install manually
################

`Download <http://getgauge.io/get-started.html>`__ the zip file. Choose the
archive file appropriate for your installation. And run the command
below to install Gauge.

.. code-block:: console

    unzip gauge-$VERSION-$OS.$ARCH.zip
    ./install.sh

Having trouble with installation? Head over to our :ref:`installation-faq` FAQ's.

Plugins
--------
.. _install-language-runner:

Language runner
^^^^^^^^^^^^^^^

C#
+++

.. code-block:: console

   gauge install csharp

Java
++++

.. code-block:: console

   gauge install java


Ruby
++++

.. code-block:: console

   gauge install ruby

One can use IDEs to create the projects and run specifications, for this
example, we are using the command line options.

Reporting plugin
^^^^^^^^^^^^^^^^^

HTML Reports
++++++++++++

.. code-block:: console

   gauge install html-report

XML Reports
++++++++++++

.. code-block:: console

   gauge install xml-report

Verify your installation
------------------------

You can check the version of your plugin and Gauge core by executing the
following command.

.. code-block:: console

   gauge version

If this enlists a version then you're intallation and initialisation is
has been successful. Your output will look like this:

.. code-block:: console

   Gauge version: <version number>

   Plugins
   -------
   plugin(<version number>)

You can read more about plugins :doc:`here <plugins>`.

If you have Gauge and your language runner installed, then see how you can :ref:`create a Gauge project <create_a_project>`.

Uninstallation
--------------

Gauge
^^^^^^^^

.. warning::
   If you plan to remove Gauge and the installed plugins, follow the steps in :ref:`plugins-uninstallation` first.


To uninstall Gauge, run the following commands:

OS X/Linux
++++++++++

.. code-block:: console

   rm -rf /usr/local/bin/gauge /usr/local/bin/gauge_screenshot ~/.gauge

If Gauge is installed in custom location, user will have to remove
corresponding files/directory.

Windows
++++++++++

Run the executable ``uninst.exe`` found in Gauge install location.

More on Gauge install location can be found :ref:`here <troubleshoot_gauge_installation>`.

Alternate Methods
+++++++++++++++++
If you have installed Gauge using some package manager please refer their documentation to uninstall package.

Example:

        * `brew <https://docs.brew.sh/FAQ.html#how-do-i-uninstall-a-formula>`__
        * `apt-get <https://linux.die.net/man/8/apt-get>`__
        * `yum <https://www.centos.org/docs/5/html/5.1/Deployment_Guide/s1-yum-useful-commands.html>`__
        * `choco <https://github.com/chocolatey/choco/wiki/CommandsUninstall>`__

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

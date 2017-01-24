Installation
============

Installing Gauge
----------------

.. note::
    Refer :ref:`Installing Plugins <plugins-installation>` for instructions on installing a Gauge plugin.

Windows
^^^^^^^

Using the installer
~~~~~~~~~~~~~~~~~~~

`Download <http://getgauge.io/get-started>`__ the installer based on
your system configuration and run it. Click your way through till you're
asked to select your language.

The Windows installer allows you to select the language plugin(s) as
part of the the installation process. A language plugin is essentially
the language(s) that you would use to write your tests in. Check the
box(es) you want to install. You can select more than one language
plugin to install.

.. figure:: images/install-lang-runner.jpg
   :alt: Select language runner

   Select language runner

Gauge is installed in ``%PROGRAMFILES%`` by default. But you can select
where you want to install Gauge and complete Gauge installation.

Using Chocolatey
~~~~~~~~~~~~~~~~

You can install Gauge using Chocolatey as well.

.. code-block:: console

    choco install gauge

If you're upgrading to a newer version, then use the command:

.. code-block:: console

    choco upgrade gauge

MacOS
^^^^^

Home Brew
~~~~~~~~~

The following command installs Gauge.

For this to work, you will need to install
`homebrew <http://brew.sh/>`__. If you have brew installed then all you
need to run is this command; it will download and install Gauge. This
requires you to be connected to the Internet.

.. code-block:: console

    brew update
    brew install gauge

If you already have a version of Gauge then the following command will
update to the latest version of Gauge.

.. code-block:: console

    brew update
    brew upgrade gauge

Offline Installation (pkg installer)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can `download the Gauge
installer <http://getgauge.io/get-started>`__. This is a ``pkg`` file,
so you can click your way through to finish installing Gauge.

Check the page on :ref:`install-language-runner` to install language runner plugins.

Linux
^^^^^

On Debian, Ubuntu
~~~~~~~~~~~~~~~~~

Setup
"""""

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
"""""""

.. code-block:: console

    sudo apt-get update
    sudo apt-get install gauge

To set up necessary environment variables and download basic reporting
plugins, run this command as a regular user to complete installation:

.. code-block:: console

    gauge_setup

On RHEL, Fedora, CentOS
~~~~~~~~~~~~~~~~~~~~~~~

Setup
"""""

**Stable**

For stable releases, create file ``/etc/yum.repos.d/gauge-stable.repo``
with the following content:

::

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

::

    [gauge-nightly]
    name=gauge-nightly
    baseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly
    gpgcheck=0
    enabled=1

You can use this command to do it in one step:

.. code-block:: console

    echo -e "[gauge-nightly]\nname=gauge-nightly\nbaseurl=http://dl.bintray.com/gauge/gauge-rpm/gauge-nightly\ngpgcheck=0\nenabled=1" | sudo tee /etc/yum.repos.d/gauge-nightly.repo

Install
"""""""

Install on Fedora:

.. code-block:: console

    sudo dnf install gauge

Install on CentOS/RHEL:

.. code-block:: console

    sudo yum install gauge

To set up necessary environment variables and download basic reporting
plugins, run this command as a regular user to complete installation:

.. code-block:: console

    gauge_setup

Install manually
~~~~~~~~~~~~~~~~

`Download <http://getgauge.io/get-started>`__ the zip file. Choose the
archive file appropriate for your installation. And run the command
below to install Gauge.

.. code-block:: console

    unzip gauge-$VERSION-$OS.$ARCH.zip
    ./install.sh

Having trouble with installation? Head over to our :ref:`installation-faq` FAQ's.

Verify your installation
------------------------

You can check the version of your plugin and Gauge core by executing the
following command.

.. code-block:: console

    $ gauge -v

If this enlists a version then you're intallation and initialisation is
has been successful. Your output will look like this:

.. code-block:: console

    Gauge version: <version number>

    Plugins
    -------
    language(<version number>)

You can read more about plugins `here <../plugins/index.html>`__.

If you have Gauge and your language runner installed, then see how you
can `create a Gauge project <../getting_started/creating_a_gauge_project.md>`__.



Uninstallation
--------------

Uninstalling Gauge
^^^^^^^^^^^^^^^^^^

.. warning::
    If you plan to remove Gauge and the installed plugins, follow the steps in :ref:`plugins-uninstallation` first.


To uninstall Gauge, run the following commands:

OS X/Linux
~~~~~~~~~~

.. code-block:: console

    rm -rf /usr/local/bin/gauge /usr/local/share/gauge /usr/local/share/gauge_screenshot ~/.gauge

If Gauge is installed in custom location, user will have to remove
corresponding files/directory.

Windows
~~~~~~~

Run the executable ``uninst.exe`` found in Gauge install location.

More on Gauge install location can be found
`here <../troubleshooting/installation.md>`__.

.. _plugins-uninstallation:

Uninstalling plugins
^^^^^^^^^^^^^^^^^^^^

Plugins can be uninstalled using the ``uninstall`` flag. The command is

``gauge --uninstall <plugin-id>``

Example:

.. code-block:: console

    gauge --uninstall java

To uninstall a specific version of the plugin, use the
``--plugin-version`` flag.

Example:

.. code-block:: console

    gauge --uninstall java --plugin-version 0.3.2

.. _installing_gauge_recomd_options:

Installation
============

Gauge Core
----------

.. container:: platform-install

  .. tabs::

    .. group-tab:: Windows

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

    .. group-tab:: macOS

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

    .. group-tab:: Debian/APT

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

    .. group-tab:: YUM/DNF

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

    .. group-tab:: zip

      Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

      Example

      .. code-block:: console

        unzip gauge.$OS.$ARCH.zip -d $location

      **Nightly Installation**

      Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

    .. group-tab:: curl

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

Language runner
^^^^^^^^^^^^^^^

.. container:: code-snippet

  .. tabs::

    .. group-tab:: C#

      .. code-block:: console

        gauge install csharp

    .. group-tab:: Java

      .. code-block:: console

        gauge install java

    .. group-tab:: JavaScript

      .. code-block:: console

        gauge install js

    .. group-tab:: Python

      .. code-block:: console

        gauge install python

    .. group-tab:: Ruby

      .. code-block:: console

        gauge install ruby

.. note:: IDEs can be used to create the projects and run specifications, this example illustrates the command line usage.

Reporting plugin
^^^^^^^^^^^^^^^^^

.. container:: reporting-plugin

  .. tabs::

    .. tab:: HTML-Report

      .. code-block:: console

        gauge install html-report

    .. tab:: XML-Report

      .. code-block:: console

        gauge install xml-report

    .. tab:: Flash

      .. code-block:: console

        gauge install flash

    .. tab:: JSON-Report

      .. code-block:: console

        gauge install json-report


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

.. container:: platform-install

  .. tabs::

    .. group-tab:: Windows

      Uninstallation using `chocolatey <https://github.com/chocolatey/choco/wiki/CommandsUninstall>`__

      .. code-block:: console

          choco uninstall gauge

    .. group-tab:: macOS

      Uninstallation using `HomeBrew <https://docs.brew.sh/FAQ.html#how-do-i-uninstall-a-formula>`__

      .. code-block:: console

          brew uninstall gauge

    .. group-tab:: Debian/APT

      Uninstallation using `apt-get <https://linux.die.net/man/8/apt-get>`__

      .. code-block:: console

          sudo apt-get remove gauge

    .. group-tab:: YUM/DNF

      Uninstallation using `yum <https://www.centos.org/docs/5/html/5.1/Deployment_Guide/s1-yum-useful-commands.html>`__

      .. code-block:: console

          yum remove gauge

      or

      .. code-block:: console

          dnf remove gauge

    .. group-tab:: zip

      Remove the `gauge` binary from installed location.

    .. group-tab:: curl

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
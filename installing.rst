.. _installing_gauge_recomd_options:

Installation
============

Here is the recommended installation steps for all OS.

Windows
-------

`Download <http://getgauge.io/get-started>`__ the installer based on your system configuration and run it. Click your way through till you're asked to select your language.

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

`Download <http://getgauge.io/get-started>`__ the zip file. Choose the
archive file appropriate for your installation. And run the command
below to install Gauge.

.. code-block:: console

    unzip gauge-$VERSION-$OS.$ARCH.zip
    ./install.sh

Having trouble with installation? Head over to our :ref:`installation-faq` FAQ's.

Other Options
---------------

Read our :ref:`installing_gauge_other_options` to know more

Verify your installation
------------------------

You can check the version of your plugin and Gauge core by executing the
following command.

.. code-block:: console

    gauge -v

If this enlists a version then you're intallation and initialisation is
has been successful. Your output will look like this:

.. code-block:: console

    Gauge version: <version number>

    Plugins
    -------
    plugin(<version number>)

You can read more about plugins :doc:`here <plugins>`.

If you have Gauge and your language runner installed, then see how you can :ref:`create a Gauge project <create_a_project>`.

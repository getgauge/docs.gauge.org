
.. _installing_gauge_alternate_options:

Alternate Install Options
=========================
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

You can `download the Gauge installer <http://getgauge.io/get-started>`__. This is a ``pkg`` file, so you can click your way through to finish installing Gauge.

Check the page on :ref:`install-language-runner` to install language runner plugins.

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

To set up necessary environment variables and download basic reporting
plugins, run this command as a regular user to complete installation:

.. code-block:: console

    gauge_setup

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

To set up necessary environment variables and download basic reporting
plugins, run this command as a regular user to complete installation:

.. code-block:: console

    gauge_setup

Install manually
################

`Download <http://getgauge.io/get-started>`__ the zip file. Choose the
archive file appropriate for your installation. And run the command
below to install Gauge.

.. code-block:: console

    unzip gauge-$VERSION-$OS.$ARCH.zip
    ./install.sh

Having trouble with installation? Head over to our :ref:`installation-faq` FAQ's.

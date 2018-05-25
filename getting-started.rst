.. _getting_started:

Getting Started
===============

Install Gauge
-------------

.. tab-container:: platforms

    .. tab:: Windows

        **Using Chocolatey**

        Requires `chocolatey <https://chocolatey.org//>`__, and an internet connection.

        .. code-block:: console

            choco install gauge # New Installation
            choco upgrade gauge # Upgrade current installation

    .. tab:: macOS

        **Using HomeBrew**

        Requires `homebrew <https://brew.sh/>`__ and an internet connection.

        .. code-block:: console

            brew update
            brew install gauge

    .. tab:: Debian/APT

        Add Gauge's GPG key, URL to repository list and install Gauge.

        .. code-block:: console

            sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B
            echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee -a /etc/apt/sources.list
            sudo apt-get update
            sudo apt-get install gauge

    .. tab:: YUM/DNF

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

    .. tab:: Zip

        Download the Gauge archive from `here <https://github.com/getgauge/gauge/releases/latest>`__. Extract it to a location and add it to system path.

        Example

        .. code-block:: console

            unzip gauge.$OS.$ARCH.zip -d $location

    .. tab:: Curl

        Install Gauge to /usr/local/bin by running

        .. code-block:: console

            curl -SsL https://downloads.gauge.org/stable | sh

.. note:: 
    - Gauge can be installed using other methods. See :ref:`advanced_installation`.
    - Having trouble with installation? Head over to our :ref:`installation-faq` FAQ's.

Install Plugins
---------------

Plugins are an easy way to extend the features of Gauge. There are
various types of plugins that Gauge currently supports.

Language Runner
^^^^^^^^^^^^^^^

Language plugins enable the users to write the implementation of specs in a language of their choice. 

.. _install-language-runner:

.. tab-container:: languages

    .. tab:: CSharp

        .. code-block:: console

            gauge install csharp

        Read more `here <https://github.com/getgauge/gauge-csharp>`__

    .. tab:: Java

        .. code-block:: console

            gauge install java
        
        Read more `here <https://github.com/getgauge/gauge-java>`__

    .. tab:: JavaScript

        .. code-block:: console

            gauge install js
        
        Read more `here <https://github.com/getgauge/gauge-js>`__

    .. tab:: Python

        .. code-block:: console

            gauge install python

        Read more `here <https://github.com/getgauge/gauge-python>`__

    .. tab:: Ruby

        .. code-block:: console

            gauge install ruby
        
        Read more `here <https://github.com/getgauge/gauge-ruby>`__

.. _reporting_plugins:

Reporting Plugins
^^^^^^^^^^^^^^^^^

Reporting plugins generate execution reports in various formats.


.. tab-container:: reports

    .. tab:: Html-Report

        .. code-block:: console

            gauge install html-report

        Read more `here <https://github.com/getgauge/html-report>`__

    .. tab:: Xml-Report

        .. code-block:: console

            gauge install xml-report

        Read more `here <https://github.com/getgauge/xml-report>`__


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

.. _create_a_project:

Creating a Project
------------------

Gauge provides some templates to help setup a project. Follow the instructions for the respective language below.

.. tab-container:: languages

    .. tab:: CSharp

        .. code-block:: console

            gauge init csharp

    .. tab:: Java

        .. code-block:: console

            gauge init java

    .. tab:: JavaScript

        .. code-block:: console

            gauge init js

    .. tab:: Python

        .. code-block:: console

            gauge init python

    .. tab:: Ruby

        .. code-block:: console

            gauge init ruby


The console should print a message ``Successfully initialized the project``. 
Follow further instructions on the console to proceed with execution.

Refer :ref:`project_structure` for files that get created for all languages.


Running Specifications
----------------------

.. code-block:: console

   gauge run specs

The details of the run are displayed on the command line followed by a summary.

.. note::

   Refer :ref:`executing_tests` for more details.

Interpret results
-----------------

The console report would give you the details of the run

.. code-block:: text

    Specifications: (w) executed    (x) passed  (y) failed  (z) skipped
    Scenarios:      (a) executed    (b) passed  (c) failed  (d) skipped

The summary of the scenarios indicate

======== ====================================
Value    Description
======== ====================================
``(a)``  total number of scenarios executed.
``(b)``  total number of scenarios passed.
``(c)``  total number of scenarios failed.
``(d)``  total number of scenarios skipped.
======== ====================================

The summary of the specifications indicate

======== ===============================================================
Value    Description
======== ===============================================================
``(w)``  total number specifications executed.
``(x)``  total number specifications with all scenarios passed.
``(y)``  total number specifications with atleast one scenario failed.
``(z)``  total number specifications with all scenarios skipped.
======== ===============================================================

Check various supported formats for :doc:`reports`.

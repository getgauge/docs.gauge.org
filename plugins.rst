Plugins
=======

Plugins are an easy way to extend the features of gauge. There are
various types of plugins that gauge currently supports.

Language/Reporting Plugins
--------------------------

Language plugins, also known as **language runners**, enable the users to
write the implementation of specs in a language of their choice. For a
list of available language runners, see how to :ref:`install language runners <install-language-runner>`. 
Allows you to write your tests in

-  `Java <https://github.com/getgauge/gauge-java>`__
-  `CSharp <https://github.com/getgauge/gauge-csharp>`__
-  `Ruby <https://github.com/getgauge/gauge-ruby>`__

Reporting plugins, as the name suggests, generate execution reports in various formats.

-  `HTML Report <https://github.com/getgauge/html-report>`__
-  `XML Report <https://github.com/getgauge/xml-report>`__

Documentation plugins, generate readable and easy to navigate documentation from the specs.

-  `Spectacle <https://github.com/getgauge/spectacle>`__

.. _plugins-installation:

Installation
^^^^^^^^^^^^

Plugins are installed using the flag ``install``, this checks our plugin
repository and downloads them. ``gauge --install <plugin_name>``

**Example:**

.. code-block:: console

    gauge --install html-report

To install a specific version of a plugin use the ``--plugin-version``
flag.

.. code-block:: console

    gauge --install html-report --plugin-version 2.1.0

Offline Installation
~~~~~~~~~~~~~~~~~~~~

If plugin should be installed from a zip file instead of downloading
from plugin repository, use the ``--file`` or ``-f`` flag.

.. code-block:: console

    gauge --install html-report --file ZIP_FILE_PATH

Download the latest version of plugin from the ``Releases`` section of
the respective repository. See `plugin list <http://getgauge.io/plugins/index.html>`__ to
find the repositories.

Adding plugins to a project
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once plugins are installed, they can be added to the project by using
the ``add-plugin`` flag i.e. 

``gauge --add-plugin <plugin_name>``

Example:

.. code-block:: console

    gauge --add-plugin xml-report

Updating plugins
^^^^^^^^^^^^^^^^

To update a plugin to the latest version of it, use the ``--update``
flag. This downloads the latest plugin from our plugin repository.

``gauge --update <plugin_name>``

Example:

.. code-block:: console

    gauge --update java

To update a plugin to a specific version, use the ``--plugin-version``
flag.

.. code-block:: console

    gauge --update java --plugin-version 0.3.2

You can also update all the installed plugins by running

.. code-block:: console

    gauge --update-all

Read the :ref:`Installation troubleshooting <troubleshoot_plugin_installation>` for more.

IDE plugins
-----------

Gauge has a bunch of plugins so that users can easily author specs on IDE. For more details, check :ref:`IDE Support <ide_support>`.

-  Integration with :ref:`IntelliJ IDEA <intellij_idea>`
-  Integration with :ref:`Visual Studio <visual_studio>`


Build Tools
-----------

-  `Maven <https://github.com/getgauge/gauge-maven-plugin>`__
-  `Gradle <https://github.com/manupsunny/gauge-gradle-plugin>`__

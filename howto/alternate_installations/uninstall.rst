Uninstallation
--------------

Uninstalling Gauge
~~~~~~~~~~~~~~~~~~~~

.. warning::
    If you plan to remove Gauge and the installed plugins, follow the steps in :ref:`plugins-uninstallation` first.


To uninstall Gauge, run the following commands:

OS X/Linux
^^^^^^^^^^

.. code-block:: console

    rm -rf /usr/local/bin/gauge /usr/local/share/gauge /usr/local/share/gauge_screenshot ~/.gauge

If Gauge is installed in custom location, user will have to remove
corresponding files/directory.

Windows
^^^^^^^

Run the executable ``uninst.exe`` found in Gauge install location.

More on Gauge install location can be found `here <troubleshoot_gauge_installation>`.

.. _plugins-uninstallation:

Uninstalling plugins
~~~~~~~~~~~~~~~~~~~~

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

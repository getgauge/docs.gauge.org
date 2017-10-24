GAUGE-VS-003 : Unable to read Gauge version
-------------------------------------------

Gauge-Visualstudio support requires `gauge.exe` to be above a certain minimum version of Gauge. This error indicates that Gauge Visual Studio is unable to read the installed Gauge version.

1. Verify that the latest version of ``gauge`` is installed and available in ``PATH``. An easy way to do this is to run ``gauge version`` in your command prompt.
2. Inspect ``Output Window`` of Visual Studio and see the log for possible actions.

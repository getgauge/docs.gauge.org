GAUGE-VS-001 : Gauge API Not Started
-------------------------------------

Gauge-Visualstudio support requires `gauge.exe` to run as a daemon. Hence, Gauge-Visualstudio tries to launch `gauge` as a child Process with the same working directory as the project. Sometimes this can fail. Here are things to watch out:

1. Ensure latest Gauge is installed and available in `PATH`. You can install gauge from `here <//gauge.org/get_started>`__.
2. Ensure that the latest Gauge CSharp plugin is installed. Since you are using Gauge + VisualStudio, it is assumed that you are using Gauge + CSharp, and this requires the `gauge-csharp plugin <https://github.com/getgauge/gauge-csharp>`__ to be installed. Run `gauge install csharp` in your Command Prompt to get the latest plugin.
3. Verify (1) and (2) above by running `gauge version` in your Command Prompt.
4. Allow gauge.exe via Windows Firewall, if you have firewall enabled. You also need to allow gauge to use port range 46337-46997 in the firewall, since this is the port number that Gauge-Visualstudio uses by default.
5. If port range 46337-46997 has a conflict for some reason, or you cannot allow these ports in Windows Firewall, you can tell Gauge-Visualstudio to use a different port by setting it in Tools->Options->Gauge->API Options in Visual Studio. Ensure that the port set in this setting is white-listed in your firewall.
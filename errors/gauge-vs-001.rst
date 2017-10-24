GAUGE-VS-001 : Gauge API Not Started
-------------------------------------

Gauge-Visualstudio support requires `gauge.exe` to run as a daemon. Hence, Gauge-Visualstudio tries to launch `gauge` as a child Process with the same working directory as the project. Sometimes this can fail. Here are things to watch out:

1. Ensure latest Gauge is installed and available in `PATH`. You can install gauge from [here](https://getgauge.io/get-arted.html).
2. Ensure that the latest Gauge CSharp plugin is installed. Since you are using Gauge + VisualStudio, it is assumed that you are using Gauge + CSharp, 
and this requires the [gauge-csharp plugin](https://github.com/getgauge/gauge-csharp) to be installed. Run `gauge install csharp` in your Command Prompt to get the latest plugin.
3. Verify (1) and (2) above by running `gauge version` in your Command Prompt.
4. Allow `gauge.exe` via Windows Firewall, if you have firewall enabled. 
You also need to allow `gauge` to use port `46678` in the firewall, since this is the port number that Gauge-Visualstudio uses by default. 
5. If port `46678` has a conflict for some reason, you can tell Gauge-Visualstudio to use a different port by setting it in Visual Studio `Tools -> Options -> Gauge API options`. 
You may use the `Min` and `Max` to set a range of ports that Gauge can use. Ensure that the ports set in this setting are white-listed in your firewall. 


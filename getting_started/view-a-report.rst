.. meta::
    :description: A quick overview of how to view test reports. It guides you through how to view report of last execution on different os, in different languages, and on different ides..
    :keywords: view report testing project vscode automation

.. role:: heading
.. role:: vscode
.. cssclass:: topic

:heading:`Viewing Reports`
==========================

.. include:: ../partials/change_filter.rst

.. cssclass:: vscode dynamic-content

:vscode:`Viewing Reports from Visual Studio Code`
-------------------------------------------------

Once the specifications are run you will get immediate feedback in the output console of Visual Studio Code.

You can also view the HTML report of tests run by following either of the steps below:

Open the html report by clicking on the view summary link in Visual Studio Code

.. figure:: ../images/VSCode_report_link.png
    :alt: Visual Studio Code execution report link

OR

In the editor's command palete type :highlighted-syntax:`Gauge: Show Last Run Report` to view the report in the browser

.. figure:: ../images/VSCode_show_last_run_report.png
    :alt: Visual Studio Code show last run report command

Here's what a Gauge report looks like.

.. figure:: ../images/HTML_report.png
    :alt: HTML report

And, that concludes our getting started journey for Gauge. Hopefully this helped you install and set-up your first Gauge project. Gauge comes with powerful language & tool support as well as a versatile reporting functionality. We've covered the basics for all of these features in this guide.

As a next step, the following resources are available:

.. cssclass:: text-box

    * `Write Specifications  <../writing-specifications.html>`__: This section has more in-depth detail on writing Gauge specifications and connecting them with the test scripts of your choice.

    * `Examples <../examples.html>`__: The examples section contains example projects of different languages and tools to help you get started with exactly what you need.
    
.. container:: page-navigator

    .. container:: navigate-previous

        `Running a Specification <running-a-specification.html>`__

.. meta::
    :description: A quick overview of how to run a Gauge project on different setups. It guides you through how to run a test project with Gauge on different os, in different languages, and on different ides...
    :keywords: run specification testing project vscode automation

.. role:: heading
.. role:: vscode
.. cssclass:: topic

:heading:`Running a Specification`
==================================

.. include:: ../partials/change_filter.rst
.. role:: highlighted-syntax
.. role:: param-syntax-char

Now that you successfully initialized a Gauge project with the JavaScript template, we can look at
running a specification using the example specification in the test folder.


A test specification (spec) is a detailed statement of what will be tested. In Gauge, these are written
in a :highlighted-syntax:`.spec` file. To learn more about how specifications work you can look at the overview section.

.. cssclass:: vscode dynamic-content

:vscode:`Running a Specification using VS Code`
----------------------------------------------------------

Step 1: Open Specification
~~~~~~~~~~~~~~~~~~~~~~~~~~

Open the example spec. The Gauge specification file is present under :highlighted-syntax:`/specs/example.spec`

.. figure:: ../images/VSCode_open_example.spec.png
      :alt: Open example.spec file

Step 2: Run Specification
~~~~~~~~~~~~~~~~~~~~~~~~~

Run your Gauge specs in VS Code by choosing the option to :highlighted-syntax:`Run Spec`

.. figure:: ../images/VSCode_run_code_lens.png
      :alt: VS Code JavaScript run code lens

You'll get immediate feedback in the output about what got executed.

.. figure:: ../images/VSCode_execution_console.png
      :alt: VS Code JavaScript execution console

Now that you have successfully run a Gauge specification, you can go ahead and view the report from VS code.

.. container:: page-navigator

   .. container:: navigate-previous

      `Create a Test Project <create-test-project.html>`__

   .. container:: navigate-next

      `Viewing a Report <view-a-report.html>`__

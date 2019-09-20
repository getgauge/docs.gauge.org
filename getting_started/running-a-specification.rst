.. meta::
    :description: A quick overview of how to run a Gauge project on different setups. It guides you through how to run a test project with Gauge on different os, in different languages, and on different ides...
    :keywords: run specification testing project vscode idea visualstudio automation

.. role:: heading
.. role:: vscode
.. role:: intellij
.. role:: visualstudio
.. cssclass:: topic

:heading:`Running a Specification`
==================================

.. include:: .../partials/change_filter.rst
.. role:: highlighted-syntax
.. role:: param-syntax-char

Now that you successfully initialized a Gauge project with the JavaScript template, we can look at
running a specification using the example specification in the test folder.


A test specification (spec) is a detailed statement of what will be tested. In Gauge, these are written
in a :highlighted-syntax:`.spec` file. To learn more about how specifications work you can look at the overview section.

.. cssclass:: vscode dynamic-content

:vscode:`Running a Specification using Visual Studio Code`
----------------------------------------------------------

Step 1
~~~~~~

Open the example spec. The Gauge specification file is present under :highlighted-syntax:`/specs/example.spec`

.. figure:: ../images/VSCode_open_example.spec.png
      :alt: Open example.spec file

Step 2
~~~~~~

Run your Gauge specs in Visual Studio Code by choosing the option to :highlighted-syntax:`Run Spec`

.. figure:: ../images/VSCode_run_code_lens.png
      :alt: Visual Studio Code JavaScript run code lens

You'll get immediate feedback in the output about what got executed.

.. figure:: ../images/VSCode_execution_console.png
      :alt: Visual Studio Code JavaScript execution console

.. cssclass:: java intellij dynamic-content

:intellij:`Running a Specification using Intellij`
--------------------------------------------------

Step 1
~~~~~~

Open the example spec. The Gauge specification file is present under :highlighted-syntax:`/specs/example.spec`

.. figure:: ../images/Intellij_open_example.spec.png
      :alt: Open example.spec file

Step 2
~~~~~~

Run your Gauge specs in Intellij by clicking on the :highlighted-syntax:`Run example.spec`.

.. figure:: ../images/Intellij_run_spec.png
      :alt: IntelliJ IDEA run code lens

You'll get immediate feedback in the output about what got executed.

.. figure:: ../images/Intellij_execution_console.png
      :alt: IntelliJ IDEA execution console

.. cssclass:: csharp visualstudio dynamic-content

:visualstudio:`Running a Specification using Visual Studio`
-----------------------------------------------------------

Step 1
~~~~~~

When you build the test project, all the test scenarios appear in Test Explorer.
If Test Explorer is not visible, choose :highlighted-syntax:`Test` on the Visual Studio menu, choose :highlighted-syntax:`Windows`, and then choose :highlighted-syntax:`Test Explorer`.


Step 2
~~~~~~

* To run all the scenarios in a solution, choose :highlighted-syntax:`Run All`.
* To run all the scenarios of a specification, choose :highlighted-syntax:`Run...` and then choose the group on the menu.
* To run one or more scenarios, select the individual scenarios that you want to run, open the context menu for a selected scenario and then choose :highlighted-syntax:`Run Selected Tests`.

.. figure:: ../images/VisualStudio_run_specification.png
      :alt: Run specification

You'll get immediate feedback in the Text Explorer about what got executed.

.. figure:: ../images/VisualStudio_TextExplorer.png
      :alt: Visual Studio text explorer

Next Step:
----------

Now that you have successfully run a Gauge specification, you can go ahead and view the report from VS code.

.. container:: page-navigator

   .. container:: navigate-previous

      `Create a Test Project <create-test-project.html>`__

   .. container:: navigate-next

      `Viewing a Report <view-a-report.html>`__
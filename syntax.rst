Syntax 
======

Specification
-------------

::

    Specification name            # Specification name
    ==================

Scenario
--------

::

    Scenario name                 ## Scenario name
    -------------

Tags
----

::

    Specification Level           Scenario Level
    ===================           --------------

    Tags: login, admin            Tags: login-success, admin

Concept
-------

::

    Concept Heading               # Concept Heading
    ===============

Steps
-----

::

    * Step Name

Parameters
----------

-  ``"``\ Static Arg\ ``"``

   ::

       * Check "product" exists

-  ``<``\ Dynamic Arg\ ``>`` \`\`\`\`
-  Check exists \`\`\`\`

-  ``|``\ Table Parameter\ ``|`` \`\`\`\`
-  Step that takes a table \| id \| name \| \| 123 \| John \| \| 456 \|
   Mcclain \| \`\`\`\` There should be no empty lines between step name
   and table parameter.

-  ``<``\ Special\ ``:``\ Parameters\ ``>``

   ::

        <prefix:value>

-  *File* \`\`\`\`
-  Check if file:/work/content.txt is visible \`\`\`\`

-  *Table* \`\`\`\`
-  Check if the users exist

   .. raw:: html

      <table : /Users/john/work/users.csv>

   \`\`\`\`

Comments
--------

Comment has no syntax. Any normal line of text is treated as comment.

::

    Im a comment!!!

Images
------

Inline image syntax looks like this:

::

    ![Alt text](/path/to/img.jpg)

    ![Alt text](/path/to/img.jpg "Optional title")

The path to image file should be relative to current directory.

Links
-----

::

    This is [an example](http://getgauge.io "Title") inline link.

    [This link](http://github.com/getgauge/gauge) has no title attribute.

Syntax 
======

Specification
-------------

.. code-block:: markdown

    Specification name            
    ==================
    
or 

.. code-block:: markdown

    # Specification name

Scenario
--------

.. code-block:: markdown

    Scenario name                 
    -------------

or

.. code-block:: markdown

    ## Scenario name

Tags
----

.. code-block:: markdown

    Specification Level           
    ===================           

    Tags: login, admin            
    
    
    Scenario Level
    --------------

    Tags: login-success, admin

Concept
-------

.. code-block:: markdown

    Concept Heading 
    ===============

or

.. code-block:: markdown
   
    # Concept Heading

Steps
-----

.. code-block:: markdown

    * Step Name

Parameters
----------

.. code-block:: markdown
   :caption: ``"Static Arg"``

   * Check "product" exists



.. code-block:: markdown
   :caption: ``<Dynamic Arg>``

   * Check <product> exists 



.. code-block:: markdown
   :caption: ``|Table Parameter|``

   * Step that takes a table 
      | id  | name    |
      |-----|---------|
      | 123 | John    |
      | 456 | Mcclain | 
      
There should be no empty lines between step name and table parameter.

Special Parameters
------------------

.. code-block:: markdown

   <prefix:value>

.. code-block:: markdown
   :caption: ``file``

   * Check if <file:/work/content.txt> is visible 

.. code-block:: markdown
   :caption: ``table``

   * Check if the users exist <table:/Users/john/work/users.csv>


Comments
--------

Comment has no syntax. Any normal line of text is treated as comment.

.. code-block:: markdown

    Im a comment!!!

Images
------

Inline image syntax looks like this:

.. code-block:: markdown

    ![Alt text](/path/to/img.jpg)

    ![Alt text](/path/to/img.jpg "Optional title")

The path to image file should be relative to current directory.

Links
-----

.. code-block:: markdown

    This is [an example](http://getgauge.io "Title") inline link.

    [This link](http://github.com/getgauge/gauge) has no title attribute.

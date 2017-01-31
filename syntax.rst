Syntax 
======

.. _spec_syntax:

Specification
-------------

.. code-block:: gauge

    Specification name            
    ==================
    
or 

.. code-block:: gauge

    # Specification name

.. _scenario_syntax:

Scenario
--------

.. code-block:: gauge

    Scenario name                 
    -------------

or

.. code-block:: gauge

    ## Scenario name

.. _tag_syntax:

Tags
----

.. code-block:: gauge

    Specification Level           
    ===================           

    Tags: login, admin            
    
    
    Scenario Level
    --------------

    Tags: login-success, admin

.. _concept_syntax:

Concept
-------

.. code-block:: gauge

    Concept Heading 
    ===============

or

.. code-block:: gauge
   
    # Concept Heading

.. _step_syntax:

Steps
-----

.. code-block:: gauge

    * Step Name

Parameters
----------

.. code-block:: gauge
   :caption: ``"Static Arg"``

   * Check "product" exists



.. code-block:: gauge
   :caption: ``<Dynamic Arg>``

   * Check <product> exists 



.. code-block:: gauge
   :caption: ``|Table Parameter|``

   * Step that takes a table 
      | id  | name    |
      |-----|---------|
      | 123 | John    |
      | 456 | Mcclain | 
      
There should be no empty lines between step name and table parameter.

Special Parameters
------------------

.. code-block:: gauge

   <prefix:value>

.. code-block:: gauge
   :caption: ``file``

   * Check if <file:/work/content.txt> is visible 

.. code-block:: gauge
   :caption: ``table``

   * Check if the users exist <table:/Users/john/work/users.csv>


Comments
--------

Comment has no syntax. Any normal line of text is treated as comment.

.. code-block:: gauge

    Im a comment!!!

Images
------

Inline image syntax looks like this:

.. code-block:: gauge

    ![Alt text](/path/to/img.jpg)

    ![Alt text](/path/to/img.jpg "Optional title")

The path to image file should be relative to current directory.

Links
-----

.. code-block:: gauge

    This is [an example](http://getgauge.io "Title") inline link.

    [This link](http://github.com/getgauge/gauge) has no title attribute.

GAUGE-IntelliJ-004 : Project Build failing with compilation error but the Java Files do not mark any errors.
-----------------------------------------------------------------------------------------------------------

-  The project compilation fails however the java files do not mark any
   errors in the file.
-  This is a specific issue with Java <= 1.7 on Windows.
-  To resolve set **-Duser.home=USER_HOME** in the **IDEA_INSTALLATION\bin\idea.exe.vmoptions** file.

.. code-block:: text

    -Duser.home=C:\\Users\\<username>

-  See the `Intellij idea forum post <https://devnet.jetbrains.com/message/5545889#5545889>`__ for more details

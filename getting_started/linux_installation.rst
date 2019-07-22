.. cssclass:: hidden, linux

Step 1: Installing Gauge on Linux
=================================

Gauge can be installed on any flavour of Linux using the shell script. The Following steps will guide you to a quick install on a linux box.

    Install Using Shell Script APT_GET

1. First, add Gauge's GPG key with this command:

.. code-block:: console

    sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B

2. Then add Gauge to the repository list using:

.. code-block:: console

    echo deb https://dl.bintray.com/gauge/gauge-deb nightly main | sudo tee - a /etc/apt/sources.list

.. code-block:: console

    sudo apt-get update
    sudo apt-get install gauge

.. cssclass:: hidden, linux

DNF Package Manager
===================

.. cssclass:: hidden, linux

ZIP file
========

.. cssclass:: hidden, linux

NPM install
===========

.. cssclass:: hidden, linux

Install Using CURL
==================

.. cssclass:: hidden, linux

Alternate Installation
======================

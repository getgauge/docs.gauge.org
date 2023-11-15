.. meta::
    :description: A tutorial on how to install Gauge in Docker
    :keywords: testing gauge docker automation
.. role:: heading

.. cssclass:: topic

:heading:`Tutorial: Integrating Gauge with Docker`
==================================================

Gauge can be easily installed on `Docker <https://www.docker.com/what-docker>`__ container.

Prerequisites
-------------

-  `Docker <https://docs.docker.com/engine/installation/>`__

Docker image for Gauge
----------------------

-  Create a :highlighted-syntax:`Dockerfile` file in your project root.
-  Add these lines in :highlighted-syntax:`Dockerfile` according to the platform on which
   you want to build.

.. cssclass:: example

DockerFile

.. code-block:: yaml

    FROM ubuntu

    # Install Java.
    RUN apt-get update && apt-get install -q -y \
        curl \
        zip \
        openjdk-11-jdk \
        apt-transport-https \
        gnupg2 \
        ca-certificates

    RUN curl -SsL https://downloads.gauge.org/stable | sh

    # Install gauge plugins
    RUN gauge install java && \
        gauge install screenshot

    ENV PATH=$HOME/.gauge:$PATH

Run Gauge specs on Docker
-------------------------

- Build the docker image tagged as test
    :highlighted-syntax:`docker build . -t test`

- Mount the docker image with the <project_directory> and run the specs in the container
    :highlighted-syntax:`docker run -v pwd:/<project_directory> -w="/<project_directory>" test gauge run specs`
    
    
Dockerfile for Python 
-------------------------

    # Install Pyhton. "You can specify the version of Python to use in the Docker image as per your preference."
    
    FROM python:3.10.5
    
    COPY requirements.txt .
    
    RUN pip install --no-cache-dir -r requirements.txt
    
    # Install Gauge and make sure it is in the system path
    
    RUN wget -O - https://downloads.gauge.org/stable | sh
    
    ENV PATH="/usr/local/bin:${PATH}"

Run Gauge specs on Docker (Windows)
-------------------------

- Build the docker image tagged as test
    :highlighted-syntax:`docker build . -t test`

- Mount the docker image with the <project_directory> and run the specs in the container
    :highlighted-syntax:`docker run --rm -v <project_directory>:/app test gauge run app/<spec_directory>`

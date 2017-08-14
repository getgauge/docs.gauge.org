Gauge tests in docker
=====================

Gauge can be easily installed on `Docker <https://www.docker.com/what-docker>`__ container.

Since Gauge supports first class command line, invoking it from any container is very straightforward.

Prerequisites
-------------

-  `Docker <https://docs.docker.com/engine/installation/>`__

Install Gauge on Docker
-----------------------

-  Create a ``Dockerfile`` file in your project root.
-  Add these lines in ``Dockerfile`` according to the platform on which
   you want to build.

.. code-block:: yaml
  :caption: DockerFile

    FROM ubuntu

    # Install Java.
    RUN apt-get update
    RUN apt-get -y install sudo
    RUN apt-get -q -y install default-jdk
    RUN apt-get install apt-transport-https -y

    #Install gauge
    RUN apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B
    RUN echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee -a /etc/apt/sources.list
    RUN apt-get update
    RUN apt-get install gauge
    RUN gauge install java

    ENV PATH=$HOME/.gauge:$PATH

Run Gauge specs on Docker
-------------------------

- Build the docker image tagged as test
    docker build . -t test

- Mount the docker image and run the specs
    docker run -v `pwd`:/<project_dir> -w="/<project_dir>" test gauge run specs

:page_header: Tutorial: Gauge tests on docker

Gauge can be easily installed on `Docker <https://www.docker.com/what-docker>`__ container.

Prerequisites
-------------

-  `Docker <https://docs.docker.com/engine/installation/>`__

Docker image for Gauge
----------------------

-  Create a ``Dockerfile`` file in your project root.
-  Add these lines in ``Dockerfile`` according to the platform on which
   you want to build.

.. code-block:: yaml
  :caption: DockerFile

    FROM ubuntu

    # Install Java.
    RUN apt-get update && apt-get install -q -y \
        default-jdk \
        sudo \
        apt-transport-https

    # Install gauge
    RUN apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 023EDB0B && \
        echo deb https://dl.bintray.com/gauge/gauge-deb stable main | sudo tee -a /etc/apt/sources.list

    RUN apt-get update && apt-get install gauge

    # Install gauge plugins
    RUN gauge install java && \
        gauge install screenshot

    ENV PATH=$HOME/.gauge:$PATH

Run Gauge specs on Docker
-------------------------

- Build the docker image tagged as test
    docker build . -t test

- Mount the docker image with the <project_directory> and run the specs in the container
    docker run -v `pwd`:/<project_directory> -w="/<project_directory>" test gauge run specs

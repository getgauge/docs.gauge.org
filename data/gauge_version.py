#!/usr/bin/env python3

# Makefile invokes this file

import json
import urllib.request

release_data = urllib.request.urlopen(
    "https://api.github.com/repos/getgauge/gauge/releases/latest").read()

# Tag name is in the format v1.x.x
tag_name = json.loads(release_data)["tag_name"]
release_version = tag_name[1:]

print(release_version)
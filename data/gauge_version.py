#!/usr/bin/env python3

# This file parses data from github release webhook
# to extract the current release version. The webhook
# hits a netlify endpoint with release data in an
# environment variable.

import json
import urllib.request

release_data = urllib.request.urlopen(
    "https://api.github.com/repos/getgauge/gauge/releases/latest").read()

# Tag name is in the format v1.x.x
tag_name = json.loads(release_data)["tag_name"]
release_version = tag_name[1:]

print(release_version)
import json
import os
import sys
from xml.etree import ElementTree as ET


def run(sitemap_xml):
    urls = []
    tree = ET.parse(os.path.abspath('./_build/sitemap.xml'))
    urls = [elem.text.lstrip()
            for elem in tree.iter() if elem.text is not None]
    write_urls(urls)

def write_urls(urls):
    f = open(os.path.abspath('./tests/accessibility-tests/urls.json'),"w+")
    f.write(json.dumps(urls))
    f.close()

if __name__ == "__main__":
    run(sys.argv[1])

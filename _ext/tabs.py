from docutils.parsers.rst import Directive, directives
from docutils import nodes
import re


class TabsContainerDirective(Directive):
    """
    Creates the tab container
    """

    has_content = True
    optional_arguments = 1

    def run(self):
        self.assert_has_content()
        text = '\n'.join(self.content)
        node = nodes.container(text)
        node['classes'].append('tabs')

        if self.arguments and self.arguments[0]:
            node['classes'].append(re.sub('[^0-9a-zA-Z]+', '-', self.arguments[0].lower()))

        self.add_name(node)
        self.state.nested_parse(self.content, self.content_offset, node)
        return [node]


class TabDirective(Directive):
    """
    Creates the tab
    """

    has_content = True
    required_arguments = 1  
    final_argument_whitespace = True

    def run(self):
        self.assert_has_content()
        text = '\n'.join(self.content)
        node = nodes.container(text)
        node['classes'].append('tab')
        node['ids'].append('tab-%s' % re.sub('[^0-9a-zA-Z]+', '-', self.arguments[0].lower()))

        par = nodes.paragraph(text=self.arguments[0])
        par['classes'].append('tab-title')
        node += par

        self.add_name(node)
        self.state.nested_parse(self.content, self.content_offset, node)
        return [node]

def setup(app):
    app.add_directive('tab',  TabDirective)
    app.add_directive('tab-container', TabsContainerDirective)
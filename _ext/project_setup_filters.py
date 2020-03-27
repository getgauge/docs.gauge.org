import random
import string

from docutils import nodes
from docutils.parsers.rst import Directive, directives
from docutils.statemachine import StringList

DISPLAY_SELECTION_MAP = {
    'Visual Studio Code': 'vscode',
    'IntelliJ IDEA': 'intellij',
    'C#': 'csharp',
    'JavaScript': 'javascript',
    'Java': 'java',
    'Python': 'python',
    'Ruby': 'ruby',
    'macOS': 'macos',
    'Linux': 'linux',
    'Windows': 'windows',
}


def create_random_id():
    return ''.join([random.choice(string.ascii_letters + string.digits) for n in range(10)])

class fieldset_node(nodes.Element):
    tagname = 'fieldset'


def visit_fieldset_node(self, node):
    self.body.append(node.starttag())


def depart_fieldset_node(self, node):
    self.body.append(node.endtag())



class heading_node(nodes.Element):
    tagname = 'h3'

def visit_heading_node(self, node):
    self.body.append(node.starttag())
    self.body.append(node.rawsource)

def depart_heading_node(self, node):
    self.body.append(node.endtag())


class top_heading_node(nodes.Element):
    tagname = 'h2'


def visit_top_heading_node(self, node):
    self.body.append(node.starttag())
    self.body.append(node.rawsource)


def depart_top_heading_node(self, node):
    self.body.append(node.endtag())


class input_node(nodes.Element):
    pass


def visit_input_node(self, node):
    attrs = ''
    text = ''
    for attr in node.attlist():
        attrs += attr[0] + "=" + '"' + attr[1] + '"'
    tmpl = """
    <label class="radio-container" for="{0}">
        <span class="circle"></span>
        <span class="selection-text">{1}</span>
        <input id="{0}" {2}>
        <span class="checkmark"></span>
    </label>
    """
    label_id = create_random_id()
    self.body.append(tmpl.format(label_id, node.rawsource, attrs))


def depart_input_node(self, node):
    pass


class SetupFiltersDirective(Directive):
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {'section_name': directives.unchanged}
    has_content = True

    def run(self):
        options = self.options
        wrapper = nodes.container()
        wrapper['classes'].append(options['section_name'])
        node = nodes.container()
        node['classes'].append('selections')
        self.state.nested_parse(self.content, self.content_offset, node)
        buttons_container = nodes.container()
        buttons_container['classes'].append('filter-actions')
        for button_text in ['Cancel', 'Modify']:
            button_container = nodes.container()
            class_name = '-'.join(button_text.lower().split(' '))
            button_container['classes'].append(class_name)
            button_container['classes'].append('filter-action')
            button = heading_node(button_text)
            button.tagname = 'h3'
            button_container.append(button)
            buttons_container += button_container
        wrapper += top_heading_node('Choose your setup')
        horizontal_line = nodes.container()
        horizontal_line['classes'] = ['horizontal-line']
        wrapper += horizontal_line
        wrapper += node
        wrapper += buttons_container
        return [wrapper]


class SetupFilterDirective(Directive):
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {'title': directives.unchanged,
                   'type': directives.unchanged,
                   'class': directives.unchanged,
                   'selected': directives.unchanged}
    has_content = True

    def run(self):
        options = self.options
        container = fieldset_node()
        container['class'] = ' '.join([options['class'],"docutils", "contianer" ])
        heading = heading_node(options['title'])
        heading.tagname = "legend"
        container += heading
        for content in self.content:
            _input = input_node(content)
            _input['type'] = 'radio'
            _input['name'] = options['type']
            _input['value'] = DISPLAY_SELECTION_MAP[content]
            if content == options['selected']:
                _input['checked'] = 'true'
            container += _input
        return [container]


def setup(app):

    app.add_node(top_heading_node, html=(
        visit_top_heading_node, depart_top_heading_node))
    app.add_node(heading_node, html=(visit_heading_node, depart_heading_node))
    app.add_node(input_node,  html=(visit_input_node, depart_input_node))
    app.add_node(fieldset_node,  html=(visit_fieldset_node, depart_fieldset_node))
    app.add_directive('setupfilters', SetupFiltersDirective)
    app.add_directive('setupfilter', SetupFilterDirective)

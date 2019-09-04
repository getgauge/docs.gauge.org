from docutils import nodes
from docutils.parsers.rst import Directive, directives
from docutils.statemachine import StringList

DISPLAY_SELECTION_MAP = {
    'Visual Studio Code': 'vscode',
    'Visual Studio': 'visualstudio',
    'IntelliJ IDEA': 'intellij',
    'C#': 'csharp',
    'Javascript': 'javascript',
    'Java': 'java',
    'Python': 'python',
    'Ruby': 'ruby',
    'MacOS': 'macos',
    'Linux': 'linux',
    'Windows': 'windows',
}


class setup_heading_node(nodes.Element):
    tagname = 'h2'


def visit_setup_heading_node(self, node):
    self.body.append(node.starttag())
    self.body.append(node.rawsource)


def depart_setup_heading_node(self, node):
    self.body.append(node.endtag())


class setup_input_node(nodes.Element):
    pass


def visit_setup_input_node(self, node):
    attrs = ''
    text = ''
    for attr in node.attlist():
        attrs += attr[0] + "=" + '"' + attr[1] + '"'
    tmpl = """
    <label class="radioContainer">
        <span class="circle"></span>
        <span class="selection-icon selection-icon-{}"></span>
        {}
        <input class="search getting-started-radios" {}>
        <span class="checkmark"></span>
    </label>
    """
    self.body.append(tmpl.format(
        normalize(node.rawsource), node.rawsource, attrs))


def depart_setup_input_node(self, node):
    pass


def normalize(param):
    selectionName = DISPLAY_SELECTION_MAP.get(param)
    return param.replace(" ", "").lower() if selectionName is None else selectionName


class InstallationSelections(Directive):
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {'setup-section': directives.unchanged}
    has_content = True

    def run(self):
        options = self.options
        wrapper = nodes.container()
        wrapper['classes'].append(options['setup-section'])
        node = nodes.container()
        node['classes'].append('setup-selections')
        self.state.nested_parse(self.content, self.content_offset, node)
        buttons_container = nodes.container()
        wrapper += node
        wrapper += buttons_container
        return [wrapper]


class InstallationSelection(Directive):
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {'title': directives.unchanged,
                   'type': directives.unchanged,
                   'class': directives.unchanged}
    has_content = True

    def run(self):
        options = self.options
        container = nodes.container()
        container['classes'].append(options['class'])
        heading = setup_heading_node(options['title'])
        container += heading
        for content in self.content:
            _input = setup_input_node(content)
            _input['type'] = 'radio'
            _input['name'] = options['type']
            _input['value'] = normalize(content)
            container += _input
        return [container]


def setup(app):

    app.add_node(setup_heading_node, html=(
        visit_setup_heading_node, depart_setup_heading_node))
    app.add_node(setup_input_node, html=(
        visit_setup_input_node, depart_setup_input_node))

    app.add_directive('installationselections', InstallationSelections)
    app.add_directive('installationselection', InstallationSelection)

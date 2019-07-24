from sphinx.writers.html import HTMLTranslator
from os import environ
from sphinx.directives import CodeBlock


class Highlighter(object):
    def __init__(self, highlighter):
        self.highlighter = highlighter
        self.node_id = None

    def set_node_id(self, node_id):
        self.node_id = node_id

    def highlight_block(self, *args, **kwargs):
        if self.node_id:
            kwargs.setdefault('lineanchors', self.node_id)
            kwargs.setdefault('anchorlinenos', True)

        return self.highlighter.highlight_block(*args, **kwargs)


class AnchorLineNoHTMLTranslator(HTMLTranslator):
    def __init__(self, builder, *args, **kwargs):
        HTMLTranslator.__init__(self, builder, *args, **kwargs)
        self.highlighter = Highlighter(builder.highlighter)

    def visit_literal_block(self, node):
        if node['ids']:
            self.highlighter.set_node_id(node['ids'][0])
        else:
            self.highlighter.set_node_id(None)

        HTMLTranslator.visit_literal_block(self, node)

    def visit_reference(self, node):
        if node.hasattr('refuri') and node['refuri'].find('GAUGE_LATEST_VERSION_PLACEHOLDER') >= 0:
            refuri = node.attributes['refuri']
            node.attributes['refuri'] = refuri.replace('GAUGE_LATEST_VERSION_PLACEHOLDER', environ.get('GAUGE_LATEST_VERSION'))
        HTMLTranslator.visit_reference(self, node)

def setup(app):
    app.set_translator('html', AnchorLineNoHTMLTranslator)
    app.add_directive('custom-code-block', CustomCodeBlock)


class CustomCodeBlock(CodeBlock):
    def run(self):
        if environ.get('GAUGE_LATEST_VERSION') == None:
            raise Exception("Please set GAUGE_LATEST_VERSION env variable")
        self.content.replace('GAUGE_LATEST_VERSION_PLACEHOLDER', environ.get('GAUGE_LATEST_VERSION'))
        return super().run()
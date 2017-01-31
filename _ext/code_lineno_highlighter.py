from sphinx.writers.html import HTMLTranslator


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


def setup(app):
    app.set_translator('html', AnchorLineNoHTMLTranslator)
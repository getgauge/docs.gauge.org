from pygments.lexer import RegexLexer, bygroups, include
from pygments.token import *


__url__             = "https://github.com/getgauge/docs.gauge.org"
__version__         = "0.0.1"
__license__         = "GPL v3"
__author__          = "sriv"
__keywords__        = "getgauge markdown lexing"


def setup(app):
    """ Initializer for Sphinx extension API.
        See http://www.sphinx-doc.org/en/stable/extdev/index.html#dev-extensions.
    """
    app.add_lexer("gauge", GaugeLexer)
    return dict(version=__version__)


__all__ = ['GaugeLexer', 'setup']

class GaugeLexer(RegexLexer):
    name = 'Gauge'
    aliases = ['gauge']
    filenames = ['*.spec', '*.cpt']

    tokens = {
        'root': [
            # Spec
            (r'^(# )(.+?)( #)?(\n)', Keyword),
            (r'^(={3,}\n)?(\S.{2,}\n)(={3,})(\n)', Keyword),

            # Scenario
            (r'^(#{2,6} )(.+?)( #{2,6})?(\n)', Name.Class),
            (r'^(-{3,}\n)?(\S.{2,}\n)(-{3,})(\n)', Name.Class),

            (r'\*', Name.Function, 'step'),
            # Tags
            (r' *Tags:.*[\n].*', Name.Tag),
            # Horizontal rule
            (r'^\s*\n(?:\s*[-*_]){3,}\s*\n', Keyword),

            (r'.*\n', Name.Variable),
        ],
        'step': [
            (r'[^<"|]', Name.Function),
            (r'[<"]', Literal, 'parameter'),
            (r'\|[^\|]*', Literal, 'table_parameter')
        ],
        'parameter': [
            (r'[^>"]', Literal),
            (r'[>"]', Literal, "#pop"),
        ],
        'table_parameter': [
            include('table')
        ],
        'table': [
            (r'\s*\|([^|]*\|)+\n', Literal)
        ]
    }

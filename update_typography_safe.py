import re

with open('css/typography.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Change all heavy/regular weights to 300 for Barques classes
replacements = [
    (r'(body \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-hero \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-display \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-heading \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-subhead \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-body \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    # Also change the label and caption fonts to Barques, and set weight to 300
    (r'(\.type-label \{.*?font-family:)[^;]+;', r"\1 'Barques', 'Helvetica Neue', sans-serif;"),
    (r'(\.type-label \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-caption \{.*?font-family:)[^;]+;', r"\1 'Barques', 'Helvetica Neue', sans-serif;"),
    (r'(\.type-caption \{.*?font-weight:)\s*\d+;', r'\1 300;'),
]

for pattern, replacement in replacements:
    css = re.sub(pattern, replacement, css, flags=re.DOTALL | re.IGNORECASE)

# 2. Add Book Antiqua global for em, i
css = css.replace(".u-italic   { font-family: 'Book Antiqua', Georgia, serif; font-style: italic; }", 
                  "em, i, .u-italic { font-family: 'Book Antiqua', Georgia, serif; font-style: italic; font-weight: 400; }")

with open('css/typography.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Typography updated without stripping layout-critical letter spacing.")

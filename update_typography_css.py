import re

with open('css/typography.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Change all font-weights to 300 except for Book Antiqua (which is 400)
# Let's target specific selectors to be safe

replacements = [
    (r'(body \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-hero \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-display \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-heading \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-subhead \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-body \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-label \{.*?font-family:)[^;]+;', r"\1 'Barques', 'Helvetica Neue', sans-serif;"),
    (r'(\.type-label \{.*?font-weight:)\s*\d+;', r'\1 300;'),
    (r'(\.type-caption \{.*?font-family:)[^;]+;', r"\1 'Barques', 'Helvetica Neue', sans-serif;"),
    (r'(\.type-caption \{.*?font-weight:)\s*\d+;', r'\1 300;'),
]

for pattern, replacement in replacements:
    css = re.sub(pattern, replacement, css, flags=re.DOTALL | re.IGNORECASE)

with open('css/typography.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Typography CSS updated.")

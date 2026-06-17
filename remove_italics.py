import glob
import os

html_files = glob.glob('**/*.html', recursive=True)

for filepath in html_files:
    # Skip node_modules or other unrelated directories if any, though not expected here
    if 'node_modules' in filepath:
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove em tags for 'we', 'story', and 'People'
    content = content.replace('Who are <em>we</em>?', 'Who are we?')
    content = content.replace('Who are <em>we</em> ?', 'Who are we ?')
    content = content.replace('Our <em>story</em>', 'Our story')
    content = content.replace('Our <em>Story</em>', 'Our Story')
    content = content.replace('Our <em>People</em>', 'Our People')
    content = content.replace('Our <em>people</em>', 'Our people')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(html_files)} HTML files.")

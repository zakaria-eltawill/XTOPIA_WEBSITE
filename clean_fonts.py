import re
import glob
import os

css_files = glob.glob('css/*.css')

for file in css_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace Acumin Variable Concept with Barques
    content = content.replace("'Acumin Variable Concept', sans-serif", "'Barques', sans-serif")
    content = content.replace("'Acumin Variable Concept'", "'Barques', sans-serif")
    content = content.replace("font-family: 'Barques';", "font-family: 'Barques', sans-serif;")

    # 2. Change all font-weights to 300, EXCEPT we don't mess with Book Antiqua in typography.css
    if 'typography.css' not in file:
        content = re.sub(r'font-weight:\s*(100|200|400|500|600|700|800|900|bold|normal);', r'font-weight: 300;', content, flags=re.IGNORECASE)
    
    # 3. Remove letter-spacing anomalies and uppercase text transforms
    # A lot of these display elements had letter-spacing: 0.2em; text-transform: uppercase;
    content = re.sub(r'letter-spacing:\s*[-0-9\.]+e?m?;', '', content)
    content = re.sub(r'text-transform:\s*uppercase;', '', content, flags=re.IGNORECASE)
    content = re.sub(r'font-variant[-a-z]*:\s*[^;]+;', '', content, flags=re.IGNORECASE)
    content = re.sub(r'font-feature-settings:\s*[^;]+;', '', content, flags=re.IGNORECASE)

    # Clean up empty rules or stray spaces left behind
    content = content.replace('  ', ' ')
    content = content.replace('; ;', ';')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("CSS files updated for clean Barques Light typography.")

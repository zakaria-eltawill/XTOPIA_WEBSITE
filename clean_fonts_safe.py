import re
import glob

css_files = glob.glob('css/*.css')

for file in css_files:
    if 'typography.css' in file:
        continue

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace Acumin Variable Concept with Barques
    content = content.replace("'Acumin Variable Concept', sans-serif", "'Barques', sans-serif")
    content = content.replace("'Acumin Variable Concept'", "'Barques', sans-serif")
    content = content.replace("font-family: 'Barques';", "font-family: 'Barques', sans-serif;")

    # Change heavy/bold weights to 300
    content = re.sub(r'font-weight:\s*(400|500|600|700|800|900|bold);', r'font-weight: 300;', content, flags=re.IGNORECASE)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Safe font cleanup complete.")

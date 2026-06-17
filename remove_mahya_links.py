import os
import re

files_to_process = [
    "index.html",
    "about.html",
    "community.html",
    "contact.html",
    "projects.html",
    "verticals.html",
    "verticals/befit.html",
    "verticals/beyond.html",
    "verticals/developments.html",
    "verticals/mahya.html",
    "verticals/trofi.html"
]

for file_path in files_to_process:
    full_path = os.path.join(r"c:\Users\Zakar\OneDrive\Desktop\XTOPIA Website", file_path)
    if not os.path.exists(full_path):
        continue
    
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Remove from desktop nav
    content = re.sub(r'\s*<a class="dropdown__sub-link" href="[^"]*mahya\.html">Neighborhood Parks</a>', '', content)
    # 2. Remove from mobile nav
    content = re.sub(r'\s*<a href="[^"]*mahya\.html">Neighborhood Parks</a>', '', content)
    # 3. Remove from footer
    content = re.sub(r'<a href="[^"]*mahya\.html">MAHYA</a>', '', content)
    
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Nav and Footer global links for Mahya removed.")

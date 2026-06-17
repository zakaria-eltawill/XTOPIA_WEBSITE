import os
import re

# Delete projects.html
if os.path.exists('projects.html'):
    os.remove('projects.html')

with open('about.html', 'r', encoding='utf-8') as f:
    about = f.read()
about = re.sub(r'<div class="u-center" style="margin-top:3\.5rem;" data-reveal="fade">\s*<a class="btn btn--pill" href="projects\.html">Explore our projects.*?</a>\s*</div>', '', about, flags=re.DOTALL)
with open('about.html', 'w', encoding='utf-8') as f:
    f.write(about)

with open('index.html', 'r', encoding='utf-8') as f:
    index = f.read()
index = re.sub(r'<a class="btn btn--pill" href="projects\.html"[^>]*>View Project <span class="btn__arrow">→</span></a>', '', index)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index)

with open('verticals/developments.html', 'r', encoding='utf-8') as f:
    dev = f.read()

# Convert links to divs
dev = re.sub(r'<a class="proj-card" href="\.\./projects\.html"(.*?)>(.*?)</a>', r'<div class="proj-card"\1>\2</div>', dev, flags=re.DOTALL)

# Remove "View all projects" button
dev = re.sub(r'<div class="u-center" style="margin-top:3rem;"><a class="btn btn--pill" href="\.\./projects\.html">View all projects.*?</a></div>', '', dev, flags=re.DOTALL)

with open('verticals/developments.html', 'w', encoding='utf-8') as f:
    f.write(dev)

print("Removed all projects links")

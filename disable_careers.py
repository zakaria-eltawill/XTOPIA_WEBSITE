import glob
import os

html_files = glob.glob('**/*.html', recursive=True)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Navbar link (root)
    content = content.replace('<a class="nav__link" href="contact.html">Careers</a>', '<a class="nav__link" href="javascript:void(0)" style="cursor:default;">Careers</a>')
    # Navbar link (verticals)
    content = content.replace('<a class="nav__link" href="../contact.html">Careers</a>', '<a class="nav__link" href="javascript:void(0)" style="cursor:default;">Careers</a>')
    
    # Mobile overlay link (root)
    content = content.replace('<a href="contact.html" class="nav-overlay__trigger" style="text-decoration:none;"><span>03</span>Careers</a>', '<a href="javascript:void(0)" class="nav-overlay__trigger" style="text-decoration:none; cursor:default;"><span>03</span>Careers</a>')
    # Mobile overlay link (verticals)
    content = content.replace('<a href="../contact.html" class="nav-overlay__trigger" style="text-decoration:none;"><span>03</span>Careers</a>', '<a href="javascript:void(0)" class="nav-overlay__trigger" style="text-decoration:none; cursor:default;"><span>03</span>Careers</a>')
    
    # Footer link (root)
    content = content.replace('<a href="contact.html">Careers</a>', '<a href="javascript:void(0)" style="cursor:default;">Careers</a>')
    # Footer link (verticals)
    content = content.replace('<a href="../contact.html">Careers</a>', '<a href="javascript:void(0)" style="cursor:default;">Careers</a>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Careers links disabled successfully.")

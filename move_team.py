import os
import glob

with open('about.html', 'r', encoding='utf-8') as f:
    about_html = f.read()

# Find team section
team_start = about_html.find('<!-- ============ 2.5 BOARD & LEADERSHIP ============ -->')
team_end = about_html.find('</main>', team_start)
team_section = about_html[team_start:team_end]

# Find where to cut (after about hero)
hero_end = about_html.find('<!-- ============ 2.2 PHILOSOPHY ============ -->')

people_html = about_html[:hero_end] + team_section + about_html[team_end:]

# Replace strings for people.html
people_html = people_html.replace('<title>XTOPIA — About · Anchoring Community First</title>', '<title>XTOPIA — Our People</title>')
people_html = people_html.replace('Who We Are', 'Our People')
people_html = people_html.replace('WE ARE<br />XTOPIA.', 'MEET<br />THE TEAM.')
people_html = people_html.replace('''We believe the future is built through connection. Not by working alone, but by creating
          together — bringing diverse minds, ideas, and energies into one ecosystem to shape meaningful
          experiences and lasting impact.''', 'The brilliant minds driving XTOPIA\'s ecosystem.')
people_html = people_html.replace('Meet the team <span class="btn__arrow">↓</span>', 'Explore <span class="btn__arrow">↓</span>')

with open('people.html', 'w', encoding='utf-8') as f:
    f.write(people_html)

# Remove team section from about.html
new_about_html = about_html[:team_start] + about_html[team_end:]
with open('about.html', 'w', encoding='utf-8') as f:
    f.write(new_about_html)

# Update links
html_files = glob.glob('**/*.html', recursive=True)
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple replace
    content = content.replace('about.html#team', 'people.html')
    content = content.replace('../about.html#team', '../people.html')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done.")

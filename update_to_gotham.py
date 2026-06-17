import re
import glob

def process_css_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We skip Book Antiqua and Acumin (if any remain) implicitly by targeting Barques
    # Replace global usage of Barques with Gotham
    content = content.replace("'Barques', 'Helvetica Neue', Arial, sans-serif", "'Gotham', 'Helvetica Neue', Arial, sans-serif")
    content = content.replace("'Barques', 'Helvetica Neue', sans-serif", "'Gotham', 'Helvetica Neue', sans-serif")
    content = content.replace("'Barques', sans-serif", "'Gotham', sans-serif")
    
    # Optical Sizing Adjustments in typography.css
    if 'typography.css' in filepath:
        # scale down clamp values by roughly ~5-8% for Gotham
        content = content.replace('clamp(38px, 5.2vw, 96px)', 'clamp(36px, 4.9vw, 90px)')
        content = content.replace('clamp(44px, 7vw, 120px)', 'clamp(40px, 6.6vw, 110px)')
        content = content.replace('clamp(30px, 4vw, 64px)', 'clamp(28px, 3.8vw, 60px)')
        # mobile scale down
        content = content.replace('clamp(1.55rem, 8.6vw, 2.7rem)', 'clamp(1.4rem, 8vw, 2.5rem)')
        content = content.replace('clamp(1.7rem, 8vw, 2.7rem)', 'clamp(1.6rem, 7.6vw, 2.5rem)')
        content = content.replace('clamp(1.5rem, 6.5vw, 2.3rem)', 'clamp(1.4rem, 6vw, 2.1rem)')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

css_files = glob.glob('css/*.css')
for f in css_files:
    process_css_file(f)

# Append specific exceptions for the flip section at the end of sections.css
with open('css/sections.css', 'a', encoding='utf-8') as f:
    f.write("\n\n/* ============================================================\n")
    f.write("   FLIP SECTION EXCEPTION (Strictly protected Barques font)\n")
    f.write("   ============================================================ */\n")
    f.write(".flip__a .type-display {\n")
    f.write("  font-family: 'Barques', sans-serif;\n")
    f.write("  font-size: clamp(44px, 7vw, 120px);\n")
    f.write("}\n")
    f.write(".flip__b .type-hero {\n")
    f.write("  font-family: 'Barques', sans-serif;\n")
    f.write("  font-size: clamp(38px, 5.2vw, 96px);\n")
    f.write("}\n")
    f.write("@media (max-width: 600px) {\n")
    f.write("  .flip__a .type-display { font-size: clamp(1.7rem, 8vw, 2.7rem); }\n")
    f.write("  .flip__b .type-hero { font-size: clamp(1.55rem, 8.6vw, 2.7rem); }\n")
    f.write("}\n")

print("Gotham refactor completed successfully.")

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

nav_template = """  <!-- ============ NAV ============ -->
  <header class="nav" data-nav>
    <a class="nav__logo" href="{prefix}index.html" aria-label="XTOPIA home">
      <img src="{prefix}assets/images/logos/brand/logo-xtopia-wordmark-white-outline.png" alt="XTOPIA" />
    </a>
    <nav class="nav__links" aria-label="Primary">
      <div class="nav__item dropdown">
        <a class="nav__link{about_active}" href="{prefix}about.html">About</a>
        <div class="dropdown__menu">
          <a class="dropdown__sub-link" href="{prefix}community.html">Our story</a>
          <a class="dropdown__sub-link" href="{prefix}about.html#framework-deep">Our value</a>
          <a class="dropdown__sub-link" href="{prefix}about.html#presence">Our footprint</a>
        </div>
      </div>
      <div class="nav__item dropdown">
        <a class="nav__link{ecosystem_active}" href="{prefix}verticals.html">Our Ecosystem</a>
        <div class="dropdown__menu">
          <a class="dropdown__sub-link" href="{v_prefix}trofi.html">F&amp;B</a>
          <a class="dropdown__sub-link" href="{v_prefix}befit.html">Sports &amp; Wellness</a>
          <a class="dropdown__sub-link" href="{v_prefix}developments.html">Developments</a>
          <a class="dropdown__sub-link" href="{v_prefix}mahya.html">Neighborhood Parks</a>
          <a class="dropdown__sub-link" href="{v_prefix}beyond.html">Activations</a>
        </div>
      </div>
      <div class="nav__item">
        <a class="nav__link{careers_active}" href="{prefix}contact.html">Careers</a>
      </div>
      <div class="nav__item">
        <a class="nav__link" href="{prefix}about.html#team">People</a>
      </div>
      <div class="nav__item dropdown">
        <a class="nav__cta{contact_active}" href="{prefix}contact.html">Contact <span aria-hidden="true">→</span></a>
        <div class="dropdown__menu">
          <a class="dropdown__sub-link" href="mailto:info@xtopia.com">Email</a>
          <a class="dropdown__sub-link" href="{prefix}contact.html#map">Map</a>
          <a class="dropdown__sub-link" href="{prefix}contact.html#form">Contact Form</a>
          <a class="dropdown__sub-link" href="{prefix}contact.html#info">Company Information</a>
          <a class="dropdown__sub-link" href="{prefix}contact.html#social">Social Links</a>
        </div>
      </div>
    </nav>
    <button class="nav__burger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span>
    </button>
  </header>

  <!-- ============ MOBILE OVERLAY MENU ============ -->
  <div class="nav-overlay" data-overlay>
    <div class="nav-overlay__item-wrap">
      <button class="nav-overlay__trigger"><span>01</span>About <span class="arrow">↓</span></button>
      <div class="nav-overlay__sub">
        <a href="{prefix}community.html">Our story</a>
        <a href="{prefix}about.html#framework-deep">Our value</a>
        <a href="{prefix}about.html#presence">Our footprint</a>
      </div>
    </div>
    <div class="nav-overlay__item-wrap">
      <button class="nav-overlay__trigger"><span>02</span>Our Ecosystem <span class="arrow">↓</span></button>
      <div class="nav-overlay__sub">
        <a href="{v_prefix}trofi.html">F&amp;B</a>
        <a href="{v_prefix}befit.html">Sports &amp; Wellness</a>
        <a href="{v_prefix}developments.html">Developments</a>
        <a href="{v_prefix}mahya.html">Neighborhood Parks</a>
        <a href="{v_prefix}beyond.html">Activations</a>
      </div>
    </div>
    <div class="nav-overlay__item-wrap">
      <a href="{prefix}contact.html" class="nav-overlay__trigger" style="text-decoration:none;"><span>03</span>Careers</a>
    </div>
    <div class="nav-overlay__item-wrap">
      <a href="{prefix}about.html#team" class="nav-overlay__trigger" style="text-decoration:none;"><span>04</span>People</a>
    </div>
    <div class="nav-overlay__item-wrap">
      <button class="nav-overlay__trigger"><span>05</span>Contact <span class="arrow">↓</span></button>
      <div class="nav-overlay__sub">
        <a href="mailto:info@xtopia.com">Email</a>
        <a href="{prefix}contact.html#map">Map</a>
        <a href="{prefix}contact.html#form">Contact Form</a>
        <a href="{prefix}contact.html#info">Company Information</a>
        <a href="{prefix}contact.html#social">Social Links</a>
      </div>
    </div>
  </div>

"""

for file_path in files_to_process:
    full_path = os.path.join(r"c:\Users\Zakar\OneDrive\Desktop\XTOPIA Website", file_path)
    if not os.path.exists(full_path):
        print(f"File not found: {full_path}")
        continue
    
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    prefix = "../" if file_path.startswith("verticals/") else ""
    v_prefix = "" if file_path.startswith("verticals/") else "verticals/"
    
    about_active = " is-active" if file_path == "about.html" else ""
    ecosystem_active = " is-active" if file_path.startswith("verticals") else ""
    careers_active = ""
    contact_active = " is-active" if file_path == "contact.html" else ""
    
    replacement = nav_template.format(
        prefix=prefix,
        v_prefix=v_prefix,
        about_active=about_active,
        ecosystem_active=ecosystem_active,
        careers_active=careers_active,
        contact_active=contact_active
    )
    
    # Regex to find from <!-- ============ NAV ============ --> to just before <main>
    pattern = re.compile(r'<!-- ============ NAV ============ -->.*?(?=<main>)', re.DOTALL)
    new_content = pattern.sub(replacement, content)
    
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)

print("Navbar replacement complete.")

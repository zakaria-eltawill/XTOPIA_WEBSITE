#!/usr/bin/env python3
"""
Sync shared nav / nav-overlay / footer markup from partials/ into every page.

Each page must contain the three marker pairs:
  <!-- @nav:start -->          ... <!-- @nav:end -->
  <!-- @nav-overlay:start -->  ... <!-- @nav-overlay:end -->
  <!-- @footer:start -->       ... <!-- @footer:end -->

Content between a pair is replaced wholesale with the matching partials/*.html
file. For pages under verticals/, every local href="..."/src="..." in the
partial is rewritten with a "../" prefix (absolute URLs, mailto:, tel:,
javascript:, "#..." fragments, and paths already starting with "../" are left
alone).

Run: python tools/sync-partials.py
Idempotent: running it twice produces no further changes.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARTIALS_DIR = ROOT / "partials"

PAGES = [
    "index.html", "about.html", "verticals.html", "careers.html",
    "people.html", "contact.html",
    "verticals/befit.html", "verticals/beyond.html",
    "verticals/developments.html", "verticals/trofi.html",
    # add verticals/mhya.html, arada.html, xeed.html once those pages exist
]

MARKERS = {
    "nav": ("nav.html", "@nav:start", "@nav:end"),
    "nav-overlay": ("nav-overlay.html", "@nav-overlay:start", "@nav-overlay:end"),
    # footer not synced yet on this branch (old-design-new-content)
}

_ATTR_RE = re.compile(r'(src|href)="([^"]*)"')
_SKIP_RE = re.compile(r'^(https?:|mailto:|tel:|javascript:|#|\.\./)')


def rewrite_for_subdir(html: str) -> str:
    """Prefix local src/href paths with ../ for pages one level deep (verticals/)."""
    def repl(m: "re.Match[str]") -> str:
        attr, val = m.group(1), m.group(2)
        if not val or _SKIP_RE.match(val):
            return m.group(0)
        return f'{attr}="../{val}"'
    return _ATTR_RE.sub(repl, html)


def load_partial(name: str, is_nested: bool) -> str:
    filename, _, _ = MARKERS[name]
    content = (PARTIALS_DIR / filename).read_text(encoding="utf-8").strip()
    if is_nested:
        content = rewrite_for_subdir(content)
    return content


def sync_page(rel_path: str) -> bool:
    path = ROOT / rel_path
    if not path.exists():
        print(f"skip (missing): {rel_path}")
        return False

    text = path.read_text(encoding="utf-8")
    original = text
    is_nested = Path(rel_path).parent.name == "verticals"

    for name, (_, start_marker, end_marker) in MARKERS.items():
        pattern = re.compile(
            re.escape(f"<!-- {start_marker} -->") + r".*?" + re.escape(f"<!-- {end_marker} -->"),
            re.DOTALL,
        )
        if not pattern.search(text):
            print(f"  ! {rel_path}: markers for '{name}' not found — skipped")
            continue
        block = load_partial(name, is_nested)
        replacement = f"<!-- {start_marker} -->\n{block}\n<!-- {end_marker} -->"
        text = pattern.sub(lambda _m: replacement, text, count=1)

    if text != original:
        path.write_bytes(text.encode("utf-8"))  # keep LF line endings on Windows
        print(f"updated  {rel_path}")
        return True
    print(f"unchanged {rel_path}")
    return False


def main() -> int:
    any_changed = False
    for rel_path in PAGES:
        if sync_page(rel_path):
            any_changed = True
    print("\nDone." + (" (some pages updated)" if any_changed else " (nothing to update — already in sync)"))
    return 0


if __name__ == "__main__":
    sys.exit(main())

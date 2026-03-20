# AutoRemoveLite

A lightweight Deluge plugin that automatically removes seeding torrents — along with their data — after a configurable period of time.

---

## Why

Existing auto-remove plugins for Deluge are either abandoned, broken on Deluge 2.x / Python 3, or bloated with options most users will never touch. The most common need is straightforward: **automatically delete a torrent and its files after it has been seeding for X hours**, so your download folder doesn't fill up with content you've long forgotten about.

AutoRemoveLite does exactly that — nothing more, nothing less.

---

## Features

- Removes completed torrents **along with their downloaded data** once the seed time threshold is reached
- Runs an automatic check **every hour** in the background — no client needs to be connected
- Configured directly from the Deluge **Preferences** panel (web UI)
- Clean, minimal codebase — easy to audit and maintain

---

## Requirements

- Deluge 2.x
- Python 3.6+

---

## Installation

### Option A — Download prebuilt egg (recommended)

Download the latest `.egg` file from the [Releases](../../releases/latest) page.

### Option B — Build from source

```bash
pip install setuptools
python setup.py bdist_egg
```

The built `.egg` file will appear in the `dist/` directory.

---

### Copy to your Deluge plugins folder

| Setup | Plugins folder |
|---|---|
| Linux | `~/.config/deluge/plugins/` |
| Docker (linuxserver/deluge) | `<config volume>/plugins/` |
| Windows | `%APPDATA%\deluge\plugins\` |

### Enable in Deluge

1. Open the Deluge web UI
2. Go to **Preferences → Plugins**
3. Enable **AutoRemoveLite**
4. Go to **Preferences → AutoRemoveLite** and set your desired seed time

---

## Configuration

| Setting | Description | Default |
|---|---|---|
| Seed time (hours) | Hours a torrent must be seeding before it is automatically removed | `720` |

Configuration is persisted to `autoremovelite.conf` in your Deluge config directory.

---
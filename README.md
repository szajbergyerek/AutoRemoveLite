# AutoRemoveLite

A lightweight Deluge plugin that automatically removes torrents — along with their data — after a configurable seeding period.

## Motivation

Several auto-remove plugins exist for Deluge, but most of them are abandoned, incompatible with Deluge 2.x / Python 3, or packed with features that the vast majority of users will never need. The common use case is simple: *remove a torrent and its files automatically after it has been seeding for X hours*, so finished torrents don't pile up and consume disk space indefinitely.

AutoRemoveLite does exactly that — nothing more, nothing less.

## Features

- Removes seeding torrents **with their data** after a configurable number of hours
- Checks every hour automatically — no manual intervention needed
- Configurable directly from the Deluge **Preferences** panel (web UI)
- Minimal codebase, easy to audit and maintain

## Requirements

- Deluge 2.x
- Python 3.6+

## Installation

### 1. Build the egg

```bash
pip install setuptools
python setup.py bdist_egg
```

The built `.egg` file will appear in the `dist/` directory.

### 2. Copy to your Deluge plugins folder

Copy the `.egg` file to the Deluge plugins directory. The location depends on your setup:

| Setup | Plugins folder |
|---|---|
| Linux (default) | `~/.config/deluge/plugins/` |
| Docker (linuxserver/deluge) | `<your config volume>/plugins/` |
| Windows | `%APPDATA%\deluge\plugins\` |

### 3. Enable the plugin

1. Open the Deluge web UI
2. Go to **Preferences → Plugins**
3. Enable **AutoRemoveLite**
4. Go to **Preferences → AutoRemoveLite** and set your desired seed time

## Configuration

| Setting | Description | Default |
|---|---|---|
| Seed time (hours) | How many hours a torrent must be seeding before it is removed | `72` |

Configuration is saved to `autoremovelite.conf` in your Deluge config directory.

## How it works

Once enabled, the plugin checks all torrents every hour. Any torrent that has completed downloading and has been seeding for at least the configured number of hours is removed, including its downloaded files.

The check runs in the background on the Deluge daemon — no client needs to be connected.

## License

MIT

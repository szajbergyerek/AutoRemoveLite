import logging

import deluge.component as component
import deluge.configmanager
from deluge.core.rpcserver import export
from deluge.plugins.pluginbase import CorePluginBase
from twisted.internet import task

log = logging.getLogger(__name__)

DEFAULT_PREFS = {
    "seed_time": 72,
}

CHECK_INTERVAL_SECONDS = 3600


class Core(CorePluginBase):
    def enable(self) -> None:
        """
        Enable the plugin and start the hourly check loop.
        """
        self.config = deluge.configmanager.ConfigManager(
            "autoremovelite.conf", DEFAULT_PREFS
        )
        self._timer = task.LoopingCall(self._check_torrents)
        self._timer.start(CHECK_INTERVAL_SECONDS, now=False)
        log.info("AutoRemoveLite enabled, checking every hour")

    def disable(self) -> None:
        """
        Disable the plugin and stop the check loop.
        """
        if self._timer.running:
            self._timer.stop()
        log.info("AutoRemoveLite disabled")

    def update(self) -> None:
        """
        Called by Deluge on each update tick. Not used.
        """
        pass

    def _check_torrents(self) -> None:
        """
        Check all seeding torrents and remove those that exceeded the configured seed time.
        Torrents are removed along with their data.
        """
        seed_time_seconds = self.config["seed_time"] * 3600
        torrent_manager = component.get("TorrentManager")

        to_remove = []
        for torrent_id, torrent in list(torrent_manager.torrents.items()):
            status = torrent.get_status(["seeding_time", "is_seed", "name"])
            if status["is_seed"] and status["seeding_time"] >= seed_time_seconds:
                to_remove.append((torrent_id, status["name"], status["seeding_time"]))

        for torrent_id, name, seeding_time in to_remove:
            hours = seeding_time / 3600
            log.info(
                "AutoRemoveLite: removing '%s' after %.1f hours of seeding", name, hours
            )
            torrent_manager.remove(torrent_id, remove_data=True)

    @export
    def get_config(self) -> dict:
        """
        Return the current plugin configuration.

        :return: Dict with plugin settings.
        """
        return self.config.config

    @export
    def set_config(self, config: dict) -> None:
        """
        Update the plugin configuration.

        param config: Dict of settings to update.

        :return: None
        """
        for key in config:
            self.config[key] = config[key]
        self.config.save()

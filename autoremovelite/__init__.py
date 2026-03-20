from deluge.plugins.init import PluginInitBase


class CorePlugin(PluginInitBase):
    def __init__(self, plugin_api, plugin_manager):
        from .core import Core as _plugin_cls

        self._plugin_cls = _plugin_cls
        super().__init__(plugin_api, plugin_manager)


class WebPlugin(PluginInitBase):
    def __init__(self, plugin_api, plugin_manager):
        from .webui import WebUI as _plugin_cls

        self._plugin_cls = _plugin_cls
        super().__init__(plugin_api, plugin_manager)

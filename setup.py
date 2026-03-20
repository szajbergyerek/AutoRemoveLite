from setuptools import find_packages, setup

setup(
    name="AutoRemoveLite",
    version="1.0.2",
    description="Removes torrents with data after a configurable seed time.",
    author="szajbergyerek",
    packages=find_packages(),
    package_data={"autoremovelite": ["data/*.js"]},
    entry_points={
        "deluge.plugin.core": [
            "AutoRemoveLite = autoremovelite:CorePlugin",
        ],
        "deluge.plugin.web": [
            "AutoRemoveLite = autoremovelite:WebUIPlugin",
        ],
    },
)

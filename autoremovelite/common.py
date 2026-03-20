import os.path

from pkg_resources import resource_filename


def get_resource(filename):
    """
    Return the absolute path to a file in the plugin's data directory.

    param filename: The filename inside the data/ folder.

    :return: Absolute path string to the resource file.
    """
    return resource_filename(__package__, os.path.join("data", filename))

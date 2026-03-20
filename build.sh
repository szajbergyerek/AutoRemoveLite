#!/bin/bash
# Builds the AutoRemoveLite Deluge plugin egg.
# Copy the resulting .egg from dist/ to your Deluge plugins folder.

pip install setuptools
python setup.py bdist_egg

echo ""
echo "Done. Copy the .egg file from dist/ to your Deluge plugins folder."

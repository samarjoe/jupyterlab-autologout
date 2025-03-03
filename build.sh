#!/bin/bash

# clean build - remove skipped file (flag), and build twice
# first build for the assets
# second build after assets are created, so we can copy them into
# pyproject.toml via the .jinja2 template.
if [ "$1" == '-c' ];then
  if [ -e  jupyterlab_autologout/labextension/static/style.js ];then
		rm jupyterlab_autologout/labextension/static/style.js
  fi
  python -m build
fi

python3 getStaticFiles.py
python -m build

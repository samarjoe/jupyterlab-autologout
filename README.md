# JupyterLab-Autologout Overview

This Module is a port/rework/migration of CS-Group's autologout-labextension to jupyterlab's new extension in the form of prebuilt packages that can be installed using `pip`

[CS-Group's autologout-labextension](https://github.com/CNES/autologout-labextension)

# jupyterlab_autologout

[![Github Actions Status](<repository/workflows/Build/badge.svg)](<repository/actions/workflows/build.yml)

Redirects to /hub/logout when inactive

## Requirements

- JupyterLab >= 4.0.0

## Build

```bash
python3.11 -m venv .venv
. .venv/bin/activate
pip install build
./build.sh -c
```

The output build files are in `dist/`

using `twine` you can deploy it to pypi repo. If you're working in a dev environment, you can use [devpi](https://github.com/devpi/devpi) as a local pypi repository.


## Install

To install the extension, execute:

```bash
pip install jupyterlab_autologout
```

## Configuration Settings
To update the configuration (Linux/Mac) for now

```bash
# Update json values in this location
 vim share/jupyter/labextensions/jupyterlab_autologout/static/logout_conf.json

# Run this script and it will find the javascript static files to patch new values in.
# The backup of original config will be moved to share/jupyter/labextensions/jupyterlab_autologout/bak/<filename>.bak
 sh share/jupyter/labextensions/jupyterlab_autologout/scripts/update_settings.sh
```


## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_autologout
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_autologout directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_autologout
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab_autologout` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)

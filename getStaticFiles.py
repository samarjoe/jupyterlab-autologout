import os
import jinja2

_static_dir='jupyterlab_autologout/labextension/static'
_pyproject_template='pyproject.toml.j2'
files = []
with os.scandir(_static_dir) as _dirs:
    for _file in _dirs:
       files.append(_file.name)

jinjaLoader = jinja2.FileSystemLoader(searchpath="./")
jinjaEnv = jinja2.Environment(loader=jinjaLoader)
_template = jinjaEnv.get_template(_pyproject_template)
_output=_template.render({"files": files})
with open('pyproject.toml','w') as file:
    file.write(_output)

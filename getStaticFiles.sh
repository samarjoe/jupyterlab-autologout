for i in $(find jupyterlab_autologout/labextension/static -type f);do echo \"$i\" = \"share/jupyter/labextensions/jupyterlab_autologout/static/$(echo $i | awk -F '/' '{print $NF}')\";done

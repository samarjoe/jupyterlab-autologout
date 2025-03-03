#!/bin/bash
cd $(dirname $0)
filename=$(grep -oi "'{.*}'" ../static/* | cut -f1 -d : | tr -d \')
_dirname=$(dirname $filename)
fqfname=$(cd $_dirname && echo ${PWD}/$(echo $filename | awk -F '/' '{print $NF}'))
config=$(grep -oi "'{.*}'" ../static/* | cut -f2- -d : | tr -d \')

echo "{\"filename\": \"$filename\",\"directory\": \"$_dirname\", \"filename_abspath\": \"$fqfname\", \"loaded_config\": $config }";echo

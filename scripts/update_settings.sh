#!/bin/bash
cd $(dirname $0)

_config='../static/logout_conf.json'
# if we have params
if [ $# -ne 0 ];then
  # and the first param is an existing file
  if [ -e $1 ];then
     # override config
     _config="$1"
  fi
fi
_jsFilesDir='../static'
_static_file=$(grep -oi "'{.*}'" ${_jsFilesDir}/* | cut -f1 -d : )
_loadedConfig=$(grep -oi "'{.*}'" ${_jsFilesDir}/* | cut -f2- -d : | tr -d \' | sed 's/\//\\\//g')
_newConfig=$(cat ${_config} | tr -d '\n ' | grep -oi "{.*}"  | sed 's/\//\\\//g')


echo  Running the following \
   sed -i .bak "s/$_loadedConfig/$_newConfig/g" $_static_file

sed -i .bak "s/$_loadedConfig/$_newConfig/g" $_static_file
cd $(dirname $_static_file)
if [ ! -e ../bak ];then
 mkdir ../bak
fi
for i in $(ls *.bak);do
 mv *.bak ../bak
done

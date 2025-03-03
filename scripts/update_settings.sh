#!/bin/bash
cd $(dirname $0)

_config=../static/logout_conf.json
magic_str_timer='logout_time'
magic_str_url='ignored_url'

#cat $_config

to_replace_timer=$(grep -w $magic_str_timer $_config | cut -f2 -d: | tr -d ,\"\  )
to_replace_url=$(grep -w $magic_str_url $_config | cut -f2 -d: | tr -d \"\  )

# find out which file has these settings -- they're dynamically generated now
_static_files='../static/*.js'
_static_file=$(grep -o "\":\"${magic_str_timer}_[0-9]*\"" $_static_files | cut -f1 -d:)

from_replace_timer=$(grep -o "\":\"${magic_str_timer}_[0-9]*\"" $_static_files | cut -f2,3 -d: | tr -d \": )
from_replace_url=$(grep -o "\":\"${magic_str_url}_[A-Za-z0-9.-]*\"" $_static_files | cut -f2,3 -d: | tr -d \": )

echo  Running the following \
   sed -i .bak "s/$from_replace_timer/$to_replace_timer/;s/$from_replace_url/$to_replace_url/" $_static_file

sed -I .bak "s/$from_replace_timer/$to_replace_timer/;s/$from_replace_url/$to_replace_url/" $_static_file
cd $(dirname $_static_file)
if [ ! -e ../bak ];then
 mkdir ../bak
fi
for i in $(ls *.bak);do
 mv *.bak ../bak
done


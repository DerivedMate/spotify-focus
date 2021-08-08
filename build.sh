#! /usr/bin/bash

version=$1

function mkzip() {
  local version=$1    
  shift
  local files="$*"
  local path=./dist/spotify-focus_${version}.zip
 
  [[ -e $path ]] && rm $path
  zip -r -FS $path $files
}

mkzip $version "lib" "icons" "manifest.json"
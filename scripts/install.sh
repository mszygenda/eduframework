#!/bin/bash
#eduFramework install script

SCRIPTS_PATH="$( cd "$( dirname "$0" )" && pwd )"
STARTUP_SCRIPT=~/.bashrc

function add_information_notice () {
  echo "#Lines below are aliases for eduFramework commands" >> $STARTUP_SCRIPT
}

function set_aliases () {
  echo "alias ef-start='node $SCRIPTS_PATH/start.js'" >> $STARTUP_SCRIPT
  echo "alias ef-new='node $SCRIPTS_PATH/create_application.js'" >> $STARTUP_SCRIPT
}

function post_install_message () {
  echo "eduFramework"
  echo
  echo "Log on another terminal and type"
  echo "ef-new AppName"
  echo "to create new application"
}

add_information_notice
set_aliases
post_install_message

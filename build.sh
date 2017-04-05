#!/bin/sh
# Reject Windows. Even if you do use it, enable the Ubuntu subsystem.

cd $(dirname $0)/build/scripts && python build.py && cd ../..
#!/usr/bin/python
from os import system as sys
from collections import OrderedDict

def init():
    sys("mkdir ../temp")

def shutdown():
    #sys("rm -r ../temp")
    pass

steps = OrderedDict()
steps["copy-workspace"] = "cp -R ../../workspace/* ../temp/"
steps["copy-resources"] = "cp -R ../resources/* ../temp/"
#steps["create-archive"] = "zip -rv ../../bin/$(date +output.%F.%T.crx) ../temp/*"

def execute_step(index):
    print "Now executing '{0}'...".format(steps.keys()[index])
    sys(steps.values()[index])
    print "Execution of '{0}' complete".format(steps.keys()[index])

init()
i = 0
while i < len(steps):
    execute_step(i)
    i += 1
shutdown()

#sys("echo All steps done. Target built at output.$(date +%F.%T).crx")
sys("echo All steps done. Extension folder is at $(cd ..; pwd)/temp")
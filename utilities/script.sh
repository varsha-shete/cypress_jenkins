
#!/bin/sh

wrkdir=${PWD}
echo "$wrkdir"
wrkdir="$(echo $wrkdir | sed 's/\/var\/jenkins_home\// /g')"
echo "$wrkdir"
docker run -v jenkins_home_volume:/e2e -w "/e2e/$wrkdir" cypress/included:10.10.0


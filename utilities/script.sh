#!/bin/sh

### function to retrieve property value ###
getFileProperty () {
file="$1"
match_found=false
input="$2"
while IFS='=' read -r key value
do
if [ "$input" = "$key" ]
then
   eval input=\${value}
   match_found=true
   break
fi   
done < "$file"
if [ $match_found = true ]
then
  echo "$input"
else
  echo "no_match_found_$input"  
fi	 
}

### jenkins working directory ###
wrkdir=${PWD}
echo "$wrkdir"
list=`ls -lrt $wrkdir`
wrkdir="$(echo $wrkdir | sed 's/\/var\/jenkins_home\// /g')"
echo "$wrkdir"
echo "$list"
docker run -v jenkins_home_volume:/e2e -w /e2e/$wrkdir cypress/included:12.5.1

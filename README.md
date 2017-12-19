# Static-CI

My personal continuous integration  
Whenever I push a new commit to the repo for my website, this script, running on my AWS instance, will:  
* automatically pull the latest commit 
* rebuild the new docker image
* run it

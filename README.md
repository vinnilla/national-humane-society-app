fork
git clone
git checkout -b dev
~~WORK~~
git add -A
git commit -m ''
git remote add upstream https://github.com/vinnilla/national-humane-society-app
git checkout master
git merge dev
git push
send pull request

git pull upstream master
subl .
fix conflicts
test code
git add
git commit

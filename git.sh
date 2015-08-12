git add -A
git status
echo "Enter Commit Message:"
read -e COMMESS
git commit -m "$COMMESS"
git push -u origin master
git push heroku master
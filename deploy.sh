#USAGE:
    # chmod 777 deploy.sh
    # ./deploy.sh [BranchName] [BuildEnv='dev','stage','preProd','prod']
# cd $REPO_SOURCE
sudo git checkout $1
sudo git pull origin $1
echo "BUILDING WEPACK"
sudo npm run build-$2
echo "KILLING NODE PROCESS"
sudo kill $(ps aux | grep '[n]ode' | awk '{print $2}')
sudo rm stdout.txt
sudo rm stderr.txt
sudo touch stdout.txt
sudo touch stderr.txt
sudo chmod 777 stdout.txt
sudo chmod 777 stderr.txt
echo "RESTARTING SERVER"
nohup sudo npm run start-$2 > stdout.txt 2> stderr.txt &


# Production deployment as a systemd service
## Project placement  
We assume that there is a dedicated system user for running server application in production  
You may create one with command
```
sudo adduser apprunner 
```
Then you have to copy this project to users home folder `/home/apprunner/my-best-app`

## systemd service setup
To setup systemd service for production deployment of server application 
copy my-best-app.service to user's config foler 
```
mkdir -p /home/apprunner/.config/systemd/user/
cp install/systemd.user/my-best-app.service /home/apprunner/.config/systemd/user/
```
Set user permission to run services when they're not logged in
```
sudo loginctl enable-linger apprunner

```
Enable service autostart on system boot
```
sudo su apprunner -c systemctl --user enable my-best-app.service
```
You do not need `sudo su apprunner -c` in last command if you logged in as the apprunner :)  
  
Now you are ready to start/stop/status you application in prodaction mode
```
systemctl --user start my-best-app.service
```
```
systemctl --user stop my-best-app.service
```
```
systemctl --user status my-best-app.service
```
To view application's stdout you may run 
```
sudo journalctl -u my-best-app.service
```

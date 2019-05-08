# tello-nodejs-sockets  
  
## What it's meant for
This project has only one purpose and that is to be a bridge. It's a  bridge to the udp sockets of the tello drone.
Udp sockets are inaccesible for a web application that's why i have created this project. This project This project opens 1 socket which has 2 events; command and state. 

## state of the project
It's still a work in progress. 

Currently you can send a command to the drone and retrieve the state of it.  The next step is to retrieve video feed from the drone. 

  
## Getting Started  
  
To start the server you only need the following command name:
  
```  
npm start  
```  

This will open socket with socket.io at 
```
address: 127.0.0.1
port: 7000
```

### example 
Your project need to use socket.io-client if you wish to connect to the socket.


```
 var socket = io('http://127.0.0.1:7000');  
 // to send a command to the drone
 socket.emit('command', "takeoff");  
 // to listen to the state of the drone
 socket.addEventListener('state',function(data){console.log(data)});
```
  
  
### Prerequisites  
  
First of all you need to have installed   
  
```  
1. typescript
2. nodejs  
```  

Als you need to own a tello drone.
  
### Installing  
  
You only need to run the following command
  
``` 
npm install
```
  
## License  
  
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details  
  
## Acknowledgments  
  
* Hat tip to anyone whose code was used  
* Inspiration  
* etc

# HaxVolleyball
Open-source realtime multiplayer game based on popular haxball game.
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [TODO](#todo)
* [Setup](#setup)
* [Screens](#screens)
* [License](#license)

## General info
This project has been written to learn developing simple real-time games using Socket.IO. 
It's not finished yet, but I hope so the first release will be soon. 
	
## Technologies
Project is created with:
* Typescript, Express, Jest (ts-jest), EJS
* Node version: 15.8.0
* Socket.io version: 4.1.2
* Webpack varsion: 5.38.1
* HTML5, CSS3, ECMAScript 6
* Docker version: 20.10.6
	
## Features
* Real time game - volleyball with 60 server ticks
* Support many rooms in one time
* Canvas rendering based on https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
* Game states synchronization with authoritative server prevents from cheating based on https://www.gabrielgambetta.com/client-server-game-architecture.html

## TODO
- [ ] Create web design
- [ ] Create logger and notification system
- [ ] Add net and physics
- [ ] Metagame - points/respawn ball/reset game etc.
- [ ] Deploy application on server

## Setup
To run application:
- Run `$ npm install`
- Run `$ npm run build`
- Run `$ npm run start`
- Open on two browsers `localhost:8080/`
- Create room in first, join to the room on the second window


To develop application:
- Run `$ npm install`
- Run `$ npm run watch`

## Screens

Coming soon.

## License
You can check out the full license [here](./LICENSE)

This project is licensed under the terms of **the MIT license**.

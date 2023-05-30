# Deps:

- Docker [https://docs.docker.com/desktop/install/]
- NodeJS [https://nodejs.org/en/download]

## Running mongoDB with docker
docker pull mvertes/alpine-mongo
docker run -d --name mongo -p 27017:27017 -v /somewhere/onmyhost/mydatabase:/data/db --restart always mvertes/alpine-mongo 

install modules with:
`npm i`

inside frontend folder too:
`cd fontend/ && npm i`

in 'frontend' folder build angular with:
`npm run build --prod`

to run backend server, run on root folder:
`npm run start`
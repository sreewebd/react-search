# Step 1
FROM node:10-alpine as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

# Stage 2

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/build /usr/share/nginx/html

# # pull the base image
# FROM node:alpine

# # set the working direction
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./

# COPY package-lock.json ./

# RUN npm install

# # add app
# COPY . ./

# # start app
# CMD ["npm", "start"]



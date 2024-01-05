# server/Dockerfile
FROM node:16

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including Nodemon
RUN npm install

# Copy the rest of your server's code
COPY . .

# Expose the port your app runs on
EXPOSE 3300

# Use Nodemon to start your app
CMD ["npx", "nodemon", "./index.js"]

# Use the official Node.js image.
FROM node:14

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the rest of your application code.
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "server.js"]

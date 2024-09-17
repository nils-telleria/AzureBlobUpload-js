# Use the official Node.js image to build and run the project
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (adjust if necessary)
EXPOSE 1234

# Command to run the application
CMD ["npm", "run", "start"]
# Use Node.js v18.16.0 as the base image
FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 9000
EXPOSE 9000

# Start the application
CMD ["npm", "start"]

# Use the latest LTS Node image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript project (transpiles to /dist directory)
RUN npm run build

# Command to run after the container is created
CMD ["node", "dist/index.js"]

# Use Node.js image
FROM node:18-alpine 

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Start the Next.js app
CMD ["npm", "run", "dev"]

FROM node:23

WORKDIR /nextApp

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies inside container
COPY . .
RUN pnpm install

# Copy the rest of your app


# Start dev server
CMD ["pnpm", "run", "dev"]

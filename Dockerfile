FROM node:16
LABEL MAINTAINER="jankal"
LABEL version="1.0"

# Environment
ENV HOST 0.0.0.0

# Create app directory
RUN mkdir -p /app
COPY . /app

# Run tasks.
WORKDIR /app
RUN HUSKY_SKIP_INSTALL=1 yarn install --frozen-lockfile
RUN yarn run build
RUN yarn run generate

# Expose the app port
EXPOSE 3000

USER node
CMD ["yarn", "start"]

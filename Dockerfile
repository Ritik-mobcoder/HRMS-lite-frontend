# Stage 1: Build
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy template config
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy build
COPY --from=build /app/dist /usr/share/nginx/html

# Expose dynamic port
EXPOSE 8080

# Start nginx with env substitution
CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
# Stage 1: Build the Angular app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Serve app with Nginx
FROM nginx:stable-alpine

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app from builder
COPY --from=builder /app/dist/pm-platform-fe/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

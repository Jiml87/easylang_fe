# Stage 1: Build the application
FROM node:18-alpine AS builder

# ARG OAUTH_GOOGLE_ID
# ARG API_HOST
# ARG OAUTH_FACEBOOK_ID

ENV NODE_ENV production
ENV OAUTH_GOOGLE_ID=${OAUTH_GOOGLE_ID}
ENV OAUTH_FACEBOOK_ID=${OAUTH_FACEBOOK_ID}
ENV API_HOST=${API_HOST}

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production=false

COPY . .
RUN yarn build

# Stage 2: Serve the application
FROM node:18-alpine AS runner


WORKDIR /app


COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000


CMD ["yarn", "start"]

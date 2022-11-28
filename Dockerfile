FROM node:17-slim as dependencies
# set working directory
WORKDIR /usr/src/app
# Copy package and lockfile
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
RUN apt-get -qy update && apt-get -qy install openssl
# install dependencies
RUN yarn --frozen-lockfile
COPY . .
# ---- Build ----
FROM dependencies as build
# install all dependencies
# build project
RUN yarn build
RUN yarn migrate
# ---- Release ----
FROM dependencies as release
# copy build
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
# dont run as root
USER node
# expose and set port number to 3000
EXPOSE 3000
ENV PORT 3000
# enable run as production
ENV NODE_ENV=production
# start app
CMD ["yarn", "prod"]
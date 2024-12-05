FROM node:lts-bookworm-slim AS drioui-build
ARG API_ENDPOINT_ARG

LABEL maintainer="Sudarsan Raghavan <sraghavan@drio.ai>"
LABEL company="Drio Inc"
LABEL component="Drio Controller UI Builder"

COPY . /root/client
WORKDIR /root/client
RUN apt update -y && \
    npm install --global concurrently next && \
    yarn install && \
    /root/client/make-urls.sh ${API_ENDPOINT_ARG} && \
    yarn build && \
    rm -rf node_modules

FROM node:lts-bookworm-slim AS drioui-runtime

LABEL maintainer="Sudarsan Raghavan <sraghavan@drio.ai>"
LABEL company="Drio Inc"
LABEL component="Drio Controller UI"

COPY --from=drioui-build /root/client /root/client/
COPY docker/uistart.sh /root/client/
WORKDIR /root/client

RUN apt update -y && \
    npm install --global serve

EXPOSE 3000 3001

ENTRYPOINT ["/root/client/uistart.sh"]

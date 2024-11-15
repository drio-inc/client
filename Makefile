all: push

include make.vars

DOCKER_BUILD = docker build --no-cache
DOCKERFILE = docker/Dockerfile

image:
	$(DOCKER_BUILD) --file $(DOCKERFILE) -t $(REPOSITORY)/$(IMAGE_NAME):$(VERSION) .

push: image
	docker push $(REPOSITORY)/$(IMAGE_NAME):$(VERSION)

clean:
	docker rmi $(REPOSITORY)/$(IMAGE_NAME):$(VERSION)

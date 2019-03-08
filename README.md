# NewtonJoshua

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Notes:

### Certificate:

https://certbot.eff.org/lets-encrypt/osx-nginx

brew install nginx
sudo nginx

Open Navigator it by going to URL:

http://localhost:8080

sudo nginx -s stop


install docker
docker id : newtonjoshua

# inmages to containers
docker run -ti --rm ubuntu bash

-ti = interactive
--rm = clear container when done

exit

docker images
docker ps
docker ps -a

# containers to images
docker commit ${containerid}
docker tag ${imageid} ${image-name}

docker images
docker commit ${container-name} ${image-name}

# run processes

docker run -ti --rm ubuntu ${process}
docker run -ti --rm ubuntu bash -c "sleep 3; echo all done"

docker run -ti -d ubuntu bash -c "sleep 3; echo all done"
-d = detach. it'll run in the background

docker attach ${container-name}
ctrl+p ctrl+q

docker exec -ti  ${container-name} bash

docker run --name my-container -ti --rm ubuntu bash

# manage containers

logs:
docker run --name my-container-3  -d ubuntu bash -c "abc" // error will be thrown
docker logs my-container-3

docker kill ${container-name}
docker rm ${container-name}

docker run --memory ${memory-limit}
docker run --cpu-shares
docker run --cpu-quota

# networking

docker run -ti --rm  --name ${container-name} -p 45678:45678 -p 45679:45679 ubuntu bash
outside:inside_container

apt-get update
apt-get install netcat

nc -lp 45678 | nc -lp 45679 // anything received on 45678 is piped to 45679
// in mac terminal shells
nc localhost 45678
nc localhost 45679

docker port test

docker run -ti --rm  --name ${container-name} -p 45678 // outside port will be assigned dynamically
docker port test

# link containers

docker run -ti --rm --name server ubuntu bash
nc -lp 1234

docker run -ti --rm --name client --link server ubuntu bash
nc server 1234

link will break id ip address of containers change. while restarting restart all containers

# dynamic and legacy linking
private networks

docker network create mynetwork

docker run -ti --rm --name server --net mynetwork ubuntu bash

docker run -ti --rm --name client --net mynetwork --link server ubuntu bash

# images

docker images

docker rmi ${imageid}
docker rmi ${imagename}:${tag}

# volumes

# registry
https://hub.docker.com/

# dockerfile

docker build -t ${name} ${path_of_dockerfile}

https://docs.docker.com/engine/reference/builder/

FROM node:10-alpine // version linux_distribution


// Alpine Linux is a distribution that was almost purpose-built for Docker images

docker run --rm newtonjoshua:v1

// avoid golden images

# under the hood

Docker is written in GO
Manages the kernel - manages processes , network
Docker is 2 programs - a client and a server - 
docker client <-> receives command through socket <-> docker server (manage containers)

storage.
copy on write (COW)
original image is store as it is.
changes for new image are stored seperately
when container is launched from new image the chages are applied

# orchestration

https://docs.docker.com/registry/
docker save 
docker load

Kubernetes:
Pods group containers together
kubectl command

https://kubernetes.io/

# kubernetes

gcloud components install kubectl

https://cloud.google.com/kubernetes-engine/docs/quickstart?authuser=1

gcloud console
create project

gcloud shell
gcloud config set project newton-joshua-com

https://cloud.google.com/compute/docs/regions-zones/
gcloud config set compute/zone asia-south1-a

create cluster -> your first cluster -> micro

gcloud container clusters get-credentials nn-cluster-1

# Kubernetes

containers vs VM
containers independent of host infrastruucture
used to create apps, package, portable, deploy, repeatable

prod - needs atleast 3 node-cluster

pod is the smallest unit in kubenertes
pod is a single unit of deployment. has one or more docker container

Setup all prerequisites for minikube (Docker and Virtualbox)
https://www.virtualbox.org/wiki/Downloads

https://kubernetes.io/docs/tasks/tools/install-minikube/

brew cask install minikube

minikube version
minikube start

kubectl cluster-info
kubectl get nodes

Once you have a running Kubernetes cluster, you can deploy your containerized applications on top of it.
The run command creates a new deployment.

kubectl run ${deploymentname} --image=${imagePath} --port=${port}
kubectl run kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1 --port=8080

kubectl get deployments

kubectl proxy
We now have a connection between our host (the online terminal) and the Kubernetes cluster.

we can query the version directly through the API using the curl command
curl http://localhost:8001/version

When you created a Deployment, Kubernetes created a Pod to host your application instance.
A Pod is a Kubernetes abstraction that represents a group of one or more docker containers, and some shared resources for those containers. 
A Pod might include both the container with your Node.js app as well as a different container that feeds the data to be published by the Node.js webserver.

A Pod always runs on a Node. A Node is a worker machine in Kubernetes. A Node can have multiple pods

kubectl get - list resources
kubectl describe - show detailed information about a resource
kubectl logs - print the logs from a container in a pod
kubectl exec - execute a command on a container in a pod

kubectl get pods -o wide
kubectl describe pods
kubectl logs $POD_NAME

Next let’s start a bash session in the Pod’s container:
kubectl exec -ti $POD_NAME bash
exit

# expose ur app

kubectl get pods -o wide
kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080

To create a new service and expose it to external traffic we’ll use the expose command with NodePort as parameter
kubectl get services
kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
kubectl get services
kubectl describe services/kubernetes-bootcamp

kubectl get deployment
kubectl describe deployment
// labels - use labels to query the list
kubectl get pods -o wide -l run=kubernetes-bootcamp
kubectl get services -l run=kubernetes-bootcamp
kubectl label pod $POD_NAME app=v1
kubectl describe pods $POD_NAME
kubectl get pods -o wide -l app=v1

# Scaling
we created a Deployment, and then exposed it publicly via a Service
Scaling is accomplished by changing the number of replicas in a Deployment

kubectl get deployments
kubectl scale deployments/kubernetes-bootcamp --replicas=4
kubectl get deployments
we have 4 instances of the application available. Next, let’s check if the number of Pods changed
kubectl get pods -o wide -o wide
kubectl describe deployments/kubernetes-bootcamp

Service is load-balancing the traffic.
kubectl describe services/kubernetes-bootcamp

scale down 
kubectl scale deployments/kubernetes-bootcamp --replicas=2
kubectl get deployments
kubectl get pods -o wide -o wide

# Rolling updates
Rolling updates allow Deployments' update to take place with zero downtime by incrementally updating Pods instances with new ones.

kubectl describe pods

To update the image of the application to version 2, use the set image command, followed by the deployment name and the new image version
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
kubectl get pods -o wide
kubectl rollout status deployments/kubernetes-bootcamp


# Google kubernetes:





####

Install the Google Cloud SDK

install the Kubernetes command-line tool
gcloud components install kubectl

Install Docker Community Edition
https://www.docker.com/products/docker-desktop

install Git source control https://git-scm.com/downloads


create project 
enable billing
billing -> create budget

gcloud auth login

gcloud config set project newton-joshua-com

https://cloud.google.com/compute/docs/regions-zones/
gcloud config set compute/zone us-central1-a

us-central1

create cluster -> your first cluster -> micro

gcloud container clusters get-credentials nn-cluster-1


go to app folder

build the container image 

export PROJECT_ID="$(gcloud config get-value project -q)"
docker build -t gcr.io/${PROJECT_ID}/newton-joshua:v1 .

The gcr.io prefix refers to Google Container Registry, where the image will be hosted

gcloud auth configure-docker

docker push gcr.io/${PROJECT_ID}/newton-joshua:v1

Tools -> container registry

# Deploy your application

kubectl run nn-deployment-1 --image=gcr.io/${PROJECT_ID}/newton-joshua:v1 --port 6006
kubectl apply -f k8s/deployments/production.yaml


# Expose your application to the Internet
kubectl expose deployment nn-deployment-1 --type=LoadBalancer --port 80 --target-port 6006
kubectl apply -f k8s/services/services.yaml

kubectl get service

# Scale up your application


// small , micro does not have enough cpu to support more than 1

kubectl scale deployment nn-deployment-1 --replicas=3
kubectl get deployment nn-deployment-1
kubectl get pods -o wide
kubectl scale deployment nn-deployment-1 --replicas=1


 # Deploy a new version of your app

docker build -t gcr.io/${PROJECT_ID}/newton-joshua:v2 .
docker push gcr.io/${PROJECT_ID}/newton-joshua:v2

// apply a rolling update to the existing deployment
kubectl set image deployment/nn-deployment-1 nn-deployment-1=gcr.io/${PROJECT_ID}/newton-joshua:v2

# Cleaning up
kubectl delete service nn-deployment-1
gcloud container clusters delete nn-cluster-1

Setting up HTTP Load Balancing with Ingress
https://cloud.google.com/kubernetes-engine/docs/tutorials/http-balancer

Configuring Domain Names with Static IP Addresses
https://cloud.google.com/kubernetes-engine/docs/tutorials/configuring-domain-name-static-ip

Creating and Using SSL Certificates
https://cloud.google.com/load-balancing/docs/ssl-certificates#create-managed-ssl-cert-resource



# SSL:
This is a Beta release of Google-managed SSL certificates.

gcloud beta compute ssl-certificates create [SSL_CERTIFICATE_NAME] --domains [DOMAIN]
gcloud beta compute ssl-certificates create nn-ssl-cert --domains newtonjoshua.com

gcloud beta compute ssl-certificates list

take 60 minutes

# network tiers

https://cloud.google.com/network-tiers/
https://console.cloud.google.com/net-tier/tiers/details

switch to standard


# config map

https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#define-container-environment-variables-using-configmap-data
https://cloud.google.com/kubernetes-engine/docs/concepts/configmap



# Jenkins

https://github.com/GoogleCloudPlatform/continuous-deployment-on-kubernetes

brew install kubernetes-helm

gcloud container clusters create nn-jenkins \
--num-nodes 2 \
--machine-type n1-standard-2 \
--scopes "https://www.googleapis.com/auth/projecthosting,cloud-platform"

git remote set-url origin https://source.developers.google.com/p/newton-joshua-com/r/newton-joshua

https://stackoverflow.com/a/54109965/6778969


# namespace
Create the namespace for production

# Jenkins

https://github.com/GoogleCloudPlatform/continuous-deployment-on-kubernetes
brew install kubernetes-helm

gcloud container clusters create nn-jenkins \
--num-nodes 2 \
--machine-type n1-standard-2 \
--scopes "https://www.googleapis.com/auth/projecthosting,cloud-platform"

gcloud container clusters get-credentials nn-jenkins

kubectl get pods -o wide

Add yourself as a cluster administrator
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)

// Grant Tiller, the server side of Helm, the cluster-admin role in your cluster
kubectl create serviceaccount tiller --namespace kube-system
clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller

//Initialize Helm.
helm init --service-account=tiller
helm update
helm version

// Configure and Install Jenkins

helm install -n nn stable/jenkins -f jenkins/values.yaml --version 0.16.6 --wait

kubectl get pods -o wide

// Run the following command to setup port forwarding to the Jenkins UI 

export POD_NAME=$(kubectl get pods -l "component=nn-jenkins-master" -o jsonpath="{.items[0].metadata.name}")
kubectl port-forward $POD_NAME 8080:8080 >> /dev/null &

// Connect to Jenkins

printf $(kubectl get secret nn-jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo


git remote set-url origin https://source.developers.google.com/p/newton-joshua-com/r/newton-joshua


# jenkins as docker

brew install jenkins

docker run --rm -u root -p 8080:8080 -v jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v "$HOME":/home jenkinsci/blueocean






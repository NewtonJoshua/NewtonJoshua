def project = 'newton-joshua-com'
def  appName = 'newton-joshua'
def  feSvcName = "${appName}"
def  imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  //Checkout Code from Git
  checkout scm

pipeline {
  agent {
    kubernetes {
      label 'sample-app'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    some-label: builder-for-node-pipelines
spec:
  containers:
  - name: node
    image: node:11-alpine
    command:
    - cat
    tty: true
  - name: gcloud-sdk
    image: google/cloud-sdk
    command:
    - cat
    tty: true
    volumeMounts:
    - name: dockersock
      mountPath: /var/run/docker.sock
  volumes:
  - name: dockersock
    hostPath:
      path: /var/run/docker.sock
"""
}
  }
  stages {
     //Stage 1 : Build the docker image.
  stage('Build image') {
      sh("docker build -t ${imageTag} .")
  }

    //Stage 2 : Push the image to docker registry
  stage('Push image to registry') {
       container('gcloud') {
                sh("gcloud docker -- push ${imageTag}")
        }
  }
    // stage('Deploy Canary') {
    //   // Canary branch
    //   when { branch 'canary' }
    //   steps {
    //     container('kubectl') {
    //       // Change deployed image in canary to the one we just built
    //       sh("sed -i.bak 's#gcr.io/cloud-solutions-images/gceme:1.0.0#${imageTag}#' ./k8s/canary/*.yaml")
    //       sh("kubectl --namespace=production apply -f k8s/services/")
    //       sh("kubectl --namespace=production apply -f k8s/canary/")
    //       sh("echo http://`kubectl --namespace=production get service/${feSvcName} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${feSvcName}")
    //     } 
    //   }
    // }
    // stage('Deploy Production') {
    //   // Production branch
    //   when { branch 'master' }
    //   steps{
    //     container('kubectl') {
    //     // Change deployed image in canary to the one we just built
    //       sh("sed -i.bak 's#gcr.io/cloud-solutions-images/gceme:1.0.0#${imageTag}#' ./k8s/production/*.yaml")
    //       sh("kubectl --namespace=production apply -f k8s/services/")
    //       sh("kubectl --namespace=production apply -f k8s/production/")
    //       sh("echo http://`kubectl --namespace=production get service/${feSvcName} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${feSvcName}")
    //     }
    //   }
    // }
    // stage('Deploy Dev') {
    //   // Developer Branches
    //   when { 
    //     not { branch 'master' } 
    //     not { branch 'canary' }
    //   } 
    //   steps {
    //     container('kubectl') {
    //       // Create namespace if it doesn't exist
    //       sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
    //       // Don't use public load balancing for development branches
    //       sh("sed -i.bak 's#LoadBalancer#ClusterIP#' ./k8s/services/frontend.yaml")
    //       sh("sed -i.bak 's#gcr.io/cloud-solutions-images/gceme:1.0.0#${imageTag}#' ./k8s/dev/*.yaml")
    //       sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/services/")
    //       sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/dev/")
    //       echo 'To access your environment run `kubectl proxy`'
    //       echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${env.BRANCH_NAME}/services/${feSvcName}:80/"
    //     }
    //   }     
    // }
  }
}

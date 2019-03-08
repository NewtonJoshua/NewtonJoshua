def project = 'newton-joshua-com'
def  appName = 'newton-joshua'
def  feSvcName = "${appName}"
def  imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

pipeline {
    agent {
		kubernetes {
			label "worker-${UUID.randomUUID().toString()}"
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
  - name: nodechrome
    image: finbarrbrady/node-chromium
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
        stage('Build Image') {
            agent {
                docker {
                    image 'node:11-alpine'
                }
            }
            steps {
                sh("docker build -t ${imageTag} .")
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
               container('kubectl') {
                    // Change deployed image to the one we just built
                    sh("kubectl --namespace=production apply -f k8s/services/services.yaml")
                    sh("kubectl --namespace=production apply -f k8s/deployments/dev.yaml")
                    sh("echo http://`kubectl --namespace=production get service/${feSvcName} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${feSvcName}")
                }
            }
        }
    }
}
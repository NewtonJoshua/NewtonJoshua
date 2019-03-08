def project = 'newton-joshua-com'
def  appName = 'newton-joshua'
def  feSvcName = "${appName}"
def  imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

pipeline {
    agent any

    stages {
        stage('Build Image') {
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
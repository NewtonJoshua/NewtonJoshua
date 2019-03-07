pipeline {
   agent { dockerfile true }
    stages {
         stage('Initialize'){
        def dockerHome = tool 'nn-docker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }
        stage('Test') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
pipeline {
    agent any

    environment {
        DOCKER_USER = "venkey136"
        ROLL = "2023bcs0092"

        FRONTEND = "${DOCKER_USER}/${ROLL}_frontend"
        BACKEND = "${DOCKER_USER}/${ROLL}_backend"
    }

    stages {
        stage('Checkout') {
          steps {
            git branch: 'main', 
            url: 'https://github.com/venktxh/aws-jenkins-app-practise.git'
          }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t $FRONTEND ./frontend'
                sh 'docker build -t $BACKEND ./backend'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-2023bcs0092',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $FRONTEND'
                    sh 'docker push $BACKEND'
                }
            }
        }
    }
}

pipeline {
    agent any 

    stages {
        stage('Checkout') {
            steps {
                // Checkout the main branch
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: 'https://github.com/valent1ad/winesjs.git']]
                ])
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install dependencies
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                // Optional: Add build commands if needed
                echo 'Building the application...'
            }
        }
        stage('Run Tests') {
            steps {
                // Optional: Add test commands if needed
                echo 'Running tests...'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy the application (customize this command as per your deployment process)
                sh 'node server.js &'
                echo 'Application deployed successfully!'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}

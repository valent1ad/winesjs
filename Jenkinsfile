pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Install PM2') {
            steps {
                // Install PM2 locally
                sh 'npm install pm2 --save-dev'
            }
        }

        stage('Build') {
            steps {
                // Example build command; update as needed
                // sh 'npm run build'
                echo 'Build stage is currently empty; please add your build commands here.'
            }
        }

        stage('Run Tests') {
            steps {
                // Example test command; update as needed
                // sh 'npm test'
                echo 'Test stage is currently empty; please add your test commands here.'
            }
        }

        stage('Deploy') {
            steps {
                // Start the application using local PM2
                sh 'pm2 start wines.js'
                echo 'Application deployed successfully!'
            }
        }
    }

    post {
        always {
            script {
                // Check the PM2 status
                sh './node_modules/.bin/pm2 status'
            }
        }
    }
}

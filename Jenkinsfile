pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                // Checkout your code from the Git repository
                git branch: 'main', url: 'https://github.com/valent1ad/winesjs/'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // You can include any build steps if needed, for example, transpiling with Babel or Webpack
                // For simplicity, we'll skip this step since it's a basic Node.js app
                echo 'Build stage (if any build steps are needed)'
            }
        }

        stage('Run Application in Background') {
            steps {
                // Use PM2 to run the application in the background
                sh 'pm2 start server.js --name winesjs --watch'
            }
        }

        stage('Check PM2 Status') {
            steps {
                // Check PM2 status to confirm the application is running
                sh 'pm2 status'
            }
        }
    }

    post {
        always {
            // Cleanup: Optionally, you can add steps to stop PM2 or cleanup workspace
            echo 'Pipeline finished.'
        }
    }

    // Optional: If you want to limit the execution to the main branch only
    options {
        disableConcurrentBuilds() // Prevent concurrent builds for the same branch
    }

    // Add a condition to the pipeline to only run on the main branch

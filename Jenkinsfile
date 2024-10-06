pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                // Checkout your code from the Git repository
                git branch: 'main', url: 'https://github.com/valent1ad/winesjs/'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                sh 'docker build -t winesjs .'
            }
        }

        stage('Run Docker Container') {
            steps {
                // Stop and remove any existing container with the same name
                sh 'docker rm -f winesjs || true'
                
                // Run the Docker container
                sh 'docker run -d -p 3000:3000 --name winesjs winesjs'
            }
        }

        stage('Check Docker Status') {
            steps {
                // Check if the Docker container is running
                sh 'docker ps -a'
            }
        }

        stage('Upload OpenAPI Swagger') {
            steps {
                // Upload the OpenAPI Swagger file using curl
                script {
                    // Fetch the OpenAPI JSON file
                    sh 'curl http://localhost:3000/swagger.json -o openapi.json'

                    // Upload the OpenAPI JSON file
                    def response = sh(script: '''
                        curl --location 'https://10.255.250.253:3001/api/v1/files' \
                        --header 'Authorization: Bearer dmFsZW50aW4=@bc04067c051b4c48763914aab4307ee9' \
                        --form 'file=@openapi.json'
                    ''', returnStdout: true).trim()

                    // Extract the file ID from the response (assuming it's in JSON format)
                    def jsonResponse = readJSON text: response
                    env.fileid = jsonResponse.fileid // Adjust this based on the actual response structure
                }
            }
        }

        stage('Update OpenAPI with Uploaded File') {
            steps {
                // Update the OpenAPI with the uploaded file ID
                sh '''
                    curl --location --request PATCH 'https://10.255.250.253:3001/api/v1/openapi-enforcement?uid=d8cbb0eb761b019bba2ef5389019416f' \
                    --header 'Authorization: Bearer dmFsZW50aW4=@bc04067c051b4c48763914aab4307ee9' \
                    --header 'Content-Type: application/json' \
                    --data '{
                        "name": "winesapiie7",
                        "description": "OpenApi description",
                        "file": "${fileid}"
                    }'
                '''
            }
        }
    }

    post {
        always {
            // Optional: Add any cleanup actions or notifications
            echo 'Pipeline finished.'
        }
    }
}

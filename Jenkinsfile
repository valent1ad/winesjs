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

        stage('Download Swagger File') {
            steps {
                script {
                    // Download the Swagger file
                    sh 'curl http://localhost:3000/swagger.json -o openapi.json'
                }
            }
        }
        
        stage('Upload Swagger File') {
            steps {
                script {
                    // Upload the Swagger file and capture the response
                    def response = sh(script: ''' 
                        curl -k --location 'https://10.255.250.253:3001/api/v1/files' \
                        --header 'Authorization: Bearer dmFsZW50aW4=@bc04067c051b4c48763914aab4307ee9' \
                        --form 'file=@"openapi.json"'
                    ''', returnStdout: true).trim()
                    
                    // Extract the UID from the response (assuming the response is JSON)
                    env.fileuid = sh(script: "echo '${response}' | jq -r '.data.uid'", returnStdout: true).trim()
                    echo "File UID: ${env.fileuid}"
                }
            }
        }
        
        stage('Patch OpenAPI Enforcement') {
        steps {
        script {
            // Echo the UID for debugging
            echo "Using File UID: ${fileuid}"
            
            // Construct and send the PATCH request
            def patchCommand = """ 
                curl -k --location --request PATCH 'https://10.255.250.253:3001/api/v1/openapi-enforcement?uid=${fileuid}' \
                --header 'Authorization: Bearer dmFsZW50aW4=@bc04067c051b4c48763914aab4307ee9' \
                --header 'Content-Type: application/json' \
                --data '{
                    "name": "winesapiie7",
                    "description": "OpenApi description",
                    "file": "${fileuid}"
                }'
            """
            echo "Executing PATCH command: ${patchCommand}"
            
            // Execute the command
            sh patchCommand
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

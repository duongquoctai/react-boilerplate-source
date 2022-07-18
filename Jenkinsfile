pipeline {
    agent { label '!master' }
    environment {
        HTTP_PROXY = 'http://proxy.hcm.fpt.vn:80'
        HTTPS_PROXY = 'http://proxy.hcm.fpt.vn:80'
        NO_PROXY = '172.0.0.1,*.local,172.27.11.0/24'
        JAVA_OPTS = '-Dhttp.proxyHost=proxy.hcm.fpt.vn -Dhttp.proxyPort=80 -Dhttps.proxyHost=proxy.hcm.fpt.vn -Dhttps.proxyPort=80 -Dhttp.nonProxyHosts=localhost|127.0.0.1|172.27.11.*|*.bigdata.local|172.24.178.*'
        GIT_COMMIT = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
        GIT_COMMIT_MESSAGES = sh(returnStdout: true, script: "git log --format=format:%s -1")
        DOCKER_IMAGE = "${K8S_NAMESPACE}/${env.JOB_NAME}:${env.BUILD_ID}-${env.BUILD_TIMESTAMP}-${GIT_COMMIT}"
        GIT_SOURCE_CODE_REPO = "${env.GIT_SOURCE_CODE_REPO}"
        K8S_NAMESPACE = "${GIT_BRANCH_SOURCE_CODE == 'master' ? "prod" : "dev"}"
        HOST_APP = "${GIT_BRANCH_SOURCE_CODE == 'master' ? "fpt.vn" : "dev.bigdata.local"}"
        REACT_APP_RECOM_URL_BE = "${GIT_BRANCH_SOURCE_CODE == 'master' ? "https://recom.fpt.vn/api/v0.1/recommendation" : "http://recom.dev.bigdata.local/api/v0.1/recommendation"}"
    }
    stages {
        stage('Checkout'){
            steps {
                git branch: '${GIT_BRANCH_SOURCE_CODE}', credentialsId: '15cad750-f136-4f1a-9d15-4ff55bfc79fc', url: "${GIT_SOURCE_CODE_REPO}"
            }           
        }
        stage('Docker Publish') {
            steps {
                // Generate Jenkinsfile and prepare the artifact files.
                script {
                    docker.withRegistry('https://bigdata-registry.local:5043', '010ed969-34b5-473b-bcd9-01a207e7e382') {
                        def app = docker.build("${DOCKER_IMAGE}","--target=code-prod --build-arg REACT_APP_RECOM_URL_BE=${REACT_APP_RECOM_URL_BE} .")
                        // def app = docker.build("${DOCKER_IMAGE}","--target=code-prod .")
                        /* Push the container to the custom Registry */
                        app.push()
                    }
                }
            }
        }
        stage('Deploying'){
            steps {
                kubernetesDeploy(
                    kubeconfigId: '0bc37d99-32ae-4bb2-ba25-b521480fb98d',
                    configs: 'k8s_deploy.yaml',
                    enableConfigSubstitution: true,
                    secretNamespace: "${K8S_NAMESPACE}",
                    secretName: '',
                    dockerCredentials: [
                            [credentialsId: '010ed969-34b5-473b-bcd9-01a207e7e382', url: 'https://bigdata-registry.local:5043'],
                    ]
                )
            }
        }
    }
}

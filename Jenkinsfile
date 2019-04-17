pipeline {
    agent {
        label "node-10"
    }
    stages  {
        stage("检出") {
            steps {
                sh 'ci-init'
                checkout(
                  [$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], 
                  userRemoteConfigs: [[url: env.GIT_REPO_URL]]]
                )
            }
        }
        stage("构建") {
            steps {
                echo "构建中..."
                sh 'node -v'
              	sh 'yarn'
                sh "node genbuild.json.js ${env.GIT_COMMIT}"
                sh 'yarn generate'
                echo "构建完成."
                archiveArtifacts artifacts: 'dist/**', fingerprint: true // 收集构建产物
            }
        }
        stage("部署") {
            steps {
                echo "部署中..."
                sh "git clone https://${env.git_username}:${env.git_password}@git.dev.tencent.com/huggy_/safetree_web.git -b coding-pages" 
                sh "cd safetree_web;git config --global user.name 'Jenkins_CI_BOT';rm -fr *;mv ../dist/* ./;git add *;git commit -m 'CI auto push #${env.GIT_COMMIT}';git push;"
                echo "部署完成"
            }
        }
    }
}
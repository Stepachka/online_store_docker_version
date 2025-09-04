#!/bin/bash
set -e

echo "🚀 Cloud Infrastructure Deployment Script"
echo "========================================"
echo "Start time: $(date)"
echo "========================================"

# Определяем корневую директорию
INFRA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="$INFRA_DIR/terraform"
ANSIBLE_DIR="$INFRA_DIR/ansible"
SSH_KEY_PATH="$HOME/.ssh/terraform_cloud_key"

# Функции
check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo "❌ ERROR: $1 is not installed. Please install it first."
        exit 1
    fi
    echo "✅ $1 found: $(which $1)"
}

log_step() {
    echo ""
    echo "📋 $1"
    echo "========================================"
}

# Проверки
log_step "Checking prerequisites"
check_command terraform
check_command ansible
check_command aws

if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS authentication failed. Please run 'aws configure'"
    exit 1
fi
echo "✅ AWS authentication successful"

# SSH ключ
log_step "Setting up SSH keys"
if [ ! -f "$SSH_KEY_PATH" ]; then
    echo "🔑 Creating new SSH key..."
    ssh-keygen -t rsa -b 4096 -N "" -f "$SSH_KEY_PATH" -C "terraform-deployment"
    chmod 600 "$SSH_KEY_PATH"
    echo "✅ SSH key created: $SSH_KEY_PATH"
else
    echo "✅ SSH key already exists: $SSH_KEY_PATH"
fi

# Импорт ключа в AWS
log_step "Uploading SSH key to AWS"
if ! aws ec2 describe-key-pairs --key-names "terraform-deployment-key" &> /dev/null; then
    aws ec2 import-key-pair \
        --key-name "terraform-deployment-key" \
        --public-key-material "fileb://$SSH_KEY_PATH.pub" \
        --region us-east-1
    echo "✅ SSH key uploaded to AWS"
else
    echo "✅ SSH key already exists in AWS"
fi

# Terraform
log_step "Deploying infrastructure with Terraform"
cd "$TERRAFORM_DIR"

echo "🔄 Initializing Terraform..."
terraform init

echo "✅ Validating Terraform configuration..."
terraform validate

echo "📊 Creating execution plan..."
terraform plan -out=tfplan

echo "🚀 Applying changes..."
terraform apply -auto-approve tfplan

# Получаем outputs
INSTANCE_IP=$(terraform output -raw instance_public_ip)
INSTANCE_ID=$(terraform output -raw instance_id)

echo "✅ Infrastructure deployed successfully!"
echo "📍 Instance IP: $INSTANCE_IP"
echo "🆔 Instance ID: $INSTANCE_ID"

# Ansible
log_step "Configuring server with Ansible"
echo "⏳ Waiting for instance to become available..."
sleep 30

cd "$ANSIBLE_DIR"

# Создаем инвентарь
cat > inventory.ini << EOF
[web_servers]
$INSTANCE_IP ansible_user=ubuntu ansible_ssh_private_key_file=$SSH_KEY_PATH

[web_servers:vars]
ansible_python_interpreter=/usr/bin/python3
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null'
EOF

echo "🔍 Testing SSH connection..."
if ! ansible all -i inventory.ini -m ping; then
    echo "❌ SSH connection failed. Retrying in 30 seconds..."
    sleep 30
    ansible all -i inventory.ini -m ping
fi

echo "🎯 Running Ansible playbook..."
ansible-playbook -i inventory.ini playbook.yml

# Финальные проверки
log_step "Final verification"
echo "🌐 Testing web server..."
if curl -s -f "http://$INSTANCE_IP" > /dev/null; then
    echo "✅ Web server is responding successfully!"
    echo "📱 Open in browser: http://$INSTANCE_IP"
else
    echo "⚠️  Web server check failed, but deployment completed"
fi

echo ""
echo "========================================"
echo "✅ Deployment completed successfully!"
echo "🕒 End time: $(date)"
echo "📍 Your server is ready at: http://$INSTANCE_IP"
echo "🔑 SSH access: ssh -i $SSH_KEY_PATH ubuntu@$INSTANCE_IP"
echo "========================================"
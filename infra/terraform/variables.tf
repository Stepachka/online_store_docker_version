variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "ssh_key_name" {
  description = "Name of the SSH key pair to use"
  type        = string
  default     = "terraform-deployment-key"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "development"
}
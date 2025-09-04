terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    # Будет настроено через GitHub Actions
    # bucket = "your-terraform-state-bucket"
    # key    = "terraform.tfstate"
    # region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = "terraform-ansible-deployment"
      Environment = "development"
      ManagedBy   = "terraform"
    }
  }
}
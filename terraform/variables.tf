variable "env_name" {
  description = "Deployment environment (dev | staging | prod)"
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.env_name)
    error_message = "env_name must be one of: dev, staging, prod."
  }
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "image_tag" {
  description = "Docker image tag to deploy (git SHA injected by CI)"
  type        = string
  default     = "latest"
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 7
}

variable "app_replicas" {
  description = "Number of pod replicas"
  type        = number
  default     = 2
}

variable "app_cpu" {
  description = "Fargate task CPU units (256 | 512 | 1024 ...)"
  type        = string
  default     = "512"
}

variable "app_memory" {
  description = "Fargate task memory in MiB"
  type        = string
  default     = "1024"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

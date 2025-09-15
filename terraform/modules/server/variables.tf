variable "timeweb_token" {
  description = "Timeweb Cloud API token"
  type        = string
  sensitive   = true
}

variable "ssh_public_key" {
  description = "SSH public key for server access"
  type        = string
}

variable "server_name" {
  description = "Server name"
  type        = string
  default     = "online-shop-server"
}
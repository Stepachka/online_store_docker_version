output "server_ip" {
  description = "Public IP address of the created server"
  value       = module.server.server_ip
}

output "server_id" {
  description = "ID of the created server"
  value       = module.server.server_id
}
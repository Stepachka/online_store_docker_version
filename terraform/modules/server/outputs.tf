output "server_ip" {
  description = "Public IP address of the server"
  value       = twc_cloud_ip.server_ip.ip
}

output "server_id" {
  description = "ID of the server"
  value       = twc_server.server.id
}
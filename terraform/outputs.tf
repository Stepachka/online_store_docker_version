output "server_ip" {
  description = "Public IP address of the server"
  value       = timeweb_server.online_shop.ip
}

output "server_id" {
  description = "ID of the server"
  value       = timeweb_server.online_shop.id
}
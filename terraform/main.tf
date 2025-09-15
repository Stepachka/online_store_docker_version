provider "twc" {
  token = var.timeweb_token
}

module "server" {
  source = "./modules/server"

  timeweb_token   = var.timeweb_token
  ssh_public_key  = var.ssh_public_key
  server_name     = var.server_name
}
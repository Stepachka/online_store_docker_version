terraform {
  required_providers {
    twc = {
      source = "tf.timeweb.cloud/timeweb-cloud/timeweb-cloud"
    }
  }
  required_version = ">= 0.13"
}

provider "timeweb" {
  token = var.timeweb_token
}

# Создаем виртуальную машину (конфигурация Cloud-30)
resource "timeweb_server" "online_shop" {
  name   = "online-shop-server"
  image  = "ubuntu-22.04"
  cpu    = 1
  ram    = 2048
  disk   = 30
  region = "ru-1"
}

# Открываем необходимые порты
resource "timeweb_firewall_group" "firewall" {
  name = "online-shop-firewall"

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    cidr      = "0.0.0.0/0"
  }

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "80"
    cidr      = "0.0.0.0/0"
  }

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "3000"
    cidr      = "0.0.0.0/0"
  }
}

resource "timeweb_server_firewall" "server_firewall" {
  server_id  = timeweb_server.online_shop.id
  group_id   = timeweb_firewall_group.firewall.id
  is_enabled = true
}
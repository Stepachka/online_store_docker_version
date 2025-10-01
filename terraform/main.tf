terraform {
  required_providers {
    twc = {
      source = "tf.timeweb.cloud/timeweb-cloud/timeweb-cloud"
    }
  }
  required_version = ">= 0.13"
}

data "twc_configurator" "configurator" {
  location = "ru-1"
  disk_type = "nvme"
}

data "twc_os" "os" {
  name = "ubuntu"
  version = "22.04"
}

resource "twc_server" "online-shop-server" {
  name = "Online shop"
  os_id = data.twc_os.os.id

  configuration {
    configurator_id = data.twc_configurator.configurator.id
    disk = 1024000
    cpu = 1
    ram = 1024
  }
}

resource "twc_server_ip" "example-ip" {
  source_server_id = twc_server.online-shop-server.id
  
  type = "ipv4"
  
}
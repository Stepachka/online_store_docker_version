
terraform {
  required_providers {
    twc = {
      source  = "timeweb-cloud/timeweb-cloud"
      version = ">=0.2.0"
    }
  }
  required_version = ">= 1.3"
}

provider "twc" {
  token = var.timeweb_token
}

data "twc_configurator" "configurator" {
  location  = "ru-1"
  disk_type = "nvme"
}

data "twc_os" "ubuntu" {
  name    = "ubuntu"
  version = "22.04"
}

resource "twc_server" "vm" {
  name = "online-shop-vm"
  os_id = data.twc_os.ubuntu.id

  configuration {
    configurator_id = data.twc_configurator.configurator.id
    disk = 30 * 1024    # 30 ГБ NVMe
    cpu  = 1            # 1 vCPU
    ram  = 2048         # 2 GB RAM
  }

  ssh_keys = [var.ssh_public_key]
}

output "server_ip" {
  value = twc_server.vm.ipv4
}

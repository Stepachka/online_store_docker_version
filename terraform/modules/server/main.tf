data "twc_configurator" "configurator" {
  location   = "ru-1"
  disk_type  = "nvme"
}

data "twc_os" "os" {
  name    = "ubuntu"
  version = "22.04"
}

resource "twc_server" "server" {
  name  = var.server_name
  os_id = data.twc_os.os.id

  configuration {
    configurator_id = data.twc_configurator.configurator.id
    disk = 1024 * 30  # 30 GB
    cpu  = 1
    ram  = 1024 * 2   # 2 GB
  }

  ssh_keys = [var.ssh_public_key]
}

resource "twc_cloud_ip" "server_ip" {
  server_id = twc_server.server.id
  is_vip    = false
}

resource "null_resource" "wait_for_server" {
  depends_on = [twc_cloud_ip.server_ip]

  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "root"
      host        = twc_cloud_ip.server_ip.ip
      private_key = file("~/.ssh/id_rsa") # Это будет заменено в GitHub Actions
    }

    inline = [
      "echo 'Server is ready'",
      "uptime"
    ]
  }
}
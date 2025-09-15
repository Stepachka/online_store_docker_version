terraform {
  required_version = ">= 1.0"

  required_providers {
    twc = {
      source  = "tf.timeweb.cloud/timeweb-cloud/timeweb-cloud"
      version = "~> 0.5.0"
    }
  }
}
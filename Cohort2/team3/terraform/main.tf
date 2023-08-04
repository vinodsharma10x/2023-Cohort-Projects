# create vpc
resource "aws_vpc" "animalrekog_vpc" {
  cidr_block = "${var.vpc_cidr_block}"

  tags = {
    Name = "animalrekog_vpc"
  }
}
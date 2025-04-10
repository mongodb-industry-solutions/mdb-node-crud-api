# Makefile to simplify Terraform operations

TF_DIR=iac/acr

.PHONY: init plan apply destroy

init:
	@echo "Initializing Terraform..."
	cd $(TF_DIR) && terraform init

plan:
	@echo "Planning Terraform execution..."
	cd $(TF_DIR) && terraform plan -var-file=terraform.tfvars

apply:
	@echo "Applying Terraform changes..."
	cd $(TF_DIR) && terraform apply -auto-approve -var-file=terraform.tfvars

destroy:
	@echo "Destroying Terraform-managed resources..."
	cd $(TF_DIR) && terraform destroy -auto-approve -var-file=terraform.tfvars

status:
	@echo "Status Terraform-managed resources..."
	cd $(TF_DIR) && terraform output -state=iac/acr/terraform.tfstate -var-file=terraform.tfvars

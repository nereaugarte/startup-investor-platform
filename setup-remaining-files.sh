#!/bin/bash
echo "Starting setup..."
cd ~/startup-investor-platform/terraform

# Create DynamoDB module
mkdir -p modules/dynamodb
cat > modules/dynamodb/main.tf << 'EOF'
resource "aws_dynamodb_table" "startups" {
  name         = "${var.project_name}-${var.environment}-startups"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "startup_id"

  attribute {
    name = "startup_id"
    type = "S"
  }

  attribute {
    name = "industry"
    type = "S"
  }

  attribute {
    name = "funding_stage"
    type = "S"
  }

  global_secondary_index {
    name            = "IndustryIndex"
    hash_key        = "industry"
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "FundingStageIndex"
    hash_key        = "funding_stage"
    projection_type = "ALL"
  }

  point_in_time_recovery {
    enabled = true
  }

  ttl {
    attribute_name = "expiration_time"
    enabled        = true
  }

  server_side_encryption {
    enabled = true
  }
}

resource "aws_dynamodb_table" "investors" {
  name         = "${var.project_name}-${var.environment}-investors"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "investor_id"

  attribute {
    name = "investor_id"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }
}

output "startups_table_name" {
  value = aws_dynamodb_table.startups.name
}

output "startups_table_arn" {
  value = aws_dynamodb_table.startups.arn
}

output "investors_table_name" {
  value = aws_dynamodb_table.investors.name
}

output "investors_table_arn" {
  value = aws_dynamodb_table.investors.arn
}
EOF

cat > modules/dynamodb/variables.tf << 'EOF'
variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}
EOF

echo "✅ DynamoDB module created"

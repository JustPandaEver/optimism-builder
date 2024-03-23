#!/bin/bash
set -eu

echo "[5/5] : export genesis files"

env_file="/config/address.ini"

cd ~/optimism/op-node
go run cmd/main.go genesis l2 \
  --deploy-config /config/$NETWORK_TYPE.json \
  --deployment-dir /config \
  --outfile.l2 genesis.json \
  --outfile.rollup rollup.json \
  --l1-rpc $L1_RPC_URL

cd ~/optimism/packages/contracts-bedrock
addresses=$(./scripts/print-addresses.sh getting-started --sdk)
echo "$addresses" >> "$env_file" # 파싱 필요
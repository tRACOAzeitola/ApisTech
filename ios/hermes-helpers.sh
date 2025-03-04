#!/bin/bash

# Script auxiliar para lidar com problemas específicos do Hermes
export USE_HERMES=true 
export SKIP_BUNDLING=0
export RCT_NEW_ARCH_ENABLED=0

# Configuração para lidar com avisos Objective-C
export GCC_WARN_INHIBIT_ALL_WARNINGS=YES

# Ativar modo de depuração inline do Hermes
export HERMES_BYTECODE_DEBUG=true

# Configurações de performance
export FORCE_BUNDLING=1
export DISABLE_DEV=false

echo "Configurações do Hermes aplicadas com sucesso."

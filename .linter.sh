#!/bin/bash
cd /home/kavia/workspace/code-generation/codegalaxy-95315-95340/devarena_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


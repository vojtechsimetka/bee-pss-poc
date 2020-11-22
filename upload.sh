#!/bin/sh

ARCHIVE=website.tar

rm -rf "$ARCHIVE"
cd ./dist
tar -zcvf  "../$ARCHIVE" .
cd ../

curl \
    -X POST \
    -H "Content-Type: application/x-tar" \
    -H "Swarm-Index-Document: index.html" \
    -H "Swarm-Error-Document: index.html" \
    --data-binary "$ARCHIVE" http://localhost:8080/dirs
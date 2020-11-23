#!/bin/sh

ARCHIVE=website.tar

npm run build

# Erase all hidden files
rm -rf dist/.*

# Replace domain root paths with relative paths
cat dist/index.html | sed 's|/js|./js|g' | sed 's|/css|./css|g' > tmp
mv tmp dist/index.html

for f in dist/js/app*.js
do 
    echo $f
    cat $f | sed 's|r.p+"media|"./media|g' >tmp
    mv tmp $f
done

rm -rf "$ARCHIVE"
cd dist
tar -cf "../$ARCHIVE" *
cd ..

curl \
    -X POST -v -D - \
    -H "Content-Type: application/x-tar" \
    -H "Swarm-Index-Document: index.html" \
    --http1.1 \
    --data-binary "@$ARCHIVE" https://gateway.ethswarm.org/dirs 

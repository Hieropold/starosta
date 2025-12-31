#!/bin/bash
set -e

echo "Building WASM package..."
# Use wasm-pack to build the Rust code into a WebAssembly module.
# --target web: generates code compatible with web browsers.
# --out-name wasm: sets the base name for the output files (wasm.js, wasm_bg.wasm).
# --out-dir ./dist: specifies the output directory.
wasm-pack build --dev --target web --out-name wasm --out-dir ./dist

echo "Copying assets..."
# Copy the main HTML file into the output directory.
cp ./index.html ./dist/

# Create a graphics directory in the output and copy all assets into it.
mkdir -p ./dist/assets
cp -r ./assets/* ./dist/assets/

echo "Build complete. Output is in the 'dist' directory."

# Quickstart Guide: Basic WASM PoC

**Feature**: Basic WASM Proof-of-Concept
**Plan**: [plan.md](./plan.md)

This guide provides the steps required for a developer to build and run the WebAssembly (WASM) Proof-of-Concept.

## 1. Environment Setup

### Install Rust
If you don't have Rust, install it via `rustup`. This will also install `cargo`, the Rust package manager.
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
Follow the on-screen instructions.

### Add WASM Target
Add the WebAssembly target for Rust, which allows compiling your code for the browser.
```bash
rustup target add wasm32-unknown-unknown
```

### Install a Local Web Server
A local web server is required to test the compiled WASM module. We recommend `basic-http-server`, which can be installed via `cargo`.
```bash
cargo install basic-http-server
```
Alternatively, you can use any other simple web server (e.g., Python's `http.server`, `npm http-server`).

## 2. Project Setup

The project will be set up as a new Cargo project. The implementation will create the necessary files.

## 3. Build and Run

### Build the Project
Navigate to the project's root directory and run the standard cargo build command for the WASM target.
```bash
# This command will be run from the newly created crate directory
cargo build --target wasm32-unknown-unknown
```
*Note: The implementation plan may introduce a bundler like `wasm-pack` which could alter this command slightly.*

### Serve the Application
After a successful build, the compiled assets (HTML, JS, WASM) will be located in a directory (e.g., `dist/` or `target/wasm32-unknown-unknown/debug/`).

Serve this directory using the web server you installed.
```bash
# Navigate to the directory containing the index.html
cd <output_directory>

# Start the server
basic-http-server .
```

### View in Browser
Open your web browser and navigate to the local address provided by the server (usually `http://127.0.0.1:4000` or `http://localhost:8000`). You should see the graphical asset loaded from the `@old-src/assets/img` folder displayed on the page.

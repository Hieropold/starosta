# Starosta Game - Proof of Concept

This crate contains the initial proof-of-concept for the Starosta game, built with the Bevy Engine.

## Prerequisites

Before you can build and run this PoC, you need to have the following installed:

-   Rust (via `rustup`)
-   The `wasm32-unknown-unknown` target for Rust
-   `wasm-pack`
-   A simple HTTP server (e.g., `basic-http-server`)

For detailed setup instructions, please refer to the main quickstart guide at `specs/001-wasm-poc-setup/quickstart.md`.

## Build

To build the application for the web, run the provided build script from within this directory:

```bash
bash build.sh
```

This script will compile the Rust code to WebAssembly, package it, and place all necessary files in the `dist/` directory.

## Run

To run the PoC:

1.  Navigate to the output directory:
    ```bash
    cd dist
    ```

2.  Start a local web server. If you installed `basic-http-server`, you can run:
    ```bash
    basic-http-server .
    ```

3.  Open your web browser and navigate to the address provided by the server (e.g., `http://localhost:4000`).

You should see the game window with a background image.

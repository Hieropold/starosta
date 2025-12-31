# Research & Decisions for WASM PoC

**Feature**: Basic WASM Proof-of-Concept
**Spec**: [spec.md](./spec.md)

## Technology Stack Selection

### Decision
The Proof-of-Concept (PoC) will be implemented using the **Rust** programming language and the **Bevy Engine**. The web deployment build will be handled by standard Rust WASM build tooling (e.g., `wasm-pack`).

### Rationale
The project's governing `constitution.md` explicitly mandates a technology stack centered around Rust and the Bevy Engine for a web-first (WebAssembly) deployment target. The core purpose of this PoC is to provide the initial validation for this mandated architecture. Therefore, there are no alternative stacks to consider.

### Key Components for the PoC
Based on the constitution and the PoC's requirements, the following key technical components have been identified:

-   **Language/Framework**: Rust and the Bevy Engine will be used as the core for the application logic and rendering.
-   **WASM Build Tooling**: Standard Rust tooling (`cargo build --target wasm32-unknown-unknown`) combined with a bundler like `wasm-pack` will be used to generate the final WebAssembly module.
-   **Asset Loading**: For this minimal PoC, Bevy's built-in `AssetServer` is sufficient to load the required graphical asset. More advanced loaders like `bevy_asset_loader` can be incorporated later.
-   **Debugging**: The `console_error_panic_hook` crate will be included to ensure any Rust panics are properly logged to the browser's developer console, as required by Constitution Principle V.
-   **Testing Environment**: A simple local HTTP server (e.g., `basic-http-server` for cargo) will be required to serve the compiled artifacts for browser testing, due to security policies restricting the use of the `file://` protocol for WASM.

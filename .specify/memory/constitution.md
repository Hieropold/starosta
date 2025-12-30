<!--
Sync Impact Report:

- Version change: None -> 1.0.0
- List of modified principles: N/A (initial creation)
- Added sections: Core Principles, Development Workflow, Governance
- Removed sections: N/A
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->
# Моя вторая староста Constitution

## Core Principles

### I. AI-First Protocol
Every public system, complex function, and plugin definition **MUST** be preceded by an `<ai_context>` block. This block serves as the ground truth for AI-driven development and testing. It must contain:
- `<goal>`: A concise summary of the code's purpose.
- `<input>`: Data (Components, Resources, Events) the system reads.
- `<output>`: Data modified, Events emitted, or Side Effects produced.
- `<constraints>`: Technical limitations or non-obvious requirements.
- `<test_plan>`: A descriptive plan for how an AI should generate a unit or integration test.

### II. Plugin-Based Architecture
The application **MUST** be architected as a workspace of loosely coupled crates, where each crate is a `bevy::app::Plugin`. Each plugin must have a single, well-defined responsibility (e.g., `scene_sys`, `dialogue_sys`, `inventory_sys`). The `main` crate's sole purpose is to act as a bootloader, assembling these plugins into the final application. This enforces separation of concerns and allows for isolated development and testing.

### III. Data-Driven Systems
Game logic and content, such as scene definitions (backgrounds, hotspots), character dialogues, and item properties, **MUST** be defined in external, human-readable data files (e.g., RON, JSON). Hardcoding game content or complex configurations directly in Rust code is strictly forbidden. This decouples game design from programming, enabling faster iteration and the development of specialized editing tools.

### IV. Explicit State Management
The game's flow **MUST** be controlled by a formal, explicit state machine (`bevy::prelude::State`). All significant gameplay systems must be conditionally run based on the current state (e.g., `AssetLoading`, `MainMenu`, `Playing`, `Dialogue`). Logic that relies on implicit or ad-hoc conditions is prohibited, ensuring a predictable and debuggable application flow.

### V. Web-First Deployment
The primary target platform is the modern web browser (via WebAssembly). All features and systems **MUST** be implemented with Wasm constraints in mind. This includes, but is not limited to:
- Implementing asset streaming to handle HTTP-based loading.
- Respecting browser audio policies (e.g., requiring user interaction to start audio).
- Using `console_error_panic_hook` to ensure Rust panics are logged to the browser console for debugging.

## Development Workflow

When tasking an AI to implement a feature, the prompt **MUST** follow this template:

> "Act as a Rust Game Developer. Implement the system described in the `<ai_context>` block below. The system belongs to the `{CRATE_NAME}` plugin. Ensure you use Bevy {BEVY_VERSION}+ syntax. Do not modify the context block. Generate the code and the unit test described in the test plan."

This structured approach ensures the AI operates on a small, safe subset of the code, reducing complexity and error rates.

## Governance
This Constitution is the supreme governing document for the project's architecture and development practices. It supersedes all other conventions, guides, and ad-hoc practices. All code contributions and architectural decisions **MUST** be compliant with its principles. Amendments to this constitution require a formal review and approval process, and the version must be updated according to Semantic Versioning rules.

**Version**: 1.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30
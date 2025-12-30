# Data Model: Basic WASM PoC

**Feature**: Basic WASM Proof-of-Concept
**Spec**: [spec.md](./spec.md)

## Overview

The scope of this initial Proof-of-Concept is primarily technical and does not involve complex data modeling. The main entity involved is a graphical asset, which is treated as a static file rather than a structured data entity.

## Key Entities

### 1. Graphical Asset

-   **Description**: Represents a static image file that the application must load and display. For the PoC, this is not a database entity but a file asset referenced by its path.
-   **Attributes**:
    -   `path`: The file path to the asset (e.g., `img/scene-hall.jpg`).
-   **Relationships**: None.
-   **State Transitions**: None. This entity is stateless.

## Notes

As the project evolves, more complex data models for scenes, items, characters, and dialogues will be defined here, likely based on data loaded from RON or JSON files as per the project constitution. For this feature, no further data modeling is required.

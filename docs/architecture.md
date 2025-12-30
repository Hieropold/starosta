# Architectural Specification: Моя вторая староста

**Version:** 1.0
**Tech Stack:** Rust, Bevy Engine (ECS), WebAssembly (Wasm)
**Target Platform:** Modern Web Browsers (WebGL2/WebGPU)

---

## 1. Executive Summary

"Моя вторая староста" is a point-and-click adventure game focusing on narrative interaction, inventory management, and exploration. The game architecture is designed with an **AI-First** methodology, utilizing a strict **Plugin-Based Architecture** and **Semantic Markup** to allow Large Language Models (LLMs) to generate, maintain, and test individual systems with high context awareness and minimal hallucination.

The engine of choice is **Bevy**, as its Entity-Component-System (ECS) architecture aligns perfectly with the requirement for loosely coupled data and logic.

---

## 2. The AI-First Protocol

To maintain architectural integrity while leveraging AI code generation, strictly adhere to the following protocol.

### 2.1. The `<ai_context>` Standard

Every public system, complex function, and plugin definition **MUST** be preceded by an `<ai_context>` block. This block acts as the source of truth for the AI.

**Required Tags:**

- `<goal>`: A concise summary of what the code achieves.
- `<input>`: Data (Components, Resources, Events) the system reads.
- `<output>`: Data modified, Events emitted, or Side Effects produced.
- `<constraints>`: Technical limitations (e.g., "Must run on MainThread", "No allocations inside loop").
- `<test_plan>`: Steps describing how an AI should generate a unit test for this logic.

### 2.2. Context Block Example (Inventory System)

```rust
// <ai_context>
//
// <goal>
// Handles the logic when a player drags an inventory item onto a scene entity.
// </goal>
//
// <input>
// - `InventoryDragDropEvent`: Contains source item ID and target entity ID.
// - `Inventory`: Resource containing current held items.
// - `Interactable`: Component on the target entity defining valid item combinations.
// </input>
//
// <output>
// - If combination is valid: Emits `ItemUsedEvent`, removes item from `Inventory`.
// - If invalid: Emits `InteractionFailedEvent` (triggers "I can't do that" animation).
// </output>
//
// <constraints>
// - Must verify the item actually exists in inventory before processing.
// - Must handle cases where the target entity despawned during the drag frame.
// </constraints>
//
// <test_plan>
// 1. Create a mock world with an Inventory resource containing "Key".
// 2. Spawn a "Door" entity with `Interactable` component accepting "Key".
// 3. Send `InventoryDragDropEvent` (Key -> Door).
// 4. Assert `ItemUsedEvent` is received and "Key" is removed from Inventory.
// 5. Repeat with "Banana" -> "Door" and assert `InteractionFailedEvent`.
// </test_plan>
//
// </ai_context>
pub fn handle_inventory_combine_system(
    mut events: EventReader<InventoryDragDropEvent>,
    mut inventory: ResMut<Inventory>,
    interactables: Query<&Interactable>,
    mut use_events: EventWriter<ItemUsedEvent>,
    mut fail_events: EventWriter<InteractionFailedEvent>
) {
    // Implementation...
}
```

---

## 3. High-Level Architecture

The application is structured as a workspace of loosely coupled crates (plugins). The `main` crate acts as the entry point and bootloader.

### 3.1. Directory Structure

```text
/moya_vtoraya_starosta
  ├── Cargo.toml              # Workspace definition
  ├── /assets                 # Sprites, JSON/RON data, Translations
  ├── /crates
  │   ├── /game_core          # Shared types, states, and constants
  │   ├── /interaction_sys    # Mouse/Touch handling, raycasting
  │   ├── /scene_sys          # Backgrounds, navigation, click zones
  │   ├── /dialogue_sys       # Visual Novel logic, text rendering
  │   ├── /inventory_sys      # UI and item logic
  │   └── /audio_sys          # SFX and Music
  └── /src
      └── main.rs             # Application entry point (Plugin assembler)
```

---

## 4. Plugin Specifications

Each section below represents a standalone Rust crate implementing `bevy::app::Plugin`.

### 4.1. Core Logic (`game_core`)

Defines the "glue" that holds the game together.

- **Game States:**
  - `AssetLoading`: Initial load.
  - `MainMenu`: Title screen.
  - `Playing`: Active gameplay.
  - `Dialogue`: Input locked to dialogue box.
  - `Paused`: System menu.
- **Resources:** `GameConfig`, `PlayerState`.

### 4.2. Scene Management (`scene_sys`)

Responsible for rendering the point-and-click environment.

- **Components:**
  - `SceneBackground`: The static image.
  - `Hotspot`: An invisible polygon defining a clickable area (e.g., a door, an item on the floor).
  - `WalkableMesh`: Defines where the character can move.
- **Systems:**
  - `setup_scene`: Loads background and spawns hotspots based on `CurrentScene` resource.
  - `scene_transition_system`: Handles fading and switching data when changing rooms.

```rust
// <ai_context>
//
// <goal>
// Loads scene data from a RON file and spawns the background and hotspots.
// </goal>
//
// <input>
// - `CurrentScene`: Resource indicating which scene ID to load.
// - `AssetServer`: To load sprites and data files.
// </input>
//
// <output>
// - Spawns 1 `SpriteBundle` for background (Z-index 0).
// - Spawns N entities with `Hotspot` components and `Interaction` bundles (Z-index 1).
// </output>
//
// <constraints>
// - Must clean up (despawn) entities from the previous scene before loading.
// - Parsing errors in scene files should log an error but not crash the WASM app.
// </constraints>
//
// <test_plan>
// Mock the asset loader to return a simple JSON definition of a scene.
// Trigger the system and assert that the correct number of entities are spawned in the World.
// </test_plan>
//
// </ai_context>
pub fn load_scene_system(
    mut commands: Commands,
    scene_data: Res<CurrentScene>,
    asset_server: Res<AssetServer>
) {
    // ...
}
```

### 4.3. Interaction System (`interaction_sys`)

Handles the "verbs" of the game (Look, Use, Talk, Walk).

- **Logic:**
  - Uses `bevy_mod_picking` or custom raycasting to detect mouse/touch over `Hotspot` entities.
  - Manages the "Cursor State" (e.g., Default, Hover, HoldingItem).
- **Events:** `ClickEvent`, `HoverEvent`.

### 4.4. Dialogue System (`dialogue_sys`)

A lightweight visual novel engine overlay.

- **Data Structure:** Nodes containing text, speaker ID, and choices.
- **UI:** A dedicated Wasm-compatible UI layer (using Bevy UI).
- **Logic:**
  - When active, it consumes all input, preventing character movement.
  - Supports Russian text (requires Unicode-compatible font loading).

### 4.5. Inventory System (`inventory_sys`)

- **UI:** A persistent bar (bottom or top) showing collected items.
- **Logic:**
  - `PickupItem`: Removes item from Scene, adds to Inventory Resource.
  - `CombineItem`: Logic for Item A + Item B.

---

## 5. WebAssembly (Wasm) Considerations

To ensure the game runs smoothly in a browser:

1.  **Asset Streaming:** The `AssetLoading` state must hold until critical assets are fetched via HTTP. We will use `bevy_asset_loader`.
2.  **Audio:** Browsers require a user interaction (click) before audio context starts. The `MainMenu` must force a click to start the game logic.
3.  **Panic Hook:** We must use `console_error_panic_hook` to pipe Rust panics to the browser console for debugging.

---

## 6. Implementation Strategy for AI Agents

When tasking an AI to implement a feature, provide the specific **Crate Context** and the **Semantic Block**.

**Prompt Template:**

> "Act as a Rust Game Developer. Implement the system described in the `<ai_context>` block below. The system belongs to the `inventory_sys` plugin. Ensure you use Bevy 0.13+ syntax. Do not modify the context block. Generate the code and the unit test described in the test plan."

By strictly compartmentalizing the plugins, the AI acts on a small, safe subset of the code (e.g., "Fix the sorting in the inventory UI") without needing to understand the entire engine, reducing complexity and error rates.

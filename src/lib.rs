use bevy::asset::{AssetMetaCheck, LoadState};
use bevy::log::LogPlugin;
use bevy::prelude::*;

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(States, Debug, Clone, Eq, PartialEq, Hash, Default)]
pub enum AppState {
    #[default]
    Loading,
    Running,
}

#[derive(Resource, Default)]
struct ImageHandle(Handle<Image>);

fn setup(mut commands: Commands, asset_server: Res<AssetServer>) {
    info!("SETUP SYSTEM RUNNING: Loading asset: spb.webp");
    commands.insert_resource(ClearColor(Color::rgb(0.2, 0.2, 0.8))); // Blue background
    commands.insert_resource(ImageHandle(asset_server.load("spb.webp")));
}

fn check_loading(
    mut next_state: ResMut<NextState<AppState>>,
    image_handle: Res<ImageHandle>,
    asset_server: Res<AssetServer>,
) {
    let load_state = asset_server.get_load_state(&image_handle.0);
    info!("Asset load state: {:?}", load_state);
    if load_state == Some(LoadState::Loaded) {
        info!("Asset loaded successfully!");
        next_state.set(AppState::Running);
    } else if let Some(LoadState::Failed) = load_state {
        error!("Failed to load asset!");
    }
}

fn setup_camera(mut commands: Commands) {
    commands.spawn(Camera2dBundle::default());
}

fn display_image(mut commands: Commands, image_handle: Res<ImageHandle>) {
    commands.spawn(SpriteBundle {
        texture: image_handle.0.clone(),
        ..default()
    });
}

pub struct GamePlugin;

impl Plugin for GamePlugin {
    fn build(&self, app: &mut App) {
        app.init_state::<AppState>()
            .add_systems(OnEnter(AppState::Loading), setup)
            .add_systems(Update, check_loading.run_if(in_state(AppState::Loading)))
            .add_systems(OnEnter(AppState::Running), (setup_camera, display_image));
    }
}

pub fn create_app() -> App {
    let mut app = App::new();
    app.insert_resource(AssetMetaCheck::Never)
        .add_plugins(DefaultPlugins.set(WindowPlugin {
            primary_window: Some(Window {
                title: "Starosta Game PoC".into(),
                canvas: Some("#bevy-canvas".into()),
                prevent_default_event_handling: false,
                ..default()
            }),
            ..default()
        }).set(LogPlugin {
            level: bevy::log::Level::INFO,
            filter: "wgpu=error,bevy_render=info,starosta_game=info".to_string(),
            ..default()
        }))
        .add_plugins(GamePlugin);
    app
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
    tracing_wasm::set_as_global_default();
    create_app().run();
}

use bevy::asset::LoadState;
use bevy::prelude::*;

#[derive(States, Debug, Clone, Eq, PartialEq, Hash, Default)]
pub enum AppState {
    #[default]
    Loading,
    Running,
}

#[derive(Resource, Default)]
struct ImageHandle(Handle<Image>);

fn setup(mut commands: Commands, asset_server: Res<AssetServer>) {
    commands.insert_resource(ImageHandle(asset_server.load("spb.bmp")));
}

fn check_loading(
    mut next_state: ResMut<NextState<AppState>>,
    image_handle: Res<ImageHandle>,
    asset_server: Res<AssetServer>,
) {
    if asset_server.get_load_state(&image_handle.0) == Some(LoadState::Loaded) {
        next_state.set(AppState::Running);
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

export const TILES = {
    DUROTAR: 'durotar',
    GATES: 'gates',
    TOWN: 'map2',
    DUNGEON: 'dungeon',
    DUNGEON1616:'dungeon-16-16',
    CLOUD:'cloud',
    ROAD:'road'
}

export const SIZES = {
    TILE: 32,
    NEWTILE: 64,
    TILEMINI: 16,
    PLAYER: {
        WIDTH: 48,
        HEIGHT: 48
    },
    PRESIOS: {
        WIDTH: 16,
        HEIGHT: 16
    },
    ENEMY: {
        WIDTH: 16,
        HEIGHT: 16
    },

}

export const LAYERS = {
    GROUND: 'ground',
    WALLS: 'walls',
    FOREST:'forest',
    MOUNT:'mount',
    WATER:'water',
    GATES: 'gates',
    MONSTR: 'monstr',
    MAGIC: 'magic',
    ROAD:'road'
}

export const SPRITES = {
    PLAYER: 'Player',
    TILES_SPR:'tiles_spr',
    ENEMY:'tiles_spr',
    LIGHT:'light'
}
export enum EVENTS_NAME {
    gameEnd = 'game-end',
    chestLoot = 'chest-loot',
    attack = 'attack',
  }
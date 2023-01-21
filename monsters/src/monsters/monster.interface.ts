import {Document} from 'mongoose';

export interface Monster extends Document {
    readonly "index": {
        readonly "type": "String"
    },
    readonly "name": {
        readonly "type": "String"
    },
    readonly "size": {
        readonly "type": "String"
    },
    readonly "type": {
        readonly "type": "String"
    },
    readonly "alignment": {
        readonly "type": "String"
    },
    readonly "armor_class": {
        readonly "type": "Number"
    },
    readonly "hit_points": {
        readonly "type": "Number"
    },
    readonly "hit_dice": {
        readonly "type": "String"
    },
    readonly "hit_points_roll": {
        readonly "type": "String"
    },
    readonly  "speed": {
        readonly  "walk": {
            readonly "type": "String"
        },
        readonly "swim": {
            readonly "type": "String"
        }
    },
    readonly "strength": {
        readonly "type": "Number"
    },
    readonly  "dexterity": {
        readonly "type": "Number"
    },
    readonly "constitution": {
        readonly "type": "Number"
    },
    readonly "intelligence": {
        readonly "type": "Number"
    },
    readonly "wisdom": {
        readonly "type": "Number"
    },
    readonly "charisma": {
        readonly "type": "Number"
    },
    readonly "proficiencies": {
        readonly "type": [
            "Mixed"
        ]
    },
    readonly "damage_vulnerabilities": {
        readonly "type": "Array"
    },
    readonly "damage_resistances": {
        readonly "type": "Array"
    },
    readonly "damage_immunities": {
        readonly "type": "Array"
    },
    readonly "condition_immunities": {
        readonly "type": "Array"
    },
    readonly "senses": {
        readonly "darkvision": {
            readonly "type": "String"
        },
        readonly "passive_perception": {
            readonly "type": "Number"
        }
    },
    readonly "languages": {
        readonly "type": "String"
    },
    readonly "challenge_rating": {
        readonly "type": "Number"
    },
    readonly "xp": {
        readonly "type": "Number"
    },
    readonly "special_abilities": {
        readonly "type": [
            "Mixed"
        ]
    },
    readonly "actions": {
        readonly "type": [
            "Mixed"
        ]
    },
    readonly "legendary_actions": {
        readonly "type": [
            "Mixed"
        ]
    },
    readonly "image": {
        readonly "type": "String"
    },
    readonly "url": {
        readonly "type": "String"
    }
}
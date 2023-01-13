import * as mongoose from 'mongoose'

export const MonsterSchema = new mongoose.Schema({
    "index": {
        "type": "String"
    },
    "name": {
        "type": "String"
    },
    "size": {
        "type": "String"
    },
    "type": {
        "type": "String"
    },
    "alignment": {
        "type": "String"
    },
    "armor_class": {
        "type": "Number"
    },
    "hit_points": {
        "type": "Number"
    },
    "hit_dice": {
        "type": "String"
    },
    "hit_points_roll": {
        "type": "String"
    },
    "speed": {
        "walk": {
            "type": "String"
        },
        "swim": {
            "type": "String"
        }
    },
    "strength": {
        "type": "Number"
    },
    "dexterity": {
        "type": "Number"
    },
    "constitution": {
        "type": "Number"
    },
    "intelligence": {
        "type": "Number"
    },
    "wisdom": {
        "type": "Number"
    },
    "charisma": {
        "type": "Number"
    },
    "proficiencies": {
        "type": [
            "Mixed"
        ]
    },
    "damage_vulnerabilities": {
        "type": "Array"
    },
    "damage_resistances": {
        "type": "Array"
    },
    "damage_immunities": {
        "type": "Array"
    },
    "condition_immunities": {
        "type": "Array"
    },
    "senses": {
        "darkvision": {
            "type": "String"
        },
        "passive_perception": {
            "type": "Number"
        }
    },
    "languages": {
        "type": "String"
    },
    "challenge_rating": {
        "type": "Number"
    },
    "xp": {
        "type": "Number"
    },
    "special_abilities": {
        "type": [
            "Mixed"
        ]
    },
    "actions": {
        "type": [
            "Mixed"
        ]
    },
    "legendary_actions": {
        "type": [
            "Mixed"
        ]
    },
    "image": {
        "type": "String"
    },
    "url": {
        "type": "String"
    }
})
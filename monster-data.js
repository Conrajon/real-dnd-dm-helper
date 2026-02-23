/* ═══════════════════════════════════════════════════════════════
   MONSTER DATA — All D&D Monsters Name Index + Key Stat Blocks
   ═══════════════════════════════════════════════════════════════ */

/* Compact name index: "Name|Type|CR|Size" — for dropdown + filtering */
var MONSTER_INDEX_RAW = [
"Aarakocra|Humanoid|1|M|Mountain,Coastal","Aboleth|Aberration|10|L|Underdark,Underwater","Acolyte|Humanoid|0.25|M|Urban","Adult Black Dragon|Dragon|14|H|Swamp","Adult Blue Dragon|Dragon|16|H|Desert,Coastal","Adult Brass Dragon|Dragon|13|H|Desert","Adult Bronze Dragon|Dragon|15|H|Coastal","Adult Copper Dragon|Dragon|14|H|Hill,Mountain","Adult Gold Dragon|Dragon|17|H|Forest,Grassland","Adult Green Dragon|Dragon|15|H|Forest","Adult Red Dragon|Dragon|17|H|Mountain,Hill","Adult Silver Dragon|Dragon|16|H|Mountain,Urban","Adult White Dragon|Dragon|13|H|Arctic",
"Air Elemental|Elemental|5|L|Mountain,Desert","Allosaurus|Beast|2|L|Grassland,Forest","Ancient Black Dragon|Dragon|21|G|Swamp","Ancient Blue Dragon|Dragon|23|G|Desert","Ancient Brass Dragon|Dragon|20|G|Desert","Ancient Bronze Dragon|Dragon|22|G|Coastal","Ancient Copper Dragon|Dragon|21|G|Hill","Ancient Gold Dragon|Dragon|24|G|Forest","Ancient Green Dragon|Dragon|22|G|Forest","Ancient Red Dragon|Dragon|24|G|Mountain","Ancient Silver Dragon|Dragon|23|G|Mountain","Ancient White Dragon|Dragon|20|G|Arctic","Androsphinx|Monstrosity|17|L|Desert",
"Animated Armor|Construct|1|M|Urban,Underdark","Ankheg|Monstrosity|2|L|Forest,Grassland","Ape|Beast|0.5|M|Forest","Archmage|Humanoid|12|M|Urban","Assassin|Humanoid|8|M|Urban","Awakened Shrub|Plant|0|S|Forest","Awakened Tree|Plant|2|H|Forest","Axe Beak|Beast|0.25|L|Grassland,Hill",
"Baboon|Beast|0|S|Forest,Hill","Balor|Fiend|19|H|Underdark","Bandit|Humanoid|0.125|M|Urban,Forest","Bandit Captain|Humanoid|2|M|Urban,Forest,Coastal","Banshee|Undead|4|M|Forest,Urban,Swamp","Barbed Devil|Fiend|5|M|Underdark","Basilisk|Monstrosity|3|M|Mountain,Underdark","Bat|Beast|0|T|Forest,Urban","Bearded Devil|Fiend|3|M|Underdark","Behir|Monstrosity|11|H|Underdark,Mountain","Beholder|Aberration|13|L|Underdark","Beholder Zombie|Undead|5|L|Underdark","Berserker|Humanoid|2|M|Arctic,Forest,Hill","Black Bear|Beast|0.5|M|Forest","Black Dragon Wyrmling|Dragon|2|M|Swamp","Black Pudding|Ooze|4|L|Underdark,Swamp","Blink Dog|Fey|0.25|M|Forest","Blood Hawk|Beast|0.125|S|Mountain,Coastal,Forest","Blue Dragon Wyrmling|Dragon|3|M|Desert","Boar|Beast|0.25|M|Forest,Grassland,Hill","Bone Devil|Fiend|9|L|Underdark","Brass Dragon Wyrmling|Dragon|1|M|Desert","Brown Bear|Beast|1|L|Forest,Hill,Arctic","Bugbear|Humanoid|1|M|Forest,Underdark","Bugbear Chief|Humanoid|3|M|Forest,Underdark","Bulette|Monstrosity|5|L|Grassland,Hill,Mountain",
"Cambion|Fiend|5|M|Urban,Underdark","Carrion Crawler|Monstrosity|2|L|Underdark","Cat|Beast|0|T|Urban,Forest","Centaur|Monstrosity|2|L|Forest,Grassland","Chain Devil|Fiend|8|M|Underdark","Chimera|Monstrosity|6|L|Hill,Mountain,Grassland","Chuul|Aberration|4|L|Underdark,Swamp,Underwater","Clay Golem|Construct|9|L|Urban,Underdark","Cloaker|Aberration|8|L|Underdark","Cloud Giant|Giant|9|H|Mountain","Cockatrice|Monstrosity|0.5|S|Grassland","Copper Dragon Wyrmling|Dragon|1|M|Hill","Couatl|Celestial|4|M|Forest,Grassland","Crab|Beast|0|T|Coastal","Crawling Claw|Undead|0|T|Urban,Underdark","Crocodile|Beast|0.5|L|Swamp,Coastal","Cult Fanatic|Humanoid|2|M|Urban,Underdark","Cultist|Humanoid|0.125|M|Urban,Underdark","Cyclops|Giant|6|H|Coastal,Hill,Mountain",
"Darkmantle|Monstrosity|0.5|S|Underdark","Death Dog|Monstrosity|1|M|Desert,Grassland","Death Knight|Undead|17|M|Underdark","Death Tyrant|Undead|14|L|Underdark","Deer|Beast|0|M|Forest,Grassland","Demilich|Undead|18|T|Underdark","Deva|Celestial|10|M|Forest,Urban","Dire Wolf|Beast|1|L|Forest,Hill,Grassland,Arctic","Displacer Beast|Monstrosity|3|L|Forest","Djinni|Elemental|11|L|Desert,Coastal","Doppelganger|Monstrosity|3|M|Urban,Underdark","Draft Horse|Beast|0.25|L|Urban,Grassland","Dragon Turtle|Dragon|17|G|Coastal,Underwater","Dretch|Fiend|0.25|S|Underdark","Drider|Monstrosity|6|L|Underdark","Drow|Humanoid|0.25|M|Underdark","Drow Elite Warrior|Humanoid|5|M|Underdark","Druid|Humanoid|2|M|Forest,Grassland","Dryad|Fey|1|M|Forest","Duergar|Humanoid|1|M|Underdark","Dust Mephit|Elemental|0.5|S|Desert",
"Eagle|Beast|0|S|Mountain,Grassland","Earth Elemental|Elemental|5|L|Mountain,Underdark","Efreeti|Elemental|11|L|Desert","Elephant|Beast|4|H|Grassland,Forest","Elk|Beast|0.25|L|Forest,Grassland","Empyrean|Celestial|23|H|Mountain","Erinyes|Fiend|12|M|Underdark","Ettin|Giant|4|L|Hill,Mountain,Underdark","Ettercap|Monstrosity|2|M|Forest",
"Fire Elemental|Elemental|5|L|Desert,Mountain","Fire Giant|Giant|9|H|Mountain,Underdark","Flameskull|Undead|4|T|Underdark,Urban","Flesh Golem|Construct|5|M|Urban,Underdark","Flying Snake|Beast|0.125|T|Forest,Grassland,Desert","Flying Sword|Construct|0.25|S|Urban","Fomorian|Giant|8|H|Underdark","Frog|Beast|0|T|Swamp,Forest","Frost Giant|Giant|8|H|Arctic,Mountain",
"Galeb Duhr|Elemental|6|M|Mountain,Hill","Gargoyle|Elemental|2|M|Urban,Mountain","Gas Spore|Plant|0.5|L|Underdark","Gelatinous Cube|Ooze|2|L|Underdark","Ghast|Undead|2|M|Urban,Underdark,Swamp","Ghost|Undead|4|M|Urban,Underdark","Ghoul|Undead|1|M|Urban,Underdark,Swamp","Giant Ape|Beast|7|H|Forest,Hill","Giant Bat|Beast|0.25|L|Underdark,Forest","Giant Boar|Beast|2|L|Forest,Grassland,Hill","Giant Centipede|Beast|0.25|S|Underdark,Forest","Giant Constrictor Snake|Beast|2|H|Forest,Swamp","Giant Crab|Beast|0.125|M|Coastal,Underwater","Giant Crocodile|Beast|5|H|Swamp,Coastal","Giant Eagle|Beast|1|L|Mountain,Grassland,Coastal","Giant Elk|Beast|2|H|Forest,Grassland","Giant Fire Beetle|Beast|0|S|Underdark","Giant Frog|Beast|0.25|M|Swamp,Forest","Giant Goat|Beast|0.5|L|Mountain,Hill","Giant Hyena|Beast|1|L|Grassland,Desert,Hill","Giant Lizard|Beast|0.25|L|Underdark,Forest,Desert","Giant Octopus|Beast|1|L|Underwater,Coastal","Giant Owl|Beast|0.25|L|Forest,Hill","Giant Poisonous Snake|Beast|0.25|M|Forest,Swamp,Desert","Giant Rat|Beast|0.125|S|Urban,Swamp,Underdark","Giant Scorpion|Beast|3|L|Desert,Underdark","Giant Sea Horse|Beast|0.5|L|Underwater,Coastal","Giant Shark|Beast|5|H|Underwater,Coastal","Giant Spider|Beast|1|L|Forest,Underdark,Swamp","Giant Toad|Beast|1|L|Swamp,Forest,Coastal","Giant Vulture|Beast|1|L|Desert,Grassland","Giant Wasp|Beast|0.5|M|Forest","Giant Weasel|Beast|0.125|M|Forest,Grassland","Giant Wolf Spider|Beast|0.25|M|Forest,Grassland,Underdark","Gibbering Mouther|Aberration|2|M|Underdark","Glabrezu|Fiend|9|L|Underdark","Gladiator|Humanoid|5|M|Urban","Gnoll|Humanoid|0.5|M|Forest,Grassland,Hill","Gnoll Fang of Yeenoghu|Fiend|4|M|Forest,Grassland","Goblin|Humanoid|0.25|S|Forest,Hill,Underdark","Goblin Boss|Humanoid|1|S|Forest,Hill,Underdark","Gold Dragon Wyrmling|Dragon|3|M|Forest,Grassland","Gorgon|Monstrosity|5|L|Grassland,Hill","Gray Ooze|Ooze|0.5|M|Underdark,Swamp","Green Dragon Wyrmling|Dragon|2|M|Forest","Green Hag|Fey|3|M|Forest,Swamp","Grick|Monstrosity|2|M|Underdark,Forest","Grick Alpha|Monstrosity|7|L|Underdark","Griffon|Monstrosity|2|L|Mountain,Grassland,Coastal,Hill","Grimlock|Humanoid|0.25|M|Underdark","Guard|Humanoid|0.125|M|Urban","Guardian Naga|Monstrosity|10|L|Forest,Desert","Gynosphinx|Monstrosity|11|L|Desert",
"Half-Red Dragon Veteran|Humanoid|5|M|Mountain","Harpy|Monstrosity|1|M|Mountain,Forest,Coastal","Hawk|Beast|0|T|Grassland,Mountain,Coastal","Hell Hound|Fiend|3|M|Underdark","Helmed Horror|Construct|4|M|Urban,Underdark","Hezrou|Fiend|8|L|Underdark","Hill Giant|Giant|5|H|Hill,Mountain,Grassland","Hippogriff|Monstrosity|1|L|Mountain,Grassland,Hill","Hobgoblin|Humanoid|0.5|M|Forest,Hill,Underdark","Hobgoblin Captain|Humanoid|3|M|Forest,Hill,Underdark","Hobgoblin Warlord|Humanoid|6|M|Forest,Hill,Underdark","Homunculus|Construct|0|T|Urban","Hook Horror|Monstrosity|3|L|Underdark","Horned Devil|Fiend|11|L|Underdark","Hunter Shark|Beast|2|L|Underwater,Coastal","Hydra|Monstrosity|8|H|Swamp,Coastal,Underwater","Hyena|Beast|0|M|Grassland,Desert",
"Ice Devil|Fiend|14|L|Arctic,Underdark","Ice Mephit|Elemental|0.5|S|Arctic","Imp|Fiend|1|T|Urban,Underdark","Intellect Devourer|Aberration|2|T|Underdark","Invisible Stalker|Elemental|6|M|Urban,Mountain","Iron Golem|Construct|16|L|Urban,Underdark",
"Jackal|Beast|0|S|Grassland,Desert","Jackalwere|Humanoid|0.5|M|Desert,Grassland",
"Kenku|Humanoid|0.25|M|Urban,Forest","Killer Whale|Beast|3|H|Underwater,Coastal","Knight|Humanoid|3|M|Urban,Grassland","Kobold|Humanoid|0.125|S|Forest,Hill,Mountain,Underdark","Kraken|Monstrosity|23|G|Underwater,Coastal",
"Lamia|Monstrosity|4|L|Desert","Lemure|Fiend|0|M|Underdark","Lich|Undead|21|M|Underdark,Urban","Lion|Beast|1|L|Grassland,Desert","Lizard|Beast|0|T|Forest,Swamp","Lizard King|Humanoid|4|M|Swamp","Lizardfolk|Humanoid|0.5|M|Swamp,Forest","Lizardfolk Shaman|Humanoid|2|M|Swamp",
"Mage|Humanoid|6|M|Urban","Magma Mephit|Elemental|0.5|S|Mountain,Underdark","Magmin|Elemental|0.5|S|Mountain,Underdark","Mammoth|Beast|6|H|Arctic,Grassland","Manticore|Monstrosity|3|L|Mountain,Grassland,Hill,Arctic,Coastal","Marid|Elemental|11|L|Underwater,Coastal","Marilith|Fiend|16|L|Underdark","Mastiff|Beast|0.125|M|Urban,Forest","Medusa|Monstrosity|6|M|Desert,Mountain,Urban","Merfolk|Humanoid|0.125|M|Underwater,Coastal","Merrow|Monstrosity|2|L|Underwater,Coastal","Mezzoloth|Fiend|5|M|Underdark","Mimic|Monstrosity|2|M|Underdark,Urban","Mind Flayer|Aberration|7|M|Underdark","Minotaur|Monstrosity|3|L|Underdark","Minotaur Skeleton|Undead|2|L|Underdark","Monodrone|Construct|0.125|S|Urban","Mud Mephit|Elemental|0.25|S|Swamp","Mule|Beast|0.125|M|Urban,Grassland","Mummy|Undead|3|M|Desert,Underdark","Mummy Lord|Undead|15|M|Desert,Underdark",
"Nalfeshnee|Fiend|13|L|Underdark","Night Hag|Fiend|5|M|Underdark,Swamp","Nightmare|Fiend|3|L|Underdark","Noble|Humanoid|0.125|M|Urban","Nothic|Aberration|2|M|Underdark","Nycaloth|Fiend|9|L|Underdark",
"Ochre Jelly|Ooze|2|L|Underdark,Swamp","Octopus|Beast|0|T|Underwater,Coastal","Ogre|Giant|2|L|Forest,Hill,Mountain,Swamp","Ogre Zombie|Undead|2|L|Forest,Hill","Oni|Giant|7|L|Forest,Urban","Orc|Humanoid|0.5|M|Forest,Hill,Mountain,Underdark","Orc Eye of Gruumsh|Humanoid|2|M|Forest,Hill,Underdark","Orc War Chief|Humanoid|4|M|Forest,Hill,Underdark","Otyugh|Aberration|5|L|Underdark,Urban","Owl|Beast|0|T|Forest,Arctic","Owlbear|Monstrosity|3|L|Forest",
"Panther|Beast|0.25|M|Forest,Grassland,Hill","Pegasus|Celestial|2|L|Forest,Grassland,Mountain","Phase Spider|Monstrosity|3|L|Forest,Underdark","Piercer|Monstrosity|0.5|M|Underdark","Pit Fiend|Fiend|20|L|Underdark","Planetar|Celestial|16|L|Forest,Mountain","Plesiosaurus|Beast|2|L|Underwater,Coastal","Poisonous Snake|Beast|0.125|T|Forest,Swamp,Desert","Polar Bear|Beast|2|L|Arctic","Pony|Beast|0.125|M|Urban,Grassland","Priest|Humanoid|2|M|Urban","Pseudodragon|Dragon|0.25|T|Forest,Mountain","Pteranodon|Beast|0.25|M|Coastal,Mountain","Purple Worm|Monstrosity|15|G|Underdark,Desert",
"Quaggoth|Humanoid|2|M|Underdark","Quasit|Fiend|1|T|Urban,Underdark",
"Rakshasa|Fiend|13|M|Urban","Rat|Beast|0|T|Urban,Swamp","Raven|Beast|0|T|Forest,Urban,Hill","Red Dragon Wyrmling|Dragon|4|M|Mountain,Hill","Reef Shark|Beast|0.5|M|Underwater,Coastal","Remorhaz|Monstrosity|11|H|Arctic","Rhinoceros|Beast|2|L|Grassland","Riding Horse|Beast|0.25|L|Grassland,Urban","Roc|Monstrosity|11|G|Mountain,Coastal","Roper|Monstrosity|5|L|Underdark","Rug of Smothering|Construct|2|L|Urban","Rust Monster|Monstrosity|0.5|M|Underdark",
"Saber-Toothed Tiger|Beast|2|L|Arctic,Forest,Mountain","Sahuagin|Humanoid|0.5|M|Underwater,Coastal","Sahuagin Baron|Humanoid|5|L|Underwater,Coastal","Sahuagin Priestess|Humanoid|2|M|Underwater,Coastal","Salamander|Elemental|5|L|Underdark","Satyr|Fey|0.5|M|Forest","Scarecrow|Construct|1|M|Forest,Grassland","Scorpion|Beast|0|T|Desert","Scout|Humanoid|0.5|M|Forest,Grassland,Hill","Sea Hag|Fey|2|M|Coastal,Underwater,Swamp","Sea Horse|Beast|0|T|Underwater,Coastal","Shadow|Undead|0.5|M|Underdark,Urban","Shadow Demon|Fiend|4|M|Underdark","Shambling Mound|Plant|5|L|Forest,Swamp","Shield Guardian|Construct|7|L|Urban,Underdark","Shrieker|Plant|0|M|Underdark,Forest","Silver Dragon Wyrmling|Dragon|2|M|Mountain","Skeleton|Undead|0.25|M|Underdark,Urban","Smoke Mephit|Elemental|0.25|S|Urban,Underdark","Solar|Celestial|21|L|Forest,Mountain","Specter|Undead|1|M|Underdark,Urban","Spider|Beast|0|T|Forest,Swamp,Urban","Spirit Naga|Monstrosity|8|L|Underdark","Sprite|Fey|0.25|T|Forest","Spy|Humanoid|1|M|Urban","Steam Mephit|Elemental|0.25|S|Swamp,Underwater","Stirge|Beast|0.125|T|Forest,Swamp,Underdark,Urban","Stone Giant|Giant|7|H|Mountain,Underdark","Stone Golem|Construct|10|L|Urban,Underdark","Storm Giant|Giant|13|H|Coastal,Mountain,Underwater","Succubus|Fiend|4|M|Urban,Underdark","Swarm of Bats|Beast|0.25|M|Underdark,Forest","Swarm of Insects|Beast|0.5|M|Forest,Swamp","Swarm of Poisonous Snakes|Beast|2|M|Forest,Swamp","Swarm of Rats|Beast|0.25|M|Urban,Swamp","Swarm of Ravens|Beast|0.25|M|Forest,Urban",
"Tarrasque|Monstrosity|30|G|Urban,Grassland,Mountain","Thug|Humanoid|0.5|M|Urban","Tiger|Beast|1|L|Forest,Grassland","Treant|Plant|9|H|Forest","Tribal Warrior|Humanoid|0.125|M|Grassland,Forest,Desert,Arctic","Triceratops|Beast|5|H|Grassland","Troll|Giant|5|L|Forest,Swamp,Hill,Mountain,Underdark","Tyrannosaurus Rex|Beast|8|H|Grassland,Forest",
"Ultroloth|Fiend|13|M|Underdark","Unicorn|Celestial|5|L|Forest","Umber Hulk|Monstrosity|5|L|Underdark",
"Vampire|Undead|13|M|Urban,Underdark","Vampire Spawn|Undead|5|M|Urban,Underdark","Veteran|Humanoid|3|M|Urban,Grassland,Forest","Violet Fungus|Plant|0.25|M|Underdark","Vrock|Fiend|6|L|Underdark","Vulture|Beast|0|M|Desert,Grassland",
"Warhorse|Beast|0.5|L|Grassland,Urban","Warhorse Skeleton|Undead|0.5|L|Underdark","Water Elemental|Elemental|5|L|Swamp,Coastal,Underwater","Weasel|Beast|0|T|Forest,Grassland","Werebear|Humanoid|5|M|Forest,Arctic","Wereboar|Humanoid|4|M|Forest,Grassland","Wererat|Humanoid|2|M|Urban","Weretiger|Humanoid|4|M|Forest,Grassland","Werewolf|Humanoid|3|M|Forest,Hill","White Dragon Wyrmling|Dragon|2|M|Arctic","Wight|Undead|3|M|Underdark,Urban,Swamp","Will-o'-Wisp|Undead|2|T|Forest,Swamp","Winter Wolf|Monstrosity|3|L|Arctic","Wolf|Beast|0.25|M|Forest,Grassland,Hill","Worg|Monstrosity|0.5|L|Forest,Grassland,Hill","Wraith|Undead|5|M|Underdark,Urban","Wyvern|Dragon|6|L|Mountain,Hill,Coastal",
"Xorn|Elemental|5|M|Underdark",
"Yeti|Monstrosity|3|L|Arctic","Young Black Dragon|Dragon|7|L|Swamp","Young Blue Dragon|Dragon|9|L|Desert,Coastal","Young Brass Dragon|Dragon|6|L|Desert","Young Bronze Dragon|Dragon|8|L|Coastal","Young Copper Dragon|Dragon|7|L|Hill,Mountain","Young Gold Dragon|Dragon|10|L|Forest,Grassland","Young Green Dragon|Dragon|8|L|Forest","Young Red Dragon|Dragon|10|L|Mountain,Hill","Young Red Shadow Dragon|Dragon|13|L|Underdark","Young Silver Dragon|Dragon|9|L|Mountain","Young White Dragon|Dragon|6|L|Arctic",
"Zombie|Undead|0.25|M|Urban,Underdark,Swamp","Zombie Ogre|Undead|2|L|Underdark"
];

/* Parse the compact index into objects */
var MONSTER_INDEX = MONSTER_INDEX_RAW.map(function(s) {
    var p = s.split('|');
    return { n:p[0], t:p[1], cr:parseFloat(p[2]), sz:p[3], env:(p[4]||'').split(',') };
});

/* Size abbreviation map */
var SIZE_MAP = {T:"Tiny",S:"Small",M:"Medium",L:"Large",H:"Huge",G:"Gargantuan"};

/* ═══════════════════════════════════════════════════════════════
   CR-BASED STAT GENERATION TABLES (from DMG)
   ═══════════════════════════════════════════════════════════════ */
var CR_STATS = {
0:{ac:12,hpMin:1,hpMax:6,atk:3,dmg:"0-1",save:13,prof:2},
"0.125":{ac:13,hpMin:7,hpMax:35,atk:3,dmg:"2-3",save:13,prof:2},
"0.25":{ac:13,hpMin:7,hpMax:35,atk:3,dmg:"4-5",save:13,prof:2},
"0.5":{ac:13,hpMin:7,hpMax:35,atk:3,dmg:"6-8",save:13,prof:2},
1:{ac:13,hpMin:36,hpMax:49,atk:3,dmg:"9-14",save:13,prof:2},
2:{ac:13,hpMin:50,hpMax:70,atk:3,dmg:"15-20",save:13,prof:2},
3:{ac:13,hpMin:71,hpMax:85,atk:4,dmg:"21-26",save:13,prof:2},
4:{ac:14,hpMin:86,hpMax:100,atk:5,dmg:"27-32",save:14,prof:2},
5:{ac:15,hpMin:101,hpMax:115,atk:6,dmg:"33-38",save:15,prof:3},
6:{ac:15,hpMin:116,hpMax:130,atk:6,dmg:"39-44",save:15,prof:3},
7:{ac:15,hpMin:131,hpMax:145,atk:6,dmg:"45-50",save:15,prof:3},
8:{ac:16,hpMin:146,hpMax:160,atk:7,dmg:"51-56",save:16,prof:3},
9:{ac:16,hpMin:161,hpMax:175,atk:7,dmg:"57-62",save:16,prof:4},
10:{ac:17,hpMin:176,hpMax:190,atk:7,dmg:"63-68",save:16,prof:4},
11:{ac:17,hpMin:191,hpMax:205,atk:8,dmg:"69-74",save:17,prof:4},
12:{ac:17,hpMin:206,hpMax:220,atk:8,dmg:"75-80",save:17,prof:4},
13:{ac:18,hpMin:221,hpMax:235,atk:8,dmg:"81-86",save:18,prof:5},
14:{ac:18,hpMin:236,hpMax:250,atk:8,dmg:"87-92",save:18,prof:5},
15:{ac:18,hpMin:251,hpMax:265,atk:8,dmg:"93-98",save:18,prof:5},
16:{ac:18,hpMin:266,hpMax:280,atk:9,dmg:"99-104",save:18,prof:5},
17:{ac:19,hpMin:281,hpMax:295,atk:10,dmg:"105-110",save:19,prof:6},
18:{ac:19,hpMin:296,hpMax:310,atk:10,dmg:"111-116",save:19,prof:6},
19:{ac:19,hpMin:311,hpMax:325,atk:10,dmg:"117-122",save:19,prof:6},
20:{ac:19,hpMin:326,hpMax:340,atk:10,dmg:"123-140",save:19,prof:6},
21:{ac:19,hpMin:341,hpMax:355,atk:11,dmg:"141-158",save:20,prof:7},
22:{ac:19,hpMin:356,hpMax:400,atk:11,dmg:"159-176",save:20,prof:7},
23:{ac:19,hpMin:401,hpMax:445,atk:11,dmg:"177-194",save:20,prof:7},
24:{ac:19,hpMin:446,hpMax:490,atk:12,dmg:"195-212",save:21,prof:7},
25:{ac:19,hpMin:491,hpMax:535,atk:12,dmg:"213-230",save:21,prof:8},
26:{ac:19,hpMin:536,hpMax:580,atk:12,dmg:"231-248",save:21,prof:8},
27:{ac:19,hpMin:581,hpMax:625,atk:13,dmg:"249-266",save:22,prof:8},
28:{ac:19,hpMin:626,hpMax:670,atk:13,dmg:"267-284",save:22,prof:8},
29:{ac:19,hpMin:671,hpMax:715,atk:13,dmg:"285-302",save:22,prof:9},
30:{ac:19,hpMin:716,hpMax:760,atk:14,dmg:"303-320",save:23,prof:9}
};

/* ═══════════════════════════════════════════════════════════════
   TYPE-BASED TRAITS AND FLAVOR
   ═══════════════════════════════════════════════════════════════ */
var TYPE_TRAITS = {
"Aberration":{ab:"int",traits:["Telepathy 60 ft.","Magic Resistance"],senses:"Darkvision 60 ft.",lang:"Deep Speech, telepathy 60 ft.",di:"",dr:"",dv:"",ci:""},
"Beast":{ab:"str",traits:["Keen Senses"],senses:"",lang:"—",di:"",dr:"",dv:"",ci:""},
"Celestial":{ab:"wis",traits:["Magic Resistance","Divine Aura"],senses:"Truesight 120 ft.",lang:"All, telepathy 120 ft.",di:"necrotic, poison",dr:"radiant; nonmagical bludg/pierc/slash",dv:"",ci:"charmed, exhaustion, frightened"},
"Construct":{ab:"str",traits:["Immutable Form","Magic Resistance"],senses:"Darkvision 120 ft.",lang:"Understands creator's languages",di:"poison, psychic",dr:"",dv:"",ci:"charmed, exhaustion, frightened, paralyzed, petrified, poisoned"},
"Dragon":{ab:"cha",traits:["Frightful Presence","Legendary Resistance (3/Day)"],senses:"Blindsight 60 ft., Darkvision 120 ft.",lang:"Common, Draconic",di:"varies by dragon type",dr:"",dv:"",ci:""},
"Elemental":{ab:"con",traits:["Elemental Nature"],senses:"Darkvision 60 ft.",lang:"Primordial",di:"poison",dr:"nonmagical bludg/pierc/slash",dv:"",ci:"exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious"},
"Fey":{ab:"cha",traits:["Fey Ancestry","Innate Spellcasting"],senses:"Darkvision 60 ft.",lang:"Common, Elvish, Sylvan",di:"",dr:"",dv:"",ci:"charmed"},
"Fiend":{ab:"cha",traits:["Magic Resistance","Devil's Sight"],senses:"Darkvision 120 ft.",lang:"Abyssal, Infernal, telepathy 120 ft.",di:"fire, poison",dr:"cold; nonmagical bludg/pierc/slash",dv:"",ci:"poisoned"},
"Giant":{ab:"str",traits:["Powerful Build"],senses:"",lang:"Giant",di:"",dr:"",dv:"",ci:""},
"Humanoid":{ab:"dex",traits:[],senses:"",lang:"Common plus one other",di:"",dr:"",dv:"",ci:""},
"Monstrosity":{ab:"str",traits:["Keen Senses"],senses:"Darkvision 60 ft.",lang:"—",di:"",dr:"",dv:"",ci:""},
"Ooze":{ab:"con",traits:["Amorphous","Spider Climb"],senses:"Blindsight 60 ft. (blind beyond)",lang:"—",di:"acid",dr:"",dv:"",ci:"blinded, charmed, deafened, exhaustion, frightened, prone"},
"Plant":{ab:"con",traits:["False Appearance"],senses:"Blindsight 30 ft.",lang:"—",di:"",dr:"",dv:"fire",ci:"blinded, deafened, exhaustion"},
"Undead":{ab:"cha",traits:["Undead Nature","Turn Resistance"],senses:"Darkvision 60 ft.",lang:"Languages it knew in life",di:"necrotic, poison",dr:"",dv:"radiant",ci:"exhaustion, poisoned"}
};

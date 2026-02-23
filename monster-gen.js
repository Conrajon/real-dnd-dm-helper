/* ═══════════════════════════════════════════════════════════════
   MONSTER GENERATOR — Magic Items, Loot, Generation & Rendering
   ═══════════════════════════════════════════════════════════════ */

/* ── CR → XP ── */
var CR_XP = {0:10,"0.125":25,"0.25":50,"0.5":100,1:200,2:450,3:700,4:1100,5:1800,6:2300,7:2900,8:3900,9:5000,10:5900,11:7200,12:8400,13:10000,14:11500,15:13000,16:15000,17:18000,18:20000,19:22000,20:25000,21:33000,22:41000,23:50000,24:62000,25:75000,26:90000,27:105000,28:120000,29:135000,30:155000};
function _crLabel(cr){if(cr===0.125)return'1/8';if(cr===0.25)return'1/4';if(cr===0.5)return'1/2';return String(cr);}
function _mod(s){return Math.floor((s-10)/2);}
function _modStr(s){var m=_mod(s);return(m>=0?'+':'')+m;}
function _pick(a){return a[Math.floor(Math.random()*a.length)];}
function _roll(n,d){var t=0;for(var i=0;i<n;i++)t+=Math.floor(Math.random()*d)+1;return t;}
function _randBetween(a,b){return Math.floor(Math.random()*(b-a+1))+a;}

/* ═══════════════════════════════════════════════════════════════
   D&D MAGIC ITEMS BY RARITY
   ═══════════════════════════════════════════════════════════════ */
var MAGIC_ITEMS = {
common: [
"Potion of Climbing","Potion of Healing","Spell Scroll (Cantrip)","Spell Scroll (1st Level)","Candle of the Deep","Cloak of Many Fashions","Clockwork Amulet","Dread Helm","Ear Horn of Hearing","Enduring Spellbook","Ersatz Eye","Hat of Vermin","Hat of Wizardry","Heward's Handy Spice Pouch","Horn of Silent Alarm","Lock of Trickery","Mystery Key","Orb of Direction","Orb of Time","Perfume of Bewitching","Pipe of Smoke Monsters","Pole of Collapsing","Ruby of the War Mage","Shield of Expression","Smoldering Armor","Staff of Adornment","Staff of Birdcalls","Staff of Flowers","Tankard of Sobriety","Unbreakable Arrow","Veteran's Cane","Walloping Ammunition","Wand of Conducting","Wand of Pyrotechnics","Wand of Scowls","Wand of Smiles"
],
uncommon: [
"+1 Weapon","+1 Armor","+1 Shield","Adamantine Armor","Alchemy Jug","Amulet of Proof against Detection and Location","Bag of Holding","Bag of Tricks","Boots of Elvenkind","Boots of Striding and Springing","Boots of the Winterlands","Bracers of Archery","Brooch of Shielding","Broom of Flying","Cap of Water Breathing","Circlet of Blasting","Cloak of Elvenkind","Cloak of Protection","Cloak of the Manta Ray","Decanter of Endless Water","Deck of Illusions","Driftglobe","Dust of Disappearance","Dust of Dryness","Dust of Sneezing and Choking","Elemental Gem","Eversmoking Bottle","Eyes of Charming","Eyes of Minute Seeing","Eyes of the Eagle","Gauntlets of Ogre Power","Gem of Brightness","Gloves of Missile Snaring","Gloves of Swimming and Climbing","Gloves of Thievery","Goggles of Night","Hat of Disguise","Headband of Intellect","Helm of Comprehending Languages","Immovable Rod","Instrument of the Bards (Doss Lute)","Javelin of Lightning","Keoghtom's Ointment","Lantern of Revealing","Mariner's Armor","Medallion of Thoughts","Mithral Armor","Necklace of Adaptation","Pearl of Power","Periapt of Health","Periapt of Wound Closure","Pipes of Haunting","Pipes of the Sewers","Potion of Animal Friendship","Potion of Fire Breath","Potion of Greater Healing","Potion of Growth","Potion of Hill Giant Strength","Potion of Poison","Potion of Resistance","Potion of Water Breathing","Ring of Jumping","Ring of Mind Shielding","Ring of Swimming","Ring of Warmth","Ring of Water Walking","Robe of Useful Items","Rod of the Pact Keeper +1","Rope of Climbing","Saddle of the Cavalier","Sending Stones","Sentinel Shield","Slippers of Spider Climbing","Spell Scroll (2nd Level)","Spell Scroll (3rd Level)","Staff of the Adder","Staff of the Python","Stone of Good Luck (Luckstone)","Sword of Vengeance","Trident of Fish Command","Wand of Magic Detection","Wand of Magic Missiles","Wand of Secrets","Wand of the War Mage +1","Wand of Web","Weapon of Warning","Wind Fan","Winged Boots"
],
rare: [
"+2 Weapon","+2 Armor","+2 Shield","Amulet of Health","Armor of Resistance","Arrow-Catching Shield","Belt of Dwarvenkind","Belt of Hill Giant Strength","Berserker Axe","Boots of Levitation","Boots of Speed","Bowl of Commanding Water Elementals","Bracers of Defense","Brazier of Commanding Fire Elementals","Cape of the Mountebank","Censer of Controlling Air Elementals","Cloak of Displacement","Cloak of the Bat","Cube of Force","Daern's Instant Fortress","Dagger of Venom","Dimensional Shackles","Dragon Scale Mail","Dragon Slayer","Elven Chain","Figurine of Wondrous Power (Silver Raven)","Flame Tongue","Giant Slayer","Glamoured Studded Leather","Helm of Teleportation","Horn of Blasting","Horn of Valhalla (Silver)","Horseshoes of Speed","Ioun Stone (Awareness)","Ioun Stone (Protection)","Ioun Stone (Reserve)","Ioun Stone (Sustenance)","Iron Bands of Bilarro","Mace of Disruption","Mace of Smiting","Mace of Terror","Mantle of Spell Resistance","Necklace of Fireballs","Necklace of Prayer Beads","Oil of Etherealness","Periapt of Proof against Poison","Potion of Clairvoyance","Potion of Diminution","Potion of Gaseous Form","Potion of Frost Giant Strength","Potion of Heroism","Potion of Invulnerability","Potion of Mind Reading","Potion of Superior Healing","Ring of Animal Influence","Ring of Evasion","Ring of Feather Falling","Ring of Free Action","Ring of Protection","Ring of Resistance","Ring of Spell Storing","Ring of the Ram","Ring of X-ray Vision","Robe of Eyes","Rod of Rulership","Rod of the Pact Keeper +2","Rope of Entanglement","Shield of Missile Attraction","Spell Scroll (4th Level)","Spell Scroll (5th Level)","Staff of Charming","Staff of Healing","Staff of Swarming Insects","Staff of the Woodlands","Staff of Withering","Stone of Controlling Earth Elementals","Sun Blade","Sword of Life Stealing","Sword of Wounding","Tentacle Rod","Vicious Weapon","Wand of Binding","Wand of Enemy Detection","Wand of Fear","Wand of Fireballs","Wand of Lightning Bolts","Wand of Paralysis","Wand of the War Mage +2","Wand of Wonder","Wings of Flying"
],
veryRare: [
"+3 Weapon","+3 Armor","+3 Shield","Amulet of the Planes","Animated Shield","Belt of Fire Giant Strength","Belt of Frost Giant Strength","Belt of Stone Giant Strength","Candle of Invocation","Carpet of Flying","Cloak of Arachnida","Crystal Ball","Dancing Sword","Demon Armor","Dragon Scale Mail (upgraded)","Dwarven Plate","Dwarven Thrower","Efreeti Bottle","Figurine of Wondrous Power (Obsidian Steed)","Frost Brand","Helm of Brilliance","Horn of Valhalla (Bronze)","Horseshoes of a Zephyr","Ioun Stone (Absorption)","Ioun Stone (Agility)","Ioun Stone (Fortitude)","Ioun Stone (Insight)","Ioun Stone (Intellect)","Ioun Stone (Leadership)","Ioun Stone (Strength)","Manual of Bodily Health","Manual of Gainful Exercise","Manual of Golems","Manual of Quickness of Action","Mirror of Life Trapping","Nine Lives Stealer","Oathbow","Oil of Sharpness","Potion of Cloud Giant Strength","Potion of Flying","Potion of Invisibility","Potion of Longevity","Potion of Speed","Potion of Storm Giant Strength","Potion of Supreme Healing","Ring of Regeneration","Ring of Shooting Stars","Ring of Telekinesis","Robe of Scintillating Colors","Robe of Stars","Rod of Absorption","Rod of Alertness","Rod of Security","Rod of the Pact Keeper +3","Scimitar of Speed","Shield Guardian Amulet","Spell Scroll (6th Level)","Spell Scroll (7th Level)","Spell Scroll (8th Level)","Spellguard Shield","Staff of Fire","Staff of Frost","Staff of Power","Staff of Striking","Staff of Thunder and Lightning","Sword of Sharpness","Tome of Clear Thought","Tome of Leadership and Influence","Tome of Understanding","Wand of Polymorph","Wand of the War Mage +3"
],
legendary: [
"Apparatus of Kwalish","Armor of Invulnerability","Belt of Cloud Giant Strength","Belt of Storm Giant Strength","Cloak of Invisibility","Crystal Ball of Mind Reading","Crystal Ball of Telepathy","Crystal Ball of True Seeing","Cubic Gate","Deck of Many Things","Defender","Efreeti Chain","Hammer of Thunderbolts","Holy Avenger","Horn of Valhalla (Iron)","Ioun Stone (Greater Absorption)","Ioun Stone (Mastery)","Ioun Stone (Regeneration)","Iron Flask","Luck Blade","Plate Armor of Etherealness","Ring of Air Elemental Command","Ring of Djinni Summoning","Ring of Earth Elemental Command","Ring of Fire Elemental Command","Ring of Invisibility","Ring of Spell Turning","Ring of Three Wishes","Ring of Water Elemental Command","Robe of the Archmagi","Rod of Lordly Might","Scarab of Protection","Sovereign Glue","Sphere of Annihilation","Staff of the Magi","Sword of Answering","Talisman of Pure Good","Talisman of the Sphere","Talisman of Ultimate Evil","Tome of the Stilled Tongue","Universal Solvent","Vorpal Sword","Well of Many Worlds"
]
};

/* ═══════════════════════════════════════════════════════════════
   D&D FEATS (as loot drops — scrolls of knowledge)
   ═══════════════════════════════════════════════════════════════ */
var DND_FEATS = [
"Alert","Athlete","Actor","Charger","Crossbow Expert","Defensive Duelist","Dual Wielder","Dungeon Delver","Durable","Elemental Adept","Grappler","Great Weapon Master","Healer","Heavily Armored","Heavy Armor Master","Inspiring Leader","Keen Mind","Lightly Armored","Linguist","Lucky","Mage Slayer","Magic Initiate","Martial Adept","Medium Armor Master","Mobile","Moderately Armored","Mounted Combatant","Observant","Polearm Master","Resilient","Ritual Caster","Savage Attacker","Sentinel","Sharpshooter","Shield Master","Skilled","Skulker","Spell Sniper","Tavern Brawler","Tough","War Caster","Weapon Master","Fey Touched","Shadow Touched","Crusher","Piercer","Slasher","Telekinetic","Telepathic","Fighting Initiate","Metamagic Adept","Poisoner","Chef","Eldritch Adept","Skill Expert","Aberrant Dragonmark"
];

/* ═══════════════════════════════════════════════════════════════
   MONSTER PARTS / SPECIAL LOOT BY TYPE
   ═══════════════════════════════════════════════════════════════ */
var MONSTER_PARTS = {
"Aberration":["Aberrant Brain Tissue","Eldritch Eye","Tentacle Segment","Psionic Crystal","Otherworldly Ichor","Mind Fragment Gem"],
"Beast":["Pristine Hide","Trophy Fangs","Claws","Beast Heart","Antlers","Feathers","Venom Sac"],
"Celestial":["Radiant Feather","Blessed Blood Vial","Celestial Essence","Halo Fragment","Divine Tear Crystal"],
"Construct":["Arcane Core","Animated Gear Assembly","Golem Heart Stone","Enchanted Plating","Rune-Etched Component"],
"Dragon":["Dragon Scale (10)","Dragon Fang","Dragon Blood Vial","Dragon Heart","Dragonhide (enough for armor)","Dragon Eye","Elemental Breath Gland"],
"Elemental":["Elemental Mote","Primordial Essence","Elemental Core Crystal","Living Element Sample","Planar Residue"],
"Fey":["Fey Dust","Enchanted Flower","Glamour Shard","Moonlit Dewdrop","Sylvan Charm","Pixie Wing Fragment"],
"Fiend":["Demon Ichor","Devil Horn","Fiendish Eye","Infernal Iron Shard","Soul Coin","Abyssal Shard","Brimstone Chunk"],
"Giant":["Giant's Toe","Oversized Weapon","Giant-Crafted Jewelry","Thunderstone","Giant Hair Braid","Massive Hide"],
"Humanoid":["Coin Pouch","Personal Effects","Worn Equipment","Map Fragment","Coded Letter","Guild Badge"],
"Monstrosity":["Monster Hide","Venom Gland","Trophy Horn","Petrifying Eye","Stinger","Unusual Organ"],
"Ooze":["Residual Slime (flask)","Acidic Gel","Dissolved Treasures","Corroded Metal Bits","Ooze Sample"],
"Plant":["Enchanted Bark","Magical Sap","Bioluminescent Spore","Living Root Cutting","Rare Herb"],
"Undead":["Phylactery Fragment","Ectoplasm","Cursed Bone","Shadow Essence","Death Shroud","Soul Gem Fragment"]
};

/* ═══════════════════════════════════════════════════════════════
   GEMS & ART OBJECTS (by value tier)
   ═══════════════════════════════════════════════════════════════ */
var GEMS = {
10:["Azurite","Blue Quartz","Eye Agate","Hematite","Lapis Lazuli","Malachite","Moss Agate","Obsidian","Rhodochrosite","Tiger Eye","Turquoise"],
50:["Bloodstone","Carnelian","Chalcedony","Chrysoprase","Citrine","Jasper","Moonstone","Onyx","Quartz","Sardonyx","Star Rose Quartz","Zircon"],
100:["Amber","Amethyst","Chrysoberyl","Coral","Garnet","Jade","Jet","Pearl","Spinel","Tourmaline"],
500:["Alexandrite","Aquamarine","Black Pearl","Blue Spinel","Peridot","Topaz"],
1000:["Black Opal","Blue Sapphire","Emerald","Fire Opal","Opal","Star Ruby","Star Sapphire","Yellow Sapphire"],
5000:["Black Sapphire","Diamond","Jacinth","Ruby"]
};

var ART_OBJECTS = {
25:["Silver ewer","Carved bone statuette","Small gold bracelet","Cloth-of-gold vestments","Black velvet mask stitched with silver","Copper chalice with silver filigree","Pair of engraved bone dice","Small mirror in painted wooden frame","Embroidered silk handkerchief","Gold locket with a painted portrait"],
250:["Gold ring with bloodstones","Carved ivory statuette","Large gold bracelet","Silver necklace with gem pendant","Bronze crown","Silk robe with gold embroidery","Large well-made tapestry","Brass mug with jade inlay","Box of turquoise animal figurines","Gold bird cage with electrum filigree"],
750:["Silver chalice with moonstones","Silver-plated steel longsword with jet in hilt","Carved harp of exotic wood with ivory inlay","Small gold idol","Gold dragon comb with red garnets","Bottle stopper cork embossed with gold","Ceremonial electrum dagger with black pearl","Silver and gold brooch","Obsidian statuette with gold fittings","Painted gold war mask"],
2500:["Fine gold chain with fire opal","Old masterpiece painting","Embroidered silk and velvet mantle with moonstones","Platinum bracelet with sapphire","Embroidered glove with jeweled chips","Jeweled anklet","Gold music box","Gold circlet with four aquamarines","Eye patch with mock eye of sapphire and moonstone","Necklace of small pink pearls"],
7500:["Jeweled gold crown","Jeweled platinum ring","Small gold statuette on a pedestal","Gold cup with emeralds","Gold jewelry box with platinum filigree","Painted gold child's sarcophagus","Jade game board with solid gold playing pieces","Bejeweled ivory drinking horn with gold filigree"]
};

/* ═══════════════════════════════════════════════════════════════
   LOOT GENERATION
   ═══════════════════════════════════════════════════════════════ */
function _generateMonsterLoot(cr, type, isBoss) {
    var loot = { gold: 0, gems: [], artObjects: [], magicItems: [], monsterParts: [], feats: [] };
    var crNum = parseFloat(cr);

    /* Gold based on CR */
    if (crNum <= 0.5) loot.gold = _roll(2, 6);
    else if (crNum <= 4) loot.gold = _roll(4, 6) * 2;
    else if (crNum <= 10) loot.gold = _roll(6, 6) * 10;
    else if (crNum <= 16) loot.gold = _roll(4, 6) * 100;
    else loot.gold = _roll(6, 6) * 1000;

    if (isBoss) loot.gold = Math.floor(loot.gold * 3);

    /* Gems */
    if (crNum >= 1 && Math.random() < 0.4) {
        var gemTier = crNum <= 4 ? 10 : crNum <= 10 ? 50 : crNum <= 16 ? 500 : 5000;
        var gemList = GEMS[gemTier] || GEMS[10];
        var numGems = _randBetween(1, Math.min(3, Math.ceil(crNum / 5)));
        for (var i = 0; i < numGems; i++) loot.gems.push(_pick(gemList) + ' (' + gemTier + ' gp)');
    }

    /* Art objects */
    if (crNum >= 2 && Math.random() < 0.3) {
        var artTier = crNum <= 5 ? 25 : crNum <= 10 ? 250 : crNum <= 16 ? 750 : 2500;
        var artList = ART_OBJECTS[artTier] || ART_OBJECTS[25];
        loot.artObjects.push(_pick(artList) + ' (' + artTier + ' gp)');
    }

    /* Magic items based on CR */
    var magicChance = crNum <= 2 ? 0.1 : crNum <= 5 ? 0.2 : crNum <= 10 ? 0.35 : crNum <= 16 ? 0.5 : 0.7;
    if (isBoss) magicChance = Math.min(1, magicChance * 2.5);

    if (Math.random() < magicChance) {
        var rarity;
        if (crNum <= 2) rarity = 'common';
        else if (crNum <= 5) rarity = Math.random() < 0.7 ? 'uncommon' : 'common';
        else if (crNum <= 10) rarity = Math.random() < 0.5 ? 'rare' : 'uncommon';
        else if (crNum <= 16) rarity = Math.random() < 0.4 ? 'veryRare' : 'rare';
        else rarity = Math.random() < 0.3 ? 'legendary' : 'veryRare';
        loot.magicItems.push(_pick(MAGIC_ITEMS[rarity]) + ' (' + rarity.replace('veryRare','Very Rare') + ')');
    }
    if (isBoss && Math.random() < 0.5) {
        var bossRarity = crNum <= 10 ? 'rare' : crNum <= 16 ? 'veryRare' : 'legendary';
        loot.magicItems.push(_pick(MAGIC_ITEMS[bossRarity]) + ' (' + bossRarity.replace('veryRare','Very Rare') + ')');
    }

    /* Monster parts */
    var parts = MONSTER_PARTS[type] || MONSTER_PARTS["Monstrosity"];
    loot.monsterParts.push(_pick(parts));
    if (isBoss || crNum >= 5) loot.monsterParts.push(_pick(parts));

    /* Feat scroll (rare drop from bosses) */
    if (isBoss && crNum >= 5 && Math.random() < 0.3) {
        loot.feats.push('Scroll of Knowledge: ' + _pick(DND_FEATS));
    }

    return loot;
}

/* ═══════════════════════════════════════════════════════════════
   MONSTER STAT BLOCK GENERATION
   ═══════════════════════════════════════════════════════════════ */

/* Speed templates by type and size */
var SPEED_TEMPLATES = {
"Beast":     {base:"40 ft.",extras:["climb 30 ft.","swim 30 ft."]},
"Dragon":    {base:"40 ft.",extras:["fly 80 ft.","climb 30 ft.","swim 40 ft."]},
"Elemental": {base:"30 ft.",extras:["fly 60 ft.","burrow 30 ft.","swim 60 ft."]},
"Fiend":     {base:"30 ft.",extras:["fly 60 ft."]},
"Celestial": {base:"30 ft.",extras:["fly 90 ft."]},
"Undead":    {base:"30 ft.",extras:["fly 40 ft. (hover)"]},
"Aberration":{base:"30 ft.",extras:["swim 40 ft.","fly 30 ft. (hover)"]},
"Construct": {base:"30 ft.",extras:[]},
"Fey":       {base:"30 ft.",extras:["fly 30 ft."]},
"Giant":     {base:"40 ft.",extras:[]},
"Humanoid":  {base:"30 ft.",extras:[]},
"Monstrosity":{base:"30 ft.",extras:["climb 30 ft.","fly 60 ft.","burrow 20 ft."]},
"Ooze":      {base:"10 ft.",extras:["climb 10 ft."]},
"Plant":     {base:"20 ft.",extras:[]}
};

/* Attack name templates by type */
var ATTACK_TEMPLATES = {
"Aberration":[{n:"Tentacle",type:"bludgeoning"},{n:"Psychic Blast",type:"psychic"},{n:"Bite",type:"piercing"}],
"Beast":[{n:"Bite",type:"piercing"},{n:"Claws",type:"slashing"},{n:"Gore",type:"piercing"},{n:"Talons",type:"slashing"}],
"Celestial":[{n:"Divine Strike",type:"radiant"},{n:"Longsword",type:"slashing"},{n:"Sacred Touch",type:"radiant"}],
"Construct":[{n:"Slam",type:"bludgeoning"},{n:"Fist",type:"bludgeoning"},{n:"Blade",type:"slashing"}],
"Dragon":[{n:"Bite",type:"piercing"},{n:"Claw",type:"slashing"},{n:"Tail",type:"bludgeoning"}],
"Elemental":[{n:"Slam",type:"bludgeoning"},{n:"Touch",type:"fire"},{n:"Blast",type:"thunder"}],
"Fey":[{n:"Shortsword",type:"piercing"},{n:"Charm Touch",type:"psychic"},{n:"Thorned Whip",type:"piercing"}],
"Fiend":[{n:"Claw",type:"slashing"},{n:"Bite",type:"piercing"},{n:"Tail",type:"piercing"},{n:"Hellfire Ray",type:"fire"}],
"Giant":[{n:"Greatclub",type:"bludgeoning"},{n:"Rock",type:"bludgeoning"},{n:"Fist",type:"bludgeoning"}],
"Humanoid":[{n:"Longsword",type:"slashing"},{n:"Shortbow",type:"piercing"},{n:"Dagger",type:"piercing"}],
"Monstrosity":[{n:"Bite",type:"piercing"},{n:"Claws",type:"slashing"},{n:"Tail",type:"bludgeoning"},{n:"Sting",type:"piercing"}],
"Ooze":[{n:"Pseudopod",type:"bludgeoning"}],
"Plant":[{n:"Vine Lash",type:"bludgeoning"},{n:"Slam",type:"bludgeoning"},{n:"Thorn Spray",type:"piercing"}],
"Undead":[{n:"Life Drain",type:"necrotic"},{n:"Slam",type:"bludgeoning"},{n:"Claws",type:"slashing"},{n:"Withering Touch",type:"necrotic"}]
};

/* Breath weapon / special action templates for dragons */
var DRAGON_BREATHS = {
"Black":"Acid Breath: 30 ft. line, Xd8 acid, DC Y Dex half",
"Blue":"Lightning Breath: 60 ft. line, Xd10 lightning, DC Y Dex half",
"Green":"Poison Breath: 30 ft. cone, Xd6 poison, DC Y Con half",
"Red":"Fire Breath: 30 ft. cone, Xd6 fire, DC Y Dex half",
"White":"Cold Breath: 30 ft. cone, Xd8 cold, DC Y Con half",
"Gold":"Fire Breath: 30 ft. cone, Xd10 fire, DC Y Dex half",
"Silver":"Cold Breath: 30 ft. cone, Xd8 cold, DC Y Con half",
"Brass":"Fire Breath: 30 ft. line, Xd6 fire, DC Y Dex half",
"Bronze":"Lightning Breath: 60 ft. line, Xd10 lightning, DC Y Dex half",
"Copper":"Acid Breath: 40 ft. line, Xd8 acid, DC Y Dex half"
};

/* Legendary Actions for bosses */
var LEGENDARY_ACTIONS_TEMPLATES = {
"Dragon":["Detect: Makes a Wisdom (Perception) check.","Tail Attack: Makes a tail attack.","Wing Attack (Costs 2 Actions): Each creature within 10 ft. must succeed on a DC X Dex save or take 2d6+Y bludgeoning and be knocked prone. The dragon can then fly up to half its flying speed."],
"Aberration":["Tentacle: Makes one tentacle attack.","Psychic Pulse (Costs 2 Actions): Each creature within 20 ft. must succeed on a DC X Int save or take 3d6 psychic damage.","Teleport: Magically teleports up to 30 ft."],
"Fiend":["Attack: Makes one attack.","Teleport: Magically teleports up to 60 ft.","Fire Burst (Costs 2 Actions): Each creature within 10 ft. takes 3d6 fire damage."],
"Undead":["Life Drain: Makes one Life Drain attack.","Frightening Gaze: Targets one creature within 30 ft., DC X Wis save or frightened.","Necrotic Pulse (Costs 2 Actions): Each creature within 20 ft. must succeed on DC X Con save or take 3d8 necrotic damage."],
"default":["Attack: Makes one melee attack.","Move: Moves up to half its speed without provoking opportunity attacks.","Devastating Strike (Costs 2 Actions): Makes one attack with advantage. On a hit, the target takes an extra 2d6 damage."]
};

/* Lair Action templates */
var LAIR_ACTIONS = {
"Dragon":["Magma erupts from a point on the ground, creating a 20-foot-high geyser. Each creature in the area must succeed on a DC 15 Dex save or take 3d6 fire damage.","A tremor shakes the lair. Each creature on the ground must succeed on a DC 15 Dex save or be knocked prone.","Toxic fumes fill a 20-ft. radius sphere. DC 15 Con save or poisoned until the end of the next turn."],
"Aberration":["The lair's walls emit a psychic scream. Each creature within 60 ft. must succeed on a DC 15 Wis save or be stunned until the end of their next turn.","Tentacles sprout from the ground in a 10-ft. square. DC 15 Dex save or restrained.","Reality warps. Each creature must succeed on DC 15 Int save or be teleported to a random unoccupied space within 30 ft."],
"Undead":["Spectral hands reach from the ground in a 20-ft. square. DC 15 Dex save or 3d6 necrotic damage and speed halved.","Darkness fills a 30-ft. sphere for 1 round. Only creatures with darkvision can see.","Undead minions (2d4 skeletons) rise from the ground."],
"default":["Part of the ceiling collapses. DC 15 Dex save or 3d6 bludgeoning damage.","The ground becomes difficult terrain in a 20-ft. radius.","A barrier of magical force appears, blocking line of sight and movement."]
};

function _generateMonsterStatBlock(entry, opts) {
    var cr = entry.cr;
    var crKey = String(cr);
    var crStats = CR_STATS[crKey] || CR_STATS[1];
    var typeTraits = TYPE_TRAITS[entry.t] || TYPE_TRAITS["Monstrosity"];
    var isBoss = opts.boss;
    var fullSize = SIZE_MAP[entry.sz] || entry.sz;

    /* Generate ability scores based on CR and type */
    var primaryStat = typeTraits.ab;
    var statMap = {str:0,dex:1,con:2,int:3,wis:4,cha:5};
    var baseScore = Math.min(30, 10 + Math.floor(cr * 0.8));
    var ab = [10,10,12,10,10,10];
    var primaryIdx = statMap[primaryStat] || 0;
    ab[primaryIdx] = Math.min(30, baseScore + _randBetween(2, 6));
    /* CON is always decent */
    ab[2] = Math.max(ab[2], Math.min(30, 12 + Math.floor(cr * 0.6)));
    /* Vary others */
    for (var i = 0; i < 6; i++) {
        if (i !== primaryIdx && i !== 2) {
            ab[i] = Math.max(1, Math.min(30, ab[i] + _randBetween(-2, Math.floor(cr * 0.3))));
        }
    }
    if (isBoss) { for (var j = 0; j < 6; j++) ab[j] = Math.min(30, ab[j] + _randBetween(1, 3)); }

    /* HP */
    var hp = _randBetween(crStats.hpMin, crStats.hpMax);
    if (isBoss) hp = Math.floor(hp * 1.5);

    /* AC */
    var ac = crStats.ac + _randBetween(-1, 1);
    if (isBoss) ac += 1;
    var acDesc = ac;
    if (entry.t === 'Dragon' || entry.t === 'Construct') acDesc = ac + ' (natural armor)';
    else if (entry.t === 'Humanoid' && cr >= 1) acDesc = ac + ' (armor)';

    /* Speed */
    var speedT = SPEED_TEMPLATES[entry.t] || SPEED_TEMPLATES["Monstrosity"];
    var speed = speedT.base;
    if (speedT.extras.length > 0 && (cr >= 1 || entry.t === 'Dragon')) {
        speed += ', ' + _pick(speedT.extras);
    }

    /* Attacks */
    var atkTemplates = ATTACK_TEMPLATES[entry.t] || ATTACK_TEMPLATES["Monstrosity"];
    var atkBonus = '+' + crStats.atk;
    var numDice = Math.max(1, Math.floor(cr / 2));
    var dieSize = cr <= 2 ? 6 : cr <= 8 ? 8 : cr <= 16 ? 10 : 12;
    var dmgMod = _mod(ab[primaryIdx]);
    var attacks = [];
    var numAtks = Math.min(atkTemplates.length, cr <= 1 ? 1 : cr <= 4 ? 2 : 3);
    for (var a = 0; a < numAtks; a++) {
        var tmpl = atkTemplates[a];
        attacks.push({
            n: tmpl.n,
            h: atkBonus,
            d: numDice + 'd' + dieSize + '+' + dmgMod + ' ' + tmpl.type
        });
    }

    /* Traits */
    var traits = [];
    if (typeTraits.traits.length > 0) {
        traits = typeTraits.traits.slice(0, cr <= 2 ? 1 : cr <= 8 ? 2 : 3);
    }
    /* Dragon breath */
    if (entry.t === 'Dragon') {
        var dragonColor = '';
        for (var dc in DRAGON_BREATHS) {
            if (entry.n.indexOf(dc) !== -1) { dragonColor = dc; break; }
        }
        if (dragonColor) {
            var breathDice = Math.max(2, Math.floor(cr * 1.2));
            var saveDC = 8 + crStats.prof + _mod(ab[2]);
            var breath = DRAGON_BREATHS[dragonColor].replace('X', breathDice).replace('Y', saveDC);
            traits.push(breath);
        }
    }

    /* Multiattack */
    var multiattack = '';
    if (attacks.length >= 2) {
        multiattack = 'Multiattack: Makes ' + attacks.length + ' attacks.';
    }

    /* Boss: Legendary actions */
    var legendaryActions = [];
    var lairActions = [];
    if (isBoss) {
        traits.push('Legendary Resistance (3/Day): If the creature fails a saving throw, it can choose to succeed instead.');
        var legTemplates = LEGENDARY_ACTIONS_TEMPLATES[entry.t] || LEGENDARY_ACTIONS_TEMPLATES["default"];
        var saveDC2 = 8 + crStats.prof + _mod(ab[primaryIdx]);
        legendaryActions = legTemplates.map(function(la) {
            return la.replace(/DC X/g, 'DC ' + saveDC2).replace(/Y/g, String(dmgMod));
        });
        var lairT = LAIR_ACTIONS[entry.t] || LAIR_ACTIONS["default"];
        lairActions = lairT.slice(0, 2);
    }

    /* Senses & Languages */
    var senses = typeTraits.senses || '';
    if (!senses && cr >= 1) senses = 'Darkvision 60 ft.';
    senses = (senses ? senses + ', ' : '') + 'passive Perception ' + (10 + _mod(ab[4]) + (cr >= 1 ? crStats.prof : 0));

    var lang = typeTraits.lang || '—';

    /* Immunities / Resistances */
    var di = typeTraits.di || '';
    var dr = typeTraits.dr || '';
    var dv = typeTraits.dv || '';
    var ci = typeTraits.ci || '';

    /* Saving throws (2 proficient saves) */
    var saveNames = ['Str','Dex','Con','Int','Wis','Cha'];
    var profSaves = [];
    profSaves.push(primaryIdx);
    profSaves.push(2); /* CON almost always */
    var svStr = profSaves.map(function(idx) {
        return saveNames[idx] + ' +' + (_mod(ab[idx]) + crStats.prof);
    }).join(', ');

    /* XP */
    var xp = CR_XP[crKey] || 0;
    if (isBoss) xp = Math.floor(xp * 1.5);

    /* Loot */
    var loot = _generateMonsterLoot(cr, entry.t, isBoss);

    return {
        name: entry.n,
        type: entry.t,
        cr: cr,
        crLabel: _crLabel(cr),
        size: fullSize,
        ac: acDesc,
        hp: hp,
        speed: speed,
        ab: ab,
        saves: svStr,
        senses: senses,
        languages: lang,
        di: di, dr: dr, dv: dv, ci: ci,
        attacks: attacks,
        multiattack: multiattack,
        traits: traits,
        legendaryActions: legendaryActions,
        lairActions: lairActions,
        xp: xp,
        isBoss: isBoss,
        loot: loot,
        id: 'mon_' + Date.now() + '_' + Math.floor(Math.random() * 10000)
    };
}

/* ═══════════════════════════════════════════════════════════════
   POPULATE MONSTER DROPDOWN
   ═══════════════════════════════════════════════════════════════ */
var _monsterDropdownPopulated = false;
function _populateMonsterDropdown() {
    if (_monsterDropdownPopulated) return;
    var sel = document.getElementById('monSpecific');
    if (!sel) return;
    /* Sort alphabetically */
    var sorted = MONSTER_INDEX.slice().sort(function(a, b) { return a.n.localeCompare(b.n); });
    var frag = document.createDocumentFragment();
    sorted.forEach(function(m) {
        var opt = document.createElement('option');
        opt.value = m.n;
        opt.textContent = m.n + ' (CR ' + _crLabel(m.cr) + ' · ' + m.t + ')';
        frag.appendChild(opt);
    });
    sel.appendChild(frag);
    _monsterDropdownPopulated = true;
}

/* ═══════════════════════════════════════════════════════════════
   GENERATE MONSTERS
   ═══════════════════════════════════════════════════════════════ */
function generateMonsterBatch() {
    var specificVal = (document.getElementById('monSpecific') || {}).value || '';
    var typeVal = (document.getElementById('monCreatureType') || {}).value || '';
    var crVal = (document.getElementById('monCR') || {}).value || '';
    var sizeVal = (document.getElementById('monSize') || {}).value || '';
    var envVal = (document.getElementById('monEnvironment') || {}).value || '';
    var qty = parseInt((document.getElementById('monQty') || {}).value) || 1;
    var isBoss = (document.getElementById('monBoss') || {}).checked || false;

    qty = Math.max(1, Math.min(10, qty));

    for (var i = 0; i < qty; i++) {
        var entry = null;

        if (specificVal) {
            /* Find specific creature */
            entry = MONSTER_INDEX.find(function(m) { return m.n === specificVal; });
        }

        if (!entry) {
            /* Filter by criteria */
            var candidates = MONSTER_INDEX.slice();
            if (typeVal) candidates = candidates.filter(function(m) { return m.t === typeVal; });
            if (crVal) {
                var crNum = parseFloat(crVal);
                candidates = candidates.filter(function(m) { return m.cr === crNum; });
            }
            if (sizeVal) {
                var szCode = '';
                for (var k in SIZE_MAP) { if (SIZE_MAP[k] === sizeVal) { szCode = k; break; } }
                if (szCode) candidates = candidates.filter(function(m) { return m.sz === szCode; });
            }
            if (envVal) candidates = candidates.filter(function(m) { return m.env.indexOf(envVal) !== -1; });

            if (candidates.length === 0) {
                /* Fallback: relax filters */
                candidates = MONSTER_INDEX.slice();
                if (typeVal) candidates = candidates.filter(function(m) { return m.t === typeVal; });
                if (candidates.length === 0) candidates = MONSTER_INDEX.slice();
            }

            entry = _pick(candidates);
        }

        if (!entry) continue;

        var monster = _generateMonsterStatBlock(entry, { boss: isBoss });
        _renderMonsterCard(monster);
    }

    if (typeof showToast === 'function') {
        showToast('🐉 Generated ' + qty + ' monster' + (qty > 1 ? 's' : '') + (isBoss ? ' (Boss)' : '') + '!', 'success');
    }
}

/* ═══════════════════════════════════════════════════════════════
   RENDER MONSTER CARD
   ═══════════════════════════════════════════════════════════════ */
function _renderMonsterCard(m) {
    var display = document.getElementById('displayArea');
    if (!display) return;

    var abNames = ['STR','DEX','CON','INT','WIS','CHA'];
    var abRow = abNames.map(function(name, i) {
        return '<div style="text-align:center;"><div style="font-size:0.65em;color:rgba(255,200,100,0.7);font-weight:700;letter-spacing:1px;">' + name + '</div><div style="font-size:0.95em;font-weight:700;color:#fff8dc;">' + m.ab[i] + ' <span style="font-size:0.75em;color:rgba(255,248,220,0.6);">(' + _modStr(m.ab[i]) + ')</span></div></div>';
    }).join('');

    var atkHtml = m.attacks.map(function(a) {
        return '<div style="margin:3px 0;"><span style="font-weight:700;color:#e8c170;">' + a.n + ':</span> <span style="color:rgba(255,248,220,0.6);">' + a.h + ' to hit</span>, <span style="color:#ff8a8a;">' + a.d + '</span></div>';
    }).join('');

    if (m.multiattack) {
        atkHtml = '<div style="margin-bottom:6px;font-style:italic;color:rgba(255,248,220,0.7);">' + m.multiattack + '</div>' + atkHtml;
    }

    var traitHtml = m.traits.map(function(t) {
        return '<div style="margin:4px 0;padding:4px 8px;background:rgba(255,255,255,0.03);border-left:2px solid rgba(184,134,11,0.4);border-radius:0 4px 4px 0;font-size:0.82em;color:rgba(255,248,220,0.75);">' + t + '</div>';
    }).join('');

    var legHtml = '';
    if (m.legendaryActions.length > 0) {
        legHtml = '<div style="margin-top:10px;padding:10px;background:rgba(139,0,0,0.15);border:1px solid rgba(255,100,100,0.3);border-radius:6px;">' +
            '<div style="font-family:Cinzel,serif;font-size:0.8em;font-weight:700;color:#ff8a8a;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">⚔ Legendary Actions (3/round)</div>' +
            m.legendaryActions.map(function(la) {
                return '<div style="margin:3px 0;font-size:0.82em;color:rgba(255,248,220,0.7);">• ' + la + '</div>';
            }).join('') + '</div>';
    }

    var lairHtml = '';
    if (m.lairActions.length > 0) {
        lairHtml = '<div style="margin-top:8px;padding:10px;background:rgba(75,0,130,0.15);border:1px solid rgba(160,100,255,0.3);border-radius:6px;">' +
            '<div style="font-family:Cinzel,serif;font-size:0.8em;font-weight:700;color:#c080ff;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">🏰 Lair Actions</div>' +
            m.lairActions.map(function(la) {
                return '<div style="margin:3px 0;font-size:0.82em;color:rgba(255,248,220,0.7);">• ' + la + '</div>';
            }).join('') + '</div>';
    }

    /* Loot section */
    var lootLines = [];
    if (m.loot.gold > 0) lootLines.push('💰 ' + m.loot.gold + ' gp');
    m.loot.gems.forEach(function(g) { lootLines.push('💎 ' + g); });
    m.loot.artObjects.forEach(function(a) { lootLines.push('🎨 ' + a); });
    m.loot.magicItems.forEach(function(mi) { lootLines.push('✨ ' + mi); });
    m.loot.monsterParts.forEach(function(mp) { lootLines.push('🦴 ' + mp); });
    m.loot.feats.forEach(function(f) { lootLines.push('📜 ' + f); });

    var lootHtml = '<div style="margin-top:10px;padding:10px;background:rgba(184,134,11,0.1);border:1px solid rgba(184,134,11,0.3);border-radius:6px;">' +
        '<div style="font-family:Cinzel,serif;font-size:0.8em;font-weight:700;color:#d4a017;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">💰 Loot</div>' +
        lootLines.map(function(l) {
            return '<div style="margin:2px 0;font-size:0.82em;color:rgba(255,248,220,0.8);">' + l + '</div>';
        }).join('') + '</div>';

    /* Immunity/resistance lines */
    var defLines = [];
    if (m.di) defLines.push('<span style="color:#ff6b6b;">Damage Immunities:</span> ' + m.di);
    if (m.dr) defLines.push('<span style="color:#ffa07a;">Damage Resistances:</span> ' + m.dr);
    if (m.dv) defLines.push('<span style="color:#87ceeb;">Vulnerabilities:</span> ' + m.dv);
    if (m.ci) defLines.push('<span style="color:#dda0dd;">Condition Immunities:</span> ' + m.ci);
    var defHtml = defLines.length > 0 ? defLines.map(function(d) {
        return '<div style="font-size:0.78em;color:rgba(255,248,220,0.65);margin:2px 0;">' + d + '</div>';
    }).join('') : '';

    var bossGlow = m.isBoss ? 'box-shadow:0 0 20px rgba(255,0,0,0.3),0 0 40px rgba(255,0,0,0.1);border-color:rgba(255,100,100,0.6);' : '';
    var bossLabel = m.isBoss ? '<span style="background:linear-gradient(135deg,#8b0000,#ff4500);color:#fff;padding:2px 8px;border-radius:4px;font-size:0.65em;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-left:8px;">BOSS</span>' : '';

    var card = document.createElement('div');
    card.className = 'npc-card';
    card.id = m.id;
    card.style.cssText = 'background:linear-gradient(145deg,#1a0a0a,#2a1515);border:2px solid rgba(184,134,11,0.5);border-radius:10px;padding:20px;margin-bottom:15px;color:#fff8dc;' + bossGlow;

    card.innerHTML =
        /* Header */
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:2px solid rgba(184,134,11,0.4);">' +
            '<div>' +
                '<div style="font-family:Cinzel,serif;font-size:1.3em;font-weight:700;color:#e8c170;">' + m.name + bossLabel + '</div>' +
                '<div style="font-size:0.8em;color:rgba(255,248,220,0.5);font-style:italic;">' + m.size + ' ' + m.type + ', CR ' + m.crLabel + ' (' + m.xp.toLocaleString() + ' XP)</div>' +
            '</div>' +
            '<div style="font-family:Cinzel,serif;font-size:1.8em;font-weight:700;color:rgba(139,0,0,0.8);">🐉</div>' +
        '</div>' +

        /* Core Stats */
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">' +
            '<div style="text-align:center;padding:8px;background:rgba(139,0,0,0.2);border-radius:6px;border:1px solid rgba(139,0,0,0.3);"><div style="font-size:0.65em;color:rgba(255,200,100,0.7);text-transform:uppercase;letter-spacing:1px;">AC</div><div style="font-size:1.2em;font-weight:700;">' + m.ac + '</div></div>' +
            '<div style="text-align:center;padding:8px;background:rgba(0,100,0,0.2);border-radius:6px;border:1px solid rgba(0,100,0,0.3);"><div style="font-size:0.65em;color:rgba(100,255,100,0.7);text-transform:uppercase;letter-spacing:1px;">HP</div><div style="font-size:1.2em;font-weight:700;">' + m.hp + '</div></div>' +
            '<div style="text-align:center;padding:8px;background:rgba(0,50,100,0.2);border-radius:6px;border:1px solid rgba(0,50,100,0.3);"><div style="font-size:0.65em;color:rgba(100,200,255,0.7);text-transform:uppercase;letter-spacing:1px;">Speed</div><div style="font-size:0.85em;font-weight:700;">' + m.speed + '</div></div>' +
        '</div>' +

        /* Ability Scores */
        '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-bottom:12px;padding:10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(184,134,11,0.2);">' + abRow + '</div>' +

        /* Saves, Senses, Languages */
        '<div style="font-size:0.78em;color:rgba(255,248,220,0.65);margin-bottom:8px;">' +
            '<div><span style="color:#e8c170;">Saving Throws:</span> ' + m.saves + '</div>' +
            '<div><span style="color:#e8c170;">Senses:</span> ' + m.senses + '</div>' +
            '<div><span style="color:#e8c170;">Languages:</span> ' + m.languages + '</div>' +
        '</div>' +

        /* Immunities & Resistances */
        defHtml +

        /* Separator */
        '<div style="border-top:1px solid rgba(184,134,11,0.3);margin:10px 0;"></div>' +

        /* Traits */
        (traitHtml ? '<div style="margin-bottom:8px;"><div style="font-family:Cinzel,serif;font-size:0.8em;font-weight:700;color:#e8c170;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Special Traits</div>' + traitHtml + '</div>' : '') +

        /* Actions */
        '<div style="margin-bottom:8px;"><div style="font-family:Cinzel,serif;font-size:0.8em;font-weight:700;color:#ff8a8a;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">⚔ Actions</div>' + atkHtml + '</div>' +

        /* Legendary Actions */
        legHtml +

        /* Lair Actions */
        lairHtml +

        /* Loot */
        lootHtml +

        /* Action buttons */
        '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">' +
            '<button onclick="monsterAddToCombat(\'' + m.id + '\')" style="padding:6px 14px;background:linear-gradient(145deg,#8b0000,#5a0000);color:#fff8dc;border:1px solid rgba(184,134,11,0.5);border-radius:5px;cursor:pointer;font-family:Cinzel,serif;font-size:0.75em;font-weight:700;">⚔ Add to Combat</button>' +
            '<button onclick="monsterSaveToVault(\'' + m.id + '\')" style="padding:6px 14px;background:linear-gradient(145deg,#1a3a1a,#0a2a0a);color:#90ee90;border:1px solid rgba(0,100,0,0.5);border-radius:5px;cursor:pointer;font-family:Cinzel,serif;font-size:0.75em;font-weight:700;">💾 Save</button>' +
            '<button onclick="this.closest(\'.npc-card\').remove()" style="padding:6px 14px;background:rgba(255,255,255,0.05);color:rgba(255,248,220,0.5);border:1px solid rgba(255,255,255,0.1);border-radius:5px;cursor:pointer;font-family:Cinzel,serif;font-size:0.75em;">✕ Dismiss</button>' +
        '</div>';

    /* Store data on the element */
    card._monsterData = m;

    /* Insert at top of display area */
    display.insertBefore(card, display.firstChild);

    /* Scroll into view */
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ═══════════════════════════════════════════════════════════════
   MONSTER UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */

/* Add monster to initiative/combat tracker */
function monsterAddToCombat(monId) {
    var card = document.getElementById(monId);
    if (!card || !card._monsterData) return;
    var m = card._monsterData;

    /* Add as a combatant to the party tracker if it exists */
    if (typeof _party !== 'undefined' && typeof renderPartyTracker === 'function') {
        var combatant = {
            id: m.id,
            name: m.name + (m.isBoss ? ' (BOSS)' : ''),
            cls: m.type,
            level: 'CR ' + m.crLabel,
            race: m.size + ' ' + m.type,
            hpCurr: m.hp,
            hpMax: m.hp,
            ac: typeof m.ac === 'number' ? m.ac : parseInt(String(m.ac)) || 10,
            speed: parseInt(m.speed) || 30,
            isMonster: true,
            initiative: _roll(1, 20) + _mod(m.ab[1])
        };
        _party.push(combatant);
        if (typeof _saveParty === 'function') _saveParty();
        renderPartyTracker();
        if (typeof updateInitiativeOrderPanel === 'function') updateInitiativeOrderPanel();
    }
    if (typeof showToast === 'function') showToast('⚔ ' + m.name + ' added to combat!', 'success');
}

/* Save monster to vault / saved NPCs */
function monsterSaveToVault(monId) {
    var card = document.getElementById(monId);
    if (!card || !card._monsterData) return;
    var m = card._monsterData;

    /* Build a simplified NPC-compatible object */
    var npcEntry = {
        id: m.id,
        name: m.name,
        race: m.size + ' ' + m.type,
        class: 'CR ' + m.crLabel,
        level: Math.max(1, Math.ceil(m.cr)),
        hp: m.hp,
        ac: typeof m.ac === 'number' ? m.ac : parseInt(String(m.ac)) || 10,
        isMonster: true,
        isBoss: m.isBoss,
        monsterData: m,
        savedAt: new Date().toLocaleString()
    };

    /* Add to generatedNPCs if it exists */
    if (typeof generatedNPCs !== 'undefined') {
        generatedNPCs.push(npcEntry);
        if (typeof saveNPCs === 'function') saveNPCs();
        if (typeof renderSavedList === 'function') renderSavedList();
    }
    if (typeof showToast === 'function') showToast('💾 ' + m.name + ' saved!', 'success');
}

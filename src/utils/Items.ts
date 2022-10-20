class Items {

    /** @noSelf */
    public static supportItems = [ // slot just as a reference
        { name: "Harrowing_Crescent", slot: SpellSlot.Item1, id: 3863 },
        { name: "Runesteel_Spaulders", slot: SpellSlot.Item1, id: 3855 },
        { name: "Frostfang", slot: SpellSlot.Item1, id: 3851 },
        { name: "Targons_Buckler", slot: SpellSlot.Item1, id: 3859 },
        { name: "Shard_of_True_Ice", slot: SpellSlot.Item1, id: 3853 },
        { name: "Pauldrons_of_Whiterock", slot: SpellSlot.Item1, id: 3857 },
        { name: "Black_Mist_Scythe", slot: SpellSlot.Item1, id: 3864 },
        { name: "Bulwark_of_the_Mountain", slot: SpellSlot.Item1, id: 3860 },
    ]

    /** @noSelf */
    public static wardItems = [ // extends supportItems -> also has warding totem
        { name: "Control_Ward", slot: SpellSlot.Item1, id: 2055 },
        { name: "Stealth_Ward", slot: SpellSlot.Trinket, id: 3340 },
        { name: "Farsight_Alteration", slot: SpellSlot.Trinket, id: 3363 },
    ]

    /** @noSelf */
    public static wardNames = [
		{ name: "BlueTrinket", type: "Blue"},
		{ name: "JammerDevice", type: "Red"},
		{ name: "PerksZombieWard", type: "Yellow"},
		{ name: "SightWard", type: "Yellow"}, // not sure if this is correct
		{ name: "VisionWard", type: "Blue"}, // not sure if this is correct
		{ name: "YellowTrinket", type: "Yellow"},
		{ name: "YellowTrinketUpgrade", type: "Yellow"},
    ]
}

export { Items };
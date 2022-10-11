import KNCore from "./src/modules/core/KNCore";

/* 
    ╗╔═╔╗╔  ╔═╗╦╔═╗
    ╠╩╗║║║  ╠═╣║║ ║
    ╩ ╩╝╚╝  ╩ ╩╩╚═╝
    Description: Best AIO ever made. Fuck you Coozbie
    Author: Nospher, Karasu
    Update: 10.09.22
*/

print(`[KN Loader] Loading...`);

//auto update system

print(`[KN Loader] Checking for updates...`);

//auth system

print(`[KN Loader] Authenticated as ${user.data.name} (ID: ${user.data.forumId}).`);

const script = new KNCore();
cb.add(cb.load, script.load);
cb.add(cb.unload, script.unload);
import db from "./database.js";

const service = {
    
    // Korisnik
    getKorisnikAll: async function () {
        return await db.getData('korisnici');
    },
    getKorisnikById: async function (id) {
        return await db.getDataById('korisnici', id);
    },
    addKorisnik: async function (data) {
        return await db.addData('korisnici', data);
    },
    updateKorisnik: async function (id, data) {
        return await db.updateData('korisnici', id, data);
    },
    deleteKorisnikById: async function (id) {
        return await db.deleteDataById('korisnici', id);
    },
    
    // Tura
    getTuraAll: async function () {
        return await db.getData('ture');
    },
    getTuraById: async function (id) {
        return await db.getDataById('ture', id);
    },
    addTura: async function (data) {
        return await db.addData('ture', data);
    },
    updateTura: async function (id, data) {
        return await db.updateData('ture', id, data);
    },
    deleteTuraById: async function (id) {
        return await db.deleteDataById('ture', id);
    },
    
    // Vodić
    getVodicAll: async function () {
        return await db.getData('vodici');
    },
    getVodicById: async function (id) {
        return await db.getDataById('vodici', id);
    },
    addVodic: async function (data) {
        return await db.addData('vodici', data);
    },
    updateVodic: async function (id, data) {
        return await db.updateData('vodici', id, data);  
    },
    deleteVodicById: async function (id) {
        return await db.deleteDataById('vodici', id);
    },

    // Merch
    getMerchAll: async function () {
        return await db.getData('merch');
    },
    getMerchById: async function (id) {
        return await db.getDataById('merch', id);
    },
    addMerch: async function (data) {
        return await db.addData('merch', data);
    },
    updateMerch: async function (id, data) {
        return await db.updateData('merch', id, data);  
    },
    deleteMerchById: async function (id) {
        return await db.deleteDataById('merch', id);
    },

    // Duljina
    getDuljinaAll: async function () {
        return await db.getData('duljine');
    },
    getDuljinaById: async function (id) {
        return await db.getDataById('duljine', id);
    },
    addDuljina: async function (data) {
        return await db.addData('duljine', data);
    },
    updateDuljina: async function (id, data) {
        return await db.updateData('duljine', id, data);  
    },
    deleteDuljinaById: async function (id) {
        return await db.deleteDataById('duljine', id);
    },

    // Zivotinja
    getZivotinjaAll: async function () {
        return await db.getData('zivotinje');
    },
    getZivotinjaById: async function (id) {
        return await db.getDataById('zivotinje', id);
    },
    addZivotinja: async function (data) {
        return await db.addData('zivotinje', data);
    },
    updateZivotinja: async function (id, data) {
        return await db.updateData('zivotinje', id, data);  
    },
    deleteZivotinjaById: async function (id) {
        return await db.deleteDataById('zivotinje', id);
    },

    // Zakazana tura
    getZakazaneTureAll: async function () {
        return await db.getData('zakazane_ture');
    },
    getZakazaneTureById: async function (id) {
        return await db.getDataById('zakazane_ture', id);
    },
    addZakazaneTure: async function (data) {
        return await db.addData('zakazane_ture', data);
    },
    updateZakazaneTure: async function (id, data) {
        return await db.updateData('zakazane_ture', id, data);  
    },
    deleteZakazaneTureById: async function (id) {
        return await db.deleteDataById('zakazane_ture', id);
    }
}

export default service;
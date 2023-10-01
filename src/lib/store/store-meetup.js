import { writable } from 'svelte/store';

const storeMeetupRaw = writable([]);

const storeMeetup = {
    subscribe: storeMeetupRaw.subscribe,
    setListMeetup: (arrMeetup) => {
        storeMeetupRaw.set(arrMeetup);
    },
    addMeetup: (dataMeetupNew) => {
        const itemMeetupNew = {
            ...dataMeetupNew,
        };
        storeMeetupRaw.update((items) => {
            return [itemMeetupNew, ...items];
        });
    },
    updateMeetup: (id, dataMeetupNew) => {
        storeMeetupRaw.update((items) => {
            return items.map((m) => {
                let mNew = { ...m };
                if (mNew.id === id) {
                    mNew = { id: m.id, ...dataMeetupNew, isFavorite: m.isFavorite };
                }
                return mNew;
            });
        });
    },
    removeMeetup: (id) => {
        storeMeetupRaw.update((items) => {
            return items.filter((m) => m.id !== id);
        });
    },
    toggleFavorite: (id) => {
        storeMeetupRaw.update((items) => {
            return items.map((m) => {
                if (m.id === id) {
                    m.isFavorite = !m.isFavorite;
                }
                return m;
            });
        });
    },
};

export default storeMeetup;

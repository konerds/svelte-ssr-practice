export async function getListMeetup() {
    try {
        const r = await fetch(`${import.meta.env.VITE_URL_API}/meetups.json`);
        if (!r.ok) {
            throw new Error('Fetching meetups failed, please try again later!');
        }
        return await r.json();
    } catch (e) {
        throw e;
    }
}

export async function getMeetup(id) {
    try {
        const r = await fetch(`${import.meta.env.VITE_URL_API}/meetups/${id}.json`);
        if (!r.ok) {
            throw new Error('Fetching meetups failed, please try again later!');
        }
        return await r.json();
    } catch (e) {
        throw e;
    }
}

export async function postMeetup(dataMeetupNew) {
    try {
        const r = await fetch(`${import.meta.env.VITE_URL_API}/meetups.json`, {
            method: 'POST',
            body: JSON.stringify({ ...dataMeetupNew, isFavorite: false }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!r.ok) {
            throw new Error('An error occurred, please try again!');
        }
        return await r.json();
    } catch (e) {
        throw e;
    }
}

export async function patchMeetup(id, dataMeetupNew) {
    try {
        const r = await fetch(`${import.meta.env.VITE_URL_API}/meetups/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(dataMeetupNew),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!r.ok) {
            throw new Error('An error occurred, please try again!');
        }
        return;
    } catch (e) {
        throw e;
    }
}

export async function deleteMeetup(id) {
    try {
        const r = await fetch(`${import.meta.env.VITE_URL_API}/meetups/${id}.json`, {
            method: 'DELETE',
        });
        if (!r.ok) {
            throw new Error('An error occurred, please try again!');
        }
        return;
    } catch (e) {
        throw e;
    }
}

export async function patchIsFavoriteMeetup(id, isFavorite) {
    try {
        const r = await fetch(`${import.meta.env.VITE_URL_API}/meetups/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({ isFavorite: !isFavorite }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!r.ok) {
            throw new Error('An error occurred, please try again!');
        }
        return;
    } catch (e) {
        throw e;
    }
}

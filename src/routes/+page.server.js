import { getListMeetup } from '../lib/utils/api.js';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const d = await getListMeetup();
        const arrMeetupLoaded = [];
        for (const k in d) {
            arrMeetupLoaded.push({
                ...d[k],
                id: k,
            });
        }
        return { arrMeetup: arrMeetupLoaded.reverse() };
    } catch (e) {
        console.log(e);
        throw error(500, 'Could not fetch meetups!');
    }
}

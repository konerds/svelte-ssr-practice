import { getMeetup } from '../../lib/utils/api.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        if (!(!!params && !!params.slug)) {
            throw new Error('Bad request!');
        }
        const { slug: idMeetup } = params;
        const d = await getMeetup(idMeetup);
        return { meetupMatched: { ...d, id: idMeetup } };
    } catch (e) {
        console.log(e);
        throw error(500, 'Could not fetch meetup!');
    }
}

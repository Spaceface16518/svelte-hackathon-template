import type { Handle } from '@sveltejs/kit';
import clientPromise from '$lib/server/db';
import init from '$lib/server/db/init';

// initialize the database once when the server starts
init();

export const handle = (async ({ event, resolve }) => {
	// inject mongo database as db
	const client = await clientPromise;
	const db = client.db();
	// @ts-ignore
	event.locals.db = db;

	const response = await resolve(event);
	return response;
}) satisfies Handle;

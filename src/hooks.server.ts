import type { Handle } from '@sveltejs/kit';
import { pool, init } from '$lib/server/db';

// initialize database
init();

export const handle = (async ({ event, resolve }) => {
	const client = await pool.connect();
	// @ts-ignore
	event.locals.db = client;
	const response = await resolve(event);
	client.release();
	return response;
}) satisfies Handle;

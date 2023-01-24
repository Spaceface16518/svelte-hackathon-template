import { Pool } from 'pg';
import { env } from '$env/dynamic/private';
import initScript from './init.sql?raw';
import sql from 'sql-template-strings';

const pool = new Pool({
	connectionString: env.DATABASE_URL
});

/**
 * Call this script at to initialize the database. Initialization script should be idempotent.
 */
const init = async (query = sql(initScript)) => {
	const client = await pool.connect();
	try {
		await client.query(query);
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};

export { pool, init };

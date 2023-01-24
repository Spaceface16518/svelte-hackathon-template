import { test, expect } from 'vitest';
import { init, pool } from './db';
import sql from 'sql-template-strings';

test('can query the database', async () => {
	const result = await pool.query('SELECT true AS success');
	expect(result.rows[0]).toEqual({ success: true });
});

test('basic query', async () => {
	const client = await pool.connect();
	try {
		await client.query(sql`BEGIN`);
		await client.query(sql`CREATE TABLE IF NOT EXISTS test (name VARCHAR(255) NOT NULL)`);
		await client.query(sql`INSERT INTO test (name) VALUES ('test')`);

		const result = await client.query(sql`SELECT name FROM test`);
		expect(result.rows[0]).toEqual({ name: 'test' });
	} finally {
		await client.query(sql`ROLLBACK`);
	}
});

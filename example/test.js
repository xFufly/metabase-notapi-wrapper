import metabase from '../src/index.js';

const sql = 'SELECT 1';

const run = async () => {
	const result = await metabase.executeQuery(sql);
	console.log(result.data.rows);
};

run();
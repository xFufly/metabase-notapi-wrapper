import executeQuery from '../src/index.js';

const sql = 'SELECT 1';

const run = async () => {
	const result = await executeQuery(sql);
	console.log(result.data.rows);
};

run();
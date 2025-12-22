import metabase from '../src/index.js';

const sql = 'SELECT 1';

const run = async () => {
    const result = await metabase.getDBStructure("3");

    const struct = {};
    
    for (let table of result.tables) {
        let fields = {};
        for (let col of table.fields) {
            fields[col.name] = {type: col.database_type, semantic: col.semantic_type}
        }
        struct[table.name] = fields;
    }

    console.log(struct);
};

run();
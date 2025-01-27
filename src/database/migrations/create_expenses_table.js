export function up(knex) {
  return knex.schema.createTable("expenses", (table) => {
    table.increments("id").primary();
    table.string("category").notNullable();
    table.decimal("amount", 10, 2).notNullable();
    table.string("description").nullable();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("expenses");
}

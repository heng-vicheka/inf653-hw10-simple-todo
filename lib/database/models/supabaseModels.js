function mapTodo(row) {
  return {
    id: row.id,
    text: row.text,
    completed: row.completed
  };
}

module.exports = { mapTodo };

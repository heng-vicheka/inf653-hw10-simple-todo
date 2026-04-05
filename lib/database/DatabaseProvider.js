class DatabaseProvider {
  async connect() {
    throw new Error("connect() not implemented");
  }

  async getTodos() {
    throw new Error("getTodos() not implemented");
  }

  async createTodo(text) {
    throw new Error("createTodo(text) not implemented");
  }

  async updateTodo(id, updates) {
    throw new Error("updateTodo(id, updates) not implemented");
  }

  async deleteTodo(id) {
    throw new Error("deleteTodo(id) not implemented");
  }
}

module.exports = DatabaseProvider;

const mongoose = require("mongoose");
const DatabaseProvider = require("./DatabaseProvider");
const { Todo } = require("./models/mongoModels");

class MongoDBProvider extends DatabaseProvider {
  constructor(uri) {
    super();
    this.uri = uri;
  }

  async connect() {
    await mongoose.connect(this.uri);
  }

  async getTodos() {
    const docs = await Todo.find().sort({ createdAt: -1 }).lean();
    return docs.map((d) => ({
      id: d._id.toString(),
      text: d.text,
      completed: d.completed
    }));
  }

  async createTodo(text) {
    const doc = await Todo.create({ text });
    return { id: doc._id.toString(), text: doc.text, completed: doc.completed };
  }

  async updateTodo(id, updates) {
    const doc = await Todo.findByIdAndUpdate(id, updates, { new: true }).lean();
    if (!doc) return null;
    return { id: doc._id.toString(), text: doc.text, completed: doc.completed };
  }

  async deleteTodo(id) {
    const result = await Todo.findByIdAndDelete(id);
    return !!result;
  }
}

module.exports = MongoDBProvider;

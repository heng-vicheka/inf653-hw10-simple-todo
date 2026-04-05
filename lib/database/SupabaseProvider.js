const { createClient } = require("@supabase/supabase-js");
const DatabaseProvider = require("./DatabaseProvider");
const { mapTodo } = require("./models/supabaseModels");

class SupabaseProvider extends DatabaseProvider {
  constructor(url, key) {
    super();
    this.client = createClient(url, key);
  }

  async connect() {
    return true;
  }

  async getTodos() {
    const { data, error } = await this.client
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data.map(mapTodo);
  }

  async createTodo(text) {
    const { data, error } = await this.client
      .from("todos")
      .insert({ text })
      .select()
      .single();

    if (error) throw error;
    return mapTodo(data);
  }

  async updateTodo(id, updates) {
    const { data, error } = await this.client
      .from("todos")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return mapTodo(data);
  }

  async deleteTodo(id) {
    const { error } = await this.client.from("todos").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
}

module.exports = SupabaseProvider;

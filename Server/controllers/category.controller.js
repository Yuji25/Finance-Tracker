import supabase from "../config/supabase.js";

// { C } Create a category
export const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    const userId = req.user.id;

    // checking if it already exists
    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("user_id", userId)
      .ilike("name", name)
      .eq("type", type)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([{ name, type, user_id: userId }])
      .select();

    if (error) throw error;
    res.status(201).json({ success: true, category: data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// { R } Fetch all categories for current user
export const getAllCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, categories: data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



// { U } Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, type } = req.body;

    // pre stop if already exists
    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("user_id", userId)
      .ilike("name", name)
      .eq("type", type)
      .maybeSingle();

    if (existing && existing.id !== id) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const { data, error } = await supabase
      .from("categories")
      .update({ name, type })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ success: true, category: data});
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// { D } Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;

    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

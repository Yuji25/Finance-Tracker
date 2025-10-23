import supabase from "../config/supabase.js";

// { C } Create person
export const createPerson = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const userId = req.user.id;

    // checking if it already exists
    const { data: existing } = await supabase
      .from("people")
      .select("id")
      .eq("user_id", userId)
      .ilike("name", name)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ message: "Person already exists" });
    }
    
    const { data, error } = await supabase
      .from("people")
      .insert([{ name, phone, email, user_id: userId }])
      .select()
      .maybeSingle();

    if (error) throw error;
    res.status(201).json({ success: true, person: data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// { R } Fetch all people for current user
export const getAllPeople = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("people")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, people: data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



// { U } Update person
export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, phone, email } = req.body;

    // checking for duplis
    const { data: existing } = await supabase
      .from("people")
      .select("id")
      .eq("user_id", userId)
      .ilike("name", name)
      .maybeSingle();

    if (existing && existing.id !== id) {
      return res.status(409).json({ message: "Person already exists" });
    }

    const { data, error } = await supabase
      .from("people")
      .update({ name, phone, email })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Person not found" });

    res.status(200).json({ success: true, person: data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// { D } Delete person
export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("people")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
      
    if (error) throw error;


    res.status(200).json({ success: true, message: "Person deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

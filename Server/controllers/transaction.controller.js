import supabase from "../config/supabase.js";

export const createTransaction = async (req, res) => {
  try {
    const { type, amount, transaction_date, category_id, note, person_id, len_den_type, description } = req.body;
    const user = req.user;

    if (!type || !amount) return res.status(400).json({ error: "Type and amount are required" });

    // 1️⃣ Create base transaction
    const { data: transaction, error: txError } = await supabase
      .from("transactions")
      .insert([{ user_id: user.id, type, amount, transaction_date }])
      .select()
      .single();

    if (txError) throw txError;

    // 2️⃣ Insert into type-specific detail table
    if (type === "expense") {
      await supabase.from("expense_details").insert([{ transaction_id: transaction.id, category_id, note }]);
    } else if (type === "income") {
      await supabase.from("income_details").insert([{ transaction_id: transaction.id, category_id, note }]);
    } else if (type === "len_den") {
      await supabase.from("len_den_details").insert([{ transaction_id: transaction.id, person_id, len_den_type, description }]);
    }

    res.status(201).json({ message: "Transaction created", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export const getTransactions = async (req, res) => {
  try {
    const user = req.user;

    const { data, error } = await supabase
      .from("transactions")
      .select(`
        *,
        expense_details(*, categories(name)),
        income_details(*, categories(name)),
        len_den_details(*, people(name))
      `)
      .eq("user_id", user.id)
      .order("transaction_date", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, transaction_date, category_id, note, person_id, len_den_type, description } = req.body;
    const user = req.user;

    // Get transaction first
    const { data: transaction } = await supabase.from("transactions").select("*").eq("id", id).eq("user_id", user.id).single();
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    // Update core
    await supabase.from("transactions").update({ amount, transaction_date }).eq("id", id);

    // Update specific detail
    if (transaction.type === "expense") {
      await supabase.from("expense_details").update({ category_id, note }).eq("transaction_id", id);
    } else if (transaction.type === "income") {
      await supabase.from("income_details").update({ category_id, note }).eq("transaction_id", id);
    } else if (transaction.type === "len_den") {
      await supabase.from("len_den_details").update({ person_id, len_den_type, description }).eq("transaction_id", id);
    }

    res.json({ message: "Transaction updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const { error } = await supabase.from("transactions").delete().eq("id", id).eq("user_id", user.id);
    if (error) throw error;

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

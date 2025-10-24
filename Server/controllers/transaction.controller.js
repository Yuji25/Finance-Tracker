import supabase from "../config/supabase.js";

export const createTransaction = async (req, res) => {
  try {
    const user = req.user;
    const { type, amount, note, categoryName, personName, len_den_type, description } = req.body;

    // Inserting main transaction
    const { data: tx, error: txError } = await supabase
      .from("transactions")
      .insert([{ user_id: user.id, type, amount }])
      .select()
      .single();

    if (txError) throw txError;

    // Handle details based on type
    if (type === "expense" || type === "income") {
      // Find or create category
      let { data: category } = await supabase
        .from("categories")
        .select("*")
        .eq("user_id", user.id)
        .eq("name", categoryName)
        .eq("type", type)
        .maybeSingle();

      if (!category) {
        const { data: newCat } = await supabase
          .from("categories")
          .insert([{ user_id: user.id, name: categoryName, type }])
          .select()
          .single();
        category = newCat;
      }

      // Insert detail row
      const detailTable = type === "expense" ? "expense_details" : "income_details";
      const { error: detailError } = await supabase
        .from(detailTable)
        .insert([{ transaction_id: tx.id, category_id: category.id, note }]);

      if (detailError) throw detailError;
    } else if (type === "len_den") {
      // Find or create person
      let { data: person } = await supabase
        .from("people")
        .select("*")
        .eq("user_id", user.id)
        .eq("name", personName)
        .maybeSingle();

      if (!person) {
        const { data: newPerson } = await supabase
          .from("people")
          .insert([{ user_id: user.id, name: personName }])
          .select()
          .single();
        person = newPerson;
      }

      // Insert len_den detail row with description
      const { error: lenDenError } = await supabase
        .from("len_den_details")
        .insert([{
          transaction_id: tx.id,
          person_id: person.id,
          len_den_type,
          description: description || "", // ensure description is stored
        }]);

      if (lenDenError) throw lenDenError;
    }

    // Return transaction with nested details for frontend convenience
    const { data: fullTx, error: fetchError } = await supabase
      .from("transactions")
      .select(`
        *,
        expense_details(*, categories(name)),
        income_details(*, categories(name)),
        len_den_details(*, people(name))
      `)
      .eq("id", tx.id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    res.json({ success: true, transaction: fullTx });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};




export const getTransactions = async (req, res) => {
  try {
    const user = req.user;
    const { type } = req.query; // 'expense', 'income', or 'len_den'

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

    // Filter by type if query param is provided
    let filteredData = type ? data.filter((tx) => tx.type === type) : data;

    // Map to flatten nested relations
    filteredData = filteredData.map((tx) => {
      if (tx.type === "expense" && tx.expense_details) {
        const detail = Array.isArray(tx.expense_details)
          ? tx.expense_details[0]
          : tx.expense_details;

        return {
          ...tx,
          category_name: detail?.categories?.name || "Uncategorized",
          note: detail?.note || "",
        };
      }
      if (tx.type === "income" && tx.income_details) {
        const detail = Array.isArray(tx.income_details)
          ? tx.income_details[0]
          : tx.income_details;

        return {
          ...tx,
          category_name: detail?.categories?.name || "Uncategorized",
          note: detail?.note || "",
        };
      }
      if (tx.type === "len_den" && tx.len_den_details) {
        const detail = Array.isArray(tx.len_den_details)
          ? tx.len_den_details[0]
          : tx.len_den_details;

        return {
          ...tx,
          person_name: detail?.people?.name || "",
          len_den_type: detail?.len_den_type || "",
          description: detail?.description || "",
        };
      }
      return tx;
    });



    res.json(filteredData);
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

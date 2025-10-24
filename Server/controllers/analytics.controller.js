import supabase from "../config/supabase.js";

export const getUserBalance = async (req, res) => {
  try {
    const user = req.user;

    // Get from the VIEW we created
    const { data, error } = await supabase
      .from("user_balance_view")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) throw error;
    res.json({ balance: data?.balance || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryStats = async (req, res) => {
  try {
    const user = req.user;

    // Aggregate expense + income totals per category
    const { data: expenseStats, error: expErr } = await supabase
      .from("transactions")
      .select(
        `
        type,
        amount,
        expense_details(category_id, categories(name))
      `
      )
      .eq("user_id", user.id)
      .eq("type", "expense");

    if (expErr) throw expErr;

    const { data: incomeStats, error: incErr } = await supabase
      .from("transactions")
      .select(
        `
        type,
        amount,
        income_details(category_id, categories(name))
      `
      )
      .eq("user_id", user.id)
      .eq("type", "income");

    if (incErr) throw incErr;

    // Combine totals by category
    const summarize = (arr, key) =>
      arr.reduce((acc, t) => {
        const cat = t[key]?.categories?.name || "Uncategorized";
        acc[cat] = (acc[cat] || 0) + Number(t.amount);
        return acc;
      }, {});

    const expenseSummary = summarize(expenseStats, "expense_details");
    const incomeSummary = summarize(incomeStats, "income_details");

    res.json({ expenseSummary, incomeSummary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getLenDenSummary = async (req, res) => {
  try {
    const user = req.user;

    const { data, error } = await supabase
      .from("transactions")
      .select(
        `
        id,
        amount,
        len_den_details(len_den_type, people(name))
      `
      )
      .eq("user_id", user.id)
      .eq("type", "len_den");

    if (error) throw error;

    let totalLen = 0;
    let totalDen = 0;
    const personSummary = {};

    for (const t of data) {
      const pName = t.len_den_details?.people?.name || "Unknown";
      const type = t.len_den_details?.len_den_type;
      const amt = Number(t.amount);

      if (type === "len") totalLen += amt;
      if (type === "den") totalDen += amt;

      if (!personSummary[pName]) personSummary[pName] = { len: 0, den: 0 };
      personSummary[pName][type] += amt;
    }

    res.json({ totalLen, totalDen, personSummary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

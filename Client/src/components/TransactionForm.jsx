import { useState } from "react";
import toast from "react-hot-toast";
import API from "../utils/api.js";

export default function TransactionForm({ type, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [person, setPerson] = useState("");
  const [lenDenType, setLenDenType] = useState("len");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { amount, type };

      if (type === "expense" || type === "income") {
        payload.categoryName = category;
        payload.note = note;
      } else if (type === "len_den") {
        payload.personName = person;
        payload.len_den_type = lenDenType;
        payload.description = note;
      }

      await API.post("/transactions", payload);
      toast.success("Transaction added!");
      setAmount("");
      setCategory("");
      setNote("");
      setPerson("");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add transaction");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full rounded-lg border-ink-300 focus:border-brand-500 focus:ring-brand-500"
      />

      {(type === "expense" || type === "income") && (
        <>
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-lg border-ink-300 focus:border-brand-500 focus:ring-brand-500"
          />
          <input
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border-ink-300 focus:border-brand-500 focus:ring-brand-500"
          />
        </>
      )}

      {type === "len_den" && (
        <>
          <input
            placeholder="Person Name"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            required
            className="w-full rounded-lg border-ink-300 focus:border-brand-500 focus:ring-brand-500"
          />
          <select
            value={lenDenType}
            onChange={(e) => setLenDenType(e.target.value)}
            className="w-full rounded-lg border-ink-300 focus:border-brand-500 focus:ring-brand-500"
          >
            <option value="len">Len (Given)</option>
            <option value="den">Den (Taken)</option>
          </select>
          <input
            placeholder="Description"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border-ink-300 focus:border-brand-500 focus:ring-brand-500"
          />
        </>
      )}

      <button
        type="submit"
        className="btn-primary w-full"
      >
        Add {type}
      </button>
    </form>
  );
}

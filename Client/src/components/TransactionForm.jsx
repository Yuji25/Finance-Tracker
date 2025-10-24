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
      className="flex flex-col gap-2 bg-gray-100 p-4 rounded-xl w-full max-w-md"
    >
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="p-2 rounded"
      />

      {(type === "expense" || type === "income") && (
        <>
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="p-2 rounded"
          />
          <input
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-2 rounded"
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
            className="p-2 rounded"
          />
          <select
            value={lenDenType}
            onChange={(e) => setLenDenType(e.target.value)}
            className="p-2 rounded"
          >
            <option value="len">Len (Given)</option>
            <option value="den">Den (Taken)</option>
          </select>
          <input
            placeholder="Description"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-2 rounded"
          />
        </>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add {type}
      </button>
    </form>
  );
}

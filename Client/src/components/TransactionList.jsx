export default function TransactionList({ type, transactions }) {
  const headers = type !== 'len_den'
    ? ['Amount', 'Category', 'Note', 'Date']
    : ['Amount', 'Person', 'Len/Den Type', 'Description', 'Date'];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200">
      <table className="min-w-full divide-y divide-ink-200">
        <thead className="bg-ink-100">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-600 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-ink-100">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-ink-50/60">
              <td className="px-4 py-3 font-medium">₹{tx.amount}</td>
              {type !== 'len_den' ? (
                <>
                  <td className="px-4 py-3">{tx.category_name}</td>
                  <td className="px-4 py-3">{tx.note}</td>
                </>
              ) : (
                <>
                  <td className="px-4 py-3">{tx.person_name}</td>
                  <td className="px-4 py-3">{tx.len_den_type?.toUpperCase()}</td>
                  <td className="px-4 py-3">{tx.description}</td>
                </>
              )}
              <td className="px-4 py-3 text-ink-600">{tx.transaction_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

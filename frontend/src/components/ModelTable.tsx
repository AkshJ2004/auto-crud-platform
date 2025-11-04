export default function ModelTable({ data }) {
  if (!data || data.length === 0) return <p>No records found</p>

  const headers = Object.keys(data[0])

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {headers.map((h) => <td key={h}>{String(row[h])}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

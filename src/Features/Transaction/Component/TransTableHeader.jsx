function TransTableHeader() {
  return (
    <thead>
      <tr className="border-b border-gray-200 bg-gray-50">
        <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
        <th className="text-left px-4 py-3 text-gray-600 font-medium">Name</th>
        <th className="text-left px-4 py-3 text-gray-600 font-medium">Type</th>
        <th className="text-right px-4 py-3 text-gray-600 font-medium">
          Amount
        </th>
        <th className="text-center px-4 py-3 text-gray-600 font-medium">
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default TransTableHeader;

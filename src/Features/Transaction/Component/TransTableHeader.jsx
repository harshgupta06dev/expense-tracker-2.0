function TransTableHeader() {
  return (
    <thead>
      <tr className="border-b border-gray-200 bg-gray-50">
        <th className="text-left px-4 py-3 text-gray-600 font-medium w-[16%]">
          Date
        </th>
        <th className="text-left px-4 py-3 text-gray-600 font-medium w-[22%]">
          Name
        </th>
        <th className="text-left px-4 py-3 text-gray-600 font-medium w-[20%]">
          Type
        </th>
        <th className="text-right px-4 py-3 text-gray-600 font-medium w-[22%]">
          Amount
        </th>
        <th className="text-center px-4 py-3 text-gray-600 font-medium w-[16%]">
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default TransTableHeader;

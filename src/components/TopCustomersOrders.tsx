const TopCustomersOrders = () => {
    const customerData = [
      { name: "Brake Supply Company", total: "$22,512.11" },
      { name: "Intuitive Machine LLC", total: "$18,541.12" },
      { name: "Intuitive Machine LLC", total: "$18,541.12" },
      { name: "Intuitive Machine LLC", total: "$18,541.12" },
    ];
  
    return (
      <div className="p-4 border border-gray-300 rounded shadow-sm mx-auto">
        <h2 className="text-center text-lg font-semibold mb-0">Top Customers YTD</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black text-white rounded py-2">
              <th className="py-4 px-4 text-left">Company Name</th>
              <th className="py-4 px-4 text-right">Order Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((item, index) => (
              <tr key={index} className="bg-gray-200 text-black">
                <td className="py-4 px-4">{item.name}</td>
                <td className="py-4 px-4 text-right">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TopCustomersOrders;
  

const Archeive = () => {
  const salesData = [
    { rank: 1, name: "Jan",salesperson: "JEFF", sales: "$89,000" , completion: "23-10-1"},
    { rank: 2, name: "Feb", salesperson: "JEFF", sales: "$89,000", completion: "23-10-1" },
    { rank: 3, name: "March", salesperson: "JEFF", sales: "$89,000", completion: "23-10-1" },
    { rank: 4, name: "April", salesperson: "JEFF", sales: "$89,000", completion: "23-10-1" },
    { rank: 5, name: "May", salesperson: "JEFF", sales: "$89,000", completion: "23-10-1" },
    { rank: 6, name: "June", salesperson: "JEFF", sales: "$59,000", completion: "23-10-1" },
    { rank: 7, name: "July", salesperson: "JEFF", sales: "$59,000", completion: "23-10-1"},
    { rank: 8, name: "August", salesperson: "JEFF", sales: "$59,000", completion: "23-10-1" },
    { rank: 9, name: "Septempber", salesperson: "JEFF", sales: "$59,000", completion: "23-10-1"},
    { rank: 10, name: "October", salesperson: "JEFF", sales: "$59,000", completion: "23-10-1" },
    { rank: 11, name: "November", salesperson: "JEFF", sales: "$59,000", completion: "23-10-1"},
    { rank: 12, name: "December", salesperson: "JEFF", sales: "$59,000", completion: "23-10-1" },
];


  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="py-3 font-medium text-black uppercase text-center tracking-wider">Month</th>
            <th className="py-3 font-medium text-black uppercase text-center tracking-wider">Booked</th>
            <th className="py-3 font-medium text-black uppercase text-center tracking-wider">Shipped</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {salesData.map((item) => {
            return (
              <tr key={item.rank} >
                <td className="py-3 text-center">{item.name}</td>
                <td className="py-3 text-center">{item.sales}</td>
                <td className="py-3 text-center">{item.sales}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Archeive;

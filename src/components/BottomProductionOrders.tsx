const BottomProductionOrders = () => {
    const productionData = [
      {
        company: "Intuitive Machine LLC",
        revenue: "$17,241.00",
        stages: [false, false, false, false],
      },
      {
        company: "Intuitive Machine LLC",
        revenue: "$17,241.00",
        stages: [true, true, false, false],
      },
      {
        company: "Intuitive Machine LLC",
        revenue: "$17,241.00",
        stages: [true, true, true, false],
      },
      {
        company: "Intuitive Machine LLC",
        revenue: "$17,241.00",
        stages: [true, true, true, true],
      },
    ];
  
    const renderStage = (active: boolean) => (
      <div
        className={`h-4 w-12 mx-auto rounded ${
          active ? "bg-[#2AE305]" : "bg-gray-300"
        }`}
      ></div>
    );
  
    return (
      <div className="p-4 border-4 border-blue-400 rounded shadow-sm mx-auto max-w-5xl">
        <h2 className="text-center text-lg font-semibold mb-4">Orders In Production</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="py-2 px-4 text-left">Company Name</th>
              <th className="py-2 px-4 text-left">Revenue</th>
              <th className="py-2 px-4 text-center">Entered</th>
              <th className="py-2 px-4 text-center">Production Started</th>
              <th className="py-2 px-4 text-center">Inspection Started</th>
              <th className="py-2 px-4 text-center">Shipping Started</th>
            </tr>
          </thead>
          <tbody>
            {productionData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{item.company}</td>
                <td className="py-2 px-4">{item.revenue}</td>
                {item.stages.map((stage, i) => (
                  <td key={i} className="py-2 px-4 text-center">
                    {renderStage(stage)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default BottomProductionOrders;
  
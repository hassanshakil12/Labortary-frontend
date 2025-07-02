import TopCustomersOrders from "../components/TopCustomersOrders";
import BottomProductionOrders from "../components/BottomProductionOrders";
import EcommerceMetrics2 from "../components/ecommerce/EcommerceMetrics2";


const Calendar: React.FC = () => {


  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-5">
          <EcommerceMetrics2 />
          {/* <StatisticsChart /> */}

        </div>

        <div className="col-span-12 xl:col-span-7">
          <TopCustomersOrders />
        </div>

        <div className="col-span-12">
          <BottomProductionOrders />
        </div>
      </div>
    </>
  );
};


export default Calendar;

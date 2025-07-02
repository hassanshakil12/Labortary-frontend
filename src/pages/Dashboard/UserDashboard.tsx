import PageMeta from "../../components/common/PageMeta";
import ScheduledAppointments from "../../components/ScheduledAppointments";
import EcommerceMetrics2 from "../../components/ecommerce/EcommerceMetrics2";

export default function Home() {
  return (
    <>
      <PageMeta
        title="All Mobile Phlebotomy Services Dashboard"
        description="This is a All Mobile Phlebotomy Services Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-12">
          <EcommerceMetrics2 />
          <div className="my-2">
            <ScheduledAppointments />
          </div>
        </div>
      </div>
    </>
  );
}

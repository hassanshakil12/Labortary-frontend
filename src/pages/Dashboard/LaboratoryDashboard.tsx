import PageMeta from "../../components/common/PageMeta";
import LaboratoryAppointments from "../../components/LaboratoryAppointments";
import LaboratoryMetrices from "../../components/ecommerce/LaboratoryMetrices";

export default function Home() {
  return (
    <>
      <PageMeta
        title="All Mobile Phlebotomy Services Dashboard"
        description="This is a All Mobile Phlebotomy Services Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-12">
          <LaboratoryMetrices />
          <div className="my-2">
            <LaboratoryAppointments />
          </div>
        </div>
      </div>
    </>
  );
}

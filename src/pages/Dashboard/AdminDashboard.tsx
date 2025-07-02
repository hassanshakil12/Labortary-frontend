import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";
import BookedRankingTable from "../../components/BookedRankingTable";
import ShippedRankingTable from "../../components/ShippedRankingTable";

export default function Home() {
  return (
    <>
      <PageMeta
        title="All Mobile Phlebotomy Services Dashboard"
        description="This is a All Mobile Phlebotomy Services Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-12">
          <EcommerceMetrics />
          <div className="my-2">
            <BookedRankingTable />
          </div>
          <ShippedRankingTable />
        </div>
      </div>
    </>
  );
}

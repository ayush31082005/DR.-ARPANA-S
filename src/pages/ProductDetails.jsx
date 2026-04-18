import Breadcrumb from "../components/common/Breadcrumb";
import PageHero from "../components/common/PageHero";
import ProductGallery from "../components/products/ProductGallery";
import ProductDetailsInfo from "../components/products/ProductDetailsInfo";
import RelatedProducts from "../components/products/RelatedProducts";

export default function ProductDetails() {
  return (
    <>
      <PageHero title="Product Details" description="Product detail page with gallery and purchase actions." />
      <section className="section-space">
        <div className="container-padded">
          <Breadcrumb items={[{ label: "Shop", path: "/shop" }, { label: "Product Details" }]} />
          <div className="grid gap-10 lg:grid-cols-2">
            <ProductGallery />
            <ProductDetailsInfo />
          </div>
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Related Products</h2>
            <RelatedProducts />
          </div>
        </div>
      </section>
    </>
  );
}

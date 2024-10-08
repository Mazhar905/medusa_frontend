import { Region, ShippingOption } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ShippingOptionComp from "@modules/products/components/shipping-option-comp"
import PromoLabels from "@modules/products/components/promo-label"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductAccordion from "@modules/products/components/product-accordion"
import RelatedProducts from "@modules/products/components/related-products"
import RatingGrid from "@modules/products/components/rating-grid"
import SizeChart from "@modules/products/components/size-chart"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { Portal } from "@headlessui/react"
import Breadcrumbs from "@modules/common/components/breadcrumbs"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }
  return (
    <>
      <div
        className="content-container items-start py-6 relative"
        data-testid="product-container"
      >
        <div className="w-full">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col small:flex-row small:items-start py-6 relative gap-x-8 gap-y-5">
          <div className="block w-full md:w-[40%] relative">
            <ImageGallery images={product?.images || []} />
            <PromoLabels />
          </div>
          <div className="flex flex-col small:sticky small:py-0 small:max-w-full w-full md:w-[60%] py-8 gap-y-6">
            <div className="hidden md:block">
              <ShippingOptionComp />
            </div>
            <ProductInfo product={product} />
            {/* <ProductOnboardingCta /> */}
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <SizeChart />
          </div>
        </div>
      </div>
      <div className="content-container flex flex-row">
        {/* <ProductTabs product={product} /> */}
        <ProductAccordion product={product} />
      </div>
      <div
        className="py-10 small:py-16 bg-slate-200"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
      <div className="py-8">
        <RatingGrid />
      </div>
    </>
  )
}

export default ProductTemplate

import ShopHeader from "@/components/shop/ShopHeader";
import ShopItems from "@/components/shop/ShopItems";
import ShopOwner from "@/components/shop/ShopOwner";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 text-mocha-text overflow-y-auto">
      <ShopHeader></ShopHeader>
      <ShopOwner></ShopOwner>

      <ShopItems></ShopItems>
    </div>
  );
};

export default page;

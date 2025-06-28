import Image from "next/image";
import loader from "@/assets/icons/loader.svg"

export default function Loading() {
  return (
    <div className="flex-center size-full h-screen gap-3 text-white">
      <Image
        src={loader}
        alt="loader"
        width={40}
        height={3240}
        className="animate-spin"
      />
      Loading...
    </div>
  );
}

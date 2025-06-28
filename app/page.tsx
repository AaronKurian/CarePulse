import Image from "next/image";
import Link from "next/link";
import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import logo from "@/public/assets/icons/logo-full.svg"
import onboarding from "@/public/assets/images/onboarding-img.png"


const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px]">
          <Link href="/">
            <Image
              src={logo}
              height={1000}
              width={1000}
              alt="logo"
              className="mb-12 h-10 w-fit"
            />
          </Link>

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between pb-12">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500 hover:scale-110 transition-transform duration-300">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src={onboarding}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;

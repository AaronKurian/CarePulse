import Image from "next/image";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Link from "next/link";
import logo from "@/public/assets/icons/logo-full.svg"
import appointment from "@/public/assets/images/appointment-img.png"



const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href="/">
            <Image
              src={logo}
              height={1000}
              width={1000}
              alt="logo"
              className="mb-12 h-10 w-fit"
            />
          </Link>

          <AppointmentForm
            patientId={patient?.id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2025 CarePulse</p>
        </div>
      </section>

      <Image
        src={appointment}
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;

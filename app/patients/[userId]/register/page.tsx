import Image from "next/image";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Link from "next/link";
import logo from "@/public/assets/icons/logo-full.svg"
import register from "@/public/assets/images/register-img.png"



const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link href="/">
            <Image
              src={logo}
              height={1000}
              width={1000}
              alt="logo"
              className="mb-12 h-10 w-fit"
            />
          </Link>

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2025 CarePulse</p>
        </div>
      </section>

      <Image
        src={register}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;

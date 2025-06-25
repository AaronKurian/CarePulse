"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { set } from "zod/v4-mini"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA= 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  PHONE_INPUT = 'phoneInput',
  DATE_PICKER = 'datePicker',
  SKELETON = 'skeleton'     
}



const PatientForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)

    try {
        const userData={name, email, phone };

        const user = await createUser(userData);

        if(user) {
          console.log("User created successfully:", user);
          form.reset();
          router.push(`/patients/${user.$id}/register`);
        }
    }
    catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }

}

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi There(wave)</h1>
            <p className="text-dark-700"> Schedule Your First Appointment</p>
        </section>
        
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />

        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
        />

        <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(+91) 123-456-7890"
        />
        <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
      </form>
    </Form>
  )

}
export default  PatientForm
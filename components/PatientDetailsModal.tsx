"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Patient } from "@/types/supabase.types";
import { formatDateTime } from "@/lib/utils";
import { 
  User,
  CircleUser,
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar,
  Shield,
  FileText,
  AlertTriangle,
  Pill,
  Users,
  History,
  CreditCard,
  UserCheck
} from "lucide-react";

interface PatientDetailsModalProps {
  patient: Patient;
  patientName: string;
}

export const PatientDetailsModal = ({ patient, patientName }: PatientDetailsModalProps) => {
  const [open, setOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-14-medium text-left p-0 h-auto font-normal hover:text-green-500 hover:bg-transparent"
        >
          {patientName}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-appointment-card backdrop-blur-md max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10">
              <CircleUser className="w-8 h-8 text-white" />
            </div>
            <div>
              <DialogTitle className="text-24-bold">{patient.name}</DialogTitle>
              {/* <DialogDescription className="text-16-regular">
                Patient Registration Details
              </DialogDescription> */}
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-18-bold">
                {/* <User className="w-5 h-5" /> */}
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Full Name</p>
                  <p className="text-16-semibold">{patient.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Email</p>
                  <p className="text-16-semibold">{patient.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Phone</p>
                  <p className="text-16-semibold">{patient.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Date of Birth</p>
                  <p className="text-16-semibold">{formatDate(patient.birth_date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Gender</p>
                  <Badge variant="outline" className={`text-14-medium ${patient.gender === 'Male' ? 'border border-blue-700' : patient.gender === 'Female' ? 'border border-pink-600' : 'border border-white'}`}>
                    {patient.gender}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Occupation</p>
                  <p className="text-16-semibold">{patient.occupation}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-18-bold">
                {/* <MapPin className="w-5 h-5" /> */}
                Contact & Address
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-dark-600 mt-1" />
                  <div>
                    <p className="text-14-regular text-dark-600">Address</p>
                    <p className="text-16-semibold">{patient.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Emergency Contact</p>
                  <p className="text-16-semibold">{patient.emergency_contact_name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Emergency Phone</p>
                  <p className="text-16-semibold">{patient.emergency_contact_number}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-18-bold">
                {/* <Heart className="w-5 h-5" /> */}
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Primary Physician</p>
                  <p className="text-16-semibold">Dr. {patient.primary_physician}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                {patient.allergies && (
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-1" />
                    <div>
                      <p className="text-14-regular text-dark-600">Allergies</p>
                      <p className="text-16-semibold">{patient.allergies}</p>
                    </div>
                  </div>
                )}
                
                {patient.current_medication && (
                  <div className="flex items-start gap-3">
                    <Pill className="w-4 h-4 text-blue-500 mt-1" />
                    <div>
                      <p className="text-14-regular text-dark-600">Current Medications</p>
                      <p className="text-16-semibold">{patient.current_medication}</p>
                    </div>
                  </div>
                )}
                
                {patient.family_medical_history && (
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-purple-500 mt-1" />
                    <div>
                      <p className="text-14-regular text-dark-600">Family Medical History</p>
                      <p className="text-16-semibold">{patient.family_medical_history}</p>
                    </div>
                  </div>
                )}
                
                {patient.past_medical_history && (
                  <div className="flex items-start gap-3">
                    <History className="w-4 h-4 text-orange-500 mt-1" />
                    <div>
                      <p className="text-14-regular text-dark-600">Past Medical History</p>
                      <p className="text-16-semibold">{patient.past_medical_history}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Insurance Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-18-bold">
                {/* <Shield className="w-5 h-5" /> */}
                Insurance Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Insurance Provider</p>
                  <p className="text-16-semibold">{patient.insurance_provider}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Policy Number</p>
                  <p className="text-16-semibold">{patient.insurance_policy_number}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Identification */}
          {(patient.identification_type || patient.identification_number) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-18-bold">
                  {/* <FileText className="w-5 h-5" /> */}
                  Identification
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {patient.identification_type && (
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-dark-600" />
                    <div>
                      <p className="text-14-regular text-dark-600">ID Type</p>
                      <p className="text-16-semibold">{patient.identification_type}</p>
                    </div>
                  </div>
                )}
                
                {patient.identification_number && (
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-dark-600" />
                    <div>
                      <p className="text-14-regular text-dark-600">ID Number</p>
                      <p className="text-16-semibold">{patient.identification_number}</p>
                    </div>
                  </div>
                )}
                
                {patient.identification_document_url && (
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-dark-600" />
                      <div>
                        <p className="text-14-regular text-dark-600">Identification Document</p>
                        <Badge variant="default" className="text-14-medium bg-green-100/10 text-green-700/60 border-green-800">
                          Document Uploaded
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
                
                {!patient.identification_document_url && (patient.identification_type || patient.identification_number) && (
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-dark-600" />
                      <div>
                        <p className="text-14-regular text-dark-600">Identification Document</p>
                        <Badge variant="outline" className="text-14-medium bg-orange-100/10 border-orange-800 text-orange-700/60">
                          No Document Uploaded
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Registration Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-18-bold">
                {/* <Calendar className="w-5 h-5" /> */}
                Registration Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Registered On</p>
                  <p className="text-16-semibold">{formatDateTime(new Date(patient.created_at)).dateTime}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-dark-600" />
                <div>
                  <p className="text-14-regular text-dark-600">Privacy Consent</p>
                  <Badge 
                    variant={patient.privacy_consent ? "default" : "destructive"}
                    className="text-14-medium"
                  >
                    {patient.privacy_consent ? "Granted" : "Not Granted"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

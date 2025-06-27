# CarePulse

A modern healthcare appointment management system built with Next.js and Supabase, designed to streamline the patient-doctor appointment booking process.

## 🌐 Live Demo

**Deployed on Vercel:** [View Live Application](https://your-app-url.vercel.app)

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Tech Stack

- **Framework:** Next.js 14
- **Database:** Supabase
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** ShadCN/UI
- **SMS Service:** Twilio
- **Deployment:** Vercel

## 🔋 Features

👉 **Register as a Patient**: Users can sign up and create a personal profile as a patient.

👉 **Book a New Appointment with Doctor**: Patients can schedule appointments with doctors at their convenience and can book multiple appointments.

👉 **Manage Appointments on Admin Side**: Administrators can efficiently view and handle all scheduled appointments.

👉 **Confirm/Schedule Appointment from Admin Side**: Admins can confirm and set appointment times to ensure they are properly scheduled.

👉 **Cancel Appointment from Admin Side**: Administrators have the ability to cancel any appointment as needed.

👉 **Send SMS on Appointment Confirmation**: Patients receive SMS notifications to confirm their appointment details.

👉 **Complete Responsiveness**: The application works seamlessly on all device types and screen sizes.

👉 **File Upload Using Supabase Storage**: Users can upload and store files securely within the app using Supabase storage services.


And many more, including code architecture and reusability.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Twilio account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AaronKurian/carepulse.git
   cd carepulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



---

Made with ❤️ by Aaron Kurian Abraham

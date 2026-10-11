# DocGen - Professional Document Generator

A web app for generating professional documents from templates. Fill in a form, preview the result, and download as PDF or image.

## Features

- 6 professional document templates (Application Form, Grant Notification, Job Offer Letter, eMedical Report, Police Clearance, Work Permit Visa)
- User authentication (email/password via Supabase)
- Live preview while editing
- Export to PDF or PNG image
- Save documents to your account

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (Auth + Database)
- jsPDF + html2canvas for export
- lucide-react for icons

## Setup

```bash
npm install
npm run dev
```

Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build

```bash
npm run build
```

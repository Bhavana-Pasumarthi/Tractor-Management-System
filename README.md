# KisanYantra — Tractor Rental & Management Platform

KisanYantra is a web-based tractor rental and management platform designed to simplify the process of discovering, booking, and managing tractor rentals.

The platform provides role-based experiences for **Farmers/Users, Tractor Owners, and Administrators**, with dedicated workflows for rental management, tractor management, bookings, and customer support.

> Developed during an industry internship at **Techaeroes Innovations Pvt. Ltd.** as part of a collaborative software development project.

---

## Overview

KisanYantra brings the tractor rental workflow into a single web platform, allowing users to interact with available tractors while enabling owners and administrators to manage the rental ecosystem.

The application includes:

- Role-based user experiences
- Tractor discovery and rental workflows
- Booking management
- Owner-side tractor management
- Administrative management
- Multilingual user interface
- Guided Help & Support
- AI-powered customer assistance
- Support-ticket escalation

---

## My Contribution

### Translator & Customer Support Agent

My primary contribution focused on **localization, user support, and AI-assisted customer assistance**.

I designed and implemented the following functionality:

**Localization & Settings**
- Implemented English and Telugu language support.
- Developed the language-selection interface within Settings.
- Integrated translated UI content across the application.
- Implemented language persistence and UI updates when switching languages.

**Help & Support**
- Designed and implemented the Help & Support module.
- Added guided assistance for common user issues including login, tractor discovery, booking, payment, booking status, cancellation, account-related issues, and language settings.
- Added free-text assistance so users can describe their problem naturally.

**AI Assistance**
- Integrated the **Google Gemini API** into the Help Assistant.
- Designed the AI interaction flow to provide contextual assistance related to the KisanYantra platform.
- Implemented language-aware responses based on the user's selected language.
- Added handling for questions that fall outside the supported KisanYantra domain.

**Support Escalation**
- Implemented escalation of unresolved issues into support tickets.
- Integrated the workflow for administrators to review, respond to, and resolve support requests.

**Testing & Debugging**
- Tested localization, Settings, Help & Support, AI responses, and ticket escalation workflows.
- Debugged interface and integration issues to improve reliability and usability.

---

## Key Features

### 🌐 Multilingual Interface
Switch between **English and Telugu** directly from the Settings module.

### 🤖 AI-Powered Help Assistant
Uses the **Google Gemini API** to provide natural-language assistance for KisanYantra-related questions.

### 💬 Guided Support
Predefined support topics provide quick answers for common user problems.

### 🎫 Support Ticket Escalation
Issues that cannot be resolved through the Help Assistant can be escalated for administrator assistance.

### 👥 Role-Based Architecture
Separate workflows are provided for:

- Farmers / Users
- Tractor Owners
- Administrators

### ⚙️ Settings
Centralized access to language preferences and Help & Support.

---

## AI Support Flow

```text
User Question
      ↓
Help Assistant
      ↓
Gemini API
      ↓
AI Response
      ↓
Issue Resolved?
   ↙       ↘
 Yes        No
 ↓          ↓
End     Support Ticket
             ↓
       Administrator
             ↓
          Resolution

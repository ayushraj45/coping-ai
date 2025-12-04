# Coping AI – Intelligent Journaling Companion

Coping AI is a cross‑platform React Native journaling app that combines AI‑assisted reflection, mood tracking, and behavioral insights to help users build healthier emotional coping habits on iOS and Android.

***

## Key Features

- **AI‑assisted journaling** – Context‑aware prompts and smart suggestions that help users reflect, reframe thoughts, and capture emotions more clearly.
- **Personalized insights** – Uses past entries, moods, and themes to surface patterns and tailored coping suggestions over time.
- **Multi‑platform support** – Built with Expo and React Native to run on both iOS and Android from a single codebase.
- **Push notifications & reminders** – Gentle nudges to journal at the right time and build a consistent reflective practice.
- **Secure, private by design** – User data is handled on the client and via secure APIs, with configuration ready for production‑grade auth and storage.

***

## Architecture Overview

Coping AI is structured as a modular React Native app using Expo, with a clear separation between UI components, navigation, hooks, and utility layers.

- **Framework**: React Native with Expo (managed workflow) for rapid mobile development and OTA updates.
- **Language**: Primarily JavaScript with TypeScript support enabled for type safety and scalability.
- **Structure**:
  - `app/` – File‑based routing and screen definitions.
  - `components/` – Reusable UI components and layout primitives.
  - `hooks/` – Custom hooks for state management, API calls, and side effects.
  - `utils/` – Shared helpers (formatting, date utilities, notification helpers, etc.).
  - `assets/` – Icons, images, and other static resources.
- **Configuration**:
  - `app.json` / `expo` – App metadata, platforms, and build configuration.
  - `eas.json` – EAS build profiles for production releases.
  - `metro.config.js` and `babel.config.js` – Metro and Babel configuration for React Native, SVGs, and advanced tooling.

This structure is designed to be production‑ready and easily extendable with additional modules such as analytics, authentication, and offline sync.

***

## AI and Personalization

Coping AI is built around the idea of personalized mental wellness support rather than generic journaling.

- **Adaptive prompts** – Journaling prompts can evolve based on recent entries, tone, or themes such as stress, gratitude, or productivity.
- **Behavioral patterns** – The app is structured to support surfacing trends (for example, recurring triggers or time‑of‑day patterns) that can inform healthier habits.
- **Extensible AI backend** – The client is architected to plug into external AI APIs (for example, OpenAI or other LLM providers) without tightly coupling UI logic to any specific vendor.

***

## Notifications and Analytics

The project includes configuration and code paths for production‑grade user engagement.

- **Push notifications** – Integrated support for mobile notifications (tested on iOS and Android) to remind users to journal or revisit insights.
- **Analytics ready** – The app is wired to support analytics events (for example, session start, journaling streaks, feature usage) and has previously been integrated with tools such as Firebase Analytics.

This allows tracking of engagement, retention, and feature adoption in a privacy‑aware manner.

***

## Tech Stack

- **Mobile framework**: React Native (Expo)
- **Languages**: JavaScript, TypeScript
- **Build & tooling**:
  - Expo CLI and EAS for builds and deployment
  - Metro bundler and Babel for React Native tooling
- **Platform targets**: iOS and Android (single codebase)

This stack demonstrates experience with modern mobile development, cross‑platform architecture, TypeScript adoption, and production build tooling.

***

## Getting Started (Local Development)

1. **Clone the repository**  
   ```bash
   git clone https://github.com/ayushraj45/coping-ai.git
   cd coping-ai
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the app**  
   ```bash
   npx expo start
   ```
   Then choose to open in:
   - iOS simulator  
   - Android emulator  
   - Physical device via Expo Go  

4. **Reset to a clean starter (optional)**  
   ```bash
   npm run reset-project
   ```
   This command moves the starter example code to `app-example/` and prepares a fresh `app/` directory.

***

## Production Readiness

Coping AI has been incrementally evolved with several production‑focused improvements and iterations.

- **Multiple release iterations** – The `version_2_0` branch and commits reflect ongoing improvements in UX, stability, and features.
- **Platform‑specific tuning** – Includes updates to Gradle, Expo, and iOS configuration to address real‑world build and deployment issues.
- **Error reduction & logging cleanup** – Several passes were made to streamline logs and improve maintainability before production builds.

These choices highlight an understanding of the full lifecycle from prototype to app‑store‑ready builds.

***

## Developer Highlights

This project showcases:

- End‑to‑end ownership of a mobile product: from initial scaffold and architecture to production builds and iterative refinement.
- Experience with AI‑integrated user experiences, especially around mental wellness and habit‑forming workflows.
- Comfort working with cross‑platform React Native and Expo, including native configuration, notifications, analytics, and release management.

For questions or opportunities related to this project, feel free to reach out via LinkedIn or the contact details on the associated website.

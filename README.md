# Plant & Herbs Identifier

An AI-powered web application that helps users identify plants and herbs from uploaded images and explore information about their botanical characteristics, edibility, toxicity, and traditional medicinal uses.

**Live Application:** https://plant-ai-delta.vercel.app/

## Overview

Plant & Herbs Identifier was developed to make plant identification and botanical information more accessible through a simple, interactive web application.

Users can upload an image of a plant, receive a likely identification, and explore additional information organized into categories.

The application combines image recognition with external plant databases and structured reference data to provide useful information while clearly communicating uncertainty and potential safety concerns.

## Features

### Plant Identification
- Upload a plant or herb image for identification.
- Identify likely matches using the Pl@ntNet API.
- Display common name, scientific name, botanical family, and identification confidence.
- Handle unidentified plants and unsuccessful requests.

### Edibility Information
- Search an external plant database for edibility information.
- Distinguish exact scientific-name matches from related varieties.
- Display available edible-parts information for related records.
- Provide warnings when edibility cannot be verified.

### Toxicity Information
- Display available toxicity information for humans and pets.
- Include reported toxic plant parts, symptoms, and precautions when supported by reference data.
- Identify situations where toxicity information is unavailable.

### Medicinal Information
- Display available documented or traditional medicinal-use information.
- Include evidence notes, potential risks, and source references when available.
- Clearly indicate when medicinal information is unknown.

### Interactive User Interface
- Responsive design for desktop and mobile browsers.
- Organized information categories: Edibility, Toxicity, Medicinal, and Plant Details.
- Image preview before identification.
- Automatic clearing of previous results when a new image is selected.
- Automatic reset to the Edibility category for each new image.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack web application framework |
| React | Interactive user interface |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling |
| Next.js API Routes | Server-side API integration |
| Pl@ntNet API | Plant image identification |
| Edible Plant Database API | Plant edibility reference data |
| Structured reference datasets | Toxicity and medicinal information |
| Vercel | Application hosting and deployment |
| Git & GitHub | Version control and source code management |

## How It Works

1. The user uploads an image of a plant or herb.
2. The application sends the image to a server-side API endpoint.
3. The server requests plant identification from Pl@ntNet.
4. The most likely plant match is selected.
5. The application looks up available edibility, toxicity, and medicinal information using the identified scientific name.
6. Results are displayed in separate categories with identification confidence and relevant safety information.

## Getting Started

### Prerequisites

- Node.js
- npm
- A Pl@ntNet API key
- An Edible Plant Database API key

### Installation

Clone the repository:

```bash
git clone git@github.com:cthao309/plant-ai.git
```

Navigate into the project:

```bash
cd plant-ai
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
PLANETNET_API_KEY=your_plantnet_api_key
EDIBLE_API_KEY=your_edible_api_key
```

Replace the example values with your actual API keys.

Never commit API keys or other sensitive credentials to GitHub.

### Run Locally

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Safety Disclaimer

**This application is intended for educational and informational purposes only.**

Plant identification results are probabilistic and may be inaccurate. Identification confidence does not establish whether a plant is safe to consume, handle, or use medicinally.

Edibility, toxicity, and medicinal information may be incomplete, unavailable, or based on related species or varieties rather than the exact plant identified.

Users should never consume or use an unidentified plant based solely on information provided by this application. Always consult a qualified botanical, toxicology, or medical professional when appropriate.

The application does not provide medical advice.

## Future Enhancements

Potential future improvements include:

- Camera-based plant identification.
- Live camera identification using video streams.
- Expanded botanical reference databases.
- Additional verified medicinal and toxicity sources.
- Improved identification accuracy and confidence handling.
- Geographic and habitat information.
- Plant identification history and saved results.

## Project Status

**Version 1 — Initial deployment and testing**

The application is deployed on Vercel. Core functionality has been implemented and tested. Additional source validation and safety reviews are ongoing.

## Author

Developed by Charlie Thao.

GitHub: https://github.com/cthao309

## License

No open-source license has been specified for this project.
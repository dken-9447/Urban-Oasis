<h1 align="center" style="font-weight: bold;">Urban Oasis 💻</h1>

<p align="center">
<a href="#layout">Layout</a>
<a href="#technologies">Technologies</a>
<a href="https://www.figma.com/proto/BcspAt5QTp8BAecoJmAJO4/UrbanOasis?node-id=351-8056">Figma Wireframe</a>
</p>

<p align="center">The purpose of the Urban Oasis App is to create an app aimed at helping people in Orange County make healthier eating decisions. The app will provide users with the ability to find produce stores near them that sell healthy food options. Users will also be able to search through healthy recipes, view price estimates to determine their budget, and locate nearby stores that sell the ingredients they need.</p>

<p align="center">
<a href="https://github.com/dken-9447/Urban-Oasis">📱 View this project</a>
</p>

<h2 id="layout">🎨 Layout</h2>

<p align="center">
  <img src="https://i.imgur.com/A2IL2tH.jpg" alt="Urban Oasis Image 1" width="400px">
  <img src="https://i.imgur.com/cW8Fs6l.jpg" alt="Urban Oasis Image 2" width="400px">
</p>

<h2 id="technologies">💻 Technologies</h2>

📱 Frontend (UI & UX)

- React Native (JavaScript)- Framework for building cross-platform mobile applications.
- React Native Paper- UI Component library that provides material design components.
- NativeWind (Tailwind for React Native)- Utility-based styling using Tailwind CSS classes in React Native.
- Expo- Framework for faster React native development and testing.

🎨 Styling & Theming

- Tailwind CSS (via NativeWind)- Utility-first CSS for styling React Native components.
- Custom Styles (StyleSheet from React Native) - Some inline styles and StyleSheet.create() for styling.
- Theme-based colors (colors from ../../../theme) - Centralized theme management for consistent styling.

🔍 UI Components & Forms

- React Native Paper’s TextInput - Custom text fields with Material UI styling.
- Ract Native Paper’s IconButton - Custom icons for navigation and actions.
- Image (React Native) - Used for displaying static assets like logos.

🌍 State Management & Hooks

- React Hooks (useState) - Used for managing input state (e.g., email in the search bar).

⚙️ Backend & APIs

- Firebase- For storing user and product data.
- Axios or Fetch API - For handling API calls to fetch data from a backend.

⚡ Development & Tooling

- Expo (for Testing & Debugging) - Simplifies development and deployment in React Native.
- Metro Bundler (React Native Dev Server) - Manages bundling and hot reloading.
- ESLint & Prettier (if configured) - Code linting and formatting for best practices.
- Global CSS (./global.css) - Used for theming a web version.

<h3>Starting</h3>

### **🚀 Installation Guide for Urban Oasis Development**

This guide provides **step-by-step instructions** to set up and run the **Urban Oasis** React Native project, including installing VSCode, required extensions, dependencies, and emulators for **Windows and Mac users**.

---

## **🛠️ 1. Install the Required Software**

Before cloning or running the project, install the necessary tools.

### **✅ Step 1: Install VSCode**

🔗 Download **Visual Studio Code (VSCode)** from:  
➡️ [**VSCode Official Website**](https://code.visualstudio.com/Download)

#### **Installation Steps:**

1. Download **VSCode** for your OS (**Windows/Mac**).
2. Run the installer and follow the installation steps.
3. Once installed, open **VSCode** and proceed to install the required extensions (Step 2).

---

### **✅ Step 2: Install Required VSCode Extensions**

Once VSCode is installed, open it and install the following extensions:

#### **Method 1: Install via VSCode Extensions Panel**

1. Open **VSCode**
2. Press **Ctrl + Shift + X** (Windows/Linux) or **Cmd + Shift + X** (Mac) to open the Extensions Marketplace.
3. Search and install the following extensions:
    - **ESLint** → Linting for JavaScript/React Native (**by Microsoft**)
    - **Prettier - Code Formatter** → Code formatting (**by Esben Petersen**)
    - **React Native Tools** → Debugging for React Native (**by Microsoft**)
    - **React-Native/React/Redux Snippets for ES6/ES7** → Code snippets (**by dsznajder**)

#### **Method 2: Install Extensions via Command Line**

If you want to install them all at once, open a terminal and run:

```sh
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension msjsdiag.vscode-react-native
code --install-extension dsznajder.es7-react-js-snippets
```

---

### **✅ Step 3: Install Node.js**

**Node.js is required** because it includes npm (Node Package Manager), which is used to install dependencies.

#### **Installation Steps:**

1. Download **Node.js (LTS Version)** from:  
   ➡️ [**Node.js Official Website**](https://nodejs.org/)
2. Install it by running the downloaded setup file.
3. **Verify installation** by running the following commands in a terminal:
    ```sh
    node -v
    npm -v
    ```
    - You should see version numbers displayed.

---

### **✅ Step 4: Install Expo CLI**

Since your project uses **Expo**, install Expo CLI globally.

#### **Installation Command:**

```sh
npm install -g expo-cli
```

#### **Verify Installation:**

```sh
expo --version
```

If the installation is successful, it will display the installed version of Expo.

---

## **📂 2. Clone the Project and Install Dependencies**

Once your tools are installed, you can **clone the repository** and set up dependencies.

### **✅ Step 5: Clone the GitHub Repository**

#### **Cloning an Existing Repo:**

If you are cloning the project directly, run:

```sh
git clone https://github.com/YOUR-USERNAME/urban-oasis.git
cd urban-oasis
```

#### **Forking the Repo First (If Needed):**

1. Open **GitHub** and go to the repository.
2. Click **Fork** (top right) to create your own copy.
3. Copy the **new forked repo URL**.
4. Clone it using:
    ```sh
    git clone https://github.com/YOUR-USERNAME/urban-oasis.git
    cd urban-oasis
    ```

---

### **✅ Step 6: Install Dependencies**

Once inside the project folder, install the required dependencies.

#### **Using npm:**

```sh
npm install
```

#### **Using Yarn (If Installed):**

```sh
yarn install
```

This will install all required libraries and packages based on the `package.json` file.

---

## **🚀 3. Running the Project**

Now that everything is installed, you can start the project.

### **✅ Step 7: Start the Expo Project**

```sh
npm start
```

or

```sh
expo start
```

This will open the **Metro Bundler**, allowing you to:

- **Scan the QR code** with your **Expo Go** app to preview on a real device.
- Press **"w"** to run the app in the browser.
- Press **"a"** to run it on an **Android emulator**.
- Press **"i"** to run it on an **iOS simulator** (Mac only).

---

# **🚀 Setup Guide for Windows & Mac Users to Run iOS & Android Simulators**

Now that we’ve installed **VSCode, Node.js, and Expo CLI**, let's set up **Android & iOS emulators** so you can test your React Native project.

---

## **📌 1️⃣ Setting Up an Android Emulator (Windows & Mac)**

### **✅ Option 1: Use an Actual Android Device (Recommended)**

1. **Download the Expo Go App**  
   📲 [**Expo Go (Android)**](https://play.google.com/store/apps/details?id=host.exp.exponent&pli=1)
2. **Start the Expo server**
    ```sh
    expo start
    ```
3. **Scan the QR Code in Expo Go App**
    - Open **Expo Go** on your phone.
    - Scan the QR code displayed in your terminal.
    - The app will load on your physical Android device.

✔ **Works on both Windows & Mac!**  
❌ **No need for an emulator.**

---

### **✅ Option 2: Use an Android Emulator on Windows & Mac**

#### **Installation Steps:**

1. **Download & Install Android Studio**  
   📥 [**Android Studio Download**](https://developer.android.com/studio)

2. **Set Up an Android Emulator**

    - Open **Android Studio** → Go to **SDK Manager**.
    - Install the **latest SDK tools & emulator system images**.
    - Go to **AVD Manager** (Android Virtual Device).
    - Create a new **Pixel 4 / Pixel 6** emulator with **Android 12+**.

3. **Launch the Android Emulator**

    - Open Android Studio → **Tools** → **AVD Manager** → **Start Emulator**.
    - Keep it running.

4. **Run the React Native App in the Emulator**
    - Start Expo:
        ```sh
        expo start
        ```
    - Press **"a"** to launch the Android Emulator.

✔ **Works on Windows & Mac!**

---

## **📌 2️⃣ Setting Up an iOS Simulator (Mac Only)**

### **✅ Option 1: Use an Actual iPhone (Recommended)**

1. **Download the Expo Go App**  
   📲 [**Expo Go (iOS)**](https://apps.apple.com/us/app/expo-go/id982107779)
2. **Start the Expo server**
    ```sh
    expo start
    ```
3. **Scan the QR Code in Expo Go App**

✔ **Works instantly without Xcode!**

---

### **✅ Option 2: Use the iOS Simulator (Mac Only)**

1. **Download & Install Xcode**  
   📥 [**Xcode Download**](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
2. **Install Xcode Command Line Tools**
    ```sh
    sudo xcode-select --install
    ```
3. **Run the iOS Simulator**
    ```sh
    open -a Simulator
    ```
4. **Run the React Native App in iOS Simulator**
    ```sh
    expo start
    ```
    - Press **"i"** to launch the iOS Simulator.

✔ **Mac-only (Windows users cannot run iOS Simulator).**

---

### **🚀 Now You're Ready to Start Developing!**

# DrumsLed - React Native Mobile App

DrumsLed is a React Native mobile application that allows you to control LED lights on a drum set. The primary purpose of this app is to detect when a drum is struck and illuminate LEDs accordingly. The communication between the mobile app and the drum set is established via Bluetooth Low Energy (BLE). The drum set, equipped with ESP32 and piezo sensors, detects drum strikes, and the mobile app controls LED animations and colors.

## Embedded Application

The embedded application responsible for interfacing with the ESP32 and controlling the LED lights on the drum set can be found in a separate GitHub repository: [DrumsLed Embedded App](https://github.com/maxsans/DrumsLed-Embedded-App).

Please refer to the [DrumsLed Embedded App repository](https://github.com/maxsans/DrumsLed-Embedded-App) for details regarding the embedded system.

## Mobile Application Features

The DrumsLed mobile application consists of three main screens:

### 1. Main Configuration Screen

- On this screen, users can configure the current drum set's animation type, LED detection method, and LED colors for both the interior and exterior of each drum.
- The user can customize LED configurations based on their preferences.

### 2. Themes Screen

- The Themes screen allows users to create and save different themes. Themes store multiple LED configurations, making it easy to switch between different setups quickly.
- This feature simplifies the process of changing LED configurations, especially for different drumming scenes.

### 3. Configuration Screen

- The Configuration screen enables users to manage the communication between the mobile app and the drum set via Bluetooth Low Energy.
- Users can control and configure various aspects of the Bluetooth communication process.

## Data Format

Data between the mobile app and the drum set is exchanged in JSON format. Below is an example of the data structure:

```json
[
  {
    "name": "Caisse Claire",
    "params": [
      {
        "name": "Interieur",
        "colors": ["#FFFFFF", "#ff26e5"],
        "animation": 6
      },
      {
        "name": "Exterieur",
        "colors": ["#022a7a"],
        "animation": 6
      }
    ]
  },
  // Other drums and their configurations...
]
```

## LED Animations and Color Settings

| Animation           | Value | Max Colors |
|---------------------|-------|------------|
| Lumière             | 1     | 1          |
| Lent                | 2     | 1          |
| Normal              | 3     | 1          |
| Rapide              | 4     | 1          |
| Disco               | 5     | 10         |
| Rotation            | 6     | 4          |

At startup, the default LED color for all drums is white, and the default animation is "Lumière."


## LED Animations and Color Settings

![alt text](https://github.com/maxsans/DrumsLed-Mobile-App/blob/main/assets/Presentation/Accueil.png?raw=true)


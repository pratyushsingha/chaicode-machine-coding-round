# MasterJi Assignment

## Overview

This project implements three tasks based on provided Figma designs using React. The tasks include an OTP Form, Drag and Drop Course Cards, and a Data Table.

## Technologies Used

- React
- Tailwind CSS
- JSON Server (for building mock API data)
- React DnD (for drag-and-drop functionality)
- TanStack Table (for building tables)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/pratyushsingha/chaicode-machine-coding-round.git
    ```
2. Navigate to the project directory:
    ```sh
    cd masterji-assignment
    ```
3. Install dependencies:
    ```sh
    bun i
    ```
4. Start the JSON server:
    ```sh
    npx json-server db/data.json --port 3000
    ```
5. Start the React application:
    ```sh
    bun run dev
    ```

## Usage

Once the application is running, you can access the different tasks via the following routes:

- **OTP Form:** `/otp-form`
- **Course List:** `/course-list`
- **Batches:** `/batches`

The base URL `/` will redirect to the OTP Form at `/otp-form`.

## Routes

- **/otp-form:** Implements the OTP form with various states (Empty, Filling, Filled Success, Filled Error).
- **/course-list:** Implements drag-and-drop course cards with actions to move to the top, move to the bottom, and remove.
- **/batches:** Implements a paginated data table listing batches of a course with search functionality to filter the batches.

## Features

### OTP Form

- **Empty Form State:** A form to input a 4-digit OTP.
- **Filling State:** The state during the input of the OTP.
- **Filled State (Success):** The state when the OTP is correctly filled.
- **Filled State (Error):** The state when the OTP is incorrectly filled.

### Drag and Drop Course Cards

- Implements a list of vertical course cards using React DnD.

### Data Table

- Implements a paginated table using TanStack Table.
- Lists batches of a course and their statuses.
- Includes a search option to filter the batches.



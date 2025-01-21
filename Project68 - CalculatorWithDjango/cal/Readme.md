# Calculator Application

This is a Django-based web application that provides two types of calculators and a user management system. The application allows users to perform basic arithmetic operations, manage user accounts, and view calculation history.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication)
- User registration and login
- Calculation history
- Update and delete calculations
- Responsive design

## Types of Calculators

1. **GUI Calculator**: 
   - Provides a graphical user interface for performing basic arithmetic operations.
   - Suitable for users who prefer a visual interface for calculations.

2. **Input-based Calculator**: 
   - Takes input directly from the user for performing basic arithmetic operations.
   - Ideal for users who prefer a command-line style input for calculations.

## Technologies

- Django 5.1.3
- HTML/CSS
- Bootstrap
- SQLite


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/calculator-app.git
    cd calculator-app
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Apply the migrations:
    ```sh
    python manage.py migrate
    ```

5. Run the development server:
    ```sh
    python manage.py runserver
    ```

6. Open your browser and navigate to [http://127.0.0.1:8000/](http://_vscodecontentref_/5) to access the application.

## Usage

- Register a new user or log in with an existing account.
- Use the GUI calculator for basic arithmetic operations with a graphical interface.
- Use the input-based calculator for basic arithmetic operations with direct input.
- View, update, or delete calculation history.
- Manage user accounts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
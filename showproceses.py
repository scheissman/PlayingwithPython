import psutil
import tkinter as tk

def show_running_processes():
    result_text.delete(1.0, tk.END)  # Clear previous results
    result_text.insert(tk.END, "Running Processes:\n")
    for process in psutil.process_iter(['pid', 'name']):
        result_text.insert(tk.END, f"PID: {process.info['pid']}, Name: {process.info['name']}\n")

# Create main window
root = tk.Tk()
root.title("Running Processes")

# Create and configure text widget for displaying results
result_text = tk.Text(root, height=10, width=40)
result_text.pack(padx=10, pady=10)

# Create and configure button to show running processes
show_button = tk.Button(root, text="Show Processes", command=show_running_processes)
show_button.pack(pady=10)

# Run the Tkinter event loop
root.mainloop()


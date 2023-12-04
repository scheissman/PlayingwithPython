import os
import psutil
import tkinter as tk

def get_ram_usage():
    return psutil.virtual_memory().used / (1024 ** 2)  # Convert bytes to megabytes

def update_label():
    ram_usage = get_ram_usage()
    label.config(text=f"RAM Usage: {ram_usage:.2f} MB")
    root.after(1000, update_label)  # Refresh every 1000 milliseconds (1 second)

# Create the main window
root = tk.Tk()
root.title("RAM Usage Monitor")

# Create a label to display RAM usage
label = tk.Label(root, text="")
label.pack(padx=10, pady=10)

# Display the process ID
pid_label = tk.Label(root, text=f"Process ID: {os.getpid()}")
pid_label.pack(padx=10, pady=10)

# Start updating the label
update_label()

# Run the Tkinter event loop
root.mainloop()


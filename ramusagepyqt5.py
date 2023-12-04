import os
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout
from PyQt5.QtCore import QTimer
import psutil

class RAMMonitor(QWidget):
    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):
        self.setWindowTitle('RAM Usage Monitor')

        self.label_ram = QLabel(self)
        self.label_pid = QLabel(self)

        layout = QVBoxLayout()
        layout.addWidget(self.label_ram)
        layout.addWidget(self.label_pid)

        self.setLayout(layout)

        self.update_label()

        # Create a timer to refresh the label every second
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_label)
        self.timer.start(1000)

    def get_ram_usage(self):
        return psutil.virtual_memory().used / (1024 ** 2)  # Convert bytes to megabytes

    def update_label(self):
        ram_usage = self.get_ram_usage()
        self.label_ram.setText(f"RAM Usage: {ram_usage:.2f} MB")
        self.label_pid.setText(f"Process ID: {os.getpid()}")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ram_monitor = RAMMonitor()
    ram_monitor.show()
    sys.exit(app.exec_())


from device import Device

class Motor(Device):
    def start(self):
        if not self._is_on:
            self._is_on=True
            print("Motor has started")
            
    def stop(self):
        if self._is_on:
            self._is_on=False
            print("Motor has stopped")
            
            
from device import Device

class Light(Device):
    def start(self):
        if not self._is_on:
            self._is_on=True
            print("Light switched on")
            
    def stop(self):
        if self._is_on:
            self._is_on=False
            print("Light switched off")

class Device:
    def __init__(self):
        self._is_on=False
        
    def start(self):
        raise NotImplementedError("Start method must be implemented")
    
    def stop(self):
        raise NotImplementedError("Stop method must be implemented")
    
    def is_on(self):
        return self._is_on
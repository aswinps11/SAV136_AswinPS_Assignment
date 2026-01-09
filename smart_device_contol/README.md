# Smart Device Control System

**Overview**  
This project is a simple smart device control system implemented in Python using object-oriented programming. The system shows how devices like Motor and Light can be turned on and off, keep track of their own internal state, and be controlled through a generic Controller class. The design allows adding new devices easily without changing the existing controller logic.

**Environment Setup**  
- To run this project, you need Python 3 installed on your computer. 
- No extra libraries or dependencies are required. 
- Clone or download the project folder to your local machine.

**Running and Testing the Code**  
1. Open a terminal and navigate to the project folder.  

2. Run the command:
    python main.py

3. You should see the following output:
    Motor has started
    Motor has stopped
    Light switched on
    Light switched off

4. This confirms that the devices and controller are working correctly. You can also check the device status using the is_on() method to verify that each device’s internal state changes as expected.

**Assumptions and Notes**  
- Each device keeps track of its on/off state internally. External code cannot change this state directly.  
- External code can check whether a device is on or off using the `is_on()` method.  
- New devices can be added by creating a class that inherits from `Device` and implements the `start` and `stop` methods.  
- This system handles devices one at a time; it does not support running multiple devices concurrently.  
- The project demonstrates basic object-oriented principles like encapsulation, inheritance, and polymorphism in a simple and maintainable way.





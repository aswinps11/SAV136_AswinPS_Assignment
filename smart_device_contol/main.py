from motor import Motor
from light import Light
from controller import Controller

motor=Motor()
light=Light()

controller=Controller()
controller.operate_device(motor)
controller.operate_device(light)

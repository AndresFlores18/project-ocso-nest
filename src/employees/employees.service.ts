import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid'; 
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor (
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee;
  }

  findAll() {
    this.employeeRepository.find()
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOne({
      employeeId: id
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    if (!employeeToUpdate) throw new NotFoundException();
    await this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate;
  } 

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return {
      message: "Employee deleted"

    }
  }
} 

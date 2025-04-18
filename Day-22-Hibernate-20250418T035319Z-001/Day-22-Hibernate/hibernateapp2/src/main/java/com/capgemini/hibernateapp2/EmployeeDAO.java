package com.capgemini.hibernateapp2;

import java.util.List;

public interface EmployeeDAO {
	void save(Employee employee);

	Employee get(int id);

	List<Employee> getAll();

	void update(Employee employee);

	void delete(int id);
}

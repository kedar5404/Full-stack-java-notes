package com.capgemini.hibernateapp2;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class App {
	public static void main(String[] args) {
		// Build SessionFactory from hibernate.cfg.xml
		SessionFactory factory = new Configuration().configure().buildSessionFactory();

		EmployeeDAO dao = new EmployeeDAOImpl(factory);

		// 1. Create
		Employee emp = new Employee("Manish", "Jain", "manishjain@gmail.com");
		dao.save(emp);
		System.out.println("Saved: " + emp);

		// 2. Read
		Employee fetched = dao.get(emp.getId());
		System.out.println("Fetched: " + fetched);

		// 3. Update
		fetched.setLastName("Agrawal");
		dao.update(fetched);
		System.out.println("Updated: " + dao.get(fetched.getId()));

		// 4. List all
		List<Employee> all = dao.getAll();
		System.out.println("All Employees:");
		all.forEach(System.out::println);

		// 5. Delete
		dao.delete(fetched.getId());
		System.out.println("Deleted employee ID: " + fetched.getId());
		
		factory.close();
	}
}

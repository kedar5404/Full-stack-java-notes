package com.capgemini.hibernateapp2;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.List;

public class EmployeeDAOImpl implements EmployeeDAO {
	private SessionFactory factory;

	public EmployeeDAOImpl(SessionFactory factory) {
		this.factory = factory;
	}

	@Override
	public void save(Employee employee) {
		try (Session session = factory.openSession()) {
			session.beginTransaction();
			session.persist(employee);
			session.getTransaction().commit();
		}
	}

	@Override
	public Employee get(int id) {
		try (Session session = factory.openSession()) {
			return session.get(Employee.class, id);
		}
	}

	@Override
	public List<Employee> getAll() {
		try (Session session = factory.openSession()) {
			return session.createQuery("from Employee", Employee.class).list();
		}
	}

	@Override
	public void update(Employee employee) {
		try (Session session = factory.openSession()) {
			session.beginTransaction();
			session.merge(employee);
			session.getTransaction().commit();
		}
	}

	@Override
	public void delete(int id) {
		try (Session session = factory.openSession()) {
			session.beginTransaction();
			Employee emp = session.get(Employee.class, id);
			if (emp != null)
				session.remove(emp);
			session.getTransaction().commit();
		}
	}
}

package com.capegemini.hibernateapp1;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class App {
	public static void main(String[] args) {
		// Build SessionFactory from hibernate.cfg.xml
		SessionFactory factory = new Configuration().configure().buildSessionFactory();

		// Insert one row
		Session session = factory.openSession();
		session.beginTransaction();
		User user = new User("Manish Jain");
		session.persist(user);
		session.getTransaction().commit();
		session.close();
		System.out.println("Inserted user with ID: " + user.getId());

		// Fetch it back
		session = factory.openSession();
		User fetched = session.get(User.class, user.getId());
		session.close();

		System.out.println("Fetched user: " + fetched.getName());

		factory.close();
	}
}

SELECT * FROM sample.employees;
use sample;
select UPPER(emp_name) from employees;
select LOWER(dept_name) from departments;
select length(emp_name) from employees;
select trim(emp_name) from employees;
select SUBSTRING(emp_name, 1, 5) from employees; 
select concat(emp_name,designation) as designation from employees;
SELECT ROUND(salary, -3) AS Rounded_Salary FROM employees;
select CEIL(salary) from employees;
select floor(salary) from employees; 
select ABS(75000-salary) from employees;
select POWER(salary, 2) from employees;  
select sqrt(salary) from employees;
select NOW() from employees;
SELECT CURRENT_TIMESTAMP AS Current_DateTime;
SELECT CAST(doj AS DATE) AS Join_Date
FROM employees;

select abs(DATEDIFF(doj, currdate())) from employees; 
select DATE_ADD(doj, INTERVAL 3 month) from employees; 

SELECT employee_name, DATEDIFF(CURRENT_DATE, doj) AS Days_Worked
FROM employees;

select emp_name from employees order by dept_id asc, salary desc ; 

select * from departments order by dept_name;

select * from employees order by designation,emp_name;

SELECT dept_id, count(*) AS Total_Salary FROM employees GROUP BY dept_id;
SELECT dept_id, avg(salary) AS Total_Salary FROM employees GROUP BY dept_id;
SELECT dept_id, avg(salary) AS Total_Salary FROM employees GROUP BY dept_id having Total_Salary>200000;
SELECT dept_id FROM employees GROUP BY dept_id having count(*)>2;
SELECT min(salary),max(salary) FROM employees GROUP BY dept_id ;
SELECT dept_id FROM employees GROUP BY dept_id having avg(salary)>75000;

SELECT dept_id, COUNT(DISTINCT designation) AS Num_Designations
FROM employees
GROUP BY dept_id;

select designation from employees group by designation having count(*)>2;

select dept_id, count(*) from employees where doj>'2022-01-01' group by dept_id;

select emp_name,dept_name,salary FROM employees e 
INNER JOIN departments d 
ON e.dept_id = d.dept_id; 

select emp_name, dept_name from employees e left join departments d on e.dept_id = d.dept_id; 
select emp_name, dept_name from employees e right join departments d on e.dept_id = d.dept_id; 

SELECT *
FROM employees
WHERE dept_id IS NULL;

SELECT d.dept_id, d.dept_name
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
WHERE e.dept_id IS NULL;

SELECT e.emp_name AS Employee, m.emp_name AS Manager 
FROM employees e 
INNER JOIN employees m ON e.manager_id = m.emp_id; 

SELECT e.emp_name, d.dept_name 
FROM employees e 
cross join departments d;

SELECT e.emp_name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE d.dept_name IN ('IT', 'HR');






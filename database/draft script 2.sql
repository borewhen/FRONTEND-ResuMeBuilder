CREATE TABLE resumebuilder.user (
    user_id SERIAL PRIMARY KEY,            -- Unique identifier for each user
    role VARCHAR(10) NOT NULL CHECK (role IN ('employer', 'employee', 'admin')), 
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,  -- Storing hashed passwords
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	profile_picture_url VARCHAR(200),
    summary TEXT,
	date_of_creation DATE NOT NULL
);


CREATE TABLE resumebuilder.experience (
    experience_id SERIAL PRIMARY KEY,           
	user_id INT NOT NULL,
	company_name VARCHAR(100) NOT NULL,
	job_title VARCHAR(50) NOT NULL,
	location VARCHAR(50),
	start_date DATE NOT NULL,
	end_date DATE,
	description TEXT,
	CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES resumebuilder.user(user_id)
        ON DELETE CASCADE
);

CREATE TABLE resumebuilder.company (
    company_id SERIAL PRIMARY KEY,           
	company_name VARCHAR(100) NOT NULL UNIQUE,
	industry VARCHAR(50),
	address VARCHAR(150),
	website_url VARCHAR(200),
	logo_url VARCHAR(200),
	description TEXT
);

-- Insert dummy data for the company table
INSERT INTO resumebuilder.company (company_name, industry, address, website_url, logo_url, description)
VALUES 
    ('TechNova', 'Technology', '123 Innovation Drive, San Francisco, CA', NULL, NULL, 'A leading tech company focused on AI and machine learning solutions.'),
    ('GreenSprout', 'Agriculture', '456 Harvest Lane, Des Moines, IA', NULL, NULL, 'A sustainable farming company specializing in organic produce and eco-friendly practices.'),
    ('FinEdge', 'Finance', '789 Wall Street, New York, NY', NULL, NULL, 'A financial services company providing investment and wealth management solutions.'),
    ('MediCare Plus', 'Healthcare', '321 Wellness Avenue, Houston, TX', NULL, NULL, 'A healthcare company offering advanced medical services and patient care.'),
    ('StyleSphere', 'Retail', '654 Fashion Boulevard, Los Angeles, CA', NULL, NULL, 'A fashion retail company known for trendy apparel and accessories.');


CREATE TABLE resumebuilder.jobs (
    job_id SERIAL PRIMARY KEY,           
	company_id INT NOT NULL,
	job_title VARCHAR(50) NOT NULL,
	experience VARCHAR(150),
	address VARCHAR(150),
	date_of_listing DATE NOT NULL,
	description TEXT,
	CONSTRAINT fk_company
        FOREIGN KEY (company_id)
        REFERENCES resumebuilder.company(company_id)
        ON DELETE CASCADE
);


CREATE TABLE resumebuilder.jobapplication (
    job_application_id SERIAL PRIMARY KEY,           
	job_id INT NOT NULL,
	user_id INT NOT NULL,
	date_of_application DATE NOT NULL,
	CONSTRAINT fk_job
        FOREIGN KEY (job_id)
        REFERENCES resumebuilder.jobs(job_id)
        ON DELETE CASCADE,
	CONSTRAINT fk_user
		FOREIGN KEY (user_id)
		REFERENCES resumebuilder.user(user_id)
		ON DELETE CASCADE
);

CREATE TABLE resumebuilder.companyadmin (
    admin_id SERIAL PRIMARY KEY,           
	user_id INT NOT NULL,
	company_id INT NOT NULL,
	CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES resumebuilder.user(user_id)
        ON DELETE CASCADE,
	CONSTRAINT fk_company
		FOREIGN KEY (company_id)
		REFERENCES resumebuilder.company(company_id)
		ON DELETE CASCADE
);

INSERT INTO resumebuilder.user (role, username, password, email, first_name, last_name, profile_picture_url, summary, date_of_creation)
VALUES 
    ('employer', 'employer1', 'employer1', 'alicesmith@gmail.com', 'Alice', 'Smith', NULL, 'Founder of a startup focused on AI solutions.', CURRENT_DATE),
    ('employer', 'employer2', 'employer2', 'bobjohnson@gmail.com', 'Bob', 'Johnson', NULL, 'CEO of a growing e-commerce company.', CURRENT_DATE),
    ('employer', 'employer3', 'employer3', 'charliewilliams@gmail.com', 'Charlie', 'Williams', NULL, 'Manager at a multinational IT firm.', CURRENT_DATE);

INSERT INTO resumebuilder.user (role, username, password, email, first_name, last_name, profile_picture_url, summary, date_of_creation)
VALUES 
    ('employee', 'employee1', 'employee1', 'daisybrown@gmail.com', 'Daisy', 'Brown', NULL, 'Experienced software developer specializing in Python and Flask.', CURRENT_DATE),
    ('employee', 'employee2', 'employee2', 'ethantaylor@gmail.com', 'Ethan', 'Taylor', NULL, 'Marketing specialist with a knack for social media strategy.', CURRENT_DATE),
    ('employee', 'employee3', 'employee3', 'fionamartinez@gmail.com', 'Fiona', 'Martinez', NULL, 'Data analyst skilled in SQL and data visualization tools.', CURRENT_DATE);

INSERT INTO resumebuilder.user (role, username, password, email, first_name, last_name, profile_picture_url, summary, date_of_creation)
VALUES 
    ('admin', 'admin1', 'admin1', 'gracedavis@gmail.com', 'Grace', 'Davis', NULL, NULL, CURRENT_DATE),
    ('admin', 'admin2', 'admin2', 'henrymoore@gmail.com', 'Henry', 'Moore', NULL, NULL, CURRENT_DATE),
    ('admin', 'admin3', 'admin3', 'ivylee@gmail.com', 'Ivy', 'Lee', NULL, NULL, CURRENT_DATE);

INSERT INTO resumebuilder.companyadmin (user_id, company_id)
VALUES 
    (1, 1),
	(2, 2),
	(3, 3);

INSERT INTO resumebuilder.jobs (company_id, job_title, experience, address, date_of_listing, description)
VALUES 
    (1, 'Software Engineer', '2-5 years of experience in software development', '123 Innovation Drive, San Francisco, CA', CURRENT_DATE, 'Develop and maintain scalable software applications for AI solutions.'),
    (1, 'Data Scientist', '3+ years of experience in data analysis and machine learning', '123 Innovation Drive, San Francisco, CA', CURRENT_DATE, 'Analyze large datasets to drive decision-making and build predictive models.'),
    (2, 'Farm Manager', '5+ years of experience in sustainable farming', '456 Harvest Lane, Des Moines, IA', CURRENT_DATE, 'Oversee daily farm operations and implement eco-friendly farming practices.'),
    (3, 'Financial Analyst', '1-3 years of experience in financial analysis', '789 Wall Street, New York, NY', CURRENT_DATE, 'Perform financial analysis and reporting to support investment decisions.'),
    (3, 'Portfolio Manager', '5+ years of experience managing investment portfolios', '789 Wall Street, New York, NY', CURRENT_DATE, 'Manage diverse portfolios and design strategies to maximize returns.'),
    (4, 'Nurse Practitioner', '2-4 years of experience in patient care', '321 Wellness Avenue, Houston, TX', CURRENT_DATE, 'Provide primary healthcare services to patients in a hospital setting.'),
    (4, 'Medical Researcher', 'PhD in a relevant field with experience in clinical trials', '321 Wellness Avenue, Houston, TX', CURRENT_DATE, 'Conduct advanced medical research and publish findings in academic journals.'),
    (5, 'Retail Manager', '3+ years of experience in retail management', '654 Fashion Boulevard, Los Angeles, CA', CURRENT_DATE, 'Manage retail store operations and drive customer satisfaction.'),
    (5, 'Fashion Designer', '1-3 years of experience in fashion design', '654 Fashion Boulevard, Los Angeles, CA', CURRENT_DATE, 'Create trendy and innovative designs for seasonal collections.');

-- Insert dummy data into the experience table
INSERT INTO resumebuilder.experience (user_id, company_name, job_title, location, start_date, end_date, description)
VALUES 
    (4, 'TechNova', 'Junior Software Developer', 'San Francisco, CA', '2020-06-01', '2022-08-31', 'Worked on developing web applications and improving software efficiency.'),
    (4, 'CodeHub Solutions', 'Software Engineer', 'San Jose, CA', '2022-09-01', NULL, 'Currently leading the development of backend services for scalable applications.'),
    (5, 'Bright Ideas Marketing', 'Marketing Intern', 'New York, NY', '2019-03-01', '2019-08-31', 'Assisted in executing digital marketing campaigns and analyzing campaign performance.'),
    (5, 'AdSphere Media', 'Marketing Specialist', 'Brooklyn, NY', '2019-09-01', '2021-12-31', 'Designed and implemented successful social media marketing strategies.'),
    (6, 'Insight Analytics', 'Data Analyst', 'Seattle, WA', '2018-01-15', '2021-04-30', 'Analyzed large datasets to uncover business insights and trends.'),
    (6, 'Visionary Data Inc.', 'Senior Data Analyst', 'Portland, OR', '2021-05-01', NULL, 'Currently responsible for leading the data analytics team and optimizing reporting workflows.');

INSERT INTO resumebuilder.jobapplication (job_id, user_id, date_of_application)
VALUES
(2, 5, CURRENT_DATE);

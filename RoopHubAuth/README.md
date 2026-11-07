# RoopHub Customer Authentication (Java + Oracle)

## Requirements
- JDK 17+
- Maven 3.9+
- Apache Tomcat 10.1+
- Oracle Database 19c+ (or compatible)
- Oracle JDBC connection details

## 1. Create database tables
For a new database, run `database/schema.sql` in SQL Developer as the database schema user that your Java app will use. If `ROOPHUB_CUSTOMERS` already exists, run `database/migration_otp.sql` to add the temporary signup/OTP table.

## 2. Configure database environment variables
Set these before starting Tomcat:
- `ROOPHUB_DB_URL` e.g. `jdbc:oracle:thin:@//localhost:1521/FREEPDB1`
- `ROOPHUB_DB_USER` e.g. `roophub_app`
- `ROOPHUB_DB_PASSWORD` your database password

Do not commit real passwords to source control. Grant this DB user only the permissions it needs.

## 3. Configure signup email OTP
The signup OTP is sent over authenticated SMTP and expires after 10 minutes. Set these environment variables before starting Tomcat:
- `ROOPHUB_SMTP_HOST` e.g. your email provider's SMTP host
- `ROOPHUB_SMTP_PORT` e.g. `587` for STARTTLS
- `ROOPHUB_SMTP_USER` SMTP account username
- `ROOPHUB_SMTP_PASSWORD` SMTP account password or app password
- `ROOPHUB_SMTP_FROM` verified sender email address
- `ROOPHUB_OTP_SECRET` a private random secret with at least 32 characters, used to hash OTPs before saving them

Keep these secrets out of source control. Users have five verification attempts; expired or exhausted pending signups must be started again. A customer record is created only after successful OTP verification.

## 4. Build
From this folder:
```bash
mvn clean package
```
Deploy `target/roophub-auth.war` to Tomcat 10.1's `webapps` folder and start Tomcat.

## 5. Open
`http://localhost:8080/roophub-auth/auth`

Use `https://` in production. Configure Tomcat/proxy so secure cookies are enabled in production.

## Security notes
- Passwords are stored as PBKDF2 hashes, never as plaintext.
- JDBC uses PreparedStatement.
- Forms include a session CSRF token.
- Session ID is changed after successful login.
- Dashboard requires a logged-in session.
- This starter does not include password reset, account lockout, CAPTCHA, or full production monitoring. Add these before public production deployment.
- Use HTTPS, secure database credentials, least-privilege DB access, backups, and rate limiting in production.

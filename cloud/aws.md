**[<< Go To Home](/interviewprep)**

<div align="center">
    <h1><span style="color:#f39c12;">AWS</span></h1>
</div>

# Table of Contents

1. [NACLs vs. Subnets](#nacls-vs-subnets)
1. [EC2: Volumes and Block Storage](#ec2-volumes-and-block-storage)
1. [Securing Tier 1 and Tier 3 Applications](#securing-tier-1-and-tier-3-applications)
1. [Securing Data: Encryption and KMS](#securing-data-encryption-and-kms)
1. [Server and Client-Side Encryption](#server-and-client-side-encryption)
1. [Auto Scaling: Types and Interview Points](#auto-scaling-types-and-interview-points)
1. [Application Monitoring with CloudWatch](#application-monitoring-with-cloudwatch)
1. [Connection Draining](#connection-draining)
1. [Types of Databases in RDS](#types-of-databases-in-rds)
1. [SQL vs. NoSQL Databases](#sql-vs-nosql-databases)

---

## NACLs vs. Subnets

### Network ACLs (NACLs)

- Act as a firewall at the **subnet level**.
- Control **inbound and outbound** traffic.
- Operate with **stateless rules** (explicit allow/deny rules for both directions).

### Subnets

- Logical division within a **VPC**.
- Contain resources like EC2 instances.
- Traffic control depends on **routing tables** and **NACLs**.

---

## EC2: Volumes and Block Storage

### Amazon EBS (Elastic Block Store)

- **GP2 (General Purpose SSD):** Balanced price/performance.
- **IOPS (Provisioned SSD):** High-performance workloads.
- **Throughput Optimized HDD:** Cost-effective for large datasets.
- **Cold HDD:** Low-cost for infrequent access.

---

## Securing Tier 1 and Tier 3 Applications

### Tier 1 (Public-Facing Web Server)

- Deploy in a **public subnet**.
- Use **Security Groups** to allow HTTP/HTTPS traffic.
- Implement **IAM roles** for least privilege access.

### Tier 3 (Database Server)

- Deploy in a **private subnet**.
- Allow access only from the application server.
- Use **Secrets Manager** to store credentials securely.

---

## Securing Data: Encryption and KMS

- **AWS KMS (Key Management Service)** for key management.
- **S3 Encryption:** Server-side and client-side.
- **EBS Encryption:** Encrypts data at rest.
- **RDS Encryption:** Encrypts data in databases.

---

## Server and Client-Side Encryption

### Server-Side Encryption

- AWS encrypts data **before storing it**.
- Uses **AWS KMS, SSE-S3, SSE-C**.

### Client-Side Encryption

- Data is **encrypted before uploading**.
- The client manages encryption keys.

---

## Auto Scaling: Types and Interview Points

### Types of Auto Scaling

1. **Dynamic Scaling:** Adjusts resources based on demand.
2. **Scheduled Scaling:** Increases/decreases capacity at specific times.
3. **Predictive Scaling:** Uses ML models to anticipate demand.

### Key Interview Points

- **Average CPU Utilization:** Scale based on CPU load.
- **Custom Metrics:** Define specific metrics for scaling.

---

## Application Monitoring with CloudWatch

- **Metrics:** Monitor CPU, Memory, and Network usage.
- **Alarms:** Trigger actions based on thresholds.
- **Logs:** Store and analyze application logs.
- **Events:** Automate responses to changes.

---

## Connection Draining

- Ensures in-flight requests are completed **before** terminating an EC2 instance.
- Used with **Elastic Load Balancers (ELB)**.
- Prevents sudden failures during scale-in.

---

## Types of Databases in RDS

- **Relational Databases (SQL):** MySQL, PostgreSQL, SQL Server, Aurora.
- **Non-Relational Databases (NoSQL):** DynamoDB, MongoDB.

---

## SQL vs. NoSQL Databases

### SQL (Structured Query Language)

- **Tables, rows, columns**.
- Best for structured data.
- ACID-compliant (Atomicity, Consistency, Isolation, Durability).

### NoSQL

- **Key-Value, Document, Column-Family, Graph models**.
- Best for semi-structured or unstructured data.
- Highly scalable and flexible.

---

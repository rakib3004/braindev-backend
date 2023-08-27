# VMS-system

## VMS-backend

BUET CSE FEST 2023 Hackathon DevOps Segment Team Brain Dev

# Stage 1

A UI app where users can login and register account. Implement automated testing and deployment pipeline

# Stage 2

Registration for vaccine. Where users can register for vaccine. Introduce real time infrastructure monitoring

# Stage 3

A certification system for users who are vaccinated. Automated infrastructure scaling is implemented

## Here is our solutions:

### Stage 1: Progress

Frontend:A simple frontend UI created with react
Testing: Introduced Unit testing and integration testing with vitest and cypress
Backend: A backend app created with node.js
CI/CD: Frontend CI/CD pipeline created using github actions
Git branching: best practices were used to maintain branching
strategy for seamless collaboration and automates testing.

# Git Branching Strategy

Main: Main production branch

Develop: Development branch

QA: Branch for quality assurance test

Stage: Final requirements check before merging to main

Feature: Feature branch for developing multiple features simultaneously

### Stage 2: progress

Infrastructure monitoring : Introduced Real-time infrastructure monitoring to
detect any changes or potential event

Infrastructure automation: Introduced infrastructure
automation for more flexibility during deployment

### Stage 3: progress

Implement certificate: UI was updated to show users certificate of vaccination
Infrastructure scaling: Infrastructure was configured to scale automatically during heavy load

## Auto-Scaling Policy

# ScaleUp Policy

CloudWatch Metric :

  CpuUtilization

    Rule :

      CpuUtilization >= 75%

    Add Instance = 1

# ScaleDown Policy

CloudWatch Metric :

  CpuUtilization

    Rule :

      CpuUtilization <= 25%

    Remove Instance = 1
# Final Architure of the system

![Final Architecture](https://github.com/rakib3004/VMS-backend/blob/main/Architecture.png)

These are the links for individual repositories

VMS-frontend: https://github.com/KaziMuktadirAhmed/VMS-frontend.git 

VMS-backend: https://github.com/rakib3004/VMS-backend.git

VMS-pipeline-backend: https://github.com/Mahtabhj/Sample-app-linux

forntend link: http://www.braindev.com.s3-website.eu-north-1.amazonaws.com

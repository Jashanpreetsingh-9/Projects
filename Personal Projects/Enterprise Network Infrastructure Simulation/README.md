# Enterprise Network Infrastructure Simulation

## Overview

This project simulates a multi-site enterprise network environment using Ubuntu Server virtual machines. 

The topology represents a Head Office and a remote Store connected over a routed WAN link. The environment was designed to practice structured network configuration, routing implementation, and operational troubleshooting similar to enterprise IT support environments.

---

## Objectives

- Configure static IP addressing using Netplan
- Implement Layer 3 routing between subnets
- Enable IP forwarding on Linux routers
- Deploy DHCP services for dynamic client configuration
- Implement dynamic routing (OSPF using BIRD)
- Simulate and troubleshoot common network outages

---

## Network Topology

client1 — LAN1 — r1 — WAN — r2 — LAN2 — client2

- r1: Head Office Router
- r2: Store Router
- client1: Head Office workstation
- client2: Store workstation

---

## IP Addressing Plan

### WAN Network  
`10.0.0.0/30`

| Device | Interface | IP Address |
|--------|-----------|------------|
| r1     | enp0s3    | 10.0.0.1/30 |
| r2     | enp0s3    | 10.0.0.2/30 |

---

### Head Office LAN (LAN1)  
`192.168.10.0/24`

| Device   | Interface | IP Address       |
|----------|-----------|------------------|
| r1       | enp0s8    | 192.168.10.1/24  |
| client1  | enp0s3    | 192.168.10.10/24 |

---

### Store LAN (LAN2)  
`192.168.20.0/24`

| Device   | Interface | IP Address       |
|----------|-----------|------------------|
| r2       | enp0s8    | 192.168.20.1/24  |
| client2  | enp0s3    | 192.168.20.10/24 |

---

## Technologies Used

- Ubuntu Server 24.04 LTS
- VirtualBox
- Netplan (network configuration)
- Kea DHCP
- BIRD (OSPF dynamic routing)
- Linux networking tools (`ip`, `traceroute`, `systemctl`)

---

## Verification Commands

Common diagnostic commands used during implementation:

```bash
ip addr
ip route
traceroute <destination>
systemctl status <service>
journalctl -u <service>
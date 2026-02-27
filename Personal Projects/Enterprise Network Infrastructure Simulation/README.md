# Enterprise Multi-Site Network Infrastructure Simulation

## Overview

This project simulates a two-site enterprise network using Ubuntu Server virtual machines in VirtualBox.

The environment models:

- A Head Office (LAN1)
- A Remote Store (LAN2)
- A routed WAN link between sites
- Dynamic routing using OSPF (BIRD 1.6)
- Distributed DHCP services using Kea DHCPv4
- WAN failure simulation and automatic reconvergence

Static routing was initially implemented for baseline connectivity and later removed after successful OSPF deployment.

---

## Logical Topology

```
Client1 (LAN1)
    |
    | 192.168.10.0/24
    |
   r1
    |
    | 10.0.0.0/30 (WAN - OSPF)
    |
   r2
    |
    | 192.168.20.0/24
    |
Client2 (LAN2)
```

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

| Device   | Interface | Addressing |
|----------|-----------|------------|
| r1       | enp0s8    | 192.168.10.1/24 |
| client1  | enp0s3    | DHCP (192.168.10.50–100 pool) |

---

### Remote Store LAN (LAN2)
`192.168.20.0/24`

| Device   | Interface | Addressing |
|----------|-----------|------------|
| r2       | enp0s8    | 192.168.20.1/24 |
| client2  | enp0s3    | DHCP (192.168.20.50–100 pool) |

---

## Technologies Used

- Ubuntu Server 24.04 LTS
- VirtualBox
- BIRD 1.6 (OSPFv2)
- Kea DHCPv4
- Netplan
- Linux networking tools:
  - ip
  - systemctl
  - journalctl
  - birdc

---

## Dynamic Routing Implementation (OSPF)

Dynamic routing was implemented using BIRD 1.6 with OSPFv2.

### Objectives

- Establish OSPF adjacency between r1 and r2
- Exchange LSAs
- Dynamically learn remote LAN routes
- Remove static routes
- Ensure automatic reconvergence during failure

---

### OSPF Verification

Check neighbor state:

```bash
sudo birdc show ospf neighbors
```

Expected:
- State: FULL
- Adjacency stable

Check learned routes:

```bash
sudo birdc show route
```

On r1:
- 192.168.20.0/24 via 10.0.0.2

On r2:
- 192.168.10.0/24 via 10.0.0.1

This confirms successful dynamic route exchange.

---

## DHCP Implementation (Kea)

Distributed DHCP services were deployed independently on each router.

---

### LAN1 (r1)

- Subnet: 192.168.10.0/24
- Pool: 192.168.10.50 – 192.168.10.100
- Default Gateway: 192.168.10.1
- DNS Server: 8.8.8.8

Verify leases:

```bash
cat /var/lib/kea/kea-leases4.csv
```

Client1 receives dynamic address (example: 192.168.10.50).

---

### LAN2 (r2)

- Subnet: 192.168.20.0/24
- Pool: 192.168.20.50 – 192.168.20.100
- Default Gateway: 192.168.20.1
- DNS Server: 8.8.8.8

Client2 receives dynamic address from r2.

---

## End-to-End Validation

### Control Plane Validation

- OSPF adjacency FULL
- Dynamic route exchange confirmed
- Static routes removed

### Data Plane Validation

From client1:

```bash
ping 192.168.20.1
ping 192.168.20.50
```

From client2:

```bash
ping 192.168.10.1
ping 192.168.10.50
```

Result:
- Successful bidirectional communication
- Correct default gateway assignment via DHCP
- Functional inter-site routing

---

## WAN Failure Simulation & OSPF Reconvergence

To validate resiliency, WAN failure was simulated.

### Step 1 — Bring Down WAN Interface

On r1:

```bash
sudo ip link set enp0s3 down
```

Observed:
- OSPF adjacency dropped
- Remote routes withdrawn
- Inter-site connectivity lost

---

### Step 2 — Restore WAN Interface

```bash
sudo ip link set enp0s3 up
```

Observed:
- OSPF adjacency re-established (FULL state)
- Routes dynamically reinstalled
- Connectivity restored automatically

---

## Project Validation Summary

- Multi-site routing operational
- OSPF adjacency stable
- Distributed DHCP functional
- Static routing removed
- End-to-end connectivity verified
- WAN failure simulation successful
- Automatic reconvergence confirmed

---

## Engineering Reflection

This project demonstrates:

- Control plane vs data plane separation
- Dynamic route propagation using OSPF
- Independent DHCP domains per site
- Fault tolerance via automatic reconvergence
- Scalable multi-site architecture design

---

## Future Enhancements

- Add third router (multi-site expansion)
- Implement firewall segmentation
- Introduce VLAN separation
- Configure multi-area OSPF
- Measure and document convergence timing analytically

---

## Current Status

Network fully operational  
Dynamic routing verified  
Failure recovery tested  
Enterprise multi-site simulation complete  
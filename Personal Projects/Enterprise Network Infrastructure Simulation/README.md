# Enterprise Multi-Site Network Infrastructure Simulation

## Overview

This project simulates a two-site enterprise network environment using Ubuntu Server virtual machines.

The architecture models a Head Office and a Remote Store connected via a routed WAN link. The environment demonstrates enterprise-level network design, dynamic routing implementation, and distributed DHCP services.

Static routing was initially implemented for baseline connectivity and later replaced with dynamic OSPF routing to simulate real-world enterprise network behavior.

---

## Architecture Overview

The simulated enterprise network consists of:

- Head Office LAN (LAN1)
- Remote Store LAN (LAN2)
- Dedicated WAN link between routers
- Dynamic routing using OSPF (BIRD 1.6)
- Distributed DHCP services using Kea

All inter-site communication is handled dynamically via OSPF.

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
|--------|----------|------------|
| r1     | enp0s3   | 10.0.0.1/30 |
| r2     | enp0s3   | 10.0.0.2/30 |

---

### Head Office LAN (LAN1)  
`192.168.10.0/24`

| Device   | Interface | Addressing |
|----------|-----------|------------|
| r1       | enp0s8    | 192.168.10.1/24 |
| client1  | enp0s3    | DHCP (192.168.10.50–100 pool) |

---

### Store LAN (LAN2)  
`192.168.20.0/24`

| Device   | Interface | Addressing |
|----------|-----------|------------|
| r2       | enp0s8    | 192.168.20.1/24 |
| client2  | enp0s3    | DHCP (192.168.20.50–100 pool) |

---

## Routing Implementation (OSPF)

Dynamic routing was implemented using **BIRD 1.6 (OSPFv2)**.

### Implementation Steps

- Established OSPF adjacency between r1 and r2
- Verified FULL neighbor state
- Validated route propagation using:
  - `birdc show ospf neighbors`
  - `birdc show ospf state`
  - `birdc show route`
- Removed static routes after successful OSPF convergence

### Result

- r1 dynamically learns `192.168.20.0/24`
- r2 dynamically learns `192.168.10.0/24`
- Bidirectional inter-site connectivity confirmed
- All routing operates dynamically (no static routes)

---

## DHCP Implementation (Kea)

Distributed DHCP services were deployed using **Kea DHCPv4** on both routers.

### LAN1 (r1)

- Subnet: `192.168.10.0/24`
- Pool: `192.168.10.50 – 192.168.10.100`
- Default Gateway: `192.168.10.1`
- DNS Server: `8.8.8.8`
- Lease persistence enabled

### LAN2 (r2)

- Subnet: `192.168.20.0/24`
- Pool: `192.168.20.50 – 192.168.20.100`
- Default Gateway: `192.168.20.1`
- DNS Server: `8.8.8.8`
- Lease persistence enabled

### Lease Validation

Active leases verified via:

```
/var/lib/kea/kea-leases4.csv
```

Confirmed dynamic IP allocation and renewal behavior for both clients.

---

## Validation & Testing

The following validation procedures were performed:

- Verified OSPF FULL adjacency between routers
- Confirmed dynamic route learning on both routers
- Removed all static routes
- Validated bidirectional client connectivity
- Confirmed DHCP lease allocation
- Verified default gateway distribution via DHCP
- Confirmed end-to-end inter-site communication

All routing and addressing operate dynamically.

---

## Technologies Used

- Ubuntu Server 24.04 LTS
- VirtualBox
- BIRD 1.6 (OSPFv2)
- Kea DHCPv4
- Netplan (network configuration)
- Linux networking tools:
  - `ip`
  - `ss`
  - `journalctl`
  - `birdc`

---

## Project Status

✔ Multi-site dynamic routing operational  
✔ Distributed DHCP fully functional  
✔ Static routing fully removed  
✔ End-to-end validation completed  

Planned future enhancements:

- Incident simulation (OSPF failure scenarios)
- WAN link failure testing
- Network diagram visualization
- Firewall-based traffic segmentation
# Docker Ping Container - dping
### Based on npm net-ping

#### Docker usage
##### dping will ping subnets in CIDR format, with mask between 16 and 30
```
Pinging default 8.8.8.0/28 subnet:
$ docker exec dping node dping.js
Pinging  8.8.8.0/28  with 14 hosts from 172.17.0.4
Replied: 1/14 32ms 8.8.8.8
```
```
Ping specific subnet i.e. 8.139.183.0/28:
$ docker exec dping node dping.js 98.139.183.0/28
Pinging  98.139.183.0/28  with 14 hosts from 172.17.0.4

Replied: 1/14 50ms 98.139.183.1
Replied: 2/14 51ms 98.139.183.3
Replied: 3/14 50ms 98.139.183.10
Replied: 4/14 50ms 98.139.183.4
Replied: 5/14 51ms 98.139.183.12
Replied: 6/14 51ms 98.139.183.11
Replied: 7/14 52ms 98.139.183.2
Replied: 8/14 51ms 98.139.183.14
Replied: 9/14 51ms 98.139.183.13
```

#### Websocket API
```
$ wscat -c http://address-of-host-running-dping-container:7777
connected (press CTRL+C to quit)
  < Send me CIDR subnet, i.e 8.8.8.0/28, where mask is between 16 and 30 
> what ?
  < Send me CIDR subnet, i.e 8.8.8.0/28, where mask is between 16 and 30 
> 8.8.8.0/28
  < Received subnet: 8.8.8.0/28
  < Pinging 8.8.8.0/28 with 14 hosts from 172.17.0.4
  < "Replied: 1/12 8.8.8.8"
> 
```

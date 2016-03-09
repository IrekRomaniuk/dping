# Docker Ping Container - dping
### Based on npm [net-ping](https://github.com/stephenwvickers/node-net-ping) by Stephen Vickers

#### Container use:
Pull 'dping' image from 'niuk' repository on docker hub and scan subnet 98.139.183.0/28 (command 'node dping').
Subnet has to be given in CIDR format, with mask between 16 and 30.
Container name will be 'dping'

```
$docker run --name dping niuk/dping node dping.js 98.139.183.0/28
$docker logs dping
Pinging  98.139.183.0/28  with 14 hosts from 172.17.0.2

Replied: 1/14 86ms 98.139.183.3
Replied: 2/14 89ms 98.139.183.10
Replied: 3/14 91ms 98.139.183.1
Replied: 4/14 91ms 98.139.183.2
Replied: 5/14 90ms 98.139.183.11
Replied: 6/14 90ms 98.139.183.12
Replied: 7/14 91ms 98.139.183.13
Replied: 8/14 91ms 98.139.183.14
Replied: 9/14 92ms 98.139.183.4

```

Run 'dping' with port 7777 exposed for websocket

```
docker run -h dping --name dping -d -p 7777:7777 niuk/dping
```

'dping' will ping subnet 8.8.8.0/28 be default (if argument omitted from command 'node dping')

```
$ docker exec dping node dping.js
Pinging  8.8.8.0/28  with 14 hosts from 172.17.0.4
Replied: 1/14 32ms 8.8.8.8
```

Ping specific subnet i.e. 8.139.183.0/28 again:

```
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

#### Websocket API (container must be running with port 7777 exposed)
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

#### Using d.sh to install and run dping
```
$rm -Rf dping; git clone https://github.com/IrekRomaniuk/dping.git; cd dping; chmod +x d.sh; ./d.sh
```
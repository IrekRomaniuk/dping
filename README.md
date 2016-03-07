# Docker Ping Container 
## dping
### based on npm net-ping

### Docker usage
```
$ docker exec dping node mainnet.js
Pinging  8.8.8.0/28  with 14 hosts from 172.17.0.4
Replied: 1/14 32ms 8.8.8.8
```

### Websocket API
```
$ wscat -c http://host-address:7777
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

| Language | Framework | Platform | Author |
| -------- | -------- |--------|--------|
| Nodejs | Express | Azure Web App, Virtual Machine| |


# Tarmo-ilmo-API

Tarmo-ilmo-API

## License:

See [LICENSE](../LICENSE).

## Contributing

Ask from author.

## Notes
https://developer.okta.com/blog/2018/11/15/node-express-typescript
https://12factor.net/
https://helmetjs.github.io/docs/
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment

https://medium.com/javascript-in-plain-english/deploying-node-js-app-using-azure-devops-part1-74cb13a6bd02
https://medium.com/javascript-in-plain-english/deploying-node-js-app-using-azure-devops-part2-4567e4cf783b

## Authenticate process

- authenticate
get /authenticate/<email>
    - generoidaan tietokantaan one_timer_token, ja päättymis timestamp 1h
-> lähettää email, mukana linkki softaan, joka sisältää one_timer_token
-> linkki ohjaa sivulle joka tekee kutsun:
get /authenticate/validate/<one_timer_token>
-> jos one_timer_token voimassa ja valid: palauttaa auth_tokenin
    - auth_tokenilla api kutsu oikeus (jatkossa openid token)
    - auth_token talteen kantaan ja invalidointi timestamp 24h päästä
    - tässä kohden voi samalla siivota myös muut invalidit auth_tokenit pois kannasta
- haetaan ko. henkilön tiedot lomakkeelle valmiiksi, jos hlö löytyy
- käyttäjä muokkaa ui:ssa tiedot
- tallentaa tiedot
- logout -> poistetaan token kannasta

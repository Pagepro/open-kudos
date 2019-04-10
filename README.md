[![Build Status](https://travis-ci.org/Pagepro/open-kudos.svg?branch=development)](https://travis-ci.org/Pagepro/open-kudos)

# Open Kudos

If simple "thanks" is not enough, give Kudos! Kudos can be later exchanged for prizes, which makes it a better way to say "thanks" at work.

# Available Features!
  - Give points (kudos) for other coworkers
  - Check the current balance of givable and spendable points (kudos)

# Features roadmap:
  - Check the list of available prizes
  - Exchange points for prizes
  - Display a list of users with the highest amount of points
  - etc.

### Tech Stack

Open Kudos uses a number of open source projects to work properly in future we will be adding more features based on other technologies:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework 
* [typescript] - a typed superset of JavaScript that compiles to plain JavaScript
* [mongoose] - elegant MongoDB object modelling for node.js

And of course, Kudos itself is open source with a [public repository][kudos]
 on GitHub.

### Kudos bot commands

Give command:

>@kudos give @username2 10 for being kind today

Kudos the give response:

>@username1 gave @username2 10 for being kind today


Balance command:

>@kudos balance

Kudos the balance response:

>Here is your current balance
>
>**Giveable Balance**
89 Kudos
Giveable balances reset at the beginning of the month. Use 'em or lose 'em

>**Spendable Balance**
10 Kudos 
Spendable Kudos never expire. Use them to buy cool things in the store


License
----

MIT

Check our site [Pagepro][pagepro]

   [pagepro]: <https://pagepro.co/>
   [typescript]: <https://www.typescriptlang.org/>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [mongoose]: <https://mongoosejs.com/>
   [kudos]: <https://github.com/Pagepro/open-kudos>

# Stock manager

## About

### Structure

Logic resides in ```src/``` folder. ```src/executeStockInput/```, ```src/executeStockInputV2/```, and ```src/executeStockInputV3/``` are logic funtions acomplishing the set task, V3 is unfinished. I do not generally do versions of files, since that's what version control is for, but I though it would be useful to see them next to each other in this case, since it is a showcase task. 

```util``` folder contains generic reusable functions, and ```models``` folder contains typescript models separated into two groups of models relating to actions and models relating to stock. The models are used mainly by the ```V1``` which is the most finished one, and ```V3``` does not use them at all.

### Versions

#### V1
The first version is more robust, but also more computationally expensive. 

#### V2
The second version is a step in a far less expensive approach, removing the mid-step of having parsed input and translating the input straight into state instead.

#### V3
I kept in mind object-oriented approach and functional approach and found that even in ```V2``` I struggled to remove a side effects (executing an action). 

Unfinished V3 (```executeStockInputV3```) manages to avoid side effects, and would benefit from currying.

```I do not generally do versions of files, since that's what version control is for, but I though it would be useful to see them next to each other in this case, since it is a showcase task. 

```


## Usage

See package.json for commands.

run ```test``` to execute the tests.


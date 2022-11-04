### stentor-conditional

Conditionals are objects with key `conditions` that are strings with simple expressions.

The conditional determiner will take an array of conditionals and evaluate each condition and return an array of all the conditionals that returned true.

### VM

By default, it uses the built-in Node VM but if you install vm2 or isolated-vm, it will then prefer that as your VM environment.
